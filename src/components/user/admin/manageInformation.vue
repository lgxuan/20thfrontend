<template>
  <el-table :data="filterTableData" style="width: 100%" table-layout="auto">
    <el-table-column label="Banner类型" prop="cid" />
    <el-table-column label="标题" prop="mainText" />
    <el-table-column label="子标题" prop="subText" />
    <el-table-column label="链接" prop="url" />
    <el-table-column align="right">
      <template #header><div style="display: flex;flex-flow: row">        <el-button type="primary" @click="add">添加</el-button>
        <el-input v-model="search" size="small" placeholder="搜索" /></div>

      </template>
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
        >编辑</el-button
        >
        <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
        >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <el-dialog v-model="visible" :show-close="false">
    <template #header="{ close, titleId, titleClass }">
      <div class="my-header">
        <h4 :id="titleId" :class="titleClass">Banner编辑</h4>
        <el-button type="danger" @click="close">
          <el-icon class="el-icon--left"><CircleCloseFilled /></el-icon>
          关闭
        </el-button>
      </div>
    </template>
    <div style="display: flex;flex-flow: column;">
      <div style="display: flex;flex-flow: row">
        <p style="margin: 5px 15px;width: 5rem;">banner类型</p>
        <el-select v-model="optioned.cid">

          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </div>
      <div style="display: flex;flex-flow: row">
        <p style="margin: 5px 15px;width: 5rem;">标题</p>
          <el-input placeholder="输入标题"  v-model="optioned.mainText"></el-input>

      </div>
      <div style="display: flex;flex-flow: row">
        <p style="margin: 5px 15px;width: 5rem;" >子标题</p>
          <el-input placeholder="输入子标题" v-model="optioned.subText"></el-input>

      </div>
      <div style="display: flex;flex-flow: row">
        <p style="margin: 5px 15px;width: 5rem;">图片链接</p>
          <el-input placeholder="图片链接"  v-model="optioned.imgUrl"></el-input>

      </div>
      <div style="display: flex;flex-flow: row">
        <p style="margin: 5px 15px;width: 5rem;">跳转链接</p>
          <el-input placeholder="跳转链接" v-model="optioned.url"></el-input>

      </div>
      <el-button type="primary" @click="save" v-show="optioned.id">保存</el-button>
      <el-button type="primary" @click="create" v-show="!optioned.id">创建</el-button>
    </div>

  </el-dialog>

</template>
<script setup>
import {computed, onMounted, reactive, ref} from 'vue'
import {post} from "@/net";
import {CircleCloseFilled} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";
import router from "@/router";
const visible = ref(false)
const add = ()=> {

  optioned.cid = '';
  optioned.mainText = '';
  optioned.subText = '';
  optioned.url = '';
  optioned.imgUrl = '';
  visible.value = true

}
const create = ()=> {
  if (!/(jpg|png)$/.test(optioned.imgUrl)){
    ElMessage.error("图片链接必须是jpg或者png结尾")
    return
  }
  post("api/information/addBanner",{
    cid: optioned.cid,
    mainText: optioned.mainText,
    subText: optioned.subText,
    imgUrl: optioned.imgUrl,
    jumpUrl: optioned.url
  },(msg)=>{
    ElMessage.success(msg)
  })
}
const options = [
  {
    value: '1',
    label: '首页Banner'
  },
  {
    value: '2',
    label: '广场Banner'
  }
]
const optioned = reactive({
  id: '',
  cid: '',
  mainText: '',
  subText: '',
  url: '',
  imgUrl: ''
})
const save = ()=> {
  post("api/information/EditBanner",{
    id: optioned.id,
    cid: optioned.cid,
    mainText: optioned.mainText,
    subText: optioned.subText,
    imgUrl: optioned.imgUrl,
    jumpUrl: optioned.url
  },(msg)=>{
    ElMessage.success(msg)
  })
}
const theData = reactive({
  theArticles: [],
  noMore: false
})
const props = defineProps({
  type: String
});
onMounted(()=>{
    if (props.type === "1"){
      post("/api/information/getBanner",{
        cid:'1',
        pageNum:'0'
      },(msg)=>{
        theData.theArticles = [...theData.theArticles, ...msg];
      })
    }
})
const search = ref('')
const filterTableData = computed(() =>
    theData.theArticles.filter(
        (data) =>
            !search.value ||
            data.name.toLowerCase().includes(search.value.toLowerCase())
    )
)
const handleEdit = (index, row) => {
  visible.value = true
  console.log(row)
  optioned.id = row.id
  optioned.cid = row.cid
  optioned.mainText = row.mainText
  optioned.subText = row.subText
  optioned.imgUrl = row.img
  optioned.url = row.url
}

const handleDelete = (index, row) => {
  console.log(index, row)
  post("api/information/DeleteBanner",{id:row.id},(msg)=>{
    ElMessage.success(msg)
    router.go(0)
  })
}

</script>
<style scoped>
.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
