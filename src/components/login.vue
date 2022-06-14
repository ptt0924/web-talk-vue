<template>
  <div class="body">
    <div class="loginBody">
      <div class="loginBodyTotal">
        <h1>登录</h1>
        <div class="inputBox">
          <div class="inputItem">
            <a-input v-model:value="account" placeholder="用户名"></a-input>
          </div>
          <div class="inputItem">
            <a-input-password id="password" v-model:value="password" placeholder="密码" />
          </div>
        </div>
        <div class="inputBox">
          <a-button type="primary" block @click="openDictory">登录</a-button>
          <a-button block @click="register">注册</a-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { SHOW_ALL } from 'ant-design-vue/lib/vc-tree-select/utils/strategyUtil.js'
import axios from 'axios'
import { reactive, ref } from 'vue'
import { useRouter } from "vue-router"
// import { websocket } from "../../ws.js"
import SocketService from "./global.js"
// import WebsocketClass from "./websocket.js"
import Socket from "./index.js"
const router = useRouter();
const password = ref<string>('');
const account = ref<string>('')
const register = () => {
  axios({
    url: 'api/user',
    method: 'post',
    params: {
      'account': account.value,
      'password': password.value
    }
  }).then((res) => {
    console.log(res)
    alert(res.data)
  })
}
const openDictory = () => {

  axios({
    url: 'api/login',
    method: 'get',
    params: {
      'account': account.value,
      'password': password.value
    }
  }).then((res) => {
    console.log(res)
    var data = res.data
    console.log("data", data)
    if (data.code === '0')
      alert("该账号没有注册")
    else if (data.code === '1') {
      alert("密码错误")
    } else {
      var url = "ws://localhost:8088/chat/" + account.value + "," + password.value;
      var socket = new Socket(url)
      console.log(socket)
      SocketService.ws = socket
      SocketService.account = account.value
      router.push({ name: "friendsDictory", query: { account: account.value } });
    }
  })
};
</script>

<style scoped>
.inputBox {
  margin-left: 30%;
  width: 40%;
}

.loginBody {
  padding-top: 7%;
  image-rendering: -webkit-optimize-contrast;
  text-align: center;
  margin-top: 10%;
  margin-left: 20%;
  width: 60%;
  height: 500px;
  align-items: center;
}

.inputItem {
  margin-bottom: 20px;
}
</style>
