<template>
  <div>
    <div class="MainItem">
      <div class="head">
        <a-avatar src="https://joeschmoe.io/api/v1/random" />
        {{ userName }}
      </div>
      <div v-for="(item, i) in friendMessageMap" class="messageBod">
        <div v-if="isLeft(i)" class="show-left">
          <div class="otherAvatar">
            <a-avatar src="https://joeschmoe.io/api/v1/random" />
          </div>
          <div class="mainArea">{{ item.text }}</div>
        </div>
        <div v-if="!isLeft(i)" class="show-right">
          <div class="mainArea">{{ item.text }}</div>
          <div class="otherAvatar">
            <a-avatar src="https://joeschmoe.io/api/v1/random" />
          </div>
        </div>
      </div>
      <div class="sendArea">
        <a-textarea @keyup.enter="sendMessage" v-model:value="value" placeholder="Basic usage" :rows="4" />
        <div class="flex">
          <a-button @click="sendMessage" type="primary">发送</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import pubsub from "pubsub-js";
import { message } from 'ant-design-vue';
import { onMounted, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router';
import SocketService from './global.js'
import Mes from './classOrInterface/message.js'
import WebsocketService from "./global";
const route = useRoute();
const value = ref('')
//好友的账号
const account: any = ref('')
account.value = route.params.account

const ws = SocketService.ws
//自己的账号
const myAccount = SocketService.account
let friendMessageMap: any = reactive([]);
friendMessageMap = SocketService.friendMessageMap[account.value].messageList

console.log('1111', friendMessageMap)

// onMounted(()=>{
//   const timer = setInterval(() => {
//     setTimeout(friendMessageMap=SocketService.friendMessageMap[account.value].messageList, 0)
//   }, 1000)
// })

onMounted(() => {
  const pubId = pubsub.subscribe('mes', (msgName, data: any) => {
    //这里挂载的时候查看是否在线上  参数：自己的账号，好友的账号
    let mes = new Mes("1", "", myAccount, account.value)
    SocketService.ws.appointSend(mes)
    friendMessageMap.mes = SocketService.friendMessageMap[account.value].messageList
    // const temp:any=reactive([]);
    // const temp={
    //   fromAccount:data.fromAccount,
    //   text:data.mes,
    //   toAccount:data.toAccount,
    //   sendTime:new Date(),
    // }
    // friendMessageMap.push(temp)
    value.value = '1'
    value.value = ''
    // console.log(friendMessageMap)
  })
})
const isLeft = (i) => {
  // console.log('进入函数')
  if (friendMessageMap[i].fromAccount == account.value) {
    return true;
  }
  else return false;
}
//单发消息
const sendMessage = () => {
  let mes = new Mes('0', value.value, myAccount, account.value)
  console.log("发送信息" + mes)
  ws.appointSend(mes)
  value.value = ''
  const temp = {
    fromAccount: myAccount,
    text: mes.mes,
    toAccount: account.value,
    sendTime: new Date(),
  }
  friendMessageMap.push(temp);
  console.log("单发消息信息列表", SocketService.friendMessageMap)
}
const userName: any = ref('')
userName.value = route.params.userName
console.log(route.params)
</script>

<style scoped>
.mainArea {
  background-color: pink;
}

.MainItem {
  background-color: aliceblue;
  padding-left: 200px;
  padding-right: 200px;
}

.show-right {
  display: flex;
  justify-content: flex-end;
  margin-left: auto;
  margin-bottom: 30px;
}

.show-left {
  display: flex;
  margin-bottom: 30px;
}

.flex {
  display: flex;
}

.head {
  width: 100%;
}
</style>
