import { createApp, useAttrs, VueElement } from 'vue'
import App from './App.vue'
import antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css'; // or 'ant-design-vue/dist/antd.less'
import router from './router'

createApp(App).use(antd).use(router).mount('#app')
// //设置跨域代理
// let ROOT;
// if (process.env.NODE_ENV === 'development') {
//     ROOT = "/api";//开发环境下的代理地址，解决本地跨域
// }
// // else {
// //     ROOT = 'http://localhost:8088';    //生产环境下的地址
// // }
// axios.defaults.baseURL = ROOT;
// //使得每次请求都会带一个/api前缀，然后被自动替换为target中的网址
