<template>
    <div class="container">
        <Header title="消息中心"></Header>
        <div class="messageBox">
            <select class="select" v-model="level" @change="handleChange">
                <option :value="item.val" v-for="item in levelList">{{item.html}}</option>
            </select>
            <div class="messageItem" v-for="item in list" :key="item.news_id">
                <h2>{{item.news_title}}<span></span></h2>
                <p v-html="item.news_text"></p>
            </div>
            <div class="listNull" v-if="!list.length && !isLoading">
                没有消息！
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
            level:0,
            levelList:[{
              val:0,
              html:'全部'
            },{
              val:'1',
              html:'库存变化'
            },{
              val:'2',
              html:'积分变化'
            },{
              val:'3',
              html:'订单状态'
            },{
              val:'4',
              html:'平推收益'
            }],
            isLoading:true,
            param:{
              token:localStorage.getItem('token') || ''
            },
            list:[],
            list2:[]
          }
      },
      methods:{
        handleChange(){
          let val = this.level
          this.list = this.list2.filter(item=>{
            if(val === 0){
              return item
            } else{
              return item['class_id'] == val
            }
          })
        },
        getList(){
          this.isLoading = true
          this.$axios("GetMessages", this.param).then((res) => {
            this.isLoading = false
            if(res.result){
              this.list=res.Messages
              this.list2=res.Messages
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