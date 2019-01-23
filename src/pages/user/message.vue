<template>
    <div class="container">
        <Header title="消息中心"></Header>
        <div class="messageBox">
            <div class="messageItem" v-for="item in list" :key="item.news_id">
                <h2>{{item.news_title}}<span></span></h2>
                <p v-html="item.news_text"></p>
            </div>
            <div class="listNull" v-if="!list.length && !isLoading">
                您还没有消息！
            </div>
        </div>
    </div>
</template>
<script>
  import Header from '@/components/common/Header.vue';
  export default {
      name: 'message',
      components:{
          Header,
      },
      data () {
          return {
            isLoading:true,
            param:{
              token:localStorage.getItem('token') || ''
            },
            list:[]
          }
      },
      methods:{
        getList(){
          this.isLoading = true
          this.$axios("GetMessages", this.param).then((res) => {
            this.isLoading = false
            if(res.result){
              this.list=res.Messages
            }
          })
        }

      },
      mounted(){
        this.getList();
      }
  }
</script>
<style>
    @import './../../assets/css/user.css';
</style>