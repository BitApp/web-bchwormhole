import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _4a4c404d = () => import('../pages/sendtoken.vue' /* webpackChunkName: "pages/sendtoken" */).then(m => m.default || m)
const _afb4600e = () => import('../pages/generatewhc.vue' /* webpackChunkName: "pages/generatewhc" */).then(m => m.default || m)
const _989a1308 = () => import('../pages/contact.vue' /* webpackChunkName: "pages/contact" */).then(m => m.default || m)
const _3f2fc60f = () => import('../pages/docs.vue' /* webpackChunkName: "pages/docs" */).then(m => m.default || m)
const _4532732e = () => import('../pages/index.vue' /* webpackChunkName: "pages/index" */).then(m => m.default || m)



if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise(resolve => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/sendtoken",
			component: _4a4c404d,
			name: "sendtoken"
		},
		{
			path: "/generatewhc",
			component: _afb4600e,
			name: "generatewhc"
		},
		{
			path: "/contact",
			component: _989a1308,
			name: "contact"
		},
		{
			path: "/docs",
			component: _3f2fc60f,
			name: "docs"
		},
		{
			path: "/",
			component: _4532732e,
			name: "index"
		}
    ],
    
    
    fallback: false
  })
}
