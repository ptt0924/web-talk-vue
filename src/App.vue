<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import 'animate.css'
import {useRoute} from'vue-router'
const route=useRoute()
</script>

<template>
  <router-view :key="route.fullPath" class="animate__animated animate__fadeInDownBig"></router-view>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

html,
body {
  min-height: 100%;
  background-image: url(/111.png);
}
</style>
