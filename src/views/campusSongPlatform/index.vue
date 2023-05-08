<template>
    <div class="box">
        <div class="left">
            <div class="title">今日已点单歌曲：</div>
            <el-table :data="dataList" @row-click="handleClick">
                <el-table-column prop="songName" label="歌曲" />
                <el-table-column prop="singerName" label="歌手" />
                <el-table-column prop="introduction" label="专辑" />
            </el-table>
        </div>
        <div class="right">
            <div class="title">歌曲点单：</div>
            <el-form :model="form" label-width="120px">
                <el-form-item label="歌曲名">
                    <el-input v-model="form.name" />
                </el-form-item>
                <el-form-item label="Activity zone">
                    <el-select v-model="form.region" placeholder="please select your zone">
                        <el-option label="Zone one" value="shanghai" />
                        <el-option label="Zone two" value="beijing" />
                    </el-select>
                </el-form-item>
                <el-form-item label="Activity time">
                    <el-col :span="11">
                        <el-date-picker
                                v-model="form.date1"
                                type="date"
                                placeholder="Pick a date"
                                style="width: 100%"
                        />
                    </el-col>
                    <el-col :span="2" class="text-center">
                        <span class="text-gray-500">-</span>
                    </el-col>
                    <el-col :span="11">
                        <el-time-picker
                                v-model="form.date2"
                                placeholder="Pick a time"
                                style="width: 100%"
                        />
                    </el-col>
                </el-form-item>
                <el-form-item label="Instant delivery">
                    <el-switch v-model="form.delivery" />
                </el-form-item>
                <el-form-item label="Activity type">
                    <el-checkbox-group v-model="form.type">
                        <el-checkbox label="Online activities" name="type" />
                        <el-checkbox label="Promotion activities" name="type" />
                        <el-checkbox label="Offline activities" name="type" />
                        <el-checkbox label="Simple brand exposure" name="type" />
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="Resources">
                    <el-radio-group v-model="form.resource">
                        <el-radio label="Sponsor" />
                        <el-radio label="Venue" />
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="Activity form">
                    <el-input v-model="form.desc" type="textarea" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">Create</el-button>
                    <el-button>Cancel</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, getCurrentInstance, toRefs, computed, reactive, onMounted, ref} from "vue";
import { useStore } from "vuex";
import mixin from "@/mixins/mixin";
import { MoreFilled, Delete, Download } from "@element-plus/icons-vue";
import { HttpManager } from "@/api";
import { Icon } from "@/enums";

export default defineComponent({
    components: {
        MoreFilled,
    },
    props: {
        songList: Array,
        show: {
            default: false
        }
    },
    emits: ["changeData"],



    setup(props) {
        const { getSongTitle, getSingerName, playMusic, checkStatus, downloadMusic } = mixin();
        const { proxy } = getCurrentInstance();
        const store = useStore();

        const { songList } = toRefs(props);
        const form = reactive({
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: '',
            })
        const iconList = reactive({
            dislike: Icon.Dislike,
            like: Icon.Like,
        });

        const songUrl = computed(() => store.getters.songUrl);
        const singerName = computed(() => store.getters.singerName);
        const songTitle = computed(() => store.getters.songTitle);
        const dataList = ref([])
        onMounted(()=>{
            getSchoolSong()
        })
        async function getSchoolSong(){
            try {
                const result = (await HttpManager.getSchoolSong()) as ResponseBody;
                result.data.forEach((item) => {
                        item.songName=item.name.split("-")[1]
                        item.singerName=item.name.split("-")[0]
                })
                dataList.value =result.data.splice(0,9)
                console.log('data@@@@',dataList.value)
            } catch (error) {
                console.error(error);
            }
        }
        function handleClick(row) {
            playMusic({
                id: row.id,
                url: row.url,
                pic: row.pic,
                index: row.index,
                name: row.name,
                lyric: row.lyric,
                currentSongList: songList.value,
            });
        }
        function onSubmit(){
            console.log('submit!')
        }
        function handleEdit(row) {
            console.log("row", row);
        }

        const userId = computed(() => store.getters.userId);

        async function deleteCollection({ id }) {
            if (!checkStatus()) return;

            const result = (await HttpManager.deleteCollection(userId.value, id)) as ResponseBody;
            (proxy as any).$message({
                message: result.message,
                type: result.type,
            });

            if (result.data === false) proxy.$emit("changeData", result.data);
        }

        return {
            dataList,
            form,
            iconList,
            Delete,
            Download,
            songUrl,
            singerName,
            songTitle,
            handleClick,
            handleEdit,
            downloadMusic,
            deleteCollection,
            onSubmit,
        };
    },
});
</script>

<style lang="scss" scoped>
@import "@/assets/css/var.scss";
@import "@/assets/css/global.scss";
.box{
    display: flex;
    margin: 0 4rem 0 4rem;
}
.left{
    flex: 1;
    margin-right: 4rem;
}
.right{
}
.title{
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
}

.content {
  background-color: $color-white;
  border-radius: $border-radius-songlist;
  padding: 10px;
}

.content:deep(.el-table__row.current-row) {
  color: $color-black;
  font-weight: bold;
}

.content:deep(.el-table__row) {
  cursor: pointer;
}

.icon {
  @include icon(1.2em, $color-black);
}
</style>

