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

        <h1 class="text-2xl font-bold mt-4">
            欢迎来到个人主页
        </h1>
        <p class="leading-relaxed mt-4">这里是你的个人信息配置页面，你可以直接修改配置点击提交就会立即生效</p>
        <el-form ref="formRef" :rules="rules" :label-position="'top'" :model="formLabelAlign" class="mt-5"
            :size="'large'">
            <el-form-item label="工号" prop="jobNo">
                <el-input v-model="formLabelAlign.jobNo" />
            </el-form-item>
            <el-form-item label="oa token" prop="token">
                <el-input v-model="formLabelAlign.token" />
            </el-form-item>
            <el-form-item label="通知类型" prop="notifyTypeList">
                <el-checkbox-group v-model="formLabelAlign.notifyTypeList">
                    <el-checkbox label="feishu_group" size="large">飞书</el-checkbox>
                    <el-checkbox label="email" size="large">邮箱</el-checkbox>
                    <el-checkbox label="qiyeweixin" size="large">企业微信账号</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="企业微信账号">
                <el-input v-model="formLabelAlign.qiyeweixinAccount" />
            </el-form-item>
            <el-form-item>
                <el-button size="large" round @click="submitForm()">点击提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script setup>
import { reactive, ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox, ElLoading } from 'element-plus'
import { getUserInfo, updateUserInfo } from '../api/index'
import { useRouter, useRoute } from 'vue-router'
import { removeToken } from '../util/auth'

const router = useRouter()
const route = useRoute()

let formLabelAlign = reactive({
    jobNo: '',
    token: '',
    qiyeweixinAccount: '',
    notifyType: '',
    notifyTypeList: []
})

// 生命周期钩子
onMounted(async () => {
    const resp = await getUserInfo();
    formLabelAlign.jobNo = resp.data.jobNo || ''
    formLabelAlign.notifyType = resp.data.notifyType || ''
    formLabelAlign.notifyTypeList = resp.data.notifyType ? resp.data.notifyType.split(',') : []
    formLabelAlign.qiyeweixinAccount = resp.data.qiyeweixinAccount || ''
    formLabelAlign.token = resp.data.token || ''
    formLabelAlign.username = resp.data.username || ''
})

const rules = reactive({
    jobNo: [
        { required: true, message: '请输入工号', trigger: 'blur' },
        { min: 3, max: 50, message: '请输入3 to 5位字母', trigger: 'blur' },
    ],
    token: [
        { required: true, message: '请输入oa token', trigger: 'blur' }
    ],
    notifyTypeList: [
        { required: true, message: '请选择通知类型', trigger: 'blur' }
    ]
})
const formRef = ref();
const submitForm = async () => {
    if (!formRef.value) return
    await formRef.value.validate((valid, fields) => {
        if (valid) {
            ElMessageBox.confirm(
                '你确定要修改配置信息吗？',
                'Warning',
                {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'warning',
                }
            )
                .then(async () => {
                    formLabelAlign.notifyType = formLabelAlign.notifyTypeList.join(',')
                    const resp = await updateUserInfo(formLabelAlign)
                    ElMessage.success('更新成功')
                })
                .catch(() => {
                    ElMessage({
                        type: 'info',
                        message: 'Delete canceled',
                    })
                })
        } else {
            console.log('error submit!', fields)
        }
    })
}

const index = 'home'
let activeIndex = ref(index)
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