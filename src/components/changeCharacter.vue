<template>
  <div class="changeCharacter">
    <div v-if="isMine==='true'">
    <a-form
        :model="formState"
        v-bind="layout"
        name="nest-messages"
        :validate-messages="validateMessages"
        @finish="onFinish"
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
      <a-form-item :name="['user', 'birth']" label="生日" :rules="[{ required: false }]">
        <a-input v-model:value="formState.user.birth" />
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
    <div v-else>
      <a-form
          :model="remarkState"
          v-bind="layout"
          name="nest-messages"
          :validate-messages="validateMessages"
          @finish="onFinish"
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
import { defineComponent, reactive } from 'vue';
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
  router.push({name:'charcterDetail'})
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

const formState = reactive({
  user: {
    name: userName,
    phone:'',
    gender:'',
    birth:'',
    create_time:'',
    update_time:'' ,
    hometown:''
  },
});
const onFinish = (values: any) => {
  console.log('Success:', values);
};
</script>

