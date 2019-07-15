const webpack = require('webpack')
const prodWebpackConfig = require('../configs/webpack.prod')
const chalk = require('chalk')
const { getPublicPath } = require('../configs/env')

const complier = webpack(prodWebpackConfig)

console.log('webpack is building ...')
//complier.run 打包执行方法
complier.run((err, stats) => {
  if (err) {
    console.log('webpack配置错误')
    console.error(err.stack || err)
    if (err.details) {
      console.error(err.details)
    }
    return
  }
  const info = stats.toJson()

  // 编译错误
  if (stats.hasErrors()) {
    console.log('编译错误')
    console.error(info.errors)
  }

  // 编译警告
  if (stats.hasWarnings()) {
    console.warn(info.warnings)
  }

  console.log(stats.toString({
    entrypoints: false,
    modules: false,
    children: false,
  }))

  console.log(chalk('project building success'))
  console.log(`current publicPath is ${chalk.yellow(getPublicPath())}`)
})