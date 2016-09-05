# Search-WP-SPFx
Search Web Part built with the SharePoint Framework, React and Flux.

In the properties pane you can specify the query and template you want to use.

All templates need to be created in the `src/webparts/searchSpfx/templates` folder. Start with a copy of one of the existing ones. The Managed Properties you want to use need to be specified in the **TemplateLoader.ts** file and should be provided in the following format:

```{ key: 'DefaultTemplate', text: 'Default template', mappings: 'Path,Title' }```

![Search web part sample](https://github.com/estruyf/Search-WP-SPFx/blob/master/images/search-wp-spfx-external-template.gif?raw=true)

## Versions
### 0.0.2
- Added the ability to use external templates. You can find an example template in the [**external_templates**](https://github.com/estruyf/Search-WP-SPFx/tree/master/external_templates) folder
- Added token handling for the query. Currenlty it supports {Site} -> current site URL and {SiteCollection} -> site collection URL.

### 0.0.1
- Initial upload

## Using this web part
*Info: This web part can only be tested on a developer site at the moment. Currently there is no mock store created.*

Follow the next steps to test this web part:
- Clone this repo
- Open your command prompt and navigate to the folder
- Run: `$ npm install`
- Run: `$ gulp serve`
- Open your *workbench* on you Office 365 Developer site
- Add the web part and test it out

*Info: here you can find more information about setting up your develop tenant: [Setup SharePoint Developer Tenant](https://github.com/SharePoint/sp-dev-docs/wiki/Setup-SharePoint-Tenant)*.