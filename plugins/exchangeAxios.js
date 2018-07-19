import Vue from "vue"
import axios from "axios"
import {
	serverApiDomain,
	clientApiDomain,
	protocol
} from "./variables"
import utils from "~/plugins/utils"
import cookieParser from "~/plugins/cookies"
//const store = createStore()

export default ({
	app,
	req,
	store
}) => {
	let options = {
		baseURL: process.SERVER_BUILD ? (serverApiDomain || protocol + "//" + req.headers.host) : (clientApiDomain || location.protocol+ "//"+ location.host)
	}
	const inst = axios.create(options)

	//全局处理
	inst.defaults.timeout = 10000
	inst.defaults.withCredentials = true
	//inst.defaults.headers.common["platform"] = "mobile"
	//inst.defaults.headers.common["timezone"] = new Date().getTimezoneOffset() / 60
	//inst.defaults.headers.common["content-type"] = "text/plain"

	//初始化
	inst.init = function (req) {

		if (process.SERVER_BUILD) {
			let cookies = {}
			const content = req.headers.cookie
			if (content) {
				cookies = cookieParser.parse(content)
			}
			
			//add session
			if(!cookies.session){
				inst.defaults.headers.common["cookie"] = "session=ssr"
			}
			else{
				inst.defaults.headers.common["cookie"] = req.headers.cookie
			}
		}
		return inst
	}

	//客户端自己执行
	if (!process.SERVER_BUILD) {
		inst.init()
	}

	inst.needAuth = function (res, redirect, url) {
	}
	//未登录
	inst.interceptors.response.use(function (res) {
		return res
	}, function (e) {
		if (!process.SERVER_BUILD) {
			ga("send", "exception", {
				"exDescription": "[" + new Date() + "]:" + JSON.stringify(e) + "|cookie:" + document.cookie + "|ua:" + navigator.userAgent,
				"exFatal": true
			})
		}
		console.error(e)
		return Promise.reject(e)
	})
	Vue.prototype.axios = inst
	app.axios = inst
	//can access form store
	store.dispatch("setAxios", inst)

	return inst
}