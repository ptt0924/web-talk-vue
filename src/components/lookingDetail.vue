<template>
  <div style="background: #ececec; padding: 30px">
    <a-card :title=userName :bordered="false" style="width: 300px">
      <p>用户名:{{mes}}</p>
      <p>手机号:{{mes}}</p>
      <p>性别:{{mes}}</p>
      <p>生日:{{mes}}</p>
      <p>家乡:{{mes}}</p>
    </a-card>
    <a-button style="width:300px" @click="returnBack">收起</a-button>
  </div>
</template>
<script lang="ts" setup>
import axios from 'axios'
import {ref , onMounted} from 'vue'
import {useRouter ,useRoute} from 'vue-router'
const router=useRouter()
const route=useRoute()
const userName=route.params.userName
console.log(route.params)
const account=route.params.account
const mes=ref(1)
const returnBack=()=>{
  router.push({ name: "charcterDetail" })
}
onMounted(()=>{
  axios({
    url: 'api/user',
    method: 'get',
    params: {
      'account': account
    }
  }).then((res)=>{
    console.log(res)
  })
})

</script>

