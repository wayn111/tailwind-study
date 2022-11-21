<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { removeToken } from '../util/auth'
import { downloadAttendance } from '../api/index'
import { streamDownload } from '../util/index'

const router = useRouter()
const route = useRoute()

defineProps({
  path: String
})

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
      .then(() => {
        removeToken()
        router.push({
          name: 'login'
        })
      })
      .catch((e) => {
        console.log(e)
      })

  } else if (key === 'downloadAttendance') {
    downloadAttendance().then((res) => {
      streamDownload(res, '考勤列表.csv')
    })
      .catch((e) => {
        console.log(e)
      })
  } else {
    router.push({
      name: key
    })
  }
}
</script>

<template>
  <el-menu :default-active="path" class="el-menu-demo" mode="horizontal" :ellipsis="false" @select="handleSelect">
    <div class="flex-grow" />
    <el-menu-item index="home">主页</el-menu-item>
    <el-sub-menu index="2-4">
      <template #title>我的空间</template>
      <el-menu-item index="about">关于</el-menu-item>
      <el-menu-item index="downloadAttendance">下载我的考勤</el-menu-item>
      <el-menu-item index="joinQiyiweixin">加入企业微信</el-menu-item>
      <el-menu-item index="config">OA配置</el-menu-item>
      <el-menu-item index="logout">退出登录</el-menu-item>
    </el-sub-menu>

  </el-menu>
</template>

<style scoped>

</style>
