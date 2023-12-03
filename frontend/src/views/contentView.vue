<template>
  <div class="box">
    <div class="article">
      <el-page-header style="box-shadow: 0 0 10px black;-webkit-backdrop-filter: blur(8px);backdrop-filter: blur(8px);" class="header" @back="router.back()" >
        <img class="avatar" :src="data.image" alt="avatar" />
      </el-page-header>
      <div class="content">
        <router-view v-slot="{ Component }">
          <transition name="el-fade-in-linear" style="height:100%">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
// ...
import router from "@/router";
import img1 from '@/assets/avator.png';

import {onMounted, reactive} from "vue";
const data = reactive({
  image: img1
})
onMounted(()=>{
  if (localStorage.hasOwnProperty("avatarUrl")){
    data.image = localStorage.getItem("avatarUrl")
  }
})
</script>

<style scoped>
.box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
}
.article {
  width: 100vw;
  max-width: 1000px;
  box-sizing: border-box;
  padding: 0 20px;

}
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  box-sizing: border-box;
}
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}
.content {
  margin-top: 100px;
  font-size: 1rem;

}
@media screen and (max-width: 600px) {
  .content {
    font-size: 1.2rem;
  }
}
</style>
