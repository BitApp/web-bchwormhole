import Vue from "vue"

// ES build is more efficient by reducing unneeded components with tree-shaking.
// (Needs Webpack 2 or Rollup)
import BootstrapVue from "bootstrap-vue/dist/bootstrap-vue.esm"

// Use commonjs version if es build is not working
//import BootstrapVue from 'bootstrap-vue';

// Import styles if style-loader is available
// You have to manually add css files if lines below are not working

//加载顺序问题，放在nuxt.config.js统一处理
// if (!process.SERVER_BUILD) {
//     require("bootstrap/dist/css/bootstrap.css")
//     require("bootstrap-vue/dist/bootstrap-vue.css")
// }

// Globally register components
Vue.use(BootstrapVue)