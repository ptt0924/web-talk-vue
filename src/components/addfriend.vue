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
                <a >{{ item.name }}</a>
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
import { reactive, ref} from 'vue';
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
let account = SocketService.account
console.log('from',account)
//输入框所要输入的账户
let toAccount
//设置备注
let remark
const returnBack=()=>{
  router.push({name:'friendsDictory',query:{account:SocketService.account}})
}
const enterAccount=ref('')

const openSendAddFriend=()=>{
  console.log(account)
  // axios({
  //
  // }).then(()=>{
  //
  // })
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
}
//请求添加好友点击确认  发送添加信息  可以填写备注

//同意添加好友   要写备注
const aggree = () => {
    let aggreeAdd: any = new Mes('2', remark, account, toAccount)
    SocketService.ws.appointSend(aggreeAdd)
    //重新更新好友的列表
}
//挂载的时候就获得别人的请求添加好友信息

</script>
<style scoped>
.searchList{
  background-color: white;
  margin: 0 300px;
}
</style>