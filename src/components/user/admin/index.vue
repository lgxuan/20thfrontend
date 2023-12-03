<template>
  <el-collapse accordion>
    <el-collapse-item title="常规功能" name="1">
      <el-button type="primary" @click="clear" style="width: 90%;">清除redis缓存(非验证码)</el-button>
    </el-collapse-item>
    <el-collapse-item title="信息管理" name="2">
      <el-button type="primary" @click="router.push('/admin/setting/1')" style="width: 90%;">Banner管理</el-button>
      <el-button type="primary" @click="router.push({ name: 'ArticleList', params: { apiPath: 'personalShare/NEW' } })" style="width: 90%;">文章管理</el-button>
    </el-collapse-item>
    <el-collapse-item title="用户管理">
      <el-button type="primary" @click="router.push('/admin/manageUser')" style="width: 90%;">用户管理</el-button>
    </el-collapse-item>
  </el-collapse>

</template>

<script setup>

import {post} from "@/net";
import {ElMessage} from "element-plus";
import router from "@/router";
const clear = ()=>{
  post("/api/admin/clearRedis",{},(msg)=>{
    ElMessage.success(msg)
  })
}
</script>

<style>

.el-collapse-item__content {
  display: flex;
  justify-content: center;
}
</style>