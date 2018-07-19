import Vue from "vue"
import cookies from "~/plugins/cookies"

const utils = {
    appId:'192969974672769',
    activateEmail: function(email){
        const hash = {
            "qq.com": "http://mail.qq.com",
            "gmail.com": "http://mail.google.com",
            "sina.com": "http://mail.sina.com.cn",
            "163.com": "http://mail.163.com",
            "126.com": "http://mail.126.com",
            "yeah.net": "http://www.yeah.net/",
            "sohu.com": "http://mail.sohu.com/",
            "tom.com": "http://mail.tom.com/",
            "sogou.com": "http://mail.sogou.com/",
            "139.com": "http://mail.10086.cn/",
            "hotmail.com": "http://www.hotmail.com",
            "live.com": "http://login.live.com/",
            "live.cn": "http://login.live.cn/",
            "live.com.cn": "http://login.live.com.cn",
            "189.com": "http://webmail16.189.cn/webmail/",
            "yahoo.com.cn": "http://mail.cn.yahoo.com/",
            "yahoo.cn": "http://mail.cn.yahoo.com/",
            "eyou.com": "http://www.eyou.com/",
            "21cn.com": "http://mail.21cn.com/",
            "188.com": "http://www.188.com/",
            "foxmail.coom": "http://www.foxmail.com"
        }
        let mail = /@(.*)$/.exec(email)
        if(mail && mail[1]){
            window.open(hash[mail[1]])
        }
    },
    getAccurate:function(type, coinType){
        if(/cny|usd|aud|gbp|idr|jpy|kwr|cad|chf|hkd|sek/i.test(type)){
            return Number.cashDecimal
        }
        else{
            return Number[coinType+"CoinDecimal"]
        }
    },
    removeToken:function(){
        let domain = document.domain.split(".").slice(-2).join(".")
        if(document.domain.split(".").length <= 2){
            domain = document.domain
        }
        cookies.removeItem(document, "session", "/", domain)
    },
    
    getShortTimeText: function(timestamp, precision="second"){
        const time = new Date(timestamp*1000)
        var timeText = ""
        switch(precision){
            case "second":
                timeText = (time.getSeconds()>9?time.getSeconds():"0"+time.getSeconds())
            case "minute":
                if(precision !== "minute"){
                    timeText = ":" + timeText
                }
                timeText = (time.getMinutes()>9?time.getMinutes():"0"+time.getMinutes()) + timeText
            case "hour":
                if(precision !== "hour"){
                    timeText = ":" + timeText
                }
                timeText = (time.getHours()>9?time.getHours():"0"+time.getHours()) + timeText
                break
            default:
                break
        }
        return timeText
    },
    getTimeText: function(timestamp, precision="second"){
        const time = new Date(timestamp*1000)
        var timeText = ""
        switch(precision){
            case "second":
                timeText = (time.getSeconds()>9?time.getSeconds():"0"+time.getSeconds())
            case "minute":
                if(precision !== "minute"){
                    timeText = ":" + timeText
                }
                timeText = (time.getMinutes()>9?time.getMinutes():"0"+time.getMinutes()) + timeText
            case "hour":
                if(precision !== "hour"){
                    timeText = ":" + timeText
                }
                timeText = (time.getHours()>9?time.getHours():"0"+time.getHours()) + timeText
            case "day":
                if(precision !== "day"){
                    timeText = " " + timeText
                }
                timeText = (time.getDate()>9?time.getDate():"0"+time.getDate()) + timeText
            case "month":
                if(precision !== "month"){
                    timeText = "-" + timeText
                }
                timeText = ((time.getMonth()+1)>9?(time.getMonth()+1):"0"+(time.getMonth()+1)) + timeText
            case "year":
                if(precision !== "year"){
                    timeText = "-" + timeText
                }
                timeText = time.getFullYear() + timeText
                break
            default:
                break
        }
        return timeText
    },

    inputDecimalFormat:function(val, decimalLength){
        if(/\./.test(val)){
            let decimal = /\.(\d*)?/.exec(val)
            if(decimal && decimal.length){
                decimal = decimal[1]
            }

            if(decimal.length > decimalLength){
                return val.split(".")[0]+"."+decimal.substring(0,decimalLength);
            }
            else{
                return val
            }
        }
        else{
            return val
        }
    },

    numberFormat:function(value, event){
        let newVal = value.replace(/[^0-9]/ig,"")
        event.target.value = newVal
        return newVal
    },

    textFormat:function(value, event){
        let newVal = value.replace(/[^a-zA-Z]/ig,"")
        event.target.value = newVal
        return newVal
    },
    handleException:function(e, context){
        console.error(e)
        return context.$store.dispatch("setErrorText", context.$t("system_busy"))
    },

    isInvalid : function(exp){
        return exp ? "invalid":""
    },

    checkRequired : function(context){
        let hasEmptyValue = false
        for(var p in context.inputValue.required){
            if(!context.inputValue.required[p] || context.inputValue.required[p].length === 0){
                hasEmptyValue = true
                context.errorText[p] = context.$t("required_fields")
            }
        }
        for(var p in context.inputValue.conditional){
            let obj = context.inputValue.conditional[p]
            if(obj.condition(context) && !obj.model){
                hasEmptyValue = true
                context.errorText[p] = context.$t("required_fields")
            }
        }
        return !hasEmptyValue
    },

    clearContext: function(context){
        for(var item in context.inputValue.required){
          if(context.inputValue.required[item] && context.inputValue.required[item].reset){
            context.inputValue.required[item] = context.inputValue.required[item].reset()
          }
          else{
            context.inputValue.required[item] = ""
          }
        }
        for(var item in context.inputValue.conditional){
          if(context.inputValue.conditional[item] && context.inputValue.conditional[item].reset){
            context.inputValue.conditional[item].model = context.inputValue.conditional[item].reset()
          }
          else{
            context.inputValue.conditional[item].model = ""
          }
        }
        for(var item in context.inputValue.optional){
          if(context.inputValue.optional[item] && context.inputValue.optional[item].reset){
            context.inputValue.optional[item] = context.inputValue.optional[item].reset()
          }
          else{
            context.inputValue.optional[item] = ""
          }
        }
    
        for(var item in context.errorText){
          context.errorText[item] = ""
        }
      },

    canSubmit : function(errorTextObj){
        let hasError = false
        for(var p in errorTextObj){
            if(errorTextObj[p]){
                hasError = true
            }
        }
        return !hasError
    },
    
    openNewPage: function(url){
        window.open(url, "_blank")   
    },

    getImagePreview(file, cb) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb && cb(reader.result)
        };
        reader.onerror = function (error) {
            console.error("Error: ", error);
        };
    },
}

export default utils
Vue.prototype.utils = utils
