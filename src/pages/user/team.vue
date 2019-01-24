<template>
    <div class="container" style="padding-bottom: 0">
        <Header title="我的团队"></Header>
        <div class="teamBox">
            <select class="select" v-model="level" @change="handleChange">
                <option :value="item.val" v-for="item in levelList">{{item.html}}</option>
            </select>
            <div class="teamItem" v-for="item in list" :key="item.MemberUID">
                推荐人：{{item.MemberName}} ID:{{item.MemberUID}}<br />
                代理级别：{{leveTxt(item.MemberLevel)}}<br />
                库存：{{item.MemberGoods}}奖金：{{item.MemberReward}}
            </div>
            <div class="listNull" v-if="!list.length && !isLoading">
                没有团队信息！
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
            list2:[],
            level:'0',
            levelList:[{
              val:0,
              html:'全部'
            },{
              val:1,
              html:'体验客户'
            },{
              val:3,
              html:'团购客户'
            },{
              val:4,
              html:'一级代理'
            },{
              val:5,
              html:'总代'
            },{
              val:6,
              html:'合伙人'
            }],
            param:{
              token:localStorage.getItem('token')
            }
          }
      },
      methods:{
        handleChange(){
          let val = this.level
          this.list = this.list2.filter(item=>{
            if(val === 0){
              return item
            } else{
              return item.MemberLevel == val
            }
          })
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
            this.list2 = res.teaminfo
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