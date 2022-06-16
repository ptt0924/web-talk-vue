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
let account = route.params.userAccount
//输入框所要输入的账户
let toAccount
//设置请求备注
let requestRemark
//设置同意备注
let comfirmRemark
console.log(account);
// 找到账户---> 点击请求添加好友 ---> 查看好友信息，填入备注  --> 请求添加
// 看到请求信息 --》 点击同意添加好友 --》 查看好友信息，填入备注 --> 同意添加
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
//这个放到搜索到了好友，点击添加好友之后进入查看好友的信息页面
const viewAccount = () => {
    axios({
        url: 'api/user',
        method: 'get',
        params: {
            'account': toAccount  //搜索到的好友信息
        }
    }).then((res) => {
        let user = res.data  //这里面有user的名字
        console.log("查看用户")
        //用户信息展示在页面上
    })
}
//请求添加好友点击确认  发送添加信息  可以填写备注
const requestAdd = () => {
    let addRequest: any = new Mes('3', requestRemark, account, toAccount)
    addRequest.name = //上面那个user的名字
        SocketService.ws.appointSend(addRequest)
}

//确认添加好友   要写备注
const aggreeAdd = () => {
    let aggreeAdd: any = new Mes('2', comfirmRemark, account, toAccount)
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
        SocketService.requestAdd = res.data
        //这里得到好友请求的消息
    })
})
</script>