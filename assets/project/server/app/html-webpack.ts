import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import pages from '../../src/pages/pages';
import { IWebpackConfig } from '../../config/webpack.config';

export class HtmlWebpack {
    constructor(private config: IWebpackConfig) {}

    include(): void {

        // add index page in webpack config plugins array
        this.config.plugins.push(new HtmlWebpackPlugin({
            filename: `index.html`,
            template: `./index.html`,
            inject: true
        }));

        if(pages.length != 0) {
            for(let page of pages) {
                // add pages in webpack config plugins array
                this.config.plugins.push(new HtmlWebpackPlugin({
                    filename: `${page}.html`,
                    template: `./pages/${page}.html`,
                    inject: true
                }));
            }
        }
    }
}