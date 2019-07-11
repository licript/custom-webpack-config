const webpack = require('webpack')
const express = require('express')
// const chalk = require('chalk')
const opn = require('opn')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const devWebpackConfig = require('../configs/webpack.dev')
// const packageJson = require('../package.json')

const compiler = webpack(devWebpackConfig)
const app = express()

app.use(new webpackDevMiddleware(compiler, {
    publicPath: '/',
    logLevel: 'warn',
}))

//热更新
app.use(webpackHotMiddleware(compiler,{
    log:false
}))

//监听端口,通过 opn 打开浏览器
app.listen(3001, () => {
    opn(`http://localhost:${3001}/`, {app: ['google chrome', '--incognito']})
})
