<template>
  <div>
      <img src="@/assets/img/profile/timg.jpg" alt="" class="profile-img">
      <div class="profile-info">
          <div class="info-item-img">
              <img :src="imgUrl" alt="">
          </div>
          <div class="info-item">
              <div class="item-detail">
                  <div class="item-detail-fans">
                      <span class="items">{{fans}}</span>
                      <span>粉丝</span>
                  </div>|
                  <div class="item-detail-fans">
                        <span class="items">{{attention}}</span>
                        <span>关注</span>
                  </div>|
                  <div class="item-detail-fans">
                        <span class="items">{{praise}}</span>
                        <span>获赞</span>
                  </div>
              </div>
              <div class="item-data" @click="$router.push('/editdata/')">编辑资料</div>
          </div>
      </div>
      <div class="user-info">
          <span class="username">{{username}}</span>
          <div class="profile-infomation">
              <p class="infor-item">
                  <span>这个人很神秘，什么都没有写</span>
                  <span>{{userId}}</span>
              </p>
              <span class="pack-up">收起</span>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name:'ProfileInfo',
    data(){
        return{
            fans: 0,
            attention: 23,
            praise: 0,
            username:'',
            userId:'45785355',
            imgUrl:'',
        }
    },
    async mounted(){
    //   获取navbar上的头像
       const res= await this.$http.get('/user/'+localStorage.getItem('id'))
       console.log(res);
       this.imgUrl=res.data[0].user_img
       this.username=res.data[0].name
    }
}
</script>

<style scoped>
    .profile-img{
        width: 100%;
        height: 150px;
        overflow: hidden;
    }

    .profile-info{
        display: flex;
    }

    .info-item-img{
        width: 105px;
        margin: -15px 20px 0 20px;
    }
    
    .info-item-img img{
        height: 105px;
        width: 105px;
        border-radius: 50%;
    }
    .info-item{
        flex: 1;
        align-items: center;
        justify-content: center;
        margin: 0 20px 0 0;
    }

    .items{
        display: block;
    }

    .item-detail{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 60px;
    }

    .item-detail-fans{
        flex: 1;
        text-align: center;
    }

    .item-data{
        height: 35px;
        width: 100%;
        line-height: 35px;
        text-align: center;
        border: 1px solid #c374c6;
        border-radius: 10px;
        color: #c374c6;
    }

    .user-info{
        padding: 20px 20px 10px 20px;
    }
    
    .username{
        font-size: 25px;
        padding-left: 10px;
    }

    .profile-infomation{
        display: flex;
        justify-content: space-between;
        margin-top: 8px;
    }

    .infor-item span{
        display: block;
        margin-top: 5px;
    }

    .pack-up{
        color: #c374c6;
        font-weight: 700;
    }
</style>