<template>
    <div>chenliangsb</div>
</template>
<script lang="ts" setup>
import axios from 'axios';
import { useRoute } from 'vue-router';
const route = useRoute();
//该用户的账户
let account = route.params.account
console.log(account);
const findAccount = () => {
    let toAccount;
    axios({
        url: 'api/sear'
    })
}
const add = () => {
    let addRequest = new Object()

}
</script>