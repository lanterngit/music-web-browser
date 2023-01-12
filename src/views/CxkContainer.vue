<template>
  <el-container>
    <el-header>
      <cxk-header />
    </el-header>
    <el-main>Main</el-main>
    <el-footer>
      <cxk-footer />
    </el-footer>
  </el-container>
</template>

<script setup lang="ts">
import CxkFooter from "../components/layouts/CxkFooter.vue";
import CxkHeader from "../components/layouts/CxkHeader.vue";
</script>

<style lang="less" scoped>
.el-container {
  padding: 0;
  margin: 0;
  .el-header {
    position: fixed;
    top: 0;
    z-index: 999;
    background-color: green;
    height: 6vh;
    width: 100vw;
    line-height: 6vh;
  }
  .el-main {
    margin-top: 6vh;
    height: 86vh;
    background-color: pink;
  }
  .el-footer {
    position: fixed;
    bottom: 0;
    height: 8vh;
    width: 100vw;
    text-align: center;
  }
}
</style>