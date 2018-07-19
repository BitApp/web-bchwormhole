import Vue from 'vue'


import '../node_modules/bootstrap/dist/css/bootstrap.css'

import '../assets/scss/global.scss'

import '../assets/scss/font-awesome.min.css'

import '../assets/css/bootstrap-social.css'

import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css'


let layouts = {

  "_default": () => import('../layouts/default.vue'  /* webpackChunkName: "layouts/default" */).then(m => m.default || m),

  "_index": () => import('../layouts/index.vue'  /* webpackChunkName: "layouts/index" */).then(m => m.default || m)

}

let resolvedLayouts = {}

export default {
  head: {"titleTemplate":"%s","meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1,maximum-scale=1.0, user-scalable=0"},{"name":"format-detection","content":"telephone=no"},{"hid":"description","name":"description","content":"Keep the promise that make with your friends\u002Flover\u002Ffamily on Blockchain, make it forever, unchangeable."},{"hid":"keywords","name":"keywords","content":"wepromise,promise,承诺,bch,app,bitcoin cash"}],"link":[{"rel":"icon","type":"image\u002Fx-icon","href":"\u002Ffavicon.ico"}],"script":[{"type":"text\u002Fjavascript","src":"\u002Fassets\u002Ficonfont\u002Ficonfont.js"}],"style":[]},
  render(h, props) {
    
    const layoutEl = h(this.layout || 'nuxt')
    const templateEl = h('div', {
      domProps: {
        id: '__layout'
      },
      key: this.layoutName
    }, [ layoutEl ])

    const transitionEl = h('transition', {
      props: {
        name: 'layout',
        mode: 'out-in'
      }
    }, [ templateEl ])

    return h('div',{
      domProps: {
        id: '__nuxt'
      }
    }, [
      
      transitionEl
    ])
  },
  data: () => ({
    layout: null,
    layoutName: ''
  }),
  beforeCreate () {
    Vue.util.defineReactive(this, 'nuxt', this.$options.nuxt)
  },
  created () {
    // Add this.$nuxt in child instances
    Vue.prototype.$nuxt = this
    // add to window so we can listen when ready
    if (typeof window !== 'undefined') {
      window.$nuxt = this
    }
    // Add $nuxt.error()
    this.error = this.nuxt.error
  },
  
  methods: {
    
    setLayout (layout) {
      if (!layout || !resolvedLayouts['_' + layout]) layout = 'default'
      this.layoutName = layout
      let _layout = '_' + layout
      this.layout = resolvedLayouts[_layout]
      return this.layout
    },
    loadLayout (layout) {
      if (!layout || !(layouts['_' + layout] || resolvedLayouts['_' + layout])) layout = 'default'
      let _layout = '_' + layout
      if (resolvedLayouts[_layout]) {
        return Promise.resolve(resolvedLayouts[_layout])
      }
      return layouts[_layout]()
      .then((Component) => {
        resolvedLayouts[_layout] = Component
        delete layouts[_layout]
        return resolvedLayouts[_layout]
      })
      .catch((e) => {
        if (this.$nuxt) {
          return this.$nuxt.error({ statusCode: 500, message: e.message })
        }
      })
    }
  },
  components: {
    
  }
}

