<template>
    <div>chenliangsb</div>
</template>
<script lang="ts" setup>
import { useRoute } from 'vue-router';
const route = useRoute();
let account = route.params.account
console.log(account);
</script>