// import "webpack"
import webpack from 'webpack';

// import "libraries" array
import libraries from '../src/lib/lib';

export default class ProvideLibraries {
    constructor(config) {
        this.config = config;
    }

    provide() {
        if(libraries.length > 0) {

            let obj = {};

            libraries.forEach(library => {

                if(library === 'jquery') {
                    obj.$ = library;
                    obj.jQuery = library;
                    obj['window.jQuery'] = library
                }
                else {
                    obj[library] = library
                    obj[`window.${library}`] = library
                }
            });

            this.config.plugins.push(new webpack.ProvidePlugin(obj));
        }
    }
}