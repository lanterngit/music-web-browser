<template>
<!--  <el-row>-->
<!--    <el-col :span="6">-->
<!--      <span>-->
<!--        icon-->
<!--      </span>-->
<!--      <span>Cxk-Music</span>-->
<!--    </el-col>-->
<!--    <el-col :span="3">首页</el-col>-->
<!--    <el-col :span="3">歌单</el-col>-->
<!--    <el-col :span="3">歌手</el-col>-->
<!--    <el-col :span="3">搜索</el-col>-->
<!--    <el-col :span="3">登录</el-col>-->
<!--    <el-col :span="3">注册</el-col>-->
<!--  </el-row>-->
  <div class="cxk-header">
    <div class="header-logo">
      <span class="header-icon"></span>
      <span>
        {{websiteName}}
      </span>
    </div>


  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";

const websiteName = ref("Cxk-Music")
</script>

<style lang="less" scoped>
.cxk-header{
  display: flex;
  flex-flow: nowrap;
  white-space: nowrap;
  .header-logo{
    background-color: skyblue;
  }
}
</style>