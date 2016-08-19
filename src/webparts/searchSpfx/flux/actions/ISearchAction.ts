import {IWebPartContext} from '@microsoft/sp-client-preview';
export interface ISearchAction {
    actionType: Number;
    context?: IWebPartContext;
    query?: string;
    fields?: string;
}