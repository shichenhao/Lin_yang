<template>
    <div class="container">
        <Header title="我的财富"></Header>
        <div class="moneyBox">
            <div class="modelBanner">
                <img src="../../assets/images/money-banner.png" />
            </div>
            <div class="moneyItem">
                <img src="../../assets/images/money-icon1.png" />
                <h2>
                    <span>我的库值</span>
                </h2>
                <p>{{ info['库值']}}</p>
            </div>
            <div class="moneyItem">
                <img src="../../assets/images/money-icon2.png" />
                <h2>
                    <span>我的积分</span>
                </h2>
                <p>{{ info['奖金']}}</p>
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
            info:{},
            param:{
              token:localStorage.getItem('token')
            }
          }
      },
      methods:{
        getInfo(){ // 查询购物车列表
          this.$axios("GetWealthInfo",this.param).then((res) => {
            if(res.result){
              //Toast(res.message);
              this.info= res
              //window.location.href= res.payurl
            }
          })
        },
      },
      mounted(){
        this.getInfo();
      }
  }
</script>
<style>
    @import './../../assets/css/user.css';
</style>
<style scoped>
    .container{
        background: #fff;
        bottom: 0;
    }
</style>