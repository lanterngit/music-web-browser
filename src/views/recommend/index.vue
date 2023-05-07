<template>
    <div class="recommend">
        <cxk-nav :styleList="searchNavList" :activeName="activeName" @click="handleChangeView"></cxk-nav>
        <component class="recommend-list" :is="currentView"></component>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CxkNav from "@/components/layouts/CxkNav.vue";
import SearchSong from "./recommendSong.vue";
import SearchSongList from "./recommendSongList.vue";

export default defineComponent({
    components: {
        CxkNav,
        SearchSong,
        SearchSongList,
    },
    data() {
        return {
            searchNavList: [
                {
                    name: "歌单排行榜",
                    value: "SearchSongList",
                },
            ],
            activeName: "歌单",
            currentView: "SearchSongList",
        };
    },
    methods: {
        handleChangeView(item) {
            this.activeName = item.name;
            this.currentView = item.value;
        },
    },
});
</script>
<style lang="scss" scoped>
@import "@/assets/css/var.scss";
@import "@/assets/css/global.scss";

.recommend {
  margin: auto;
  width: 900px;

  .recommend-list {
    min-height: 480px;
  }
}
</style>

