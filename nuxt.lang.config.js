const webpack = require("webpack");
const path = require("path");

module.exports = {
  /*
  ** Build configuration
  */
  build: {

    //publicPath: process.env.NODE_ENV === "pre"? "https://precdn.viabtc.com/static/": "https://cdn.viabtc.com/static/",
    filenames: {
      manifest: "manifest.[hash:7].js",
      css: "style.[chunkhash:7].css",
      vendor: "vendor.[chunkhash:7].js",
      app: "coinex.[chunkhash:7].js",
      chunk: "[name].[chunkhash:7].js"
    },
    //vendor: ["babel-polyfill", "axios"],
    extend(config, ctx) {
      config.resolve = config.resolve || { modules: [] };
      if(config.plugins.length > 1){
        config.plugins = config.plugins.slice(0,1);
      }
      
      //多语言自动替换
      config.module.rules.push({
        test: /\.vue$/,
        exclude: /(node_modules)|(\.nuxt)|(Privacy(.{2})\.vue)|(Service(.{2})\.vue)/,
        loader: "i18n-cn-autotrans-loader",
        enforce: "pre",
        options: {
          hashLength:8,
          writeFile:true,
          repeatFlag:"\\[R\\]",
          root: "locales",
          prefix: "",
          originalLang:"zh_Hans_CN",
          targetLangs: [],
          cacheTime: 5000
        }
      });
    }
  },

  plugins: [
  ]
};
