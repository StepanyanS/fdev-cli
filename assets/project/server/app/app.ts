import * as express from 'express';
import * as webpack from 'webpack';
import webpackConfig, { IWebpackConfig } from '../../config/webpack.config';
import { RequestHandlerParams } from 'express-serve-static-core';
import { Options as WebpackHotMiddlewareOptions } from 'webpack-hot-middleware';
import { Options as WebpackDevMiddlewareOptions } from 'webpack-dev-middleware';
import opn = require('opn');
import cursor from '../lib/cursor';
import { HtmlWebpack } from './html-webpack';
import { PagesProvider } from './pages.provider';
import { ComponentsProvider } from './components.provider';
import { LibrariesProvider } from './libraries.provider';

export class App {
    private webpackDevMiddleware: RequestHandlerParams;
    private webpackHotMiddleware: RequestHandlerParams;
    private expressApp: express.Express;
    private compiler: webpack.Compiler | webpack.Watching;
    private webpackConfig: IWebpackConfig;
    private pagesProvider: PagesProvider;
    private componentsProvider: ComponentsProvider;
    private htmlWebpack: HtmlWebpack;
    private librariesProvider: LibrariesProvider;

    constructor(mode: string) {

        this.expressApp = express();
        let webpackEnv = {
            production: mode === 'development' ? false : mode === 'production' ? true : false
        };
        this.webpackConfig = webpackConfig(webpackEnv);

        cursor.green();

        this.pagesProvider = new PagesProvider();
        this.pagesProvider.provide();

        this.componentsProvider = new ComponentsProvider();
        this.componentsProvider.provide();

        cursor.reset();

        this.htmlWebpack = new HtmlWebpack(this.webpackConfig);
        this.htmlWebpack.include();

        this.librariesProvider = new LibrariesProvider(this.webpackConfig);
        this.librariesProvider.provide();
    }

    private async use() {

        // import webpack-dev-middleware
        const webpackDevMiddleware = await import('webpack-dev-middleware');
        this.webpackDevMiddleware = webpackDevMiddleware(this.compiler as webpack.Compiler, this.webpackConfig.devServer as WebpackDevMiddlewareOptions);

        // import webpack-hot-middleware
        const webpackHotMiddleware = await import('webpack-hot-middleware');
        this.webpackHotMiddleware = webpackHotMiddleware(this.compiler as webpack.Compiler, this.webpackConfig.devServer as WebpackHotMiddlewareOptions);

        // define static static-middleware
        const staticMiddleware = express.static('dist');

        // use webpack-dev-middleware, webpack-hot-middleware static-middleware
        this.expressApp.use(this.webpackDevMiddleware);
        // console.log('\nDevMiddleware enabled\n');

        this.expressApp.use(this.webpackHotMiddleware);
        // console.log('HotMiddleware enabled\n');

        this.expressApp.use(staticMiddleware);
        // console.log('StaticMiddleware enabled\n');
    }

    public bootstrap(): void {

        const port = this.webpackConfig.devServer.port;

        // server listen and open in browser
        this.expressApp.listen(port, async (): Promise<void> => {
            console.log(`Server listening on http://localhost:${port}`);
            this.compiler = webpack(this.webpackConfig);
            await this.use();
            opn(`http://localhost:${port}`);
        });
    }

    public build(): void {
        // webpack build
        this.compiler = webpack(this.webpackConfig);
        this.compiler.run((): void => {
            console.log('Complete!');
            cursor.beep();
            process.exit();
        });
    }
  };