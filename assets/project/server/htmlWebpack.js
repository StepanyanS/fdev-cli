// import "html-webpack-plugin" plugin
import HtmlWebpackPlugin from 'html-webpack-plugin';

// import pages array from pages file
import pages from '../src/pages/pages.js';

export default class HtmlWebpack {
    constructor(config) {
        this.config = config;
    }

    include() {

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