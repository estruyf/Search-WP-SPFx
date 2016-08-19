import appDispatcher from '../dispatcher/appDispatcher';
import searchActionIDs from './searchActionIDs';
import {IWebPartContext} from '@microsoft/sp-client-preview';

export class SearchActionsStatic {
	/**
	 * @param  {string} query
	 * @param  {string} fields
	 */
	public get(context: IWebPartContext, query: string, fields?: string): void {
		appDispatcher.dispatch({
			actionType: searchActionIDs.SEARCH_GET,
			context: context,
			query: query,
			fields: fields
		});
	}
}

const searchActions: SearchActionsStatic = new SearchActionsStatic();
export default searchActions;