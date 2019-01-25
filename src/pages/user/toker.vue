<template>
    <div class="container" style="padding-bottom: 0">
        <Header title="我的业绩"></Header>
        <div class="myYeji">
            历史业绩:{{list['历史业绩']}}　当月业绩:{{list['当月业绩']}}
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
            list:{},
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
          this.$axios("GetSales", this.param).then((res) => {
            this.isLoading = false
            this.list = res
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