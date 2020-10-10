<template>
  <div v-if="Object.keys(movie).length !== 0">
      <video :src="movie.content" class="detail-video" controls="controls"></video>
      <el-collapse @change="handleChange" style="font-size:50px">
        <el-collapse-item :title="movie.name"  >
            <div class="movie-watch">
                <span class="look">始看好物</span>
                <span>146万次观看</span>
                <span>232弹幕</span>
                <span>{{movie.date}}</span>
            </div>
            <div class="collection">
                <div class="collection-icon">
                    <span class="el-icon-star-on" @click.stop="collectClick" :class="{active:collection}">收藏</span>
                    <span class="el-icon-download">缓存</span>
                    <span class="el-icon-share">分享</span>
                </div>
                <span class="el-icon-edit-outline">评论</span>
            </div>
        </el-collapse-item>
      </el-collapse>
  </div>
</template>

<script>
export default {
    props:{
        movie:{
            type:Object,
            default(){
                return{}
            }
        },
        collection:null
    },
    methods:{
        // 收藏视频
        collectClick(){
            this.$emit('collectClick')
        },
        handleChange(){

        }
    }
}
</script>

<style>
    .detail-video{
        width: 100%;
    }
    .moive-title{
        font-size: 50px;
    }

    .el-collapse-item__header{
        font-size: 15px;
        font-weight: 700;
        padding: 0 10px;
        overflow: hidden;
        white-space: nowrap;
    }
    .el-collapse-item__content{
        /* font-size: 20px; */
        color: #666;
        padding: 0 15px;
    }

    .movie-watch span{
        padding-right: 10px;
    }

    .look{
        font-weight: 700;
        font-size: 13px;
    }

    .collection{
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        color: #333;
        font-size: 15px;
    }

    .collection-icon{
        width: 150px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .collection-icon span{
        flex: 1;
    }

    .active{
        color: #c374c6;
    }
</style>