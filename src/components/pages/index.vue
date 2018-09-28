<template>
<div>
  <el-container>
    <sidebar/>
    <el-main>
      <el-breadcrumb separator="el-icon-arrow-right">
        <el-breadcrumb-item to="home">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-text="this.$router.currentRoute.name"></el-breadcrumb-item>
      </el-breadcrumb>
      <router-view/>
    </el-main>
  </el-container>
</div>
</template>

<script>
import Sidebar from '@/components/base/Sidebar'

export default {
  name: 'index',
  components: {
    Sidebar
  },
}
</script>

<style scoped>

</style>
