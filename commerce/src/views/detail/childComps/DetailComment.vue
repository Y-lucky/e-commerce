<template>
  <div class="user-info">
    <span class="user-comment">评论 ({{contentLength}})</span>
    <div class="user-img">
      <img :src="comments.user_img" alt="" v-if="comments.user_img">
      <img src="../../../assets/img/profile/Head.jpg" alt="" v-else>
      <input type="text" name="" id="" placeholder="说点什么吧"
        v-model="commentcontent"  ref="Postipt">
      <button @click="commentClick">发表</button>
    </div>
    <div v-for="(item, index) in  postcont" :key="index" class="content-item">
        <!-- 一级评论 -->
        <div class="user-content">
            <img :src="item.userinfo.user_img" alt="">
            <div class="content-info">
                <div class="content-span">
                    <span>{{item.userinfo.name}}</span>
                    <span>{{item.comment_date}}</span>
                </div>
                <p>{{item.comment_content}}</p>
            </div>
         </div>
      <comment-content :comments="item.child" style="padding-left:20px" @replyClick="replyClick"/>
    </div>
    
  </div>
</template>

<script>
import CommentContent from './CommentContent'
export default {
    components:{
        CommentContent
    },
  props: {
    comments: {},
  },
  data(){
      return{
           commentcontent:'',
           contentLength:'',
           postcont: []
      }
  },
  created() {
    this.getCommentData();
  },
  methods: {
    async getCommentData() {
      const res = await this.$http.get("/comment/" + this.$route.params.id);
      // console.log(res);
     this.postcont= this.changeComment(res.data)
     this.contentLength=this.postcont.length
    //  console.log(this.postcont);
    // 把评论按照时间进行排序
    this.postcont.sort((a,b)=>{
       return a.comment_date < b.comment_date ? 1: -1
    })
    // console.log(this.postcont);
    },
    changeComment(data){
        function fn(temp) {
        let arr1 = [];
        for (var i = 0; i < data.length; i++) {
          if (data[i].parent_id == temp) {
            arr1.push(data[i]);
            data[i].child = fn(data[i].comment_id);
          }
        }
        return arr1;
      }
      return fn(null);

    },
    commentClick() {
      if ( !this.comments && localStorage.getItem("token") && localStorage.getItem("id")) {
        this.$toast.show("请先登入");
        return;
      }
      if(this.commentcontent!==''){
        this.$emit('postcontent',this.commentcontent)
        this.commentcontent=''
        // this.getCommentData()
        return
      }
      this.$toast.show('请输入评论内容')
    },
    replyClick(id){
      // console.log(id);
      // this.$emit('replyClick',id)
      this.postcont.parent_id = id
      this.$refs.Postipt.focus()
      
    }
  }
}
</script>

<style scoped>
.user-info {
  margin: 30px 10px;
  border-bottom: 1px solid #bbb;
}
.user-comment {
  /* margin: 30px 10px; */
}

.user-img {
  margin: 10px 0px;
}
.user-img input {
  border-radius: 50px;
  margin-left: 20px;
  padding-left: 15px;
  height: 30px;
  width: 60%;
  background-color: #ddd;
  border: none;
  outline: none;
}

.user-img img {
  width: 60px;
  height: 60px;
  border-radius: 50px;
  vertical-align: middle;
}

.user-img button {
  padding: 5px 15px;
  margin-left: 13px;
  background-color: #c374c6;
  border: none;
  border-radius: 20px;
  outline: none;
  color: #fff;
}
.content-item{
    border-bottom: 1px solid #bbb;
    margin-top: 20px;
    /* padding-bottom: 10px; */
}
.user-content {
  display: flex;
  /* padding: 5px 0; */
  
}

.user-content img {
  width: 50px;
  height: 50px;
  border-radius: 50px;
}

.content-info {
  flex: 1;
  margin-left: 10px;
}

.content-span {
  display: flex;
  justify-content: space-between;
  color: #111;
  margin-bottom: 10px;
}
</style>