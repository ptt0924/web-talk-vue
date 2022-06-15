<template>
  <div class="total">
    <div class="card">
      <a-card hoverable style="width: 300px">
        <template #cover>
          <img
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        </template>
        <template #actions>
          <div v-if="isMine()" @click="changeCharacter">
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
        <a-card-meta title="Card title" description="This is the description">
          <template #avatar>
            <a-avatar src="https://joeschmoe.io/api/v1/random" />
          </template>
        </a-card-meta>
      </a-card>
    </div>
    <div><router-view class="animate__animated animate__fadeInDownBig"></router-view></div>
  </div>

</template>
<script lang="ts" setup>
import {  EditOutlined, EllipsisOutlined,ArrowLeftOutlined,PlusOutlined } from '@ant-design/icons-vue';
import { useRouter,useRoute } from "vue-router";
import {ref} from 'vue'
import SocketService from "./global.js"
const router = useRouter();
const route=useRoute();
const openLooking=()=>{
  router.push({name:'lookingDetail'})
}
console.log(route.params.account)
console.log(SocketService.account)
const isMine=()=>{
  console.log(route.params.account)
  console.log(SocketService.account)
  if(route.params.account==SocketService.account){
    return true;
  }
  return false;
}
const changeCharacter=()=>{
  router.push({name:'changeCharacter'})
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
}
</style>

