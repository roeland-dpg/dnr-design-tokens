/** @type {import('style-dictionary').Config} */

const StyleDictionary = require('style-dictionary');
const core = require('./data/core.json');
const categories = Object.keys(core)

const componentsFile = require('./data/components.json');
const components = Object.keys(componentsFile)

StyleDictionary.registerTransform({
    name: "shadow/css",
    type: "value",
    transitive: true, // Necessary when the color is an alias reference, or the shadows themselves are aliased
    matcher: (token) => token.type === "boxShadow",
    transformer: (token) => {
        // Allow both single and multi shadow tokens:
        const shadows = Array.isArray(token.value) ? token.value : [token.value];

        const transformedShadows = shadows.map((shadow) => {
            const {x, y, blur, spread, color, type} = shadow;
            const inset = type === "innerShadow" ? "inset " : "";
            return `${inset}${x}px ${y}px ${blur}px ${spread}px ${color}`;
        });

        return transformedShadows.join(", ");
    },
});

StyleDictionary.registerTransform({
    name: "size/check-px",
    type: "value",
    transitive: true, // Necessary when the color is an alias reference, or the shadows themselves are aliased
    transformer: (token) => {
        if (!isNaN(token.value)) return `${token.value}px`
        return token.value
    },
});

module.exports =
    {
        source: ["data/**/*.json"],
        platforms: {
            css: {
                prefix: 'dnr',
                transforms: [
                    "size/check-px",
                    'attribute/cti',
                    'name/cti/kebab',
                    'time/seconds',
                    'content/icon',
                    'shadow/css',
                    'color/css'],
                buildPath: "build/css/",
                files: [...categories.map(category => ({
                    filter: (token) => {
                        console.log(token)
                        return token.attributes.category === category
                    },
                    format: "css/variables",
                    destination: `${category}.css`
                })), ...components.map(component => ({
                    filter: (token) => {
                        return token.attributes.category === component
                    },
                    format: "css/variables",
                    destination: `${component}.css`
                }))]
            }
        },

    }
