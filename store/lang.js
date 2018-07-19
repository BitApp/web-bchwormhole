export default ()=>{
  const state = {
    locales: ["en_US", "zh_Hans_CN", "zh_Hant_HK"], // available langages
    lang: null
  }

  const mutations = {
    SET_LANG (state, lang) {
      state.lang = lang
    }
  }

  const actions = {
    setLang ({ state, commit }, lang) {
      return commit("SET_LANG", lang)
    }
  }

  return {
    state,
    actions,
    mutations
  }
}
