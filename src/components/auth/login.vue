<template><div>
  <div style="text-align: center;margin-top: 150px">
    <div style="font-size: 25px">登录</div>
    <div style="font-size: 15px">Welcome to my website</div>
  </div>
  <div id="login-form" style="margin-top: 50px">
    <el-input v-model="formData.username" placeholder="用户名/邮箱" type="text" ><template #prefix><el-icon><User /></el-icon></template>></el-input>
    <el-input v-model="formData.password" placeholder="密码" type="password" style="margin-top: 10px">
      <template #prefix><el-icon><Key /></el-icon></template></el-input>
<!--    <el-row style="margin-top: 10px">-->
<!--      <el-col :span="12" style="text-align: left">-->
<!--        <el-checkbox v-model="formData.rememberMe" label="记住我" size="large" />-->
<!--      </el-col>-->
<!--      <el-col :span="12" style="text-align: right;margin-top: 5px">-->
<!--        <el-link >忘记密码</el-link>-->
<!--      </el-col>-->
<!--    </el-row>-->
  </div>
  <div style="margin-top: 30px" ><el-button style="width: 80%" type="success" @click="login()" plain>登录</el-button></div>
  <el-divider>
    <span style="color: grey">没有账号？</span>
  </el-divider>
    <div style="margin-top: 30px" ><el-button style="width: 80%" type="warning" @click="router.push('/auth/register')" plain>注册</el-button></div>
</div>
</template>

<script setup>
import {User, Key} from "@element-plus/icons-vue"
import {reactive} from "vue";
import {ElLoading, ElMessage} from "element-plus";
import {post} from "@/net";
import router from "@/router";

const formData = reactive({
  username: '',
  password: '',
  rememberMe: false
})
const login = () => {

  if (!formData.username || !formData.password){
    ElMessage.warning("用户名或密码为空")
  }else {
    const Loading = ElLoading.service({
      text: '加载中...',
      background: "#fff"
    })
    post("/api/auth/login",{
      username: formData.username,
      password: formData.password
    },async (data) => {
      localStorage.setItem('token', data)
      ElMessage.success("登录成功")
      router.push('/').then(()=>router.go(0))
    })
    Loading.close();
  }

}
</script>

<style scoped>

</style>