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
      <profile-info/>
      <profile-dyna/>
  </div>
</template>

<script>
import NavBar from '../../components/common/navbar/navBar'
import ProfileInfo from './childComps/ProfileInfo'
import profileDyna from './childComps/profileDyna'
export default {
    name:'Profile',
    components:{
        ProfileInfo,
        profileDyna,
        NavBar
    },
    data(){
        return{
            username:''
        }
    }
}
</script>

<style>
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
</style>