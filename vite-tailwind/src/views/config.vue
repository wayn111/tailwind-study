<template>
    <div class="p-5 h-screen w-full">
        <Menu path="home" />

        <h1 class="text-2xl font-bold mt-4 text-center">
            oa项目配置页面
        </h1>
        <el-form ref="formRef" :label-position="'top'" class="mt-3" :size="'large'">
            <el-form-item label="是否启用飞书通知" class="mt-3" prop="notifyTypeList">
                <el-switch v-model="feishu_notify_enable" :active-value="1" :inactive-valu="0" inline-prompt active-text="是" inactive-text="否" @change="change" />
            </el-form-item>
        </el-form>
    </div>
</template>
<script setup>
import { reactive, ref, onMounted } from 'vue'
import Menu from '../components/Menu.vue'
import { ElMessage, ElMessageBox, ElLoading } from 'element-plus'
import { getConifg, updateConifg } from '../api/index'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
let feishu_notify_enable = ref()

// 生命周期钩子
onMounted(async () => {
    const resp = await getConifg()
    feishu_notify_enable.value = parseInt(resp.data.feishu_notify_enable)
})

function change(val) {
    feishu_notify_enable = val
    let req = {
        feishu_notify_enable
    }
    updateConifg(req).then(resp => {
        ElMessage.success('更新成功')
    })
}

</script>

<style scoped>

</style>