<template>
    <div class="p-5 h-screen w-full">
        <Menu />
        <section class="text-gray-600 body-font">
            <div class="container py-5 mx-auto flex flex-wrap">
                <div class="flex flex-wrap w-full">
                    <div class="lg:w-2/5 md:w-1/2 md:pr-10 md:py-6">
                        <div class="flex relative pb-12">
                            <div class="h-full w-10 absolute inset-0 flex items-center justify-center">
                                <div class="h-full w-1 bg-gray-200 pointer-events-none"></div>
                            </div>
                            <div
                                class="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                </svg>
                            </div>
                            <div class="flex-grow pl-4">
                                <h2 class="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">第一步</h2>
                                <p class="leading-relaxed">下载企业微信</p>
                            </div>
                        </div>
                        <div class="flex relative pb-12">
                            <div class="h-full w-10 absolute inset-0 flex items-center justify-center">
                                <div class="h-full w-1 bg-gray-200 pointer-events-none"></div>
                            </div>
                            <div
                                class="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                </svg>
                            </div>
                            <div class="flex-grow pl-4">
                                <h2 class="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">第二步</h2>
                                <p class="leading-relaxed">扫码加入我的企业</p>
                                <div>
                                    <img class="object-cover object-center w-3/5"
                                        src="https://work.weixin.qq.com/wework_admin/genqrcode?action=join&vcode=d32e526fc7c796a88ac1a4baed0f274f&r=hb_share_mng_index" />
                                </div>
                            </div>
                        </div>
                        <div class="flex relative pb-12">
                            <div class="h-full w-10 absolute inset-0 flex items-center justify-center">
                                <div class="h-full w-1 bg-gray-200 pointer-events-none"></div>
                            </div>
                            <div
                                class="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                </svg>
                            </div>
                            <div class="flex-grow pl-4">
                                <h2 class="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">第三步</h2>
                                <p class="leading-relaxed">加入企业后，微信扫码关注oa互助应用公众号, 打开接受企业消息按钮</p>
                                <div>
                                    <img class="object-cover object-center w-3/5"
                                        src="https://wework.qpic.cn/wwpic/890839_LDx9TP71Q46Ywes_1661693891/0" />
                                    <img class="mt-4 object-cover object-center w-3/5" src="../assets/gonozhonghao.jpg" />
                                </div>
                            </div>
                        </div>
                        <div class="flex relative pb-12">
                            <div class="h-full w-10 absolute inset-0 flex items-center justify-center">
                                <div class="h-full w-1 bg-gray-200 pointer-events-none"></div>
                            </div>
                            <div
                                class="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                </svg>
                            </div>
                            <div class="flex-grow pl-4">
                                <h2 class="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">第四步</h2>
                                <p class="leading-relaxed">回到主页配置，点击获取企业微信账号链接，填写手机号，直接获取</p>
                            </div>
                        </div>
                        <div class="flex relative">
                            <div
                                class="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                                    <path d="M22 4L12 14.01l-3-3"></path>
                                </svg>
                            </div>
                            <div class="flex-grow pl-4">
                                <h2 class="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">完成</h2>
                                <p class="leading-relaxed">你就可以在微信中收到来自oa互助的通知信息</p>
                            </div>
                        </div>
                    </div>
                    <img class="lg:w-3/5 md:w-1/2 object-cover object-center rounded-lg md:mt-0 mt-12"
                        src="../assets/1200-500.jpeg" alt="step">
                </div>
            </div>
        </section>
    </div>

</template>
<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { removeToken } from '../util/auth'
import { ElMessage, ElMessageBox, ElLoading } from 'element-plus'
import Menu from '../components/Menu.vue'

</script>

<style>
</style>