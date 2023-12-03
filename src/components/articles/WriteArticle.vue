<template>
  <div class="container">
    <div class="left">
      <el-form :rules="rules" :model="data" ref="formRef">
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="data.title" placeholder="请输入文章标题" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="文章简介" prop="profile">
          <el-input v-model="data.profile" placeholder="请输入文章简介" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="文章头图链接" prop="imgUrl">
          <el-input v-model="data.imgUrl" placeholder="请输入文章头图链接" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="文章内容" prop="content">
          <el-input type="textarea" v-model="data.content" :rows="10" placeholder="请输入文章内容"></el-input>
        </el-form-item>
      </el-form>
      <el-button style="width: 99%" type="danger" v-show="id === 'create'" @click="submitForm('create')">发布文章</el-button>
      <el-button style="width: 99%" type="primary" v-show="id !== 'create'" @click="submitForm('edit')">编辑完成</el-button>
    </div>
    <div class="right">
      <p v-html="data.afterContent" class="markdown-preview"></p>
    </div>
  </div>
</template>

<script setup>
import {computed, onMounted, reactive, ref, watch} from 'vue';
import {useRouter} from 'vue-router';
import {get, post} from '@/net';
import MarkdownIt from 'markdown-it';
import DOMPurify from 'dompurify';
import {ElMessage} from "element-plus";
import axios from "axios";

const router = useRouter();
const id = router.currentRoute.value.params.id;

const md = new MarkdownIt();
const rules = {
  title: [
    { required: true, message: '请输入文章标题', trigger: 'blur' },
    { min: 3, max: 20, message: '文章标题应在3-20个字符之间', trigger: 'blur' }
  ],
  profile: [
    { required: true, message: '请输入文章简介', trigger: 'blur' },
    { max: 200, message: '文章简介应在200个字符以内', trigger: 'blur' }
  ],
  imgUrl: [
    { required: true, message: '请输入文章头图链接', trigger: 'blur' },
    { type: 'url', message: '请输入正确的链接格式', trigger: 'blur' }
  ],
  content: [
    { required: true, message: '请输入文章内容', trigger: 'blur' }
  ]
};
const formRef = ref(null);
const submitForm = (action) => {
  const form = formRef.value;
  form.validate((valid) => {
    if (valid) {
      if (action === 'create') {
        createArticle();
      } else {
        editArticle();
      }
    } else {
      ElMessage.error("表单填写有误，请检查并修正");
      return false;
    }
  });
};

const createArticle = ()=>{
  post(`/api/information/createArticle`,{
    title: data.title,
    profile: data.profile,
    imgUrl: data.imgUrl,
    content: data.content
  },(msg)=>{
    ElMessage.success(msg[0]);
    router.replace('/articles/ArticleDetails/'+msg[1])
  })
}
const editArticle = ()=>{
  post(`/api/information/EditArticle`,{
    id: id,
    title: data.title,
    profile: data.profile,
    imgUrl: data.imgUrl,
    content: data.content
  },(msg)=>{
    ElMessage.success(msg);
  })
}
const data = reactive({
  title: '',
  profile: '',
  imgUrl: '',
  content: '',
  afterContent: '',
});
const theContent = computed(() => {
  return data.content;
});
watch(theContent, (value, oldValue, onCleanup) => {
  data.afterContent = DOMPurify.sanitize(md.render(value));
});

onMounted(() => {
  if (id !== "create") {
    get(`/api/information/article/${id}`, (dataResponse) => {
      data.title = dataResponse.data.title;
      data.profile = dataResponse.data.profile;
      data.imgUrl = dataResponse.data.imgUrl;
      axios.get('/articles/' + id + ".txt",{
        withCredentials: true
      }).then((theData)=>{
        console.log(theData.data)
        data.content = theData.data
      }).catch(()=>{
        ElMessage.error("获取文章失败")
      })
      data.afterContent = DOMPurify.sanitize(md.render(data.content));
    });
  }
});
</script>

<style>


.markdown-preview {
  max-width: 100%;
  overflow-wrap: break-word;
}

.markdown-preview img {
  max-width: 100%;
  height: auto;
}
img{
  max-width: 400px;
}
.container {
  display: flex;
  width: 100vw;
  position: fixed;
  left: 0;
}

.left,
.right {
  flex: 1;
  padding: 0 5px;
}

.right {
  height: 100vh;
  overflow-y: scroll;
}

/* Mobile devices */
@media only screen and (max-width: 768px) {
  .container {
    flex-direction: column;
  }

  .left,
  .right {
    margin-bottom: 10px;
  }

  .right {
    margin-bottom: 0;
  }
}
</style>