<template>
  <div class="total">
    <div  class="card">
      <a-card hoverable style="width: 300px">
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
    <div ><router-view class="animate__animated animate__fadeInDownBig"></router-view></div>
  </div>

</template>
<script lang="ts" setup>
import {ref} from 'vue'
import {  EditOutlined, EllipsisOutlined,ArrowLeftOutlined } from '@ant-design/icons-vue';
import { useRouter,useRoute } from "vue-router";
import SocketService from "./global.js"
const router = useRouter();
const route=useRoute();
const openLooking=()=>{
  router.push({name:'lookingDetail' ,params: { userName:userName, account: account }})
}
console.log(route.params.userName)
console.log(SocketService.account)
let userName:any=route.params.userName
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
  router.push({name:'changeCharacter',params:{isMine:isMine(),account:account,userName:userName}})
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
  margin-left: 200px;
  margin-right: 100px;
}
</style>

