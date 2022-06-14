

var websocket = new websocket("ws://localhost:8088/chat");



// //判断当前浏览器是否支持websocket,是则创建websocket
// if ('WebSocket' in window) {
//     websocket = new WebSocket("ws://localhost:8088/chat");
// } else {
//     alert('当前浏览器 Not Support Websocket')
// }


//连接发生错误的回调方法
websocket.onerror = function () {
    console.log("websocket连接发生错误");
};


//连接成功建立的回调方法
websocket.onopen = function () {
    console.log("websocket连接成功")
}

//接收到消息的回调方法
websocket.onmessage = function (event) {
    console.log(event.data)
}

//连接关闭的回调方法
websocket.onclose = function () {
    console.log("websocket连接关闭")
}

//关闭websocket连接
function closeWebSocket() {
    websocket.close();
}

//发送消息
function send() {
    var message = document.getElementById
}

//如果websocket连接还没有断开就关闭了窗口，后台server端会抛异常
//所以增加监听关闭时间，当窗口关闭时，主动关闭websocket连接
window.onbeforeunload = function () {
    closeWebSocket();
}
export { websocket }
