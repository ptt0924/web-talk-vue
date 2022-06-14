//引入路由对象
import { createRouter, createWebHistory, createWebHashHistory, createMemoryHistory, RouteRecordRaw } from 'vue-router'

//vue2 mode history vue3 createWebHistory
//vue2 mode  hash  vue3  createWebHashHistory
//vue2 mode abstact vue3  createMemoryHistory

//路由数组的类型 RouteRecordRaw
// 定义一些路由
// 每个路由都需要映射到一个组件。
const routes: Array<RouteRecordRaw> = [{
    name: 'login',
    path: '/',
    component: () => import('../components/login.vue')
}, {
    name: 'friendsDictory',
    path: '/friendsDictory',
    component: () => import('../components/friendsDictory.vue')
},
{
    name: 'detailsView',
    path: '/detailsView',
    component: () => import('../components/details.vue')
}, {
    name: 'addFriend',
    path: '/addFriend',
    component: () => import('../components/addfriend.vue')
},
]



const router = createRouter({
    history: createWebHistory(),
    routes
})

//导出router
export default router