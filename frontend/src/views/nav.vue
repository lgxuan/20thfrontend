<template>
  <div class="app">
    <div class="top">
      <div class="logo">
        <img :src="navData.image" alt="logo" style="height: 40px" />
        <h1 style="margin-left: 15px;color: white">{{ navData.title }}</h1>
      </div>
    </div>
    <div class="main">
      <router-view v-slot="{ Component }">
        <transition name="el-fade-in-linear" style="height:100%">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
    <el-row class="bottom" :gutter="20">
      <el-col :span="8">
        <div class="bottom-link" @click="router.push('/')">
         <el-icon class="bottom-icon"><House /></el-icon>
          <p>首页</p>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="bottom-link" @click="router.push('/square')">
          <el-icon class="bottom-icon"><Orange /></el-icon>
          <p>广场</p>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="bottom-link" @click="router.push('/info')">
          <el-icon class="bottom-icon"><Postcard /></el-icon>
          <p>我的</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import {reactive} from 'vue';
import img1 from '@/assets/logo.png';
import {House, Orange, Postcard} from "@element-plus/icons-vue";
import router from "@/router";

const navData = reactive({
  image: img1,
  title: '二十大学习园地'
});



</script>

<style scoped>

.bottom-link {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #fff;
  font-size: 12px;
}

.bottom-icon {
  margin-top: 5px;
  transform: translateY(10px);
  font-size: 25px;
}
html,
body,
.app {
  display: flex;
  padding-top: 80px;
  padding-bottom: 100px;
  flex-direction: column;
}

.top {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  background-color: rgba(203, 82, 62, 0.9);
  top: 0;
  width: 100vw;
  z-index: 999;
  position: fixed;
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
}
img {
  margin-right: 10px;
}
h1 {
  color: #fff;
  font-size: 24px;
}


.main {
  flex-grow: 1;

}

.bottom-link {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #fff;
  font-size: 12px;
}
i {
  font-size: 24px;
  margin-bottom: 5px;
}


.bottom-link:hover {
  color: #f9c8d4;
}

.bottom-link.active {
  color: #f9c8d4;
}

.bottom {
  justify-content: center;
  align-items: center;
  height: 65px;
  background-color: #cb523e;
  position: fixed;
  bottom: 0;
  margin-left: 0 !important;
  width: 100%;
  z-index: 10;
}
</style>