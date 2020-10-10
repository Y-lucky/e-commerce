<template>
  <div>
       <nav-bar class="nav-top">
          <div slot="left" class="nav-left">
              <img src="../../assets/img/common/logo.jpg" alt="">
          </div>
          <div slot="center">
             <input type="text" class="nav-input">
          </div>
          <div slot="right" class="nav-right">
              <button class="nav-button">下载APP</button>
          </div>
      </nav-bar>
      <detail-video :movie="movie" :collection="collection" @collectClick="collectClick"/>
      <detail-commend :mov-commend="movCommend"/>
      <detail-comment :comments="comments" @postcontent="postcontent" ref="commentdata"/>
  </div>
</template>

<script>
import NavBar from '../../components/common/navbar/navBar'
import DetailVideo from './childComps/DetailVideo'
import DetailCommend from './childComps/DetailCommend'
import DetailComment from './childComps/DetailComment'
export default {
    name:'Detail',
    components:{
        NavBar,
        DetailVideo,
        DetailCommend,
        DetailComment
    },
    data(){
        return{
            movie:{},
            movCommend:{},
            comments:{},
            collection:null,
            postcont:{
                comment_content:'',
                comment_date:'',
                parent_id:null,
                article_id: 0
            }
        }
    },
    created(){
        this.detailData()
        this.detailItemData()
        this.myUserInfo()
        // 加载页面时，查看视频是否收藏
        this.collectionInt()
    },
    methods:{
      async  detailData(){
          const res =await this.$http.get('/article/'+this.$route.params.id)
        //   console.log(res);
          this.movie=res.data[0]
        //   console.log(this.movie);
        },
        async detailItemData(){
            const res =await this.$http.get('commend')
            // console.log(res);
            this.movCommend=res.data
        },
        async myUserInfo(){
            const res= await this.$http.get('/user/'+localStorage.getItem('id'))
            // console.log(res);
            this.comments= res.data[0]
            // console.log(this.comments);
        },
        // 发表评论
        async postcontent(cont){
            // console.log(cont);
            // 获取发表评论日期
            const date =new Date()
            let m= date.getMonth()+1
            let d= date.getDate()
            m= m<10?'0'+m:m
            d= d<10?'0'+d:d
            this.postcont.comment_date= m+'-'+d
            this.postcont.comment_content= cont
            this.postcont.article_id= this.$route.params.id
            const res= await this.$http.post('/comment_post/'+localStorage.getItem('id'),this.postcont)
            // 发表评论成功重新调用组件里面的方法  ，刷新评论列表
            this.$refs.commentdata.getCommentData()
            if(res.status==200){
                this.$toast.show('评论发表成功')
            }
        },
        // 收藏视频
        async collectClick(){
            const res= await this.$http.post('/collection/'+localStorage.getItem('id'),{article_id:this.$route.params.id})
            // console.log(res.status);
            if(res.status === 200){
                this.$toast.show(res.data.msg)
                this.collectionInt()
            }
        },
        // 进入页面获取是否收藏的状态
       async collectionInt(){
            const res=await this.$http.get('/collection/'+localStorage.getItem('id'),{
                params:{
                    article_id:this.$route.params.id
                }
            })
            if(res.status == 200){
                // console.log(res);
                this.collection= res.data.success
            }
            
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