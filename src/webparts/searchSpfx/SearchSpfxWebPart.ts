import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
	BaseClientSideWebPart,
	IPropertyPaneSettings,
	IWebPartContext,
	PropertyPaneTextField,
	PropertyPaneDropdown
} from '@microsoft/sp-client-preview';

import * as strings from 'mystrings';
import SearchSpfx, { ISearchSpfxProps } from './components/SearchSpfx';
import { ISearchSpfxWebPartProps } from './ISearchSpfxWebPartProps';

import {allTemplates} from './templates/TemplateLoader';

export default class SearchSpfxWebPart extends BaseClientSideWebPart<ISearchSpfxWebPartProps> {
	public constructor(context: IWebPartContext) {
		super(context);
	}

	public render(): void {
		const element: React.ReactElement<ISearchSpfxProps> = React.createElement(SearchSpfx, {
			description: this.properties.description,
			query: this.properties.query,
			context: this.context,
			firstRender: this.renderedOnce,
			template: this.properties.template
		});

		ReactDom.render(element, this.domElement);
	}

	protected get propertyPaneSettings(): IPropertyPaneSettings {
		return {
			pages: [{
				header: {
					description: strings.PropertyPaneDescription
				},
				groups: [{
					groupName: strings.BasicGroupName,
					groupFields: [
						PropertyPaneTextField('description', {
							label: strings.DescriptionFieldLabel
						}),
						PropertyPaneTextField('query', {
							label: strings.QueryFieldLabel
						}),
						PropertyPaneDropdown('template', {
							label: strings.FieldsTemplateLabel,
							options: allTemplates
						})
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