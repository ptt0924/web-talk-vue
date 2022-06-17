<template>
  <div class="listBox">
    <div class="flex" v-if="isShowRemark">
      <div style="width: 90%" class="remark">
        <a-input v-model:value="remark" placeholder="输入备注"></a-input>
      </div>
      <div style="width: 10%" >
          <a-button @click="sureToAdd" type="primary" block>确定添加</a-button>
      </div>
    </div>
  <a-list
      class="demo-loadmore-list"
      item-layout="horizontal"
      :data-source="addFriends"
  >

    <template #renderItem="{ item,index }">
      <div class="friendAccept">
      <a-list-item>
        <template #actions>
          <a @click="add(item)">同意</a>
          <a >取消</a>
        </template>
          <a-list-item-meta
          >
            <template #title>
              <a href="https://www.antdv.com/">{{ item.name }}</a>
            </template>
            <template #avatar>
              <a-avatar src="https://joeschmoe.io/api/v1/random" />
            </template>
          </a-list-item-meta>
      </a-list-item>
      </div>
    </template>
  </a-list>
    <a-button block @click="returnBack">返回</a-button>
  </div>
</template>
<script setup lang="ts">
import pubsub from 'pubsub-js'
import axios from "axios";
import {useRouter} from 'vue-router'
import SocketService from './global.js'
import {defineComponent, onMounted, ref, nextTick, reactive} from 'vue';
import Mes from "./classOrInterface/message";
const count = 3;
const router=useRouter()
let resValue:any=reactive({})
const isShowRemark=ref(false)
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;
const add=(res)=>{
  isShowRemark.value=true
  resValue=res
    //重新更新好友的列表

}
const returnBack=()=>{
  router.push({name:'friendsDictory',query: { account: SocketService.account }})
}
    const initLoading = ref(true);
    const remark=ref('')
    const data = ref([]);
    const list = ref([]);
    const sureToAdd=()=>{
  console.log(remark.value)
  let aggreeAdd: any = new Mes('2', remark.value, resValue.fromAccount, resValue.toAccount)
  SocketService.ws.appointSend(aggreeAdd)
  alert('添加成功')
      router.push({name:'friendsDictory',query:{account:SocketService.account,password:SocketService.password}})
}
    const addFriends=ref([])
onMounted(() => {
  console.log(SocketService.account)
  axios({
    url: 'api/getAddFriendMessage',
    method: 'get',
    params: {
      'account': SocketService.account
    }
  }).then((res) => {
    console.log("得到添加好友信息的列表", res.data)
    SocketService.requestAdd=res.data
      addFriends.value=res.data
  })
})
    onMounted(() => {
      fetch(fakeDataUrl)
          .then(res => res.json())
          .then(res => {
            console.log(res)
            initLoading.value = false;
            list.value = res.results;
          });
      const pubSubId=pubsub.subscribe('pushAccept',(_,data)=>{
        addFriends.value=data
      })
    });
</script>
<style scoped>
.demo-loadmore-list {
  min-height: 350px;
}
.listBox{
  background-color: white;
  margin: 200px;
}
.flex{
  display: flex;
}
.friendAccept{
  border-bottom: lightgray 1px solid;
}
.friendAccept:hover{
  background-color: lightgray;
}
</style>
