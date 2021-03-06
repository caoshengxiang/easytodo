// const path = require('path')
// const resolve = dir => {
//   return path.join(__dirname, dir)
// }
// 项目部署基础
// 默认情况下，应用将被部署在域的根目录下,
// 默认：'/'
// 如果您的应用程序部署在子路径中，则需要在这指定子路径
// 例如：https://www.foobar.com/my-app/
// 需要将它改为'/my-app/'
const BASE_URL = process.env.NODE_ENV === 'production'
  ? './'  // history模式下不行 https://cli.vuejs.org/zh/config/#publicpath
  : '/'
const webpack = require('webpack')

module.exports = {
  publicPath: BASE_URL,
  // 如果你不需要使用eslint，把lintOnSave设为false即可
  lintOnSave: true,
  // chainWebpack: config => {
  //   config.resolve.alias.set('@', resolve('src'))
  // },
  // 设为false打包时不生成.map文件
  productionSourceMap: false,
  runtimeCompiler: true,
  // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
  // devServer: {
  //   disableHostCheck: true,
  //   proxy: {
  //     '/': {
  //       target: 'http://172.16.101.109:2345',
  //       changeOrigin: true,
  //       ws: false, // 关闭websocket服务
  //       pathWrite: {
  //         '^/': '/',
  //       },
  //     },
  //   },
  // },
  configureWebpack: {
    // plugins: [
    //   new webpack.ProvidePlugin({
    //     $: 'jquery',
    //     jQuery: 'jquery',
    //     'windows.jQuery': 'jquery',
    //   }),
    // ],
  },
  // pwa: {
  //   iconPaths: {
  //     favicon32: 'logo.png',
  //     favicon16: 'logo.png',
  //     appleTouchIcon: 'logo.png',
  //     maskIcon: 'logo.png',
  //     msTileImage: 'logo.png'
  //   }
  // }
}
