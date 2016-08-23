/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:disable:no-unused-variable */

import { ISearchSpfxWebPartProps } from '../ISearchSpfxWebPartProps';
import { IWebPartContext } from '@microsoft/sp-client-preview';

import searchActions from '../flux/actions/searchActions';
import searchStore from '../flux/stores/searchStore';

import TemplateLoader from '../templates/TemplateLoader';

export interface ISearchSpfxProps extends ISearchSpfxWebPartProps {
	context: IWebPartContext;
	firstRender: Boolean;
}

export interface ISearchState {
	results?: any[];
	loaded?: Boolean;
	component?: any;
	template?: string;
}

export default class SearchSpfx extends React.Component<ISearchSpfxProps, ISearchState> {
	private loader: TemplateLoader = new TemplateLoader();

	constructor(props: ISearchSpfxProps, context: IWebPartContext) {
		super(props, context);
		this.state = {
			results: [],
			loaded: false,
			component: null,
			template: ""
		};
		this._onChange = this._onChange.bind(this);
	};

	public componentWillMount(): void {
		this.loader.getComponent(this.props.template).then((component) => {
			this.setState({
				template: this.props.template,
				component: component
			});
		});
	}

    public componentDidMount(): void {
        searchStore.addChangeListener(this._onChange);
		searchActions.get(this.props.context, this.props.query, this.props.maxResults, this.props.sorting, this.loader.getTemplateMappings(this.props.template));
    }

    public componentWillUnmount(): void {
        searchStore.removeChangeListener(this._onChange);
    }

	public componentWillReceiveProps(nextProps: ISearchSpfxProps): void {
		// Get the new results
		searchActions.get(nextProps.context, nextProps.query, nextProps.maxResults, nextProps.sorting, this.loader.getTemplateMappings(nextProps.template));
	}

	private _onChange(): void {
		// Check if another template needs to be loaded
		if (this.state.template !== this.props.template) {
			this.loader.getComponent(this.props.template).then((component) => {
				this.setState({
					template: this.props.template,
					component: component
				});
			});
		}

        this.setState({
			results: searchStore.getSearchResults(),
			loaded: true
        });
    }

	public render(): JSX.Element {
		if (this.props.firstRender || this.state.loaded) {
			if (this.state.results.length === 0) {
				return (
					<div>
						Sorry, no results found.
					</div>
				);
			} else {
				// Load the template
				if (this.state.component !== null) {
					/* tslint:disable:variable-name */
					const CrntComponent: any = this.state.component;
					/* tslint:disable:variable-name */
					return <CrntComponent {...this.props} results={this.state.results} />;
				}
			}
		} else {
			return (<div />);
		}
	}
}
