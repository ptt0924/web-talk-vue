<template>
  <div class="friendsDictory">
    <div class="head">
      <a-list item-layout="horizontal" :data-source="data">
        <template #renderItem="{ item, index }">
          <a-list-item @click="handle(index)">
            <a-list-item-meta>
              <template #title>
                <a href="https://www.antdv.com/">{{ item.title }}</a>
              </template>
              <template #avatar>
                <a-avatar @click.stop="clickCharacter(index)" src="https://joeschmoe.io/api/v1/random" />
              </template>
            </a-list-item-meta>
          </a-list-item>
        </template>
      </a-list>
    </div>
    <div class="operation">
      <div>
        <a-button type="primary">单聊</a-button>
        <a-button type="primary">群聊</a-button>
        <a-button type="primary" @click="addFriend">添加好友</a-button>
      </div>
      <div></div>
    </div>
    <div class="list">
      <a-list item-layout="horizontal" :data-source="data">
        <template #renderItem="{ item, index }">
          <div class="flex">
            <div class="list-item" @click="handle">
              <a-list-item @click="handle(index)">
                <a-list-item-meta :description=item.description>
                  <template #title>
                    <a>{{ item.title }}</a>
                  </template>
                  <template #avatar>
                    <a-avatar src="https://joeschmoe.io/api/v1/random" />
                  </template>
                </a-list-item-meta>
              </a-list-item>
            </div>
            <div>
              <a-badge count="5">
                <a href="#" class="head-example" />
              </a-badge>
            </div>
          </div>
        </template>
      </a-list>
    </div>
  </div>
</template>
<script setup lang="ts" >
import axios from 'axios';
import { useRoute } from 'vue-router';
import { onMounted, reactive, ref } from "vue";
import router from "../router";
import SocketService from './global.js'
import Mes from './classOrInterface/message.js'
import Socket from "./index.js"
import DataItem from './classOrInterface/interface.js'
// let account: any = sessionStorage.getItem['account']
// let password: any = sessionStorage.getItem['password']
let account: any = useRoute().query.account
let password: any = useRoute().query.password
// //得到好友的接口
// interface DataItem {
//   title: string
//   icon?: string
//   description?: string
//   toAccount: string
// }
console.log("zhanghao", account)
const data: DataItem[] = reactive([])
let messageList = reactive([]);
let frinedsAcount: any = reactive([])
//点击进入好友的信息页面
const handle = (t: any) => {
  // console.log(data[t].title)
  router.push({ name: "detailsView", params: { userName: data[t].title, account: data[t].friendAccount } });
};


const clickCharacter = (t: any) => {
  // console.log(count);
  router.push({ name: "charcterDetail", params: { userName: data[t].title, account: data[t].friendAccount } })
}

//挂载的时候提前获取到好友列表和群聊列表  以及一些历史信息
onMounted(() => {
  // var url = "ws://192.168.1.166:8088/chat/" + account + "," + password;
  // var socket = new Socket(url)
  // console.log(socket)
  // SocketService.ws = socket
  //得到好友列表  参数:自己的account
  axios({
    url: 'api/friends',
    method: 'get',
    params: {
      'account': account
    }
  }).then((res) => {
    console.log("得到好友列表", res)
    for (let i = 0; i < res.data.length; i++) {
      const obj: DataItem = {
        title: '',
        friendAccount: '',
        userAccount: '',
        readTime: '',
        time: ''
      }
      obj.title = res.data[i].remark
      obj.friendAccount = res.data[i].friendAccount
      obj.userAccount = res.data[i].userAccount
      obj.readTime = res.data[i].readTime
      obj.time = res.data[i].time
      console.log('obj', obj)
      data.push(obj)
    }
    frinedsAcount = data;
    //放回全局实例中
    SocketService.friendList = data
  })
  //得到好友消息列表  传递自己的account
  axios({
    url: 'api/userMessage',
    method: 'get',
    params: {
      'account': account
    }
  }).then((res) => {
    messageList = res.data;
    console.log('res', messageList, '111', account)
    console.log("消息列表", res)

    SocketService.friendMessageMap = res.data
  })
  //获取自己信息  参数:自己的account
  axios({
    url: 'api/user',
    method: 'get',
    params: {
      'account': account
    }
  }).then((res) => {
    console.log("自己的用户信息", res.data)
    SocketService.myMessage = res.data
  })

})
//点击好友头像，查看好友消息,同时获得好友备注  要传递好友的account
const viewFriendMessage = () => {
  axios({
    url: 'api/user',
    method: 'get',
    params: {
      'account': '好友的account'
    }
  }).then((res) => {
    //res.data里面返回好友的信息
  })
}
//修改好友的备注
const updateFriendRemark = () => {
  axios({
    url: 'api/friends',
    method: 'put',
    params: {
      'fromAccount': '自己的账号',
      'toAccount': '好友的账号',
      'remark': '修改的备注'
    }
  }).then((res) => {
    //修改成功，把备注修改为修改的
    let data = res.data
    if (data.code === '0') {
      alert("修改成功")
    } else {
      alert("修改失败")
    }
  })
}
//跳转添加页面
const addFriend = () => {
  router.push({ name: "addFriend", params: { userAccount: account } })
}
</script>

<style>
.friendsDictory {
  margin-left: 30%;
}

.list {
  width: 500px;
  height: 500px;
  background-color: aliceblue;
}

.head {
  width: 500px;
  background-color: aliceblue;
}

.operation {
  display: flex;
}

.flex {
  display: flex;
}

.list-item {
  width: 70%
}
</style>