<template>
  <div class="cate-item">
      <div v-for="(item,index) in movCommend" :key="index" class='category-detail' @click="$router.push('/detail/'+item.id)">
        <img :src="item.img" alt="">
        <div class="category-icon">
          <span class="el-icon-video-play">{{item.id}}</span>
          <span class="el-icon-edit">{{item.commentlen}}</span>
        </div>
        <span class="category-name">{{item.name}}</span>
      </div>
  </div>
</template>

<script>
export default {
    props:{
      movCommend:{}
    }
}
</script>

<style scoped>
.cate-item{
    display: flex;
    flex-wrap: wrap;
    /* justify-content: center; */
    justify-content: space-around;
    align-items: center;
  }

  .category-detail{
    width: 45%;
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