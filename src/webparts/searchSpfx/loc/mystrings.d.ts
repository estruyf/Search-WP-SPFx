declare interface IStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  QueryFieldLabel: string;
  FieldsFieldLabel: string;
  FieldsTemplateLabel: string;
  FieldsMaxResults: string;
  FieldsSorting: string;
}

declare module 'mystrings' {
  const strings: IStrings;
  export = strings;
}
