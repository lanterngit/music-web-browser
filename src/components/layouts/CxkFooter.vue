<template>
  <p v-for="(item, index) in footerList" :key="index">
    {{ item }}
  </p>
</template>

<script lang="ts" setup>
import { defineComponent, readonly } from "@vue/runtime-core";

const footerList = readonly([
  "关于 | 帮助 | 条款 | 反馈",
  "Copyright © 2023 Cxk-Music",
]);
</script>

<style scoped>
</style>