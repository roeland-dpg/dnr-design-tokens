/** @type {import('style-dictionary').Config} */

const glob = require('glob');

const tokensPath = `data/**/*`;
const files = glob
    .sync(tokensPath)
    .map((filePath) => filePath.replace('data/', '').replace('.json', ''));

module.exports =
    {
        source: ["data/**/*.json"],
        platforms: {
            scss: {
                prefix: 'sel',
                transformGroup: "scss",
                buildPath: "build/scss/",
                files: [{
                    destination: "_variables.scss",
                    format: "scss/variables"
                }],
                options: {
                    outputReferences: false
                }
            },
            // "ios": {
            //     "transformGroup": "ios",
            //     "buildPath": `build/ios/`,
            //     "files": [{
            //         "destination": "tokens.h",
            //         "format": "ios-swift/enum.swift"
            //     }]
            // },
            "css": {
                prefix: 'sel',
                transformGroup: "css",
                buildPath: "build/css/",
                files: files.map((filePath) => {
                    return {
                        destination: `${filePath}.css`,
                        format: `css/variables`,
                        filter: (token) => token.filePath.includes(filePath),
                    };
                }),
            }
        },
    }
