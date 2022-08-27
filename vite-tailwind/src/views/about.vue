<template>
    <div class="p-5 h-screen w-full text-center">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false"
            @select="handleSelect">
            <div class="flex-grow" />
            <el-menu-item index="home">主页</el-menu-item>
            <el-sub-menu index="2-4">
                <template #title>我的空间</template>
                <el-menu-item index="about">关于</el-menu-item>
                <el-menu-item index="logout">退出登录</el-menu-item>
            </el-sub-menu>
        </el-menu>

        <h1 class="text-2xl font-bold mt-5">
            oa互助更新日志
        </h1>
        <el-timeline class="mt-5 leading-10 text-left">
            <el-timeline-item timestamp="2022/8/27" placement="top">
                <el-card>
                    <h4 class="text-xl">oa互助发布1.0版本</h4>
                    <p>发布web端页面</p>
                </el-card>
            </el-timeline-item>
        </el-timeline>
    </div>
</template>
<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { removeToken } from '../util/auth'
import { ElMessage, ElMessageBox, ElLoading } from 'element-plus'

const router = useRouter()
const route = useRoute()
const activeIndex = ref('about')
const handleSelect = (key, keyPath) => {
    if (key === 'logout') {
        ElMessageBox.confirm(
            '你确定要退出登录吗？',
            'Warning',
            {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning',
            }
        )
            .then(async () => {
                removeToken()
                router.push({
                    name: 'login'
                })
            })
            .catch(() => {
            })

    } else {
        router.push({
            name: key
        })
    }
}

</script>

<style>
.el-form--large.el-form--label-top .el-form-item .el-form-item__label {
    font-size: 20px;
}
</style>