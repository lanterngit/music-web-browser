<template>
  <div class="search-song-list">
    <play-list :playList="playList" path="song-sheet-detail"></play-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, getCurrentInstance } from "vue";
import PlayList from "@/components/PlayList.vue";
import { HttpManager } from "@/api";

export default defineComponent({
  components: {
    PlayList,
  },
  setup() {
    const { proxy } = getCurrentInstance();

    const playList = ref([]);

    async function getRecommendSong() {
        console.log('触发了')
      const result = (await HttpManager.getRecommendSong()) as ResponseBody;
      let data = result.data.splice(0,9)
      if (!result.data.length) {
        (proxy as any).$message({
          message: "暂无该歌曲内容",
          type: "warning",
        });
      } else {
        playList.value = data;
      }
    }

    onMounted(() => {
        getRecommendSong();
    });

    return {
      playList,
    };
  },
});
</script>
