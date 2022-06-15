<template>
    <div><div>
      <a-input-search
          v-model:value="value"
          placeholder="input search text"
          style="width: 200px"
          @search="onSearch"
      />
    </div></div>
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
    let addRequest: any = new Mes(3, "请求添加", account, toAccount)
    SocketService.ws.appointSend(addRequest)
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

    })
})
</script>