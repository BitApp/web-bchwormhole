const webpack = require("webpack");
const SpritesmithPlugin = require("webpack-spritesmith");
const path = require("path");

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    //title: "%s | WePromise",
    titleTemplate: "%s",
    //title: "Demo",
    //titleTemplate: "%s - 小鹿钱包 | DeerWallet",
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1,maximum-scale=1.0, user-scalable=0"
      },
      {
        name:"format-detection",
        content:"telephone=no"
      },
      { hid: "description", name: "description", content: "Keep the promise that make with your friends/lover/family on Blockchain, make it forever, unchangeable." },
      { hid: "keywords", name: "keywords", content: "wepromise,promise,承诺,bch,app,bitcoin cash"}
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }
    ],
    script: [{
      type: "text/javascript",
      src: "/assets/iconfont/iconfont.js"
    }]
  },
  modules: [
    "@nuxtjs/bootstrap-vue"
    //"@nuxtjs/webpackmonitor"
    //['webpack-profile-module', { /* module options */ }]
  ],
  render:{
    gzip:true
  },

  router: {
    middleware: ["i18n"]
  },
  /*
  ** Global CSS
  */
  css: [
    { src: "~assets/scss/global.scss", lang: "scss" },
    { src: "~assets/scss/font-awesome.min.css", lang: "css" },
    { src: "~assets/css/bootstrap-social.css", lang: "css" }
  ],

  performance: {
    prefetch: true
  },
  /*
  ** Customize the progress-bar color
  */
  loading:false,
  //loading: "~/components/Loading.vue",
  /*
  ** Build configuration
  */
  
  build: {
    // ssr: {
    //   cache: require("lru-cache")({
    //     max: 1000,
    //     maxAge: 1000 * 60 * 15
    //   })
    // },
    analyze: false,
    extractCSS:true,
    /*
    ** Run ESLINT on save
    */
    //publicPath: process.env.NODE_ENV === "pre"? "https://precdn.viabtc.com/static/": "https://cdn.viabtc.com/static/",
    filenames: {
      manifest: "manifest.[hash:7].js",
      css: "style.[hash:7].css",
      vendor: "vendor.[hash:7].js",
      app: "approles.[chunkhash:7].js",
      chunk: "[id].approles.[chunkhash:7].js"
    },
    //vendor: ["babel-polyfill", "axios"],
    vendor: ["axios"],
    extend(config, ctx) {
      /*
      //spritesmith
      config.resolve = config.resolve || { modules: [] };
      config.resolve.modules.push("spritesmith-generated");

      //plugins
      config.plugins = config.plugins || [];
      config.plugins.push(
        new SpritesmithPlugin({
          src: {
            cwd: path.resolve(__dirname, "assets/img/concat"),
            //glob: "**占位符/*.png"
          },
          target: {
            image: path.resolve(__dirname, "assets/spritesmith/sprite.png"),
            css: path.resolve(__dirname, "assets/spritesmith/sprite.scss")
          },
          retina: "@2x",
          apiOptions: {
            cssImageRef: "~/assets/spritesmith/sprite.png"
          }
        })
      );
      */
      // config.module.rules.push(
      //   {
      //     test: /\.css$/,
      //     loader: ["style-loader", "css-loader"]
      //   },
      //   {
      //     test: /\.scss$/,
      //     loader: ["style-loader", "css-loader", "sass-loader"]
      //   }
      // );

      config.module.rules.push({
        test: /\.(jpe?g|png|svg|gif)$/,
        loader: ["srcset-loader"],
        exclude: /(node_modules)/,
        resourceQuery: /[?&](sizes|placeholder)(=|&|\[|$)/
      });

      if (ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: ["eslint-loader"],
          exclude: /(node_modules)/
        });
      }
      if (!ctx.isDev) {
        //生产环境，图片压缩
        config.module.rules.push({
          test: /\.(gif|png|jpe?g|svg)$/i,
          //test: /\.(gif|svg)$/i,
          loaders: [
            {
              loader: "image-webpack-loader",
              query: {
                pngquant: {
                  quality: "65-90",
                  speed: 4,
                  optimizationLevel: 7,
                  interlaced: true
                },
                gifsicle: {
                  optimizationLevel: 7
                },
                mozjpeg: {
                  progressive: true,
                  //optimizationLevel: 3,
                  quality:80
                }
              }
            }
          ]
        })
         /**
         * 生成webp文件
         */
        // config.module.rules.push({
        //   test: /\.(png|jpe?g)$/,
        //   loader: "viawebp-loader",
        //   enforce: "post",
        //   options: {
        //     expose: "default", //webp、all、default
        //     name: "img/[name].[hash:7].[ext]",
        //     webp: {
        //       quality: 75
        //     }
        //   }
        // });
      }

      //多语言自动替换
      config.module.rules.push({
        test: /\.vue$/,
        exclude: /(node_modules)|(\.nuxt)|(Privacy(.{2})\.vue)|(Service(.{2})\.vue)/,
        loader: "i18n-cn-autotrans-loader",
        enforce: "pre",
        options: {
          hashLength: 8,
          repeatFlag:"\\[R\\]",
          writeFile:false,
          root:"locales",
          upgradeLangs:false,
          prefix:"",
          originalLang:"zh_Hans_CN",
          targetLangs: ["zh_Hant_HK"],
          cacheTime:5000
        }
      });
    }
  },

  plugins: [
    //"~/plugins/polyfill",
    "~/plugins/cookies",
    { src: "~/plugins/i18n"},
    { src: "~/plugins/exchangeAxios"},
    //{ src: "~/plugins/awsome", ssr: false },
    { src: "~/plugins/ga", ssr: false}
    //{ src: "~/plugins/clipboards", ssr: false }
  ]
};
