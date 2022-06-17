<template>
  <div class="imageCard" >
    <a-card :title=detailState.userName :bordered="false" style="width: 300px">
      <p>备注:{{detailState.remark}}</p>
      <p>手机号:{{detailState.phone}}</p>
      <p>性别:{{detailState.gender==0?'男':'女'}}</p>
      <p>家乡:{{detailState.hometown}}</p>
    </a-card>
    <a-button style="width:300px" @click="returnBack">收起</a-button>
  </div>
</template>
<script lang="ts" setup>
import axios from 'axios'
import {ref, onMounted, reactive} from 'vue'
import {useRouter ,useRoute} from 'vue-router'
const router=useRouter()
const route=useRoute()
// const userName=route.params.userName
console.log(route.params)
const account=route.params.account
const mes=ref(1)
const returnBack=()=>{
  router.push({ name: "charcterDetail",params:{account:account , userName:route.params.userName} })
}
const detailState=reactive({
  remark:route.params.userName,
  userName:'',
  hometown:'',
  gender:'',
  phone:''
})
onMounted(()=>{
  console.log('进入了look')
  axios({
    url: 'api/user',
    method: 'get',
    params: {
      'account': account
    }
  }).then((res)=>{
    detailState.phone=res.data.phone
    detailState.hometown=res.data.hometown
    detailState.userName=res.data.name
    detailState.gender=res.data.gender
  })
})

</script>
<style>
.imageCard{
  padding-top: 130px;
  height: 100%;
  background-image: linear-gradient(to bottom, rgba(12, 3, 3, 0.5), rgba(214, 112, 117, 0.5))
}
</style>
