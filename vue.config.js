module.exports = {
  chainWebpack: config => {
    config.module
      .rule("vue")
      .use("iview-loader")
      .loader("iview-loader")
      .options({ prefix: true })
      .end();
  },
  pwa: {
    name: "Link Chat"
  },

  lintOnSave: undefined
};
