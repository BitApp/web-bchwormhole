import Vuex from "vuex"
import createLang from "./lang"

const createStore = () => {

	return new Vuex.Store({
		state: {
			errorText: null,
			successText: null,
			axios: null
		},
		mutations: {
			SET_ERROR_TEXT(state, data) {
				state.errorText = data
			},
			SET_SUCCESS_TEXT(state, data) {
				state.successText = data
			},
			SET_GlOBAL_SOCKET(state, data) {
				state.viaSocket = data
			},
			SET_AXIOS(state, axios) {
				state.axios = axios
			}
		},
		actions: {
			setErrorText({
				commit
			}, data) {
				commit("SET_ERROR_TEXT", data)
			},
			setSuccessText({
				commit
			}, data) {
				commit("SET_SUCCESS_TEXT", data)
			},
			setAxios({
				commit
			}, axios) {
				commit("SET_AXIOS", axios)
			},
			createAccount({
				commit
			}, data) {
				commit("CREATE_ACCOUNT", data)
			}
		},
		modules: {
			lang: createLang()
		}
	})
}

export default createStore