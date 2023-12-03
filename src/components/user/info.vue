<template>
<div class="avatarBox" style="height: 200px">
  <el-avatar :size="100" :src="data.avatar" />
  <el-text size="large" style="color: white" tag="b">{{ data.username }}</el-text>
  <el-tag :size="'small'">{{ data.role }}</el-tag>
</div>
  <el-card @click="router.push('/auth')" v-show="!data.isLogin" style="background: #cb523e;color: white"><div style="display: flex; justify-content: space-between;"><div><el-icon size="large" class="icon"><SwitchButton /></el-icon>登录/注册</div><el-icon class="icon"><ArrowRight /></el-icon></div></el-card>
  <el-card @click="router.push('/admin/index')" v-if="data.role === 'ADMIN'" style="background: #cb523e;color: white"><div style="display: flex; justify-content: space-between;"><div><el-icon size="large" class="icon"><Tools /></el-icon>网站管理</div><el-icon class="icon"><ArrowRight /></el-icon></div></el-card>
  <el-card @click="router.push({ name: 'ArticleList', params: { apiPath: 'myArticles/'+data.id } })"  v-show="data.isLogin" style="background: #cb523e;color: white"><div style="display: flex; justify-content: space-between;"><div><el-icon size="large" class="icon"><Compass /></el-icon>我发布的</div><el-icon class="icon"><ArrowRight /></el-icon></div></el-card>
  <el-card @click="router.push('/articles/writeArticle/create')" v-show="data.isLogin" style="background: #cb523e;color: white"><div style="display: flex; justify-content: space-between;"><div><el-icon size="large" class="icon"><Promotion /></el-icon>发布文章</div><el-icon class="icon"><ArrowRight /></el-icon></div></el-card>
  <el-card @click="router.push('/user/about')" v-show="data.isLogin" style="background: #cb523e;color: white"><div style="display: flex; justify-content: space-between;"><div><el-icon size="large" class="icon"><Guide /></el-icon>关于我们</div><el-icon class="icon"><ArrowRight /></el-icon></div></el-card>
  <el-card @click="router.push('/user/setting')" v-show="data.isLogin" style="background: #cb523e;color: white"><div style="display: flex; justify-content: space-between;"><div><el-icon size="large" class="icon"><User /></el-icon>个人信息设置</div><el-icon class="icon"><ArrowRight /></el-icon></div></el-card>
  <el-card @click="logout()" v-show="data.isLogin" style="background: #cb523e;color: white"><div style="display: flex; justify-content: space-between;"><div><el-icon size="large" class="icon"><SwitchButton /></el-icon>退出登录</div><el-icon class="icon"><ArrowRight /></el-icon></div></el-card>
</template>

<script setup>
import {onMounted, reactive} from "vue";
import {get} from "@/net";
import avatar from "@/assets/avator.png";
import {ArrowRight, Compass, Guide, Promotion, SwitchButton, Tools, User} from "@element-plus/icons-vue";
import router from "@/router";
import {ElLoading} from "element-plus";
const data = reactive({
  avatar: avatar,
  username: "游客",
  id: null,
  role: "NONE",
  isLogin: false
})
const logout = ()=>{
  localStorage.clear()
  router.go(0)
}
onMounted(async ()=>{
  const Loading = ElLoading.service({
    text: '加载中...',
    background: "#cb523e",
  })
  get(`/api/information/info`, (theData) => {
    data.isLogin = eval(theData.data['login']);
    if (data.isLogin){
      data.avatar = theData.data['userAvatar']
      data.username = theData.data['username']
      data.id = theData.data['id']
      data.role = theData.data['role']
    }
  })
      Loading.close();
})
</script>

<style scoped>
.avatarBox {
  background: #cb523e url(@/assets/userbg.png) no-repeat center/cover;
  width: 100vw;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-items: center;
  justify-content: center;
  min-height: 200px;
}
.icon {
  transform: translateY(2px);
  margin-right: 5px;
}
</style>