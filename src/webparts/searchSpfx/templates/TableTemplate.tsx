/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:disable:no-unused-variable */
import { css } from 'office-ui-fabric-react/';
import "node_modules/office-ui-fabric/dist/css/fabric.components.css";

import styles from '../SearchSpfx.module.scss';
import { ISearchSpfxWebPartProps } from '../ISearchSpfxWebPartProps';

import * as moment from 'moment';

export interface ITableTemplate extends ISearchSpfxWebPartProps {
	results: any[];
}

export default class TableTemplate extends React.Component<ITableTemplate, {}> {
	private iconUrl: string = "https://spoprod-a.akamaihd.net/files/odsp-next-prod_ship-2016-08-15_20160815.002/odsp-media/images/filetypes/16/";
	private unknown: string[] = ['aspx', 'null'];

	private getAuthorDisplayName(author: string): string {
		if (author !== null) {
			const splits: string[] = author.split('|');
			return splits[1].trim();
		} else {
			return "";
		}
	}

	private getDateFromString(retrievedDate: string): string {
		if (retrievedDate !== null) {
			return moment(retrievedDate).format('DD/MM/YYYY');
		} else {
			return "";
		}
	}

	public render(): JSX.Element {
		return (
			<div className={styles.searchSpfx}>
				<h1 className='ms-font-xxl'>Results rendered in a table. Query: {this.props.query}</h1>
				<table className={css('ms-Table', styles.templateTable)}>
					<thead>
						<tr>
							<th>Type</th>
							<th>Name</th>
							<th>Modified</th>
							<th>Modified by</th>
						</tr>
					</thead>
					<tbody>
						{
							this.props.results.map((result, index) => {
								return (<tr key={index}>
											<td>
												<a href={result.Path}><img src={`${this.iconUrl}${result.Fileextension !== null && this.unknown.indexOf(result.Fileextension) === -1 ? result.Fileextension : 'code'}.png`} /></a>
											</td>
											<td>
												<a href={result.Path}>{result.Filename !== null ? result.Filename.substring(0, result.Filename.lastIndexOf('.')) : ""}</a>
											</td>
											<td>{this.getDateFromString(result.ModifiedOWSDATE)}</td>
											<td>{this.getAuthorDisplayName(result.EditorOWSUSER)}</td>
										</tr>);
							})
						}
					</tbody>
				</table>
			</div>
		);
	}
}