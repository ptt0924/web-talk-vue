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
                <a-avatar src="https://joeschmoe.io/api/v1/random" />
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
import { onMounted, reactive } from "vue";
import router from "../router";
import SocketService from './global.js'
import DataItem from './classOrInterface/interface.js'
let account: any = useRoute().query.account

// //得到好友的接口
// interface DataItem {
//   title: string
//   icon?: string
//   description?: string
//   toAccount: string
// }
const data: DataItem[] = reactive([])

//点击进入好友的信息页面
const handle = (t: any) => {
  console.log(t)
  router.push({ name: "detailsView", params: { userName: data[t].title, account: data[t].friendAccount } });
};
//挂载的时候提前获取到好友列表和群聊列表  以及一些历史信息
onMounted(() => {
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
    //放回全局实例中
    SocketService.friendList = data
  })

  axios({
    url: 'api/userMessage',
    method: 'get',
    params: {
      'account': account
    }
  }).then((res) => {
    console.log("消息列表", res)
    SocketService.friendMessageMap = res.data
  })
})

//跳转页面
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