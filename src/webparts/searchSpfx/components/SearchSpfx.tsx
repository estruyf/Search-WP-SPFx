/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:disable:no-unused-variable */
import { css } from 'office-ui-fabric-react';

import styles from '../SearchSpfx.module.scss';
import { ISearchSpfxWebPartProps } from '../ISearchSpfxWebPartProps';
import { IWebPartContext } from '@microsoft/sp-client-preview';
import { ICells } from '../utils/ISearchResults';

import searchActions from '../flux/actions/searchActions';
import searchStore from '../flux/stores/searchStore';

export interface ISearchSpfxProps extends ISearchSpfxWebPartProps {
	context: IWebPartContext;
	firstRender: Boolean;
}

export interface ISearchState {
	results: any[];
	loaded: Boolean;
}

export default class SearchSpfx extends React.Component<ISearchSpfxProps, ISearchState> {
	constructor(props: ISearchSpfxProps, context: IWebPartContext) {
		super(props, context);
		this.state = {
			results: [],
			loaded: false
		};
		this._onChange = this._onChange.bind(this);
	};

    private componentDidMount(): void {
        searchStore.addChangeListener(this._onChange);
		searchActions.get(this.props.context, this.props.query, this.props.fields);
    }

    private componentWillUnmount(): void {
        searchStore.removeChangeListener(this._onChange);
    }

	private componentWillReceiveProps(nextProps: ISearchSpfxProps): void {
		searchActions.get(nextProps.context, nextProps.query, nextProps.fields);
	}

	private _onChange(): void {
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
				return (
					<div className={styles.container}>
						<h1>Search results for query: {this.props.query}</h1>
						{
							this.state.results.map((result, index) => {
								return (<p key={index}>Result {index}: <a href={result.Path}>{result.Title}</a></p>);
							})
						}
					</div>
				);
			}
		} else {
			return (<div />);
		}
	}
}
