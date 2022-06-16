<template>
  <div class="body">
    <div class="loginBody">
      <div class="loginBodyTotal">
        <h1 v-if="!isRegisterView">登录</h1>
        <h1 v-else>注册</h1>
        <div v-if="!isRegisterView">
        <a-form
            :model="loginState"
            name="basic"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 9 }"
            autocomplete="off"
            @finish="openDictory"
            @finishFailed="onFinishFailed"
        >
          <div class="inputItem">
          <a-form-item
              label="账户"
              name="account"
              :rules="[{ required: true, message: '请输入账户!' }]"
          >
            <a-input placeholder="请输入账户"  v-model:value="loginState.account" />
          </a-form-item>
          </div>

          <div class="inputItem">
          <a-form-item
              label="密码"
              name="password"
              :rules="[{ required: true, message: '请输入密码' }]"
          >
            <a-input-password placeholder="请输入密码" v-model:value="loginState.password" />
          </a-form-item>
          </div>
          <div >
          <a-form-item :wrapper-col="{ offset: 8, span: 9 }">
            <a-button block type="primary" html-type="submit">确定</a-button>
          </a-form-item>
          </div>
          <div>
            <a-form-item :wrapper-col="{ offset: 8, span: 9 }">
              <a-button block @click="openRegisterForm">注册</a-button>
            </a-form-item>
          </div>
        </a-form>
        </div>
        <div v-else> <a-form
            :model="registerState"
            name="basic"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 9 }"
            autocomplete="off"
            @finish="sureRegister"
            @finishFailed="onFinishFailed"
        >
          <div class="inputItem">
            <a-form-item
                label="用户名"
                name="name"
                :rules="[{ required: true, message: '请输入用户名!' }]"
            >
              <a-input  placeholder="请输入用户名" v-model:value="registerState.name" />
            </a-form-item>
          </div>

          <div class="inputItem">
            <a-form-item   label="账户"
                           name="account"
                           :rules="[{ required: true, message: '请输入账户!' }]" >
            <a-input v-model:value="registerState.account" placeholder="账户"></a-input>
            </a-form-item>
          </div>
          <div class="inputItem">
            <a-form-item
                label="密码"
                name="password"
                :rules="[{ required: true, message: '请输入密码' }]"
            >
              <a-input-password placeholder="请输入密码" v-model:value="registerState.password" />
            </a-form-item>
          </div>
          <div >
            <a-form-item :wrapper-col="{ offset: 8, span: 9 }">
              <a-button block type="primary" html-type="submit">确定</a-button>
            </a-form-item>
          </div>
          <div>
            <a-form-item :wrapper-col="{ offset: 8, span: 9 }">
              <a-button block @click="changeState">返回</a-button>
            </a-form-item>
          </div>
        </a-form></div>
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
type loginState={
  'account': string,
  'password': string
}
type registerState={
  'name':string,
  'account': string,
  'password': string
}
const onFinishFailed=(err)=>{
  console.log(err)
}

const openRegisterForm=()=>{
  isRegisterView.value=true
  console.log()
}
const sureRegister=(value:any)=>{
  console.log(value)
    axios({
    url: 'api/user',
    method: 'post',
    params: value
  }).then((res) => {
    alert(res.data)
      changeState()
  })
}
const loginState = reactive<loginState>({
  account:'',
  password: '',
});

const registerState=reactive<registerState>({
  name:'',
  account:'',
  password:''
})
// const register = () => {
//   axios({
//     url: 'api/user',
//     method: 'post',
//     params: {
//       'account': account.value,
//       'password': password.value
//     }
//   }).then((res) => {
//     console.log(res)
//     alert(res.data)
//   })
// }
const isRegisterView=ref(false)
const register=()=>{
  isRegisterView.value=true
}
const changeState=()=>{
  isRegisterView.value=false
}
const openDictory = (values:any) => {
  axios({
    url: 'api/login',
    method: 'get',
    params: values
  }).then((res) => {
    console.log(res)
    var data = res.data
    console.log("data", data)
    if (data.code === '0')
      alert("该账号没有注册")
    else if (data.code === '1') {
      alert("密码错误")
    } else {
      var url = "ws://192.168.1.166:8088/chat/" + loginState.account+ "," + loginState.account;
      var socket = new Socket(url)
      console.log(socket)
      SocketService.ws = socket
      SocketService.account = loginState.account
      SocketService.password = password.value
      router.push({ name: "friendsDictory", query: { account: loginState.account, password:loginState.account} });
    }
  })
};
</script>

<style scoped>
.inputBox {
  margin-left: 30%;
  width: 200px;
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
  background-image: linear-gradient(to bottom, rgba(220, 246, 241, 0.5), rgba(199, 237, 204, 0.5))
}

.inputItem {
  margin-bottom: 40px;
}
</style>
