# DNR Design Tokens (@dnr-ui/tokens)

With this package we make the Design Tokens from Figma available as code.
This is done by generating a .json file with the [Tokens Studio plugin in Figma](https://tokens.studio/).
And converting it to (currently only) css files with [Style Dictionary](https://amzn.github.io/style-dictionary/)

## Usage

This package currently only exports css files. To make use of these follow the steps:
* Install the packages `npm i @dnr-ui/tokens`
* Import or Use the css file you need in you css file, for example: `@use "~@dnr-ui/tokens/css/core/color";`
* To use a token, use `var(--dnr-` and then the name of the token, for example `var(--dnr-color-neutrals-100)`
* When using the tokens, your IDE should autocomplete the names for you

## Updating

To update the tokens and publish a new version:
* Update the tokens.json file by doing one of:
1. Figma with the Tokens Studio plugin
2. Editing the `./fimga/tokens.json` file directly
* Run `npm run transform` To transform the figma json to a file Style Dictionary can use
* Bump the version: `npm version patch` (or major, minor etc.) [npm version](https://docs.npmjs.com/cli/v8/commands/npm-version)
* Run `npm run pub` to publish the build folder directly
