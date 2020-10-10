<template>
  <div> 
    <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane v-for="(item, index) in category" :key="index" :label="item.title" class="category-item">
      <div v-for="(item,index) in categoryitem" :key="index" class="category-detail"
       @click="$router.push('/detail/'+item.id)">
        <img :src="item.img" alt="">
        <div class="category-icon">
          <span class="el-icon-video-play">{{item.id}}</span>
          <span class="el-icon-edit">{{item.commentlen}}</span>
        </div>
        <span class="category-name">{{item.name}}</span>
      </div>
    </el-tab-pane>
  </el-tabs>
    <!-- <p v-if="loading">加载中...</p>
    <p v-if="noMore">没有更多了</p> -->
  </div>
</template>


<script>
export default {
  data() {
    return {
      activeName: 0,
      id: 0,
      page: 0,
      pagesize: 10,
      // loading: false
    }
  },
  props:{
    category:{
      type:Array,
      default(){
        return[]
      }
    },
    categoryitem:{
      type:Array,
      default(){
        return[]
      }
    }
  },
  methods: {
    handleClick() {
      this.id= this.category[this.activeName]._id
      this.page= this.category[this.activeName].page
      this.pagesize= this.category[this.activeName].pagesize
      this.$emit('homeTap', this.id, this.page ,this.pagesize,this.activeName)
      // this.page += 1
      // this.pagesize += 10
      // console.log(this.category);
    },
    // load(){
    //   console.log(222);
    // }
  }
 }
</script>

<style >
  .category-item {
    display: flex;
    flex-wrap: wrap;
    /* justify-content: center; */
    justify-content: space-around;
    align-items: center;
    position: relative;
    top: 100px;
    left: 0;
  }

 .el-tabs__header{
  position: fixed;
  top: 45px;
  left: 0;
  z-index: 9;
  background-color: #fff;
  padding: 0 20px;
}
  .category-detail{
    width: 45%;
    height: 100%;
    /* position: relative; */
  }

  .category-detail img{
    width: 100%;
    /* margin-bottom: 0; */
  }

  .category-name{
    position: relative;
    top: -5px;
    font-size: 15px;
  }

  .category-icon{
    display: flex;
    justify-content: space-between;
    position: relative;
    padding: 0 10px;
    bottom: 20px;
    color: #333;
    background: linear-gradient(0deg,rgba(0,0,0, .50),transparent);
  }
</style>