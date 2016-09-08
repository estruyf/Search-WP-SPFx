# Search-WP-SPFx
Search Web Part built with the SharePoint Framework, React and Flux.

In the properties pane you can specify the query and template you want to use.

All "Internal" templates need to be created in the `src/webparts/searchSpfx/templates` folder. Start with a copy of one of the existing ones. The Managed Properties you want to use need to be specified in the **TemplateLoader.ts** file and should be provided in the following format:

```{ key: 'DefaultTemplate', text: 'Default template', mappings: 'Path,Title' }```

Since version 0.0.2 you have the ability to make use of "external" templates. These templates are JS files which you load from an URL. If you want to test out this functionality, navigate to the external_templates folder and upload one of these files to your SharePoint environment. Once uploaded, copy the URL of the file and specify it in the external URL settings property.

![Search web part sample](https://github.com/estruyf/Search-WP-SPFx/blob/master/images/search-wp-spfx-external-template.gif?raw=true)

## Versions
### 0.0.4
- Changed the way of loading scripts defined in external templates
- Added a carousel sample template which makes use of jQuery and Cycle2. Template can be found in the [**external_templates**](https://github.com/estruyf/Search-WP-SPFx/tree/master/external_templates) folder.

### 0.0.3
- Added the functionality to define scripts and stylesheets to load from an external template. You can find a sample template in the [**external_templates**](https://github.com/estruyf/Search-WP-SPFx/tree/master/external_templates) folder.

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