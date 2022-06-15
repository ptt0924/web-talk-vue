import Heartbeat from './heartbeat'
import PollingRollback from './pollingRollback'
import WebsocketService from './global.js'
import SocketService from './global.js'
import { message } from 'ant-design-vue'


export default class Socket {
    constructor(url) {
        this.ws = null
        this.url = url
        this.subscriptionMap = {}
        this.pollingRollback = null
        this.createPollingCallback() // 创建轮询
        this.start()
    }


    //连接之后就给ws添加监听事件,
    start() {
        if (!this.url) return console.error('url is required')
        this.ws = new WebSocket(this.url)
        this.ws.addEventListener("open", this.onOpen)
        this.ws.addEventListener("message", this.onMessage)
        this.ws.addEventListener("close", this.onClose)
        this.ws.addEventListener("error", this.onError)
    }

    request(payload) {  //给服务器发送数据
        if (this.isConnected()) {
            this.ws.send(JSON.stringify({ ...payload, event: 'req' }))
        }
    }

    //订阅
    subscribe({ payload, rolllback, callback }, isReSubscribe) {
        if (!isReSubscribe && this.subscriptionMap[payload.id]) return
        this.subscriptionMap[payload.id] = { payload, rolllback, callback }
        this.pollingRollback.set(payload.id, rollback)

        if (this.isConnected()) {
            this.ws.send(JSON.stringify({ ...payload, event: 'sub' }));
        }
    }

    unSubscribe(id) {
        if (!id) return

        if (this.isConnected()) {
            if (this.subscriptionMap[id]) {
                const payload = this.subscriptionMap[id].payload
                this.ws.send(JSON.stringify({ ...payload, event: 'cancel' }));

                this.pollingRollback.remove(id)
                delete this.subscriptionMap[id];
            }
        }
    }




    isConnected() {
        return this.ws && this.ws.readyState === WebSocket.OPEN
    }

    onOpen = () => {
        clearInterval(this.reConnectTimer)
        this.createHeartbeat() // 创建 socket 心脏
        this.reSubscribe() // 重新订阅已有的sub
        this.pollingRollback.close() // ws 连接之后，关闭轮询
    }

    onMessage = (result) => {
        const data = result.data
        console.log("result", result.data)
        var json = JSON.parse(result.data)
        //0单聊 1群聊 2服务器发送的 3加好友 4发图片 5发文件
        if (json.code === '0') {
            console.log("1")
            var map = SocketService.friendMessageMap[json.fromAccount + '']
            //未读消息加1
            map.count = map.count + 1
            //消息列表加1
            let list = map.messageList
            let m = new Object
            m.fromAccount = json.fromAccount
            m.toAccount = json.toAccount
            m.sendTime = json.date
            m.text = json.mes
            list.push(m)
            console.log(WebsocketService.friendMessageMap[json.fromAccount + ''])
        } else if (json.code === '1') {

        } else if (json.code === '2') {

        } else if (json.code === '3') { //添加好友

        } else if (json.code === '4') {  //得到别人上线的消息
            //先获取以前的在线好友
            let onlineAccount = WebsocketService.onlineFriend
            onlineAccount.push(json.account)
            console.log("onmessage中的新增在线好友", WebsocketService.onlineFriend)
        } else if (json.code === '9') {

        }
        else {
            console.log("获取在线好友列表")
            // var j = JSON.parse(json)
            WebsocketService.onlineFriend = json.onlineAccount
            console.log("onlineAccount", WebsocketService.onlineFriend)
        }
        const normalizedData = data;
        // this.handleCallback(normalizedData)
    }

    handleCallback = (data) => {
        const id = data.id;
        if (!id) return;

        if (this.subscriptionMap[id]) {
            this.subscriptionMap[id]["callback"] && this.subscriptionMap[id]["callback"](data);
        }
    }

    onClose = (result) => {
        console.warn(`【Websocket is closed】`)
        this.ws.removeEventListener("open", this.onOpen);
        this.ws.removeEventListener("message", this.onMessage);
        this.ws.removeEventListener("close", this.onClose);
        this.ws.removeEventListener("error", this.onError);
        this.ws = null;
    }

    onError = (error) => {
        if (error && error.message) {
            console.error(`【Websocket error】 ${error.message}`)
        }
        this.ws.close()
        this.reConnect()
    }

    reConnect() { // 开启重连
        this.pollingRollback.open() // ws连接之前，开启轮询

        if (this.reConnectTimer) return
        this.reConnectTimer = setInterval(() => {
            this.start()
        }, 3000)
    }

    reSubscribe() {
        Object.values(this.subscriptionMap).forEach(subscription => this.subscribe(subscription, true))
    }

    createHeartbeat() {
        this.heartbeat = new Heartbeat(this.ws)
        this.heartbeat.addEventListener('die', () => {
            this.ws.close()
            this.ws.reConnect()
        })
    }

    createPollingCallback() {
        this.pollingRollback = new PollingRollback()
    }

    appointSend(mes) {
        let m = JSON.stringify(mes)
        console.log("发送的数据:", m)
        this.ws.send(m);
    }
}