<template>
  <div class="infinite-list-wrapper" style="overflow: auto">
    <ul
        v-infinite-scroll="load"
        infinite-scroll-delay="2000"
        class="list"
        :infinite-scroll-disabled="disabled"
    >
      <li class="theArticle" v-for="article in data.theArticles" :key="article.id" @click="router.push('/articles/ArticleDetails/'+ article.id.toString())">
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
<!--        <el-button>编辑文章</el-button>-->
      </li>
      <el-divider v-if="loading.value">加载中...</el-divider>
      <el-divider v-if="data.noMore">没有了哦</el-divider>
    </ul>


  </div>
</template>

<script setup>
import {computed, onMounted, reactive, ref} from 'vue'
import {get} from '@/net'
import {Clock, UserFilled} from "@element-plus/icons-vue";
import router from "@/router";
const props = defineProps({
  apiPath: String,
  theTitle: String
});
onMounted(()=>{
  get("/api/information/" + props.apiPath + "/0?title="+ props.theTitle,(msg)=>{
    data.theArticles = [...data.theArticles, ...msg.data];
  })
})
const count = ref(1)
const loading = ref(false)
const disabled = computed(() => loading.value || data.noMore)

const load = async () => {
  loading.value = true
  await get("/api/information/" + props.apiPath + "/" + count.value + "?title=" + props.theTitle, (msg) => {
    if ([...msg.data].length === 0) {
      data.noMore = true
    } else {
      data.theArticles = [...data.theArticles, ...msg.data];
      count.value++
      loading.value = false
    }
  })
}


const data = reactive({
  theArticles: [],
  noMore: false
})
</script>
<style>
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

.infinite-list-wrapper {


}
.infinite-list-wrapper .list {
  padding: 0;
  margin: 0;
  list-style: none;
}

.infinite-list-wrapper .list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: var(--el-color-danger-light-9);
  color: var(--el-color-danger);
}
.infinite-list-wrapper .list-item + .list-item {
  margin-top: 10px;
}
</style>