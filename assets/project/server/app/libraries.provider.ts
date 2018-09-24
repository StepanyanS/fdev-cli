import libraries from '../../src/lib/lib';
import { ProvidePlugin } from 'webpack';
import { IWebpackConfig } from '../../config/webpack.config';

export class LibrariesProvider {

    definitions: { [key: string]: any } = {};

    constructor(private config: IWebpackConfig) {}

    provide(): void {
        if(libraries.length > 0) {

            libraries.forEach((library: string): void => {

                if(library === 'jquery') {
                    this.definitions.$ = library;
                    this.definitions.jQuery = library;
                    this.definitions['window.jQuery'] = library
                }
                else {
                    this.definitions[library] = library
                    this.definitions[`window.${library}`] = library
                }
            });

            this.config.plugins.push(new ProvidePlugin(this.definitions));
        }
    }
}