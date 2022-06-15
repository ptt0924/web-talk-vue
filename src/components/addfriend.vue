<template>
  <div>
    <div>  <a-input-search
        v-model:value="value"
        placeholder="input search text"
        style="width: 200px"
        @search="onSearch"
    /></div>
    <div class="searchList">
      <a-list   item-layout="horizontal" :data-source="data">
        <template #renderItem="{ item }">
          <a-list-item>
            <a-list-item-meta
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            >
              <template #title>
                <a href="https://www.antdv.com/">{{ item.title }}</a>
              </template>
              <template #avatar>
                <a-avatar src="https://joeschmoe.io/api/v1/random" />
              </template>
              <template #actions>
                <a key="list-loadmore-edit">add</a>
                <a key="list-loadmore-more">more</a>
              </template>
            </a-list-item-meta>
          </a-list-item>
        </template>
      </a-list>
    </div>
    <a-button @click="showHistory" class="searchList" style="width: 680px">
      <div v-if="isShowHistory">收起</div>
      <div v-if="!isShowHistory">历史记录</div>
    </a-button>
    <div class="searchList" v-if="isShowHistory">
      <a-list item-layout="horizontal" :data-source="data">
        <template #renderItem="{ item }">
          <a-list-item>
            <a-list-item-meta
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            >
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
  </div>
</template>
<script lang="ts" setup>
import axios from 'axios';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Mes from './classOrInterface/message.js'
import SocketService from './index.js'
const route = useRoute();
//该用户的账户
let account = route.params.account
let toAccount
console.log(account);
import { ref } from 'vue'
const value=ref('')
const onSearch=()=>{
  console.log('hhh');

}
const isShowHistory=ref(false)
const showHistory=()=>{
  isShowHistory.value=!isShowHistory.value
  console.log(isShowHistory.value);

}
interface DataItem {
  title: string;
}
const data: DataItem[] = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];
const findAccount = () => {
    axios({
        url: 'api/searchFriend',
        method: 'get',
        params: {
            'account': toAccount
        }
    }).then((res) => {
        let data = res.data
        console.log("搜索到的用户", data)
        if (data.code === '0') {
            alert('没有该用户')
        } else {
            let user = data.message
        }
    })
}
//发送添加信息
const add = () => {
    let addRequest: any = new Mes('3', "请求添加", account, toAccount)
    // addRequest.name =
    SocketService.ws.appointSend(addRequest)
}
//同意添加好友
const aggree = () => {

}
//挂载的时候就获取得到以前的添加好友的消息
onMounted(() => {
    axios({
        url: 'api/getFriendMessage',
        method: 'get',
        params: {
            'account': account
        }
    }).then((res) => {
        console.log("得到添加好友信息的列表", res.data)
        //这里得到好友请求的消息
    })
})
</script>
<style scoped>
.searchList{
  background-color: white;
  margin:300px;
  margin-top:0;
  margin-bottom:0;
}
</style>