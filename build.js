const StyleDictionary = require('style-dictionary');
const { fileHeader, minifyDictionary } = StyleDictionary.formatHelpers;

// HAVE THE STYLE DICTIONARY CONFIG DYNAMICALLY GENERATED

StyleDictionary.registerFormat({
    name: 'javascript/tokens',
    formatter: function({dictionary, platform, options, file}) {
        return fileHeader({file}) +
            `export const ${(file.name || 'tokens')} = ` +
            JSON.stringify(minifyDictionary(dictionary.tokens[options.category]), null, 2) + ';';
    }
})

function getStyleDictionaryConfig(brand, appearance) {
    return {
        "source": [
            `data/${brand} - ${appearance}.json`
        ],
        "platforms": {
            "js": {
                transformGroup: "js",
                buildPath: "build/js/themes/",
                files:  [
                    {
                        destination: `${brand.toLowerCase()}/${appearance.toLowerCase()}/color.js`,
                        format: 'javascript/tokens',
                        name: 'colors',
                        options: {
                            category: 'color'
                        },
                        filter: (token) => {
                            if (token.path[0] === 'color') return true
                        },
                    },
                    {
                        destination: `${brand.toLowerCase()}/${appearance.toLowerCase()}/button.js`,
                        format: 'javascript/tokens',
                        name: 'button',
                        options: {
                            category: 'button'
                        },
                        filter: (token) => {
                            if (token.path[0] === 'button') return true
                        },
                    }
                ]
            },
            "ts": {
                buildPath: "build/ts/",
                files:  [{
                    destination: `${brand.toLowerCase()}-${appearance.toLowerCase()}.d.ts`,
                    format: 'typescript/module-declarations',
                    name: `${brand}${appearance}`
                }]
            },
            "css": {
                prefix: 'sel',
                transformGroup: "css",
                buildPath: "build/css/",
                files: [{
                    destination: `${brand.toLowerCase()}-${appearance.toLowerCase()}.css`,
                    format: 'css/variables'
                }]

            }
        }
    };
}

console.log('Build started...');

// PROCESS THE DESIGN TOKENS FOR THE DIFFEREN BRANDS AND PLATFORMS

['HP', 'VK'].map(function (brand) {
    ['Light', 'Dark'].map(function (appearance) {

        console.log('\n==============================================');
        console.log(`\nProcessing: [${brand}] - [${appearance}]`);

        const styleDictionary = StyleDictionary.extend(getStyleDictionaryConfig(brand, appearance));

        styleDictionary.buildAllPlatforms()

        console.log('\nEnd processing');

    })
})

console.log('\n==============================================');
console.log('\nBuild completed!');
