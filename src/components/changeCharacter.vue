<template>
  <div class="changeCharacter">
    <div v-if="isMine==='true'">
    <a-form
        :model="formState"
        v-bind="layout"
        name="nest-messages"
        :validate-messages="validateMessages"
        @finish="update"
    >
      <a-form-item :name="['user', 'name']" label="用户名" :rules="[{ required: true }]">
        <a-input v-model:value="formState.user.name" />
      </a-form-item>
      <a-form-item :name="['user', 'phone']" label="手机号" :rules="[{ required: false }]">
        <a-input v-model:value="formState.user.phone" />
      </a-form-item>
      <a-form-item :name="['user', 'gender']" label="性别" :rules="[{ required: false }]">
        <a-select
            ref="select"
            v-model:value="formState.user.gender"
            style="width: 178px"
            @focus="focus"
        >
          <a-select-option value="0">男</a-select-option>
          <a-select-option value="1">女</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :name="['user', 'hometown']" label="家乡" :rules="[{ required: false }]">
        <a-input v-model:value="formState.user.hometown" />
      </a-form-item>

      <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
        <a-button type="primary" html-type="submit">提交</a-button>
        <a-button @click="returnBack">返回</a-button>
      </a-form-item>
    </a-form>
    </div>
    <div class="remark" v-else>
      <a-form
          :model="remarkState"
          v-bind="layout"
          name="nest-messages"
          :validate-messages="validateMessages"
          @finish="changeRemark"
      >
        <a-form-item :name="['remark']" label="备注" :rules="[{ required: true }]">
          <a-input v-model:value="remarkState.remark" />
        </a-form-item>
        <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
          <a-button type="primary" html-type="submit">提交</a-button>
          <a-button @click="returnBack">返回</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script setup lang="ts">
import axios from 'axios'
import pubsub from "pubsub-js";
import SocketService from './global.js'
import {defineComponent, onMounted, reactive} from 'vue';
import {useRoute,useRouter} from "vue-router";
const route=useRoute();
const router=useRouter();
console.log(route.params)
const isMine=route.params.isMine
const account=route.params.account
const userName=route.params.userName;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const returnBack=()=>{
  router.push({name:'charcterDetail',params:{account:route.params.account,userName:userName}})
}
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
const remarkState=reactive({
remark:userName
})
const changeRemark=()=>{
  console.log({
    'fromAccount': SocketService.account,
    'toAccount': account,
    'remark': remarkState.remark
  })
  //修改好友的备注
    axios({
      url: 'api/friends',
      method: 'put',
      params: {
        'fromAccount': SocketService.account,
        'toAccount': account,
        'remark': remarkState.remark
      }
    }).then((res) => {
      console.log('备注',res)
      //修改成功，把备注修改为修改的
      let data = res.data
      if (data.code === '0') {
        alert("修改成功")
        pubsub.publish('remark',remarkState.remark)
      } else {
        alert("修改失败")
      }
    })
}
//修改自己的详细东西
const update = (values: any) => {
  console.log('Success:', values.user);
  const temp={
      account:account,
      name:values.user.name,
      phone:parseInt(values.user.phone),
      gender:values.user.gender,
      hometown: values.user.hometown,
      password:SocketService.password,
      id:SocketService.id
  }
  console.log(temp)
  axios({
    url: 'api/user',
    method: 'put',
    params: {
      'user':temp
    }
  }).then((res) => {
    console.log(res)
    if (res.data.code == '0') {
      alert("修改成功")
      axios({
        url: 'api/user',
        method: 'get',
        params: {
          'account': account
        }
      }).then((res)=>{
        console.log('111',res)
        formState.user.name=res.data.name
        formState.user.phone=res.data.phone
        formState.user.password=res.data.password
        formState.user.gender=res.data.gender.toString()
        pubsub.publish('userName', res.data.name)
      })
    } else {
      alert("修改失败")
    }
  })
}

const formState:any = reactive({
  user: {
    name: userName,
    phone:'',
    gender:'',
    hometown:'',
    password:'',
    account:account,
  },
});
onMounted(()=>{
  console.log('进入了look')
  axios({
    url: 'api/user',
    method: 'get',
    params: {
      'account': account
    }
  }).then((res)=>{
    formState.user.phone=res.data.phone
    formState.user.hometown=res.data.hometown
    formState.user.userName=res.data.name
    formState.user.gender=(res.data.gender).toString()
  })
})
// const onFinish = (values: any) => {
//   console.log('Success:', values.user);
// };
</script>
<style>
.changeCharacter{
  width: 400px;
  padding-top:40px;
  padding-left: 30px;
  padding-right: 100px;
  height: 100%;
  background-image: linear-gradient(to bottom, rgba(111, 111, 111, 0.5), rgba(230, 12, 121, 0.5))

}
.remark{
  margin-top: 185px;
}
</style>
