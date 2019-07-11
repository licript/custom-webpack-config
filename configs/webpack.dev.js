const webpack = require('webpack')
const fs = require('fs')
const path = require('path')
const appDirectory = fs.realpathSync(process.cwd())
const resolveAppPath = relativePath => path.resolve(appDirectory,relativePath)
const merge = require('webpack-merge')
const commonWebpackConfig = require('./webpack.common')

const devConfig = {
    mode: 'development',
    entry: resolveAppPath('src/index.jsx'),
    output: {
        path:resolveAppPath('dist'),
        publicPath: '/',
        filename: 'js/[name].js'
    },
    devtool: "eval-source-map",
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
}

const devWebpackConfig = merge(commonWebpackConfig,devConfig)

module.exports  = devWebpackConfig