<template>
  <el-table :data="filterTableData" style="width: 100%" table-layout="auto">
    <el-table-column label="id" prop="id" />
    <el-table-column label="用户名" prop="username" />
    <el-table-column label="邮箱" prop="email" />
    <el-table-column label="头像" prop="avatarUrl" />
    <el-table-column align="right">
      <template #header><div style="display: flex;flex-flow: row">
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
  <el-button style="width: 100%" @click="next" v-show="data.max === 5">下一页</el-button>
  <el-dialog v-model="visible" :show-close="false">
    <template #header="{ close, titleId, titleClass }">
      <div class="my-header">
        <h4 :id="titleId" :class="titleClass">用户编辑</h4>
        <el-button type="danger" @click="close">
          <el-icon class="el-icon--left"><CircleCloseFilled /></el-icon>
          关闭
        </el-button>
      </div>
    </template>
    <div style="display: flex;flex-flow: column;">

      <div style="display: flex;flex-flow: row">
        <p style="margin: 5px 15px;width: 5rem;">用户名</p>
        <el-input placeholder="输入用户名"  v-model="optioned.username"></el-input>

      </div>
      <div style="display: flex;flex-flow: row">
        <p style="margin: 5px 15px;width: 5rem;" >头像链接</p>
        <el-input placeholder="输入头像链接" v-model="optioned.avatarUrl"></el-input>

      </div>
      <div style="display: flex;flex-flow: row">
        <p style="margin: 5px 15px;width: 5rem;">邮箱</p>
        <el-input placeholder="邮箱"  v-model="optioned.email"></el-input>

      </div>

      <el-button type="primary" @click="save">保存</el-button>
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

const data = {
  pageNum: 1,
  max: 0
}
const optioned = reactive({
  id: '',
  username: '',
  email: '',
  avatarUrl: ''
})
const next = ()=>{
  post("/api/admin/selectUser",{
    pageNum:data.pageNum++
  },(msg)=>{
    data.max = [...msg].length
    theData.theArticles = [...theData.theArticles, ...msg];
  })

}
const save = ()=> {
  if (!/(jpg|jpeg|png|gif)$/.test(optioned.avatarUrl)){
    ElMessage.error("图片链接必须是jpg或者png结尾")
    return
  }
  post("api/admin/settingUser",{
    id: optioned.id,
    username: optioned.username,
    email: optioned.email,
    avatarUrl: optioned.avatarUrl
  },(msg)=>{
    ElMessage.success(msg)
  })
}
const theData = reactive({
  theArticles: [],
  noMore: false
})

onMounted(()=>{

    post("/api/admin/selectUser",{
      pageNum:'0'
    },(msg)=>{
      data.max = [...msg].length
      theData.theArticles = [...theData.theArticles, ...msg];
    })

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
  optioned.avatarUrl = row.avatarUrl
  optioned.email = row.email
  optioned.username = row.username

}

const handleDelete = (index, row) => {
  console.log(index, row)
  post("api/admin/deleteUser",{id:row.id},(msg)=>{
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
