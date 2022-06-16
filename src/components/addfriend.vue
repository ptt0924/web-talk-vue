<template>
  <div>
    <div >  <a-input-search
        v-model:value="enterAccount"
        placeholder="输入账号"
        style="width: 666px"
        @search="onSearch"
    /></div>
    <div class="searchList">
      <a-list   item-layout="horizontal" :data-source="searchPerson">
        <template #renderItem="{ item }">
          <a-list-item>
            <a-list-item-meta
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            >
              <template #title>
                <a href="https://www.antdv.com/">{{ item.name }}</a>
              </template>
              <template #avatar>
                <a-avatar src="https://joeschmoe.io/api/v1/random" />
              </template>

            </a-list-item-meta>
          </a-list-item>
        </template>
      </a-list>
    </div>
    <a-button @click="openSendAddFriend" v-if="!(searchPerson.length===0)" type="primary" block style="width: 666px">
      添加
    </a-button>
    <a-button block style="width: 666px"  v-else @click="returnBack">返回</a-button>
  </div>
</template>
<script lang="ts" setup>
import axios from 'axios';
import {onMounted, reactive, ref} from 'vue';
import { useRoute,useRouter } from 'vue-router';
import Mes from './classOrInterface/message.js'
import SocketService from './global.js'
const route = useRoute();
const router=useRouter()
//搜素列表的值
// type searchPerson ={
//   title: string
// }
const searchPerson:any[]=reactive([])
//该用户的账户
let account = route.params.userAccount
//输入框所要输入的账户
let toAccount
//设置备注
let remark
const returnBack=()=>{
  router.push({name:'friendsDictory',query:{account:SocketService.account}})
}
const enterAccount=ref('')

const openSendAddFriend=()=>{
  router.push({name:'sendAddFriend',params: {toAccount:searchPerson[0].account,name:searchPerson[0].name,fromAccount:account}})
}
const isMyFriend=(t:any)=>{
  console.log('t',t)
  console.log(SocketService?.friendList[0]?.friendAccount)
  for(let j=0;j<SocketService?.friendList.length;j++){
    console.log(SocketService?.friendList[j]?.friendAccount === t)
    return SocketService?.friendList[j]?.friendAccount == t;
  }
}
const onSearch = (value:any) => {
  console.log('111',SocketService.friendList)
  searchPerson.pop()
  if(route.params.userAccount===enterAccount.value){
    alert('用户为自己无法添加')
    enterAccount.value=''
  }
  else if(isMyFriend(enterAccount.value)){
   alert('是自己好友无法添加');
  }
  else {
    axios({
      url: 'api/searchFriend',
      method: 'get',
      params: {
        'fromAccount': account,
        'toAccount': value
      }
    }).then((res) => {
      let data = res.data
      console.log(data)
      if (data.code === '1') {
        searchPerson.push(JSON.parse(data.message))
        console.log('1111111',searchPerson)
      } else if (data.code === '0') {
        alert('没有该用户')
      } else {
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
            'account': SocketService.account
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
  margin: 0 300px;
}
</style>
<style scoped>
.searchList{
  background-color: white;
  margin: 0 300px;
}
</style>