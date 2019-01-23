<template>
    <div class="container" style="padding-bottom: 0">
        <Header title="拓客信息"></Header>
        <div class="teamBox">
            <div class="teamItem" v-for="item in list" :key="item.MemberUID">
                推荐人ID：{{item.MemberIntro}}(ID:{{item.MemberUID}}) 代理级别：{{item.MemberLevel}}S<br />
                库存：{{item.MemberGoods}}奖金：{{item.MemberReward}}
            </div>
            <div class="listNull" v-if="!list.length && !isLoading">
                您还没有拓客信息！
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
            list:[],
            param:{
              token:localStorage.getItem('token'),
              level: JSON.parse(localStorage.getItem('userInfo')).level
            }
          }
      },
      methods:{
        getInit() {
          this.isLoading = true
          this.$axios("GetTeamInfo", this.param).then((res) => {
            this.isLoading = false
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