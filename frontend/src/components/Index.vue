<template>
  <el-dialog v-model="visible" :show-close="false" width="80%">
    <el-input
        v-model="data.serach"
        class="w-50 m-2"
        size="large"
        placeholder="搜索文章"
    />
    <el-button style="width: 100%" @click="serach">搜索文章</el-button>
  </el-dialog>
  <div><div class="swiperbox">
    <el-carousel :interval="2500" arrow="always" height="450px">
      <el-carousel-item v-for="banner in banners" key="banner.id">
        <img  class="swiper" :src="banner.img" alt="" @click="go(banner.url)"/>
        <el-text size="large" class="textSlider" >
          {{ banner['mainText'] }}<br />{{ banner['subText'] }}</el-text>
      </el-carousel-item>
    </el-carousel>

  </div>
    <el-container>
      <el-aside style="width: 20vw" class="aside">
        <div style="width: 100%;align-items: center">

          <div class="card">
            <div class="avatar">
              <el-avatar :src="data.userAvatar" :size="70"/>
              <el-text size="large" style="color: white;">{{ data.userName }}</el-text>
            </div>
            <div v-if="!data.isLogin" style="width: 80%"><el-button type="success" @click="login" style="width: 100%">登录</el-button></div>
            <div v-if="data.isLogin" style="width: 80%">
              <el-row :gutter="5">
                <el-col :span="12">
                  <el-button @click="" type="primary" style="width: 100%">我的文章</el-button>
                </el-col>
                <el-col :span="12">
                  <el-button type="danger" style="width: 100%" @click="router.push('/articles/writeArticle/create')">发布文章</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>

      </el-aside>

      <el-main style="padding: 0">
        <el-input
            style="margin-top: 10px"

            @click="visible = true"
            class="w-50 m-2"
            size="large"
            placeholder="搜索文章"
            :suffix-icon="Search"
        />
        <div class="article" style="width: 100%;margin-top: 10px;flex-flow: column">
          <el-row style="height: 40px;background: #cb523e;width: 100%;border-radius: 10px;">
            <el-icon style="margin: 5px 10px 10px;" size="30px" color="white"><Promotion /></el-icon>

            <el-text style="color: white;transform: translate(0,-3px);" :span="3">二十大原文阅读</el-text>
          </el-row>
          <div class="articleContainer">
            <div class="theArticle" v-for="article in theArticles" :key="article.id" @click="router.push('/articles/ArticleDetails/'+ article.id.toString())">
              <div class="picArticle">
                <el-image :src="article['imgUrl']"  fit="fill" style="position: absolute;
  border-radius: 10px;width: 8rem;
    height: 100%;font-size: 12px;
" />
              </div>
              <div class="doc">
                <h3 style="text-align: center">{{ article.title }}</h3>
                <span style="color: grey"><el-icon style="transform: translateY(2px) translateX(-5px);"><UserFilled /></el-icon>{{ article['authorName'] }}</span>
                <span style="color: grey"><el-icon style="transform: translateY(2px) translateX(-5px);"><Clock /></el-icon>{{ article['createDate'] }}</span>
              </div>

            </div>
          </div>
        </div>

      </el-main>

    </el-container>
  </div>

</template>

<script setup>
import {Clock, Promotion, Search, UserFilled} from "@element-plus/icons-vue";
import avatar from "@/assets/avator.png";
import {onMounted, reactive, ref} from "vue";
import router from "@/router";
import {ElLoading, ElMessage} from "element-plus";
import {get} from "@/net";
const theArticles = ref();
const banners = ref();
const visible = ref(false)
const serach = ()=>{
  router.push({ name: 'ArticleList', params: {
    apiPath: 'searchArticles',
    theTitle: data.serach
  } })
}
onMounted(async ()=>{
  const Loading = ElLoading.service({
    text: '加载中...',
    background: "#cb523e",
  })
router.beforeEach((to, from) => {
  if (from.name === "login"){
    router.go(0)
  }

  return true
})
  get("/api/information/index",(msg)=>{
    theArticles.value = msg.data['articles'];
    banners.value = msg.data['banners'];
    data.isLogin = msg.data['login'];
    if (data.isLogin){
      data.userName = msg.data['username'];
      data.userAvatar = msg.data['avatarUrl'];
      if (!localStorage.hasOwnProperty("avatarUrl")){
        localStorage.setItem("avatarUrl",msg.data['avatarUrl'])
      }
    }
    Loading.close()
  })
})

const go = (url) =>{
  window.open(url)
}
const login = ()=>{
  const Loading = ElLoading.service({
    text: '加载中...',
    background: "#cb523e"
  })
  router.replace("/auth")
  Loading.close()
}
const data = reactive({
  isLogin: false,
  userName: "游客",
  userAvatar: avatar,
  serach: ""
})
</script>
<style scoped>
span{
  margin-left: 10px;
}
.doc{
  width: 100%;
  text-align: center;
}
.picArticle {
  width: 200px;
  position: relative;
}
.theArticle{
  padding: 1rem;
  display: flex;
  background: #fff;
  border-radius: 10px;
  margin-top: 10px;
}
.theArticle:hover{
  box-shadow: 0 0 2px black;
}
.articleContainer {
  display: flex;
  flex-flow: column;
}
.avatar {
  display:flex;
  align-items:center;
  justify-content:center;
  flex-flow: column;
  height: 100px;
  text-align: center;
}
.card {
  display: flex;
  margin: 10px 10px 10px;
  padding: 1rem;
  border-radius: 10px;
  background: #cb523e;
  height: 250px;
  align-items: center;
  flex-flow: column;
}
@media (max-width: 768px){
  .aside{
    display: none;
  }
}
.article {
  margin-top: 5px;
  display: flex;
}

.swiper {
  max-width: 100vw;
  height: 100%;
  width: 100vw;
  object-fit: cover;
}
.textSlider {
  z-index: 999;
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: white;
  text-shadow: 0 0 10px black;
  font-size: 30px;
}
</style>