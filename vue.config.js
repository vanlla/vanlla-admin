const path = require('path')

function resolve(dir) {
  return path.join(__dirname, './', dir)
}

module.exports = {
  //BASE_URL - 会和 vue.config.js 中的 baseUrl 选项相符，即你的应用会部署到的基础路径。
  baseUrl: process.env.VUE_APP_BASE_URL,
  outputDir: process.env.VUE_APP_OUTPUT_DIR,
  chainWebpack: config => {
    // svg rule loader
    const svgRule = config.module.rule('svg') // 找到svg-loader
    svgRule.uses.clear() // 清除已有的loader, 如果不这样做会添加在此loader之后
    svgRule.exclude.add(/node_modules/) // 正则匹配排除node_modules目录
    svgRule // 添加svg新的loader处理
      .test(/\.svg$/)
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })

    // 修改images loader 添加svg处理
    const imagesRule = config.module.rule('images')
    imagesRule.exclude.add(resolve('src/icons'))
    config.module.rule('images').test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
  },
  devServer: {
    // 设置主机地址
    host: 'localhost',
    // 设置默认端口
    port: 8082,
    // 设置代理
    proxy: {
      '/api': {
        // 目标 API 地址
        target: 'http://localhost:8080/api',
        // 如果要代理 websockets
        ws: true,
        // 将主机标头的原点更改为目标URL
        changeOrigin: false,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
