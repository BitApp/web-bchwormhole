/* viabtc_exchange_cn_frontend
/* file : /Users/alan/Documents/work/github/viabtc_exchange_cn_frontend/plugins/variables
/* author : alan
/* email : guodelong@viabtc.com
/* date : 2017-3-2 18:45:33
/* last : 2017-3-2 18:45:33
*/

let serverApiDomain = "",
    clientApiDomain = "",
    webSocketDomain = "",
    cdnDomain = "",
    protocol = "",
    fileDomain = ""

if(process.env.NODE_ENV === "dev" || process.env.NODE_ENV === "development"){
    //开发环境
    protocol = "https:"
    clientApiDomain = ""
    serverApiDomain = ""
    //webSocketDomain = "ws://dev.viabtc.com:8008"
    cdnDomain = ""
    fileDomain = "/upload"
}
else if(process.env.NODE_ENV === "production"){
    if(process.SERVER_BUILD){
        if(process.env.SERVER_ENV === "pre"){
            //预发布环境
            serverApiDomain = ""
            protocol = "https:"
            //webSocketDomain = "wss://test.viabtc.com:8443"
            cdnDomain = ""
        }
        else{
            //线上环境
            protocol = "https:"
            serverApiDomain = "http://localhost:4000"
            //webSocketDomain = "wss://socket.viabtc.com"
            cdnDomain = ""
        }
    }else{
        clientApiDomain = location.protocol + "//"+ location.host
        if(/test/.test(location.host)){
            cdnDomain = ""
        }
        else{
            cdnDomain = ""
        }
    }
}

export {clientApiDomain,serverApiDomain,webSocketDomain,cdnDomain, fileDomain, protocol}
