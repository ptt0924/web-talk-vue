<template>
  <div>
    <div class="card-image">
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
      <div class="remark">
        <a-input v-model:value="remark" placeholder="输入备注"></a-input>
      </div>
      <div class="temp">

      </div>
      <div class="send">
        <a-button @click="add"  block type="primary">发送</a-button>
        <a-button block @click="returnBack">返回</a-button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import{ref}from 'vue'
import {useRouter,useRoute} from "vue-router";
import Mes from "./classOrInterface/message";
import SocketService from "./global.js";
import axios from "axios";
const route=useRoute();
const router=useRouter();

interface DataItem {
  title: string;
}
const data: DataItem[] = [
  {
    title: '1'
  },
];
const remark=ref('')
const add = () => {
  const mes=route.params
  axios({
    url:'/api/isRequestAddFriend',
    method:'get',
    params:{
      fromAccount:mes.fromAccount,
      toAccount:mes.toAccount
    }
  }).then((res)=>{
    console.log(res.data.code)
    if(res.data.code==='0'){
      alert('已经请求过了，不能发请求了')
    }
    else {
      console.log(mes)
      console.log('3', remark.value, mes.fromAccount, mes.toAccount)
      let addRequest: any = new Mes('3', remark.value, mes.fromAccount, mes.toAccount)
      console.log(SocketService.ws)
      SocketService.ws.appointSend(addRequest)
      alert('发送成功')
      router.push({name:'addFriend'})
    }

  })

}
const returnBack=()=>{
  router.push({name:'addFriend'})
}
data[0].title=route.params.name.toString()
</script>
<style>
.card-image{
  background-color: aliceblue;
  margin-left: 20%;
  margin-right: 20%;
  height:400px;
  padding:30px;
  display:flex;
  flex-direction: column;
}
.remark{
  border-top:1px solid #e8e8e8;
}
.temp{
  flex-grow: 1;
}
</style>