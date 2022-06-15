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
          <div @click="changeCharacter">
            修改
            <edit-outlined key="edit" />
          </div>
          <div @click="openLooking">
            详情
            <ellipsis-outlined key="ellipsis" />
          </div>
          <div @click="openLooking">
            添加
            <ellipsis-outlined key="add" />
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
import {  EditOutlined, EllipsisOutlined } from '@ant-design/icons-vue';
import { useRouter } from "vue-router";
const router = useRouter();
const openLooking=()=>{
  router.push({name:'lookingDetail'})
}
const changeCharacter=()=>{
  router.push({name:'changeCharacter'})
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

