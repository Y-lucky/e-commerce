<template>
  <div id="home">
      <nav-bar class="nav-top">
          <div slot="left" class="nav-left">
              <img src="../../assets/img/common/logo.jpg" alt="">
          </div>
          <div slot="center">
             <input type="text" class="nav-input">
          </div>
          <div slot="right" class="nav-right" @click="$router.push('/profile/')">
              <img :src="imgUrl" alt="">
          </div>
      </nav-bar>
      <home-tab :category="category" @homeTap="homeTap" :categoryitem="categoryitem" @scroll.passive="onScroll"/>
  </div>
</template>

<script>
import navBar from '../../components/common/navbar/navBar'
import homeTab from './childComps/homeTab'

// import {getHometab} from '../../network/home'
export default {
    components:{
        navBar,
        homeTab
    },
    data(){
        return{
            category:[],
            categoryitem:[],
            id: 9,
            page: 0,
            pagesize: 20,
            index: '0',
            imgUrl:''
        }
    },
    created(){
        // 获取首页tab栏的数据
        this.getHomeCategory()
    },
    methods:{
            // 获取首页tab栏的数据
        async getHomeCategory(){
            const res=await this.$http.get('/category')
            //  console.log(res);
            //  this.category = res.data
            //  console.log(this.category);
            this.changeCategory(res.data)
           
        },

        // 改造res.data，添加item.list数组
        changeCategory(data){
            const category1=data.map((item)=>{
                item.list=[]
                item.page= 0
                item.pagesize= 10
                return item
            })
            this.category=category1
            // console.log(this.category);
            // 请求tab里面的视频列表
            this.getCategoryItem(this.id, this.page, this.pagesize, this.index)
        },
        // 子组件传回来的下标元素
        homeTap(id, page, pagesize, index){
            // 点击请求视频数据
            this.getCategoryItem(id, page, pagesize, index)
        },
        async getCategoryItem(id, page, pagesize, index){
            const res=await this.$http.get('/detail/'+id,{
              params:{
                  page,
                  pagesize
              }
          })
            this.category[index].list.push(...res.data)
            this.categoryitem= this.category[index].list
            this.category[index].page += 1
        },
        onScroll(){
            if((document.querySelector.scrollTop + window.innerHeight)==document.body.offsetHeight){
                // if(this.params)
                // console.log(222);
                this.getCategoryItem()
            }
        }
   },
  async mounted(){
    //   获取navbar上的头像
       const res= await this.$http.get('/user/'+localStorage.getItem('id'))
       console.log(res);
       this.imgUrl=res.data[0].user_img
   }
}
</script>

<style scoped>
    .home{
        height: 100%;
    }

    .nav-top{
        text-align: center;
        position: fixed;
        left: 0;
        top: 0;
        background-color: #fff;
        z-index: 9;
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

    .nav-right img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
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