<template>
    <div class="p-5 h-screen w-full text-center">
        <h1 class="text-2xl font-bold">
            欢饮来到个人主页
        </h1>
        <el-form ref="formRef" :rules="rules" :label-position="'top'" :model="formLabelAlign" class="mt-5"
            :size="'large'">
            <el-form-item label="工号" prop="jobNo">
                <el-input v-model="formLabelAlign.jobNo" />
            </el-form-item>
            <el-form-item label="oa token" prop="token">
                <el-input v-model="formLabelAlign.token" />
            </el-form-item>
            <el-form-item label="通知类型" prop="notifyType">
                <el-checkbox-group v-model="formLabelAlign.notifyType">
                    <el-checkbox label="1" size="large">飞书</el-checkbox>
                    <el-checkbox label="2" size="large">邮箱</el-checkbox>
                    <el-checkbox label="3" size="large">企业微信账号</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="企业微信账号">
                <el-input v-model="formLabelAlign.qiyeweixinAccount" />
            </el-form-item>
            <el-form-item>
                <el-button size="large" round @click="submitForm()">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script setup>
import { reactive, ref, onMounted } from 'vue'
import axios from 'axios'
const formLabelAlign = reactive({
    jobNo: '',
    token: '',
    qiyeweixinAccount: '',
    notifyType: [],
})


const rules = reactive({
    jobNo: [
        { required: true, message: '请输入工号', trigger: 'blur' },
        { min: 3, max: 50, message: '请输入3 to 5位字母', trigger: 'blur' },
    ],
    token: [
        { required: true, message: '请输入oa token', trigger: 'blur' }
    ],
    notifyType: [
        { required: true, message: '请选择通知类型', trigger: 'blur' }
    ]
})
const formRef = ref();
const submitForm = async () => {
    if (!formRef.value) return
    await formRef.value.validate((valid, fields) => {
        if (valid) {
            console.log(formLabelAlign)
            axios.get()
        } else {
            console.log('error submit!', fields)
        }
    })
}

const resetForm = (formEl) => {
    if (!formEl) return
    formEl.resetFields()
}
</script>

<style>
.el-form--large.el-form--label-top .el-form-item .el-form-item__label {
    font-size: 20px;
}
</style>