module.exports =
    {
        source: ["data/**/*.json"],
        platforms: {
            scss: {
                transformGroup: "scss",
                buildPath: "build/scss/",
                files: [{
                    destination: "_variables.scss",
                    format: "scss/variables"
                }]
            },
            "css": {
                "transformGroup": "css",
                buildPath: "build/css/",
                "files": [
                    {
                        "format": "css/variables",
                        "destination": "variables.css"
                    }
                ]
            }
        },
    }




