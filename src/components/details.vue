<template>
  <div>
    <div class="MainItem">
      <div class="head">
        <a-avatar src="https://joeschmoe.io/api/v1/random" />
        {{ userName }}
      </div>
      <div class="show-left">
        <div class="otherAvatar">
          <a-avatar src="https://joeschmoe.io/api/v1/random" />
        </div>
        <div class="mainArea">111111</div>
      </div>
      <div class="show-right">
        <div class="mainArea">111111</div>
        <div class="otherAvatar">
          <a-avatar src="https://joeschmoe.io/api/v1/random" />
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
import { message } from 'ant-design-vue';
import { ref } from 'vue'
import { useRoute } from 'vue-router';
import SocketService from './global.js'
import Mes from './classOrInterface/message.js'
const route = useRoute();
const value = ref('')
const account: any = ref('')
account.value = route.params.account

const ws = SocketService.ws
const myAccount = SocketService.account
//单发消息
const sendMessage = () => {
  let mes = new Mes('0', value.value, myAccount, account.value)
  console.log("发送信息" + mes)
  ws.appointSend(mes)
  value.value = ''
}
const userName: any = ref('')
userName.value = route.params.userName

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
}

.show-left {
  display: flex;
}

.flex {
  display: flex;
}

.head {
  width: 100%;
}
</style>
