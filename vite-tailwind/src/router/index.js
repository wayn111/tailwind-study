import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home.vue'
import About from '../views/about.vue'
import Login from '../views/login.vue'
import Register from '../views/register.vue'
import JoinQiyiweixin from '../views/joinQiyiweixin.vue'
import axios from 'axios'

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
    {
        path: "/",
        name: "home",
        component: Home
    },
    {
        path: "/register",
        name: "register",
        component: Register
    },
    {
        path: "/login",
        name: "login",
        component: Login
    },
    {
        path: "/about",
        name: "about",
        component: About,
        meta: {
            requireAuth: true,
        },
    },
    
    {
        path: "/joinQiyiweixin",
        name: "joinQiyiweixin",
        component: JoinQiyiweixin,
        meta: {
            requireAuth: true,
        },
    },
]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHistory(),
    routes, // `routes: routes` 的缩写
})

export default router
