<template>
    <div class="p-5 h-screen w-full">
        <Menu path="home" />

        <h1 class="text-2xl font-bold mt-4 text-center">
            欢迎来到个人主页
        </h1>
        <p class="leading-relaxed mt-2  text-center">这里是你的个人信息配置页面，你可以直接修改配置点击提交就会立即生效</p>
        <el-form ref="formRef" :rules="rules" :label-position="'top'" :model="formLabelAlign" class="mt-3"
            :size="'large'">
            <el-form-item label="用户名称" prop="username">
                <el-input v-model="formLabelAlign.username" disabled />
            </el-form-item>
            <el-form-item label="工号" prop="jobNo">
                <el-input v-model="formLabelAlign.jobNo" placeholder="请填写你的工号" />
            </el-form-item>
            <el-alert type="success" class="text-left" show-icon :closable="true">
                <h1 class="font-bold title-alert">oa token获取方式</h1>
                <p>1:登录oa系统 2:打开F12开发者工具 3:拷贝任意接口请求头中的X-Access-Token值</p>
            </el-alert>
            <el-form-item label="oa token" class="mt-3" prop="token">
                <el-input v-model="formLabelAlign.token" placeholder="请填写你oa系统token" />
            </el-form-item>
            <el-alert type="success" class="text-left" show-icon :closable="true">
                <h1 class="font-bold title-alert">通知类型说明</h1>
                <p>飞书：发送通知到飞书群中</p>
                <p>邮箱：发送通知到指定邮箱</p>
                <p @click="goQiyeweixin"
                    class="cursor-pointer underline decoration-dashed decoration-sky-500  underline-offset-4">
                    企业微信账号：下载企业微信，加入我的企业，可以在微信中接受私聊消息，点击查看教程</p>
            </el-alert>
            <el-form-item label="通知类型" class="mt-3" prop="notifyTypeList">
                <el-checkbox-group v-model="formLabelAlign.notifyTypeList">
                    <el-checkbox label="feishu_group" size="large">飞书</el-checkbox>
                    <el-checkbox label="email" size="large">邮箱</el-checkbox>
                    <el-checkbox label="qiyeweixin" size="large">企业微信账号</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="formLabelAlign.email" placeholder="通知类型选邮箱时，请填写邮箱" />
            </el-form-item>
            <el-alert type="success" class="text-left" show-icon :closable="true">
                <h1 class="font-bold title-alert">企业微信账号获取方式</h1>
                <p class="cursor-pointer underline decoration-dashed decoration-sky-500  underline-offset-4">加入企业微信成功后，直接点击该链接，输入手机号即可获得</p>
            </el-alert>
            <el-form-item label="企业微信账号" class="mt-3">
                <el-input v-model="formLabelAlign.qiyeweixinAccount" placeholder="通知类型选企业微信时，联系管理员获取"/>
            </el-form-item>
            <el-form-item class="btn">
                <el-affix position="bottom" :offset="20">
                    <el-button size="large" type="success" class="submit-but" round @click="submitForm()">点击提交
                    </el-button>
                </el-affix>
            </el-form-item>
        </el-form>
    </div>
</template>
<script setup>
import { reactive, ref, onMounted } from 'vue'
import Menu from '../components/Menu.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
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
    email: '',
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
    formLabelAlign.email = resp.data.email || ''
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
                })
        } else {
            console.log('error submit!', fields)
        }
    })
}

function goQiyeweixin() {
    router.push({
        name: 'joinQiyiweixin'
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

<style scoped>
.el-form--large.el-form--label-top .el-form-item .el-form-item__label {
    font-size: 20px;
}

.title-alert {
    font-size: 1rem;
}

.btn :deep() .el-form-item__content {
    justify-content: right;
}

.submit-but {
    background-color: #67c23a;
}

.submit-but:hover,
.submit-but:focus {
    color: var(--el-button-hover-text-color);
    border-color: var(--el-button-hover-border-color);
    background-color: var(--el-button-hover-bg-color);
    outline: none;
}
</style>