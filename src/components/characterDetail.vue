<template>
  <div class="total">
    <div  class="card">
      <a-card type="inner" :bodyStyle="bodyStyle" hoverable>
        <template #cover>
          <img
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        </template>
        <template #actions>
          <div  @click="changeCharacter">
            修改
            <edit-outlined key="edit" />
          </div>
          <div @click="openLooking">
            详情
            <ellipsis-outlined key="ellipsis" />
          </div>
          <div @click="returnBack">
            返回
            <arrow-left-outlined />
          </div>
        </template>
        <a-card-meta :title=userName>
          <template #avatar>
            <a-avatar src="https://joeschmoe.io/api/v1/random" />
          </template>
        </a-card-meta>
      </a-card>
    </div>
    <div class="showPage"><router-view class="animate__animated animate__fadeInDownBig"></router-view></div>
  </div>

</template>
<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import {  EditOutlined, EllipsisOutlined,ArrowLeftOutlined } from '@ant-design/icons-vue';
import { useRouter,useRoute } from "vue-router";
import SocketService from "./global.js"
import pubsub from "pubsub-js";
const router = useRouter();
const route=useRoute();
const openLooking=()=>{
  router.push({name:'lookingDetail' ,params: { userName:userName.value, account: account }})
}
onMounted(()=>{
  const pId=pubsub.subscribe(('userName'),(_,data)=>{
    userName.value=data
  })
  const remarkId=pubsub.subscribe(('remark'),(_,data)=>{
    userName.value=data
  })
})

const bodyStyle={
  width: '300px',
  height:'300px',
  backgroundImage: 'linear-gradient(to bottom, rgba(119, 246, 210, 0.5), rgba(199, 237, 204, 0.5))'
}

console.log(route.params.userName)
console.log(SocketService.account)
let userName:any=ref('')
userName.value=route.params.userName
const account=route.params.account
console.log(account)
const isMine=()=>{
  if(route.params.account==SocketService.account){
    console.log('实自己')
    return 'true';
  }
  console.log('不是自己')
  return 'false';
}
const changeCharacter=()=>{
  const tempIsMine=isMine()
  router.push({name:'changeCharacter',params:{isMine:isMine(),account:account,userName:userName.value}})
}
const returnBack=()=>{
  router.push({name:'friendsDictory', query: { account: SocketService.account }})
}
</script>
<style>
.total{
  display: flex;
}
.card{
  margin-left: 300px;
}
.showPage{
  background-color: white;
}
.ant-card-cover{
  /*!important;*/
  /*height: 200px;*/
}
</style>

