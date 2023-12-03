<template>
  <div class="box">
    <el-container class="box" style="height: 100%">
      <div class="swiperbox">
        <el-carousel :interval="2500" arrow="always" height="450px">
          <el-carousel-item v-for="banner in data.theBanners" key="banner.id">
            <img  class="swiper" :src="banner.img" alt="" @click="go(banner.url)"/>
            <el-text size="large" class="textSlider" >
              {{ banner['mainText'] }}<br />{{ banner['subText'] }}</el-text>
          </el-carousel-item>
        </el-carousel>

      </div>
      <el-main class="main">
        <div class="articleBox">
          <div class="articleContainer">
            <el-card shadow="hover" style="color: white;background: #cb523e;"><el-icon style="margin: 5px;transform: translateY(2px);scale: 1.2"><Aim /></el-icon>最新文章</el-card>
            <div class="theArticle" v-for="article in data.theArticlesNew" :key="article.id" @click="router.push('/articles/ArticleDetails/'+ article.id.toString())">
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
          <div class="articleContainer">
            <el-card shadow="hover" style="color: white;background: #cb523e;"><el-icon style="margin: 5px;transform: translateY(2px);scale: 1.2"><Star /></el-icon>最热文章</el-card>

            <div class="theArticle" v-for="article in data.theArticlesLike" :key="article.id" @click="router.push('/articles/ArticleDetails/'+ article.id.toString())">
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
        <el-card style="background: #cb523e;color: white;margin: 0 10px" @click="router.push({ name: 'ArticleList', params: { apiPath: 'personalShare/NEW' } })
"><div style="display: flex; justify-content: space-between;">查看所有<el-icon style="transform: translateY(2px);"><ArrowRight /></el-icon></div></el-card>


      </el-main>
          </el-container>
  </div>
</template>

<script setup>

import {Aim, ArrowRight, Clock, Star, UserFilled} from "@element-plus/icons-vue";
import router from "@/router";
import {onMounted, reactive} from "vue";
import {ElLoading} from "element-plus";
import {get} from "@/net";


const data = reactive({
  theArticlesNew: '',
  theArticlesLike: '',
  theBanners: ''
})
onMounted(async ()=>{
  const Loading = ElLoading.service({
    text: '加载中...',
    background: "#cb523e",
  })
  get("/api/information/personalShare/square",(msg)=>{
    data.theArticlesNew = msg.data['newArticle']
    data.theArticlesLike = msg.data['likeArticle']
    data.theBanners = msg.data['banners']
    Loading.close()
  })
  return true
})
</script>

<style scoped>
.box {
  height: 100vh;
  display: flex;
  flex-flow: column;
}





span {
  margin-left: 10px;
}

.doc {
  width: 100%;
  text-align: center;
}

.picArticle {
  width: 200px;
  position: relative;
}

.theArticle {
  padding: 1rem;
  display: flex;
  background: #fff;
  border-radius: 10px;
  margin-top: 10px;
}

.theArticle:hover {
  box-shadow: 0 0 2px black;
}
.articleBox{
  display: flex;
  flex-flow: row;
  width: 100%;
}
.articleContainer {
  display: flex;
  flex-flow: column;
  margin: 10px;
  width: 100%;
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
.main {
  display: flex;
  flex-flow: column;
  overflow-x: hidden;
}
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

/* Mobile devices */
@media only screen and (max-width: 768px) {
  .main,.articleBox {
    flex-flow: column;
  }


}/* Mobile devices */
@media only screen and (max-width: 1200px) {
  .side-card {
    display: none;
  }
  .articleContainer{
    margin: 10px 0;
  }

}
</style>