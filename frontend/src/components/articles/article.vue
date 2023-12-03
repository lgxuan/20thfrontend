<template>

  <div v-if="theContent" class="article-detail">
    <el-button style="margin-left: 10px" v-show="article['edit']" @click="router.push('/articles/WriteArticle/'+article['id'])">编辑文章</el-button>
    <el-button type="danger" style="margin-left: 10px" v-show="article['edit']" @click="deleteArticle">删除文章</el-button>
    <h1 class="article-title">{{ article.title }}</h1>
    <div class="article-meta">
      <span class="article-date">{{ article['createDate'] }}</span>
      <span class="article-author">{{ article['authorName'] }}</span>
    </div>

    <p class="article-content" v-html="theContent"></p>
    <!-- 其他文章详情内容 -->

  </div>
    <el-backtop :right="100" :bottom="100" />

</template>
<script setup>
import {get, post} from '@/net'
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router"; // 导入获取文章详情数据的 API 方法
import MarkdownIt from 'markdown-it';
import DOMPurify from "dompurify";
import axios from "axios";
import {ElMessage} from "element-plus";
const md = new MarkdownIt();

const article = ref()
const theContent = ref()

const router = useRouter()
const id = router.currentRoute.value.params.id
onMounted(() => {
  // 根据 ID 查询文章详情，并将结果赋值给 article 变量
  get(`/api/information/article/${id}`, (data) => {
    article.value = data.data
    axios.get('/articles/' + id + ".txt",{
      withCredentials: true
    }).then(({data})=>{
      theContent.value = DOMPurify.sanitize(md.render(data));
    }).catch(()=>{
      ElMessage.error("获取文章失败")
    })

  })

})
const deleteArticle = ()=>{
  post('/api/information/deleteArticle',{
    id: id
  },(data)=>{
    ElMessage.success(data)
    router.back()
  })
}
</script>
<style>
img{
  max-width: 100%;
}
/* 文章详情页样式 */
.article-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  color: #666;
  margin-bottom: 1rem;
}

.article-date,
.article-author {
  margin: 0;
}

.article-content {
  font-size: 1.2rem;
  line-height: 1.5;
  color: #333;
  word-wrap: break-word;
}
</style>
