<template>
  <div class="about-us">
    <div class="about-us-header">
      <img class="avatar" src="https://q.qlogo.cn/g?b=qq&nk=392198678&s=100" alt="头像"/>
      <h2 class="author">二十大学习园地</h2>
    </div>
    <div class="about-us-info">
      <el-row :gutter="2"><el-col :span="12"><h3>前端</h3></el-col><el-col :span="12"><p>轩SAMA</p></el-col></el-row>
      <el-row :gutter="2"><el-col :span="12"><h3>后端</h3></el-col><el-col :span="12"><p>轩SAMA</p></el-col></el-row>


    </div>
  </div>
</template>

<style>
/* 换一种流行的配色 */
:root {
  --primary-color: #2d4059;
  --secondary-color: #ea5455;
  --accent-color: #f7b32b;
  --body-background-color: #f7ede2;
}

body {
  background-color: var(--body-background-color);
  font-family: 'Noto Sans', sans-serif;
}

.about-us {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 600px;
  margin: 0 auto;
  padding: 40px;
  text-align: center;
}

.about-us-header .author {
  font-size: 2rem;
  color: var(--primary-color);
  margin: 0;
}
.about-us-header .avatar {
  border-radius: 50%;
  width: 60px;
  height: 60px;
}

.about-us-header .author {
  font-size: 1.5rem;
  color: var(--primary-color);
  margin: 0;
}



.about-us-info h3 {
  color: var(--secondary-color);
  font-size: 1.2rem;
  font-weight: 600;
}

.about-us-info p {
  color: var(--primary-color);
  font-size: 1.1rem;
  display: inline-block;
}
</style>