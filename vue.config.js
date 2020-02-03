const path = require('path')
module.exports = {
  devServer: {
    proxy: {
      '/': {
        target: 'http://localhost:0103',
        changeOrigin: true
      }
    }
  },
  chainWebpack: config => {
    config.module
      .rule('svg')
      .exclude.add(path.join(__dirname, '.', 'src/icons'))
      .end()

    config.resolve.alias
      .set('@', path.join(__dirname, './src'))

    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(path.join(__dirname, '.', 'src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
  }
}
