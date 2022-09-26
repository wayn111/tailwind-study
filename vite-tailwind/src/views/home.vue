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
            <el-alert v-if="!formLabelAlign.qiyeweixinAccount" type="success" class="text-left" show-icon
                :closable="true">
                <h1 class="font-bold title-alert">企业微信账号获取方式</h1>
                <p @click="getQiyeweixinAccount"
                    class="cursor-pointer underline decoration-dashed decoration-sky-500  underline-offset-4">
                    加入企业微信成功后，点击该链接，输入手机号即可获得</p>
            </el-alert>
            <el-form-item label="企业微信账号" class="mt-3">
                <el-input v-model="formLabelAlign.qiyeweixinAccount" placeholder="通知类型选企业微信时，点击上方获取" />
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
import { ElMessage, ElMessageBox, ElLoading } from 'element-plus'
import { getUserInfo, updateUserInfo, getQiyeweixinAccountInfo } from '../api/index'
import { useRouter, useRoute } from 'vue-router'

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

function getQiyeweixinAccount() {
    ElMessageBox.prompt('请输入你的手机号', 'Tip', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        inputPattern: /^1[3,5,7,8,9][0-9]{9}$/,
        inputErrorMessage: '手机号格式错误',
    })
        .then(async ({ value }) => {
            const loadingInstance = ElLoading.service({})
            try {
                const resp = await getQiyeweixinAccountInfo({ mobile: value })
                formLabelAlign.qiyeweixinAccount = resp.data.userid
                ElMessage.success('获取企业微信账号成功')
            } catch (error) {
                log.error(error)
            } finally {
                loadingInstance.close()
            }
        })
        .catch(() => {
        })
}


const NOTIFICATION_TITLE = 'Title'
const NOTIFICATION_BODY = 'Notification from the Renderer process. Click to log to console.'
const CLICK_MESSAGE = 'Notification clicked!'

new Notification(NOTIFICATION_TITLE, { body: NOTIFICATION_BODY })
    .onclick = () => document.getElementById("output").innerText = CLICK_MESSAGE

shell.open();
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
</style>