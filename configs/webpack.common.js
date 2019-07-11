const fs = require('fs')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const { getEnvironment } = require('./env')
const appDirectory = fs.realpathSync(process.cwd())
const resolveAppPath = relativePath => path.resolve(appDirectory,relativePath)

module.exports = {
    stats: {
        entrypoints: false,
        modules: false,
        children: false,
    },
    performance: {
        hints: false
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|mjs)$/,
                include: resolveAppPath('src'),
                loader: 'babel-loader',
                options: {
                    cacheDirectory:true
                }
            },
            {
                test: /\.(sc|sa|c)ss$/,
                exclude: resolveAppPath('node_modules'),
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                require('postcss-flexbugs-fixes'),
                                autoprefixer({
                                    browsers: [
                                        '>1%',
                                        'last 4 versions',
                                        'Firefox ESR',
                                        'not ie < 9', // React doesn't support IE8 anyway
                                    ],
                                    // flexbox: 'no-2009',
                                }),
                            ],
                        },
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
                loader: 'url-loader',
                options: {
                    limit:10000,
                    name:'assets/[name].[hash:8].ext'
                }
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: resolveAppPath('public/index.html')
        }),
        new webpack.DefinePlugin(getEnvironment())
    ],
    resolve: {
        extensions: [ '.tsx', '.ts', '.js', '.jsx' ],
    }
}