import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
	BaseClientSideWebPart,
	IPropertyPaneSettings,
	IWebPartContext,
	PropertyPaneTextField,
	PropertyPaneDropdown,
	PropertyPaneSlider
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
			maxResults: this.properties.maxResults,
			sorting: this.properties.sorting,
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
						PropertyPaneTextField('query', {
							label: strings.QueryFieldLabel
						}),
						PropertyPaneSlider('maxResults', {
							label: strings.FieldsMaxResults,
							min: 1,
							max: 50
						}),
						PropertyPaneTextField('sorting', {
							label: strings.FieldsSorting
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