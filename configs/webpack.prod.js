const webpack = require('webpack')
const fs = require('fs')
const path = require('path')
const appDirectory = fs.realpathSync(process.cwd())
const resolveAppPath = relativePath => path.resolve(appDirectory,relativePath)
const merge = require('webpack-merge')
const commonWebpackConfig = require('./webpack.common')
const TerserPlugin = require('terser-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const autoprefixer = require('autoprefixer') // postcss配置

const {
    getPublicPath
} = require('./env')

const prodConfig = {
    mode: 'production',
    entry: resolveAppPath('src/index.jsx'),
    output: {
        path:resolveAppPath('dist'),
        publicPath: getPublicPath(),
        filename: 'js/[name].js'
    },
    //生产环境代码优化
    optimization : {
        minimizer: [
            new TerserPlugin(),
            new OptimizeCSSAssetsPlugin()
        ],
        //分割代码
        splitChunks: {
            chunk: 'all',
            name:'vendors'
        }
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
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
                    'sass-loader',
                ]
            }
        ]
    },
    plugins: [
        //压缩代码时删除 打包后的 dist 文件夹
        new CleanWebpackPlugin(['dist'],{
            root: appDirectory,
            verbose: true,
            dry: false
        }),
        //打包后压缩的 css文件
        new MiniCssExtractPlugin({
            filename: css/[name].css,
            chunkFilename: css/[name].css
        })
    ]
}

const prodWebpackConfig = merge(commonWebpackConfig,prodConfig)

module.exports  = prodWebpackConfig