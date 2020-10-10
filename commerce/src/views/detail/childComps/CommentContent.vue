<template>
  <div>
      <div v-for="(item,index) in comments" :key="index" style="padding:20px 0">
          <div class="user-content" >
                <img :src="item.userinfo.user_img" alt="">
                <div class="content-info">
                    <div class="content-span">
                        <span>{{item.userinfo.name}}</span>
                        <span>{{item.comment_date}}</span>
                    </div>
                </div>
            </div>
            <div class="content-item">
                <!-- vue的递归组件 -->
                <span v-if="!temp">{{item.comment_content}}<span class="reply" @click="replyClick(item.comment_id)">回复</span></span>
                <span v-else>回复<span style="color:#c374c6">{{item.parent_user_info.name}}
                    </span>:{{item.comment_content}}<span class="reply" @click="replyClick(item.comment_id)">回复</span>
                </span> 
            </div>
             <comment-content :comments="item.child" :temp="true"/>
      </div>
    
  </div>
</template>

<script>
export default {
    name:'CommentContent',
    props:{
        comments:{
            type:Array,
            defalut(){
                return[]
            }
        },
        temp:null
    },
    methods:{
        replyClick(id){
            console.log(id);
            this.$emit('replyClick',id)
        }
    }
}
</script>

<style scoped>
    .user-content {
    display: flex;
    /* flex-direction: column; */
    width: 100%;
    /* padding: 20px 0; */
    
    }

    .user-content img {
    width: 50px;
    height: 50px;
    border-radius: 50px;
    /* vertical-align: middle; */
    }

    .content-info {
    flex: 1;
    /* margin-left: 10px; */
    }

    .content-span {
    display: flex;
    justify-content: space-between;
    color: #111;
    margin-bottom: 10px;
    }

    .content-item{
        position: relative;
        padding: 10px 0;
    }
    .reply{
        position: absolute;
        top: 0;
        right: 0;
        color: #c374c6;
    }
</style>