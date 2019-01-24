<template>
    <div class="container" style="padding-bottom: 0">
        <Header title="我的业绩"></Header>
        <div class="teamBox">
            <select class="select" v-if="false" v-model="level" @change="handleChange">
                <option :value="item.val" v-for="item in levelList">{{item.html}}</option>
            </select>
            <div class="teamItem" v-for="item in list" :key="item.MemberUID">
                推荐人ID：{{item.MemberIntro}}(ID:{{item.MemberUID}})<br>
                代理级别：{{leveTxt(item.MemberLevel)}}<br />
                库存：{{item.MemberGoods}}奖金：{{item.MemberReward}}
            </div>
            <div class="listNull" v-if="!list.length && !isLoading">
                您还没有业绩！
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
            isLoading:true,
            levelList:[{
              val:0,
              html:'全部'
            },{
              val:'1',
              html:'当月业绩'
            },{
              val:'2',
              html:'历史业绩'
            }],
            list:[],
            list2:[],
            param:{
              token:localStorage.getItem('token'),
              level: JSON.parse(localStorage.getItem('userInfo')).level
            }
          }
      },
      methods:{
        handleChange(){
          let val = this.level
        },
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
          else if(val == 1){
            text = '体验客户'
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