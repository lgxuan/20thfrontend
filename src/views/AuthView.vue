<template>
  <div style="height:100vh;display: flex; overflow: hidden; margin: 0;padding: 0;">
    <div style="flex:1;">
      <img style="width: 100%;height: 100%;" :src="bg" alt=""/>
    </div>
    <div class="welcome-title">
      <div style="font-weight: bold">学思践悟二十大</div>
      <div style="margin-top: 10px">砥砺奋进新征程</div>
    </div>

    <div style="width:450px;background-color: white;margin: 0 20px;text-align: center;" >
      <router-view v-slot="{ Component }">
        <transition name="el-fade-in-linear" style="height:100%">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script setup>
import bg from "@/assets/bg.png";

</script>

<style>
body{
  background: white !important;
}
.welcome-title{
  position: absolute;
  bottom: 30px;
  left: 30px;
  color: white;
  text-shadow: 0 0 10px black;
}
@media (max-width: 768px){
  .welcome-title{
    display: none;
  }
}

</style>