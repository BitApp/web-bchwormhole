import cookieParser from "~/plugins/cookies"

export default async function ({ store, query, error, req, replace ,hotReload }) {
  if(hotReload) {return}
  
  let preferLanguage = "zh_Hans_CN",
      cookies = { lang:"" },
      acceptLanguage = ""
  
  if(process.SERVER_BUILD){
    acceptLanguage = req.headers["accept-language"]
    preferLanguage = store.state.lang.lang || acceptLanguage || "zh_Hans_CN"
    
    const content = req.headers.cookie || ""
    cookies = cookieParser.parse(content)
  }
  else{
    cookies = cookieParser.parse(document.cookie || "")
    acceptLanguage = store.state.lang.lang || navigator.language || navigator.browserLanguage
  }
  
  if(acceptLanguage){
    preferLanguage = acceptLanguage
  
    if(/cn/i.test(preferLanguage)){
      preferLanguage = "zh_Hans_CN"
    }
    else if(/en/i.test(preferLanguage)){
      preferLanguage = "en_US"
    }
    else if(/hk|tw/i.test(preferLanguage)){
      preferLanguage = "zh_Hant_HK"
    }
    else{
      preferLanguage = "zh_Hans_CN"
    }
  }

  const lang = query.lang || cookies.lang || preferLanguage
  const token = cookies.token
  
  if (store.state.lang.locales.indexOf(lang)===-1) {
    console.error("language not found")
    await store.commit("SET_LANG", "zh_Hans_CN")
    return error({ message: "language not found", statusCode: 404 })
  }
  
  return store.commit("SET_LANG", lang)
}