<template>
  <el-container>
    <el-header>
      <cxk-header></cxk-header>
    </el-header>
    <el-main>
      <router-view />
      <cxk-current-play></cxk-current-play>
      <cxk-play-bar></cxk-play-bar>
      <cxk-scroll-top></cxk-scroll-top>
      <cxk-audio></cxk-audio>
    </el-main>
    <el-footer>
      <cxk-footer></cxk-footer>
    </el-footer>
  </el-container>
</template>

<script lang="ts" setup>
import { getCurrentInstance } from "vue";
import CxkHeader from "@/components/layouts/CxkHeader.vue";
import CxkCurrentPlay from "@/components/layouts/CxkCurrentPlay.vue";
import CxkPlayBar from "@/components/layouts/CxkPlayBar.vue";
import CxkScrollTop from "@/components/layouts/CxkScrollTop.vue";
import CxkFooter from "@/components/layouts/CxkFooter.vue";
import CxkAudio from "@/components/layouts/CxkAudio.vue";

const { proxy } = getCurrentInstance();

if (sessionStorage.getItem("dataStore")) {
  proxy.$store.replaceState(Object.assign({}, proxy.$store.state, JSON.parse(sessionStorage.getItem("dataStore"))));
}

window.addEventListener("beforeunload", () => {
  sessionStorage.setItem("dataStore", JSON.stringify(proxy.$store.state));
});
</script>

<style lang="scss" scoped>
@import "@/assets/css/var.scss";
@import "@/assets/css/global.scss";

.el-container {
  min-height: calc(100% - 60px);
}
.el-header {
  padding: 0;
}
.el-main {
  padding-left: 0;
  padding-right: 0;
}
</style>
