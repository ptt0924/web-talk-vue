<template>
    <!-- <div><div>
      <a-input-search
          v-model:value="value"
          placeholder="input search text"
          style="width: 200px"
          @search="onSearch"
      />
    </div></div> -->
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
//输入框所要输入的账户
let toAccount
//设置备注
let remark
console.log(account);
const findAccount = () => {
    axios({
        url: 'api/searchFriend',
        method: 'get',
        params: {
            'fromAccount': account,
            'toAccount': toAccount
        }
    }).then((res) => {
        let data = res.data
        console.log("搜索到的用户", data)
        if (data.code === '0') {
            alert('没有该用户')
        } else {
            //得到该用户的信息
            let user = data.message
        }
    })
}
//请求添加好友点击确认  发送添加信息  可以填写备注
const add = () => {
    let addRequest: any = new Mes('3', remark, account, toAccount)
    SocketService.ws.appointSend(addRequest)
}
//同意添加好友   要写备注
const aggree = () => {
    let aggreeAdd: any = new Mes('2', remark, account, toAccount)
    SocketService.ws.appointSend(aggreeAdd)
    //重新更新好友的列表

}
//挂载的时候就获得别人的请求添加好友信息
onMounted(() => {
    axios({
        url: 'api/getAddFriendMessage',
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