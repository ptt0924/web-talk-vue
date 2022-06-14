export default class WebsocketClass {

    constructor(url, call) {
        this.url = url;
        this.call = call;
        this.ws = null;
        this.heartTime = 10000;
        this.heartInterval = null
        this.reconnect = 5000
        this.status = 1;
    }

    connection() {
        this.url = this.url + "/123"
        this.ws = new WebSocket(this.url);
        this.ws.onopen = (e) => {
            this.status = 1
            this.heartHandler()
        }
        this.ws.onmessage = (e) => {
            this.call(JSON.parse(e.data))
        }
        this.ws.onerror = (e) => {
            console.log('发生错误')
            console.log(e)
        }

        this.ws.onclose = (e) => {
            this.onClose(e)
            console.log('关闭')
        }
    }

    send(data) {
        return this.ws.send(JSON.stringify(data))
    }

    //手动关闭连接
    close() {
        this.status = 2
        this.ws.close()
    }

    onClose(e) {
        console.log(e)
        this.status = this.status === 2 ? this.status : 0
        //如果不是手动关闭的话进行重连
        setTimeout(() => {
            if (this.status === 0) {
                this.connection()
            }
        }, this.reconnect)
    }

    //心跳设置保证一段时间内未发送数据不会断开
    heartHandler() {

        let heartData = {
            type: 0
        }
        this.heartInterval = setInterval(() => {
            if (this.status === 1) {
                this.ws.send(JSON.stringify(heartData))
            } else {
                clearInterval(this.heartInterval)
            }
        }, this.heartTime)
    }
}
