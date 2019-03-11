module.exports = {
  devServer: {
    proxy: {
      '/api': {
        // 代理地址
        target: 'http://localhost:7001/api', // 需要代理的地址
        ws: true,
        changeOrigin: true, // 是否跨域
        // secure: false,
        pathRewrite: {
          '^/api': '/' // 重写接口
        }
      }
    }
  },
  chainWebpack: config => {
    config.module
      .rule("vue")
      .use("iview-loader")
      .loader("iview-loader")
      .options({ prefix: true })
      .end();
  },
  pwa: {
    name: 'Link Chat',
    themeColor: '#24292d',
    msTileColor: '#24292d'
  },
  lintOnSave: undefined
};
