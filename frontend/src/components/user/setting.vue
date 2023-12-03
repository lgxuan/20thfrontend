<template>
  <div>
    <el-row :gutter="16" align="middle">
      <el-col :span="6">用户名：</el-col>
      <el-col :span="18">
        <el-input v-model="data.username" placeholder="用户名">
          <template #prefix>
            <el-icon><User /></el-icon>
          </template>
        </el-input>
      </el-col>
    </el-row>
    <el-row :gutter="16" align="middle">
      <el-col :span="6">密码：</el-col>
      <el-col :span="18">
        <el-input type="password" placeholder="新密码" v-model="data.password">
          <template #prefix>
            <el-icon><Key /></el-icon>
          </template>
        </el-input>
      </el-col>
    </el-row>
    <el-row :gutter="16" align="middle">
      <el-col :span="6">头像链接：</el-col>
      <el-col :span="18">
        <el-input v-model="data.avatarUrl" placeholder="新头像链接">
          <template #prefix>
            <el-icon><Avatar /></el-icon>
          </template>
        </el-input>
      </el-col>
    </el-row>
    <el-button type="primary" style="width: 100%;margin-top: 10px" @click="save">保存</el-button>
  </div>
</template>

<script setup>
import {Avatar, Key, User} from '@element-plus/icons-vue'
import {onMounted, reactive} from 'vue'
import {get, post} from "@/net";
import {ElMessage} from "element-plus";
onMounted(()=>{
  get("api/user/getInfo",(msg)=>{
    data.username = msg.data.username
    data.avatarUrl = msg.data.avatarUrl
  })
})
const save = ()=> {
  post("/api/user/setting",data.password ? {
    avatarUrl: data.avatarUrl,
    username: data.username
  } : {
    avatarUrl: data.avatarUrl,
    username: data.username,
    password: data.password
  } ,(msg)=>{
    ElMessage.success(msg)
  })
}
const data = reactive({
  username: '',
  avatarUrl: '',
  password: ''
})

</script>

<style scoped>
.el-row{
  margin-top: 10px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
</style>