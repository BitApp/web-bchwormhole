if (process.env.NODE_ENV === "production") {
  /*
  ** Include Google Analytics Script
  */
  (function(i,s,o,g,r,a,m){i["GoogleAnalyticsObject"]=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,"script","https://www.google-analytics.com/analytics.js","ga");
  /*
  ** Set the current page
  */

  ga("create", "UA-50634980-1")
  ga("set", "page", location.href)
  ga("send", "pageview")
  /*
  ** Every time the route changes (fired on initialization too)
  */
  window.onNuxtReady((app) => {
    // And the route has changed
    app.$nuxt.$on("routeChanged", (to, from) => {
      // We tell Google Analytic to update the page
      ga("set", "page", to.fullPath)
      ga("send", "pageview")
    })
  })

  //basic错误上报
  window.addEventListener("error", function(e) {
      ga("send", "exception", {
        "exDescription": "["+new Date()+"]:"+JSON.stringify(e) + "|cookie:"+document.cookie+"|ua:"+navigator.userAgent,
        "exFatal":false
      })
  })
}
else{
  window.ga = function(op, category, obj){
    console.error(obj)
  }
}