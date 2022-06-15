<template>
  <div style="background: #ececec; padding: 30px">
    <a-card title="张三" :bordered="false" style="width: 300px">
      <p>name:{{mes}}</p>
      <p>phone:{{mes}}</p>
      <p>gender:{{mes}}</p>
      <p>birth:{{mes}}</p>
      <p>occupation:{{mes}}</p>
      <p>hometown:{{mes}}</p>
    </a-card>
    <a-button style="width:300px" @click="returnBack">收起</a-button>
  </div>
</template>
<script lang="ts" setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
const router=useRouter()
const mes=ref(1)
const returnBack=()=>{
  router.push({ name: "charcterDetail" })
}
</script>

