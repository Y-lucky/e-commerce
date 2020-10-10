<template>
  <div class="login">
      <nav-bar class="login-nav">
          <div slot="left"><span></span></div>
      </nav-bar>
      <div class="login-decem">登入Decem</div>
      <el-form ref="loginFormRef" :model="loginFrom" :rules="loginFromRules">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="loginFrom.username" prefix-icon="el-icon-user-solid" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <!-- 密码 -->
         <el-form-item prop="password">
          <el-input v-model="loginFrom.password" prefix-icon="el-icon-c-scale-to-original" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <!-- 登入 -->
        <el-form-item >
          <el-button type="primary" round class="log-in" @click="loginClick">登入</el-button>
          <span class="forget-password">忘记密码？</span>
        </el-form-item>
        <!-- 注册 -->
         <el-form-item class="no-account">
            <span>还没有账号？</span>
            <el-button type="primary" round class="registered" @click="$router.push('/register')">注册</el-button>
        </el-form-item>
        
      </el-form>
  </div>
</template>

<script>
import navBar from '../../components/common/navbar/navBar'

export default {
    components:{
        navBar
    },
    data(){
      return{
        // 登入表单的数据验证
        loginFrom:{
          username:'',
          password:''
        },
        loginFromRules:{
          // 验证用户名是否合法
          username:[
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 6, message: '长度在 3 到 6个字符', trigger: 'blur' }
          ],
          // 验证密码是否合法
          password:[ 
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 15, message: '长度在 6 到 15个字符', trigger: 'blur' }
          ]
        }
      }
    },
    created() {
    },
    methods: {
      // 表单的预验证
       async loginClick() {
                const res =  await this.$http.post('/login',this.loginFrom)
                this.$toast.show(res.data.msg)
                if(res.data.code == 301 || res.data.code == 302){
                    return
                }
                localStorage.setItem('token',res.data.token)
                localStorage.setItem('id',res.data.id)
                localStorage.setItem('name',this.loginFrom.username)
                setTimeout(() => {  
                    this.$router.push('/profile')
                },1000)
        }
        
    },
}
</script>

<style scoped>
  .login{
    height: 100%;
  }

  .login-nav span::after{
    content: '';
    height: 30px;
    width: 30px;
    display: block;
    background: url('../../assets/img/common/arrow_left.svg');
    background-size: 30px;
    margin-top: 6px;
  }
  .login-decem{
    height: 200px;
    line-height: 200px;
    text-align: center;
    font-size: 50px;
  }

  .el-form{
    margin: 0px 40px 40px 40px;
    text-align: center;
  }

  .el-input{
    margin-top: 25px;
  }

  .log-in{
    width: 100%;
    background-color: #c374c6;
    border: 1px solid #fff; 
    margin-top: 25px;
  }


  .no-account{
    margin-top: 70px;
  }

  .registered{
    width: 100%;
    border: 1px solid #c374c6; 
    background-color: #fff;
    color: #c374c6;
  }


</style>