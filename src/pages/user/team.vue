<template>
    <div class="container">
        <Header title="我的团队"></Header>
        <div class="teamBox">
            <div class="teamItem" v-for="item in list" :key="item.MemberUID">
                推荐人ID：{{item.MemberIntro}}(ID:{{item.MemberUID}}) 代理级别：{{item.MemberLevel}}S<br />
                库值：{{item.MemberGoods}}奖金：{{item.MemberReward}}
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
            list:[],
            param:{
              token:localStorage.getItem('token')
            }
          }
      },
      methods:{
        getInit() {
          this.$axios("GetTeamInfo", this.param).then((res) => {
            this.list = res.teaminfo
          })
        },
      },
      mounted(){
        this.getInit();
      }
  }
</script>
<style>
    @import './../../assets/css/user.css';
</style>