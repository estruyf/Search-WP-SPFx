export interface ITemplates {
	key: string;
	text: string;
	mappings: string;
}

export interface IExternalTemplate {
	properties: ITemplates;
	component: Function;
}