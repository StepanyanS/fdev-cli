// import "express" framework
import express from 'express';

// import "webpack"
import webpack from 'webpack';

import cursor from './lib/cursor';

// import "opn" module
import opn from 'opn';

import ProvideLibraries from './provideLibraries';

import HtmlWebpack from './htmlWebpack';

// define enviroment variable for webpack
let webpackEnv = {
    production: 'false'
};

// define Node enviroment variable
let NODE_ENV = 'development';
if(process.env.NODE_ENV) {
    NODE_ENV = process.env.NODE_ENV.trim();
}

// change enviroment variable of webpack in production
webpackEnv.production = NODE_ENV === 'production' ? 'true' : 'false';

//define developing mode
const devMode = webpackEnv.production === 'false' ? true : false;

// import webpack config
const webpackConfig = require('../config/webpack.config.js')(webpackEnv);

// include (.html) files into webpack.config
new HtmlWebpack(webpackConfig).include();

// provide plugins into webpack config
new ProvideLibraries(webpackConfig).provide();

// define port
const port = webpackConfig.devServer.port;

// define compiler
const compiler = webpack(webpackConfig);

// run dev server in development
if(devMode) {

    cursor.blue();

    // import webpack-dev-middleware
    const webpackDevMiddleware = require('webpack-dev-middleware')(
        compiler,
        webpackConfig.devServer
    );

    // import webpack-hot-middleware
    const webpackHotMiddlware = require('webpack-hot-middleware')(
        compiler,
        webpackConfig.devServer
    );

    // define static static-middleware
    const staticMiddleware = express.static('dist');

    // setup server
    const server = express();

    // use webpack-dev-middleware, webpack-hot-middleware static-middleware
    server.use(webpackDevMiddleware);
    console.log('\nDevMiddleware enabled\n');

    server.use(webpackHotMiddlware);
    console.log('HotMiddleware enabled\n');

    server.use(staticMiddleware);
    console.log('StaticMiddleware enabled\n');

    // server listen and open in browser
    server.listen(port, () => {
        console.log(`Server listening on http://localhost:${port}\n`);
        opn(`http://localhost:${port}`);
    });
}
else {
    // webpack build
    console.log('Building...');
    compiler.run(() => {
        console.log('Complete!');
        cursor.beep();
    });
}