import Vue from "vue"

export default ({ app, store }) => {
    Vue.prototype.$t = function (key) {
      const state = store.state.lang,
            keys = key.split("."),
            postFix = (state.lang || "en") + ".json"

      let context = require.context("~/locales", true, /\.json$/),
          value = context("./" + postFix)

      let folder = "."
      keys.forEach((k, index) => {
        if(k){
          value = value[k]
          
          if(index < keys.length-1){
            folder += "/" + k
          }
          //如果没有value，则读文件夹
          if(!value){
            try{
              let dep = context(folder + "/" + postFix)
              if(dep){
                value = dep[k] || ""
                //最后一位
                if(index === keys.length - 1){
                  if(!value){
                    //取出下划线，首字母大写
                    value = k.replace(/_/g," ").replace(/^(\w)/i,function($1){return $1.toLocaleUpperCase()})
                  }
                }
                else{
                  value = dep
                }
              }
              else{
                value = k.replace(/_/g," ").replace(/^(\w)/i,function($1){return $1.toLocaleUpperCase()})
              }
            }catch(e){
              //直接等於k值
              value = k.replace(/_/g," ").replace(/^(\w)/i,function($1){return $1.toLocaleUpperCase()})
            }
          }
        }
      })
      return value
    }
    app.$t = Vue.prototype.$t
    return app.$t
}
