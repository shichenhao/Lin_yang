<template>
    <div class="container" style="padding-bottom: 0">
        <Header title="我的团队"></Header>
        <div class="teamBox">
            <div class="teamItem" v-for="item in list" :key="item.MemberUID">
                推荐人ID：{{item.MemberName}}(ID:{{item.MemberUID}})<br />
                代理级别：{{leveTxt(item.MemberLevel)}}
                库存：{{item.MemberGoods}}奖金：{{item.MemberReward}}
            </div>
            <div class="listNull" v-if="!list.length && !isLoading">
                您还没有团队信息！
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
            isLoading: true,
            list:[],
            param:{
              token:localStorage.getItem('token')
            }
          }
      },
      methods:{
        leveTxt(val){
          let text = ''
          if(val == 6){
            text = '合伙人'
          }
          else if(val == 5){
            text = '总代'
          }
          else if(val == 4){
            text = '一级代理'
          }
          else if(val == 3){
            text = '团购客户'
          }
          return text
        },
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