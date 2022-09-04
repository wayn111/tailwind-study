<script setup>
import { ElMessage, ElMessageBox, ElLoading } from 'element-plus'
import { ref, nextTick } from 'vue'
import { login } from '../api/index'
import { setToken } from '../util/auth'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

const data = ref({
    'username': '',
    'password': ''
})


async function userLogin() {
    if (!data.value.username || !data.value.password) {
        ElMessage.error('您的账号或密码输入错误.')
        return
    }
    if (data.value.username.length < 3 || data.value.password < 3) {
        ElMessage.error('您的账号或密码必须满足3位字母.')
        return
    }
    const loadingInstance = ElLoading.service({})
    try {
        const resp = await login(data.value)
        setToken(resp.data)
        router.push({
            name: 'home'
        })
    } catch (error) {
        console.log(error)
    } finally {
        nextTick(() => {
            // Loading should be closed asynchronously
            loadingInstance.close()
        })
    }
}

function goReg() {
    router.push({
        name: 'register'
    })
}


</script>

<template>
    <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto flex flex-wrap items-center">
            <div class="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
                <h1 class="title-font font-medium text-3xl text-gray-900 text-center">oa互助</h1>
                <p class="leading-relaxed text-center">本系统仅用作oa办公系统之外第三方系统，最终解释权归作者所有</p>
            </div>
            <div class="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
                <h2 class="text-gray-900 text-lg font-medium title-font mb-5">请登录</h2>
                <div class="relative mb-4">
                    <label for="full-name" class="leading-7 text-sm text-gray-600">账号</label>
                    <input type="text" id="full-name" name="full-name" v-model="data.username"
                        class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                </div>
                <div class="relative mb-4">
                    <label for="email" class="leading-7 text-sm text-gray-600">密码</label>
                    <input type="email" id="email" name="email" v-model="data.password"
                        class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                </div>
                <button @click="userLogin"
                    class="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">登录</button>
                <p class="text-lg text-gray-500 underline decoration-indigo-600 mt-4 text-right" @click="goReg">
                    没有账号？点击去注册.</p>

            </div>
        </div>
    </section>
</template>
<style>
</style>
