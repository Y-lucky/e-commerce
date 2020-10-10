<template>
  <div>
      <nav-bar class="nav-top">
         <div slot="left" class="nav-left" @click="$router.push('/home/')">
                <img src="../../assets/img/common/logo.jpg" alt="">
            </div>
          <div slot="center">
             <input type="text" class="nav-input">
          </div>
          <div slot="right" class="nav-right">
              <button class="nav-button">下载APP</button>
          </div>
      </nav-bar>
      <div class="edit-data">
         
        <edit-banner left="头像">
            <el-upload slot="right"
              class="avatar-uploader"
              action="http://112.74.99.5:3000/web/api/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess">
              <img v-if="model.user_img" :src="model.user_img" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </edit-banner>
        <edit-banner left="昵称" @click="nameclick">
          <a href="javascript:;" slot="right">{{model.name}}</a>
        </edit-banner>
        <edit-banner left="账号"><span slot="right">{{model.username}}</span></edit-banner>
        <edit-banner left="性别"><span slot="right">女</span></edit-banner>
        <edit-banner left="出生日期"></edit-banner>
        <edit-banner left="个签"><p slot="right">我想静静</p></edit-banner>
      </div>
      <!-- <div>
        <span>请输入昵称</span>
        <input type="text">
        <button></button><button></button>
      </div> -->
  </div>
</template>

<script>
import NavBar from '../../components/common/navbar/navBar'
import EditBanner from './EditBanner'
export default {
  components:{
    NavBar,
    EditBanner
  },
  data(){
    return{
      model:{},
      editName:false
    }
  },
 created(){
   this.userDate()
 },
 methods:{
  async userDate(){
     const res=await this.$http.get('/user/'+localStorage.getItem('id'))
    //  console.log(res);
     this.model=res.data[0]
   },
  //  头像上传
  async handleAvatarSuccess(res,file) {
    console.log(res);
    console.log(file);
    const fromdata=new FormData()
    fromdata.append('file',file.raw)
    const result =await this.$http.post('/upload',fromdata)
    this.model.user_img=result.data.url
    // console.log(result);
    this.userUpData()
  },
  // 发送修改头像的数据给后台
  async userUpData(){
   const res=await this.$http.post('/update/'+localStorage.getItem('id'),this.model)
   console.log(res);
  },
  nameclick(){

  }
 }
}
</script>

<style scoped>
  .nav-top{
      text-align: center;
    }

    .nav-left{
      width: 80px;
    }

    .nav-left img{
        width: 85px;
        vertical-align: middle;
    }

    .nav-input{
        width: 230px;
        height: 30px;
        /* background-color: blueviolet; */
        border-radius: 20px;
        border: none;
        border: 1px solid #c374c6;
        outline: none;
        padding-left: 15px;
    }
    .nav-right{
        width: 100px;
    }

    .nav-button{
        text-align: center;
        padding: 5px 5px 5px 5px;
        border: none;
        background-color: #c374c6;
        color: #fff;
        outline: none;
        border-radius: 5px;
    }

    .edit-data{
      border-top: 10px solid #eee;
    }

    .avatar{
      height: 45px;
      width: 45px;
      border-radius: 50%;
    }
</style>