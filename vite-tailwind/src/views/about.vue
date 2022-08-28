<template>
    <div class="p-5 h-screen w-full text-center">
        <Menu path="about"/>

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
import Menu from '../components/Menu.vue'

</script>

<style>
.el-form--large.el-form--label-top .el-form-item .el-form-item__label {
    font-size: 20px;
}
</style>