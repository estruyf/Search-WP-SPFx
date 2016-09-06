import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
	BaseClientSideWebPart,
	IPropertyPaneSettings,
	IWebPartContext,
	PropertyPaneTextField,
	PropertyPaneDropdown,
	PropertyPaneSlider,
	PropertyPaneToggle
} from '@microsoft/sp-client-preview';

import ModuleLoader from '@microsoft/sp-module-loader';

import * as strings from 'mystrings';
import SearchSpfx, { ISearchSpfxProps } from './components/SearchSpfx';
import { ISearchSpfxWebPartProps } from './ISearchSpfxWebPartProps';
import { IExternalTemplate, IScripts, IStyles } from './utils/ITemplates';
import { allTemplates } from './templates/TemplateLoader';

// Expose React to window -> required for external template loading
require("expose?React!react");

export default class SearchSpfxWebPart extends BaseClientSideWebPart<ISearchSpfxWebPartProps> {
	public constructor(context: IWebPartContext) {
		super(context);
	}

	private _getElement(externalTemplate?: IExternalTemplate): React.ReactElement<ISearchSpfxProps> {
		return React.createElement(SearchSpfx, {
			title: this.properties.title,
			query: this.properties.query,
			maxResults: this.properties.maxResults,
			sorting: this.properties.sorting,
			context: this.context,
			firstRender: this.renderedOnce,
			template: this.properties.template,
			externalTemplate: externalTemplate
		});
	}

	private _loadScriptsBeforeRender(scriptsToLoad?: IScripts[]): Promise<any> {
		return new Promise<any>((resolve, reject) => {
			let promises = [];
			scriptsToLoad.forEach(script => {
				promises.push(ModuleLoader.loadScript(script.url, script.funcName));
			});
			Promise.all(promises).then(data => {
				resolve(data);
			}).catch(err => {
				reject(err);
			});
		});
	}

	private _loadStyles(stylesToLoad: IStyles[]): void {
		stylesToLoad.forEach(style => {
			ModuleLoader.loadCss(style.url);
		});
	}

	public render(): void {
		if (this.properties.external) {
			// Loading external template
			ModuleLoader.loadScript(this.properties.externalUrl, "externalTemplate").then((externalTemplate: IExternalTemplate): void => {
				// Check if other scripts have to be loaded before rendering the component
				if (typeof externalTemplate.properties.scripts !== 'undefined') {
					this._loadScriptsBeforeRender(externalTemplate.properties.scripts).then(() => {
						// Rendering from the external template
						const element = this._getElement(externalTemplate);
						ReactDom.render(element, this.domElement);
					});
				} else {
					// Rendering from the external template
					const element = this._getElement(externalTemplate);
					ReactDom.render(element, this.domElement);
				}

				// Check if their are any styles that need to be loaded
				if (typeof externalTemplate.properties.styles !== 'undefined') {
					this._loadStyles(externalTemplate.properties.styles);
				}
			}).catch((error) => {
				console.log('ERROR: ', error);
			});
		} else {
			// Render from internal template
			const element = this._getElement();
			ReactDom.render(element, this.domElement);
		}
	}

	protected get propertyPaneSettings(): IPropertyPaneSettings {
		// Default template property
		let templateProperty: any = PropertyPaneDropdown('template', {
			label: strings.FieldsTemplateLabel,
			options: allTemplates
		});

		// Check if you want to load an external template
		if (this.properties.external) {
			// Show the external URL property instead of the internal template property
			templateProperty = PropertyPaneTextField('externalUrl', {
				label: strings.FieldsExternalTempLabel
			});
		}

		return {
			pages: [{
				header: {
					description: strings.PropertyPaneDescription
				},
				groups: [{
					groupName: strings.BasicGroupName,
					groupFields: [
						PropertyPaneTextField('title', {
							label: strings.FieldsTitleLabel
						}),
						PropertyPaneTextField('query', {
							label: strings.QueryFieldLabel,
							description: strings.QueryInfoDescription,
							multiline: true
						}),
						PropertyPaneSlider('maxResults', {
							label: strings.FieldsMaxResults,
							min: 1,
							max: 50
						}),
						PropertyPaneTextField('sorting', {
							label: strings.FieldsSorting
						}),
						PropertyPaneToggle('external', {
							label: strings.FieldsExternalLabel
						}),
						templateProperty
					]
				}]
			}]
		};
	}

	// Prevent from changing the query on typing
	protected get disableReactivePropertyChanges(): boolean {
		return true;
	}
}