<template>
    <div class="box">
        <div class="left">
            <div class="title">今日已点单歌曲：</div>
            <el-table :data="dataList" @row-click="handleClick">
                <el-table-column prop="index" label="序号" width="80" />
                <el-table-column prop="songName" label="歌曲" />
                <el-table-column prop="singerName" label="歌手" />
                <el-table-column prop="introduction" label="专辑" />
            </el-table>
        </div>
        <div class="right">
            <div class="title">歌曲点单：</div>
            <el-form id="add-song" label-width="120px" :model="form">
                <el-form-item label="歌曲名">
                    <el-input type="text" name="name" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="专辑">
                    <el-input type="text" name="introduction" v-model="form.introduction"></el-input>
                </el-form-item>
                <el-form-item label="歌手">
                    <el-input type="text" name="singer" v-model="form.singerName"></el-input>
                </el-form-item>
                <el-form-item label="歌词">
                    <el-input type="textarea" name="lyric" v-model="form.lyric"></el-input>
                </el-form-item>
                <el-form-item label="歌曲上传">
                    <input type="file" name="file"/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">确认点单</el-button>
                    <el-button @click="reset(form)">重置点单</el-button>
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
        const { playMusic, checkStatus, downloadMusic } = mixin();
        const { proxy } = getCurrentInstance();
        const store = useStore();

        const { songList } = toRefs(props);
        const form = reactive({name: '', singerName: '', introduction: '', lyric: ''})
        const iconList = reactive({
            dislike: Icon.Dislike,
            like: Icon.Like,
        });
        const dataList = ref([])
        onMounted(()=>{
            getSchoolSong()
        })
        async function getSchoolSong(){
            try {
                const result = (await HttpManager.getSchoolSong()) as ResponseBody;
                result.data.forEach((item,index) => {
                    item.songName=item.name.split("-")[1]
                    item.singerName=item.name.split("-")[0]
                    item.index = index + 1
                })
                dataList.value =result.data.splice(0,15)
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
            const addSongForm = new FormData(document.getElementById("add-song") as HTMLFormElement)
            if (!addSongForm.get("lyric")) addSongForm.set("lyric", "[00:00:00]暂无歌词")

            const req = new XMLHttpRequest()
            req.onreadystatechange = () => {
                if (req.readyState === 4 && req.status === 200) {
                    let res = JSON.parse(req.response);
                    (proxy as any).$message({
                        message: res.message,
                        type: res.type,
                    });
                    if (res.success) {
                        getSchoolSong()
                        form.name = ""
                        form.singerName = ""
                        form.introduction = ""
                        form.lyric = ""
                    }
                }
            }
        }
        function reset(form:object){
            form = {};
        }
        function handleEdit(row) {
            console.log("row", row);
        }

        const userId = computed(() => store.getters.userId);

        return {
            dataList,
            form,
            iconList,
            Delete,
            Download,
            handleClick,
            handleEdit,
            downloadMusic,
            onSubmit,
            reset
        };
    }
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

