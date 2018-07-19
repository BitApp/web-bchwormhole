import {webSocketDomain} from "./variables"

export default {
    subscribers:[],
    scope:null,
    retryTimesOnClose:100,
    subscriberBackup:null,

    onOpen:function(cb){
        if(!this.scope || !this.scope.socket.ready){
            this.subscribers = [cb]
        }
        else{
            //call directly
            cb()
        }
    },

    disconnect:function(){
        if(this.scope){
            this.scope.socket.close()
            this.scope.socket = null
            delete window[this.scope.namespace]
            console.log(this.scope.namespace+" websocket closing")
            this.scope = null
        }
    },
    
    connect:function(namespace, cb, closecb){
        const _this = this
        const socket = new WebSocket(webSocketDomain)
        socket.addEventListener("open", function (event) {
            socket.ready = true
            socket.id = 1
            socket.callbacks = {}
            //订阅者回调
            console.log("socket connected")

            _this.subscribers.forEach((cbItem)=>{
                cbItem()
            })

            cb && cb()
        })
        //message
        socket.addEventListener("message",function(event){
            var data = JSON.parse(event.data)
            if(data.id){
                if(socket.callbacks[data.id]){
                    for(var p in socket.callbacks[data.id]){
                        socket.callbacks[data.id][p].forEach(cb=>{cb(data)})
                    }
                    delete socket.callbacks[data.id]
                }
            }else if(data.method){
                if(socket.callbacks[data.method]){
                    for(var p in socket.callbacks[data.method]){
                        socket.callbacks[data.method][p].forEach(cb=>{cb(data)})
                    }
                }
            }
        })

        socket.addEventListener("close",function(e){
            console.log("socket closed")
            
            _this.disconnect()
            closecb && closecb()
            ga("send", "exception", {
                "exDescription": "["+new Date()+"]:"+JSON.stringify(e) + "|cookie:"+document.cookie+"|ua:"+navigator.userAgent,
                "exFatal":false
            })
        })
        
        window[namespace] = this.scope = {
            socket: socket, 
            namespace:namespace,
            subscribe:function(id, item){
                socket.callbacks[id] = socket.callbacks[id] || {}
                //console.log(socket.callbacks)
                socket.callbacks[id][item.namespace] = [item.callback]
                //console.log(id + " "+socket.callbacks[id].length)
            },
            unsubscribeAll:function(namespace){
                for(var p in socket.callbacks){
                    delete socket.callbacks[p][namespace]
                    delete _this.subscriberBackup[p]
                }
                _this.subscribers = []
            },
            generateId:function(){
                return socket.id++
            }
        }
    },

    restoreSubscribe:function(){
        if(this.subscriberBackup){
            for(var method in this.subscriberBackup){
                this.send(this.subscriberBackup[method].params, this.subscriberBackup[method].callback, method)
            }
        }
    },

    send:function(params, callback, method){
        params.id = this.scope.generateId()
        if(params.id){
            this.scope.subscribe(params.id,callback)
            if(method){
                 //已订阅的消息做好备份
                this.subscriberBackup = this.subscriberBackup || {}
                this.subscriberBackup[method] = {params:params, callback:callback}
                this.scope.subscribe(method,callback)
            }
            this.scope.socket.send(JSON.stringify(params))
        }
    },

    unsubscribeAll:function(namespace){
        this.scope.unsubscribeAll(namespace)
    }
}