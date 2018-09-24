import * as webpack from 'webpack';
import * as CleanWebpackPlugin from 'clean-webpack-plugin';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
// import OptimizeCssAssetsWebpackPlugin from 'optimize-css-assets-webpack-plugin';
import * as UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import * as CompressionPlugin from 'compression-webpack-plugin';
import { resolve } from 'path';
import { Configuration as DevServerConfiguration } from 'webpack-dev-server';

export interface IWebpackConfig extends webpack.Configuration {
    devServer: DevServerConfiguration
}

// webpack config
export default function (env: any): IWebpackConfig  {

    // define development mode
    const devMode = env.production === false ? true : false;

    return {

        // compile mode (development || production)
        mode: devMode ? 'development' : 'production',
    
        // index.html and assets directory
        context: resolve(__dirname, '../src'),

        // entry modules
        entry: devMode ? {
            polyfills: ['@webcomponents/custom-elements',  'eventsource-polyfill'], // import "Custom elements" polyfill for browsers that don't support natively and "eventsource-polyfill" for hot reloading in IE & Edge
            hotModules: ['./main.js', 'webpack-hot-middleware/client?reload=true', '../client/pagesModule.js'] // import main.js and plugins for hot reloading in development
        } : {
            polyfills: '@webcomponents/custom-elements',
            main: './main.js'
        },

        // output directory
        output: {
            path: resolve(__dirname, '../dist'),
            filename: './assets/js/[name].js'
        },

        // loaders
        module: {
            rules: [

                // loader for (.js) files
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components|custom-elements)/,
                    use: {
                        loader: 'babel-loader'
                    }
                },
                
                // loaders for (sass || scss || css) files
                {
                    test: /(sa|sc|c)ss$/,
                    use: [
                        {
                            loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader as string,
                            options: !devMode ? {
                                publicPath: '../../'
                            } : 
                            {}
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 2,
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ],
                    exclude: /node_modules/
                },

                // loader for images (png, jpg, gif)
                {
                    test: /\.(png|jpg|gif)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[path][name].[ext]'
                            }
                        },
                        {
                            loader: 'image-webpack-loader',
                            options: {
                                disable: devMode,
                                mozjpeg: {
                                    progressive: true,
                                    quality: 65
                                },
                                pngquant: {
                                    quality: '65-90',
                                    speed: 1
                                },
                                gifsicle: {
                                    interlaced: false
                                }
                            }
                        }
                    ]
                },

                // loader for (.svg) files
                {
                    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'file-loader?mimetype=image/svg+xml',
                    options: {
                        name: '[path][name].[ext]'
                    }
                },

                // loader for (.woff) fonts
                {
                    test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'file-loader?mimetype=application/font-woff',
                    options: {
                        name: '[path][name].[ext]'
                    }
                },

                // loader for (.woff2) fonts
                {
                    test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'file-loader?mimetype=application/font-woff',
                    options: {
                        name: '[path][name].[ext]'
                    }
                },

                // loader for (.ttf) fonts
                {
                    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'file-loader?mimetype=application/octet-stream',
                    options: {
                        name: '[path][name].[ext]'
                    }
                },

                // loader for (.eot) fonts
                {
                    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]'
                    }
                },

                // loader for (.html) files
                {
                    test: /\.html$/,
                    loader: 'html-loader'
                }
            ]
        },

        // plugins
        plugins: [
            new webpack.ProgressPlugin(),

            // plugin for defining global variables
            new webpack.DefinePlugin({
                devMode
            }),

            // plugin for remove "dist" folder every time when server starts
            new CleanWebpackPlugin(
                ['dist'],
                {
                    root: resolve(__dirname, '../'),
                    verbose:  false,
                }
            )
        ].concat(devMode ? [
            // plugin for hot reloading
            new webpack.HotModuleReplacementPlugin()
        ] : [

            // plugin for comress assets into gzip
            new CompressionPlugin({
                algorithm: 'gzip'
            }),

            // plugin for extracting css styles into separate file
            new MiniCssExtractPlugin({
                filename: "assets/css/[name]-[contenthash].css"
            })
        ]),

        // dev-server config
        devServer: {
            port: 9000,
            contentBase: resolve(__dirname, '../dist'),
            publicPath: '/',
            host: '0.0.0.0',
            overlay: true,
            stats: {
                colors: true,
                assets: false,
                modules: false,
                entrypoints: false,
                builtAt: false,
                version: false,
                hash: false
            }
            // stats: 'errors-only'
        },

        optimization: {
            minimizer: [
                // plugin for optimizing (.js) files
                new UglifyJsPlugin({
                    sourceMap: true
                })
            ]
        },
    
        // source maps
        devtool: devMode ? 'eval' : 'source-map',
    
        // watch mode
        watch: devMode
    }
}