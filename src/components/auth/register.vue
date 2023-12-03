<template><div>
  <div style="text-align: center;margin-top: 150px">
    <div style="font-size: 25px">注册新用户</div>
    <div style="font-size: 15px;margin-bottom: 100px">Welcome to chatroom</div>
  </div>
  <el-form :model="registerForm" :rules="rules" @validate="onValidate" ref="formRef">
    <el-form-item prop="username"><el-input class="input" v-model="registerForm.username" :maxlength=8 type="text" placeholder="用户名" ><template #prefix><el-icon><User /></el-icon></template></el-input>
    </el-form-item>
    <el-form-item prop="password"><el-input class="input" type="password" v-model="registerForm.password" :maxlength=16 placeholder="密码" ><template #prefix><el-icon><Key /></el-icon></template></el-input>
    </el-form-item>
    <el-form-item prop="rewritePassword">
      <el-input class="input" type="password" v-model="registerForm.rewritePassword" placeholder="重复密码" :maxlength=16  ><template #prefix><el-icon><Key /></el-icon></template></el-input>
    </el-form-item>
    <el-form-item prop="email">
      <el-input class="input" type="email" v-model="registerForm.email" placeholder="邮箱" ><template #prefix><el-icon><Message /></el-icon></template></el-input>
    </el-form-item>

    <el-form-item prop="authKey">
      <el-row :gutter="10" class="input" style="width: 100%">
        <el-col :span="15" ><el-input :maxlength=6 placeholder="验证码" v-model="registerForm.authKey" style="margin-right: 5px" ><template #prefix><el-icon><Promotion /></el-icon></template></el-input></el-col>
        <el-col :span="9"><el-button style="width: 100%" type="primary" :disabled="!emailValid || coldTime > 0" @click="emailSender" plain>
          {{
            coldTime > 0 ? "请稍后" + coldTime + "秒" : "发送验证码"
          }}</el-button> </el-col>
      </el-row>
    </el-form-item>

  </el-form>
  <el-button type="success" style="margin-top: 30px;width: 100%" @click="submitForm()" plain>注册账号</el-button>
  <el-divider><el-link @click="router.back()">已有账号？点击登录</el-link></el-divider>

</div>
</template>

<script setup>
import {reactive, ref} from "vue";
import {Key, Message, Promotion, User} from "@element-plus/icons-vue";
import router from "@/router";
import {ElMessage} from "element-plus";
import {post} from "@/net";
const submitForm =  () => {
  Reg();
  router.back();
};
const registerForm = reactive({
  email: '',
  password: '',
  rewritePassword: '',
  username: '',
  authKey: ''
})
const validateUsername  = (rule, value, callback) =>{
  if (value === ""){
    callback(new Error("请输入用户名"))
  }
  if (!/^[a-zA-Z0-9]+$/.test(value)){
    callback(new Error("用户名由英文或数字组成"))
  }
}
const validateConfirm = (rule, value, callback) => {
  if (value === "") callback(new Error("请重复密码"))
  if (value !== registerForm.password) callback(new Error("两次输入密码不一致"))
};
const rules = {
  username: [
    { min:3, max:8, message: '用户名长度应在3-8个字符之间',trigger: 'blur'},
    { validator: validateUsername, trigger: ['blur','change']}
  ],
  password: [
    {required:true, message: '请输入密码',trigger: 'blur'},
    { min:6, max:16, message: '密码应在6-16个字符之间',trigger: 'blur'}
  ],
  rewritePassword: [
    { required:true, message: '请重复密码',trigger: 'blur'},
    { validator: validateConfirm, trigger: 'blur'}
  ],
  email: [
    {required: true, message: '请输入邮箱地址', trigger: 'blur'},
    {type: 'email', message: '请输入一个合法邮箱',trigger: 'blur'}
  ],
  authKey:[
    {required: true,message: '请输入获取的验证码', trigger: 'change'}
  ]
}
const emailValid = ref(false)
const coldTime = ref(0)
const onValidate = (prop, isValid) => {
  if (prop === 'email' && isValid) {
    emailValid.value = isValid;
  }
}
const emailSender = () => {
  post("/api/auth/emailSend",{
        email: registerForm.email,
    username: registerForm.username
      },()=>{
        ElMessage.success('发送成功！')
        coldTime.value = 60
        setInterval(()=>{
          coldTime.value--
          setTimeout(()=>{},0)
        },1000)
      }
  )
}
const formRef = ref()
const Reg = () =>{
  post("/api/auth/register",{
    username: registerForm.username,
    password: registerForm.password,
    code: registerForm.authKey,
    email: registerForm.email
  },()=>{
    ElMessage.success("注册成功，请前往登录。")
    router.push("/")
  })
}

</script>

<style scoped>

</style>