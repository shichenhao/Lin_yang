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
                <p>5000</p>
            </div>
            <div class="moneyItem">
                <img src="../../assets/images/money-icon2.png" />
                <h2>
                    <span>我的奖金</span>
                </h2>
                <p>5000</p>
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
          }
      },
      methods:{

      },
      mounted(){

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