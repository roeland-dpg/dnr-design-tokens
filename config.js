/** @type {import('style-dictionary').Config} */

module.exports =
    {
        source: ["data/**/*.json"],
        platforms: {
            scss: {
                prefix: 'dnr',
                transformGroup: "scss",
                buildPath: "build/scss/",
                files: [{
                    destination: "_variables.scss",
                    format: "scss/variables"
                }],
                options: {
                    outputReferences: true
                }
            },
            "css": {
                prefix: 'dnr',
                "transformGroup": "css",
                buildPath: "build/css/",
                "files": [
                    {
                        "format": "css/variables",
                        "destination": "variables.css"
                    }
                ],
                options: {
                    outputReferences: true
                }
            }
        },
    }
