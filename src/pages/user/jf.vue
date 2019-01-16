<template>
    <div class="container">
        <Header title="我的积分"></Header>
        <div class="moneyBox">
            <div class="moneyItem">
                <h2>
                    <span><img src="../../assets/images/money-icon2.png" /></span>
                </h2>
                <div class="h2">我的积分</div>
                <p>{{ info['当前积分'] || 0}}</p>
                <div class="h2">历史积分</div>
                <p style="border:0 none">{{ info['历史积分'] || 0}}</p>
            </div>
        </div>
        <div class="moneyBox moneyBox2">
            <div class="moneyItem">
                <h2>
                    <span>积分转拨</span>
                </h2>
                <ul>
                    <li>
                        <input type="text" maxlength="6" v-model="param.name" placeholder="代理商姓名">
                    </li>
                    <li>
                        <input type="number" maxlength="11" v-model="param.cellphone" placeholder="手机号码">
                    </li>
                    <li>
                        <input type="text" maxlength="18" v-model="param.idnumber" placeholder="会员编号">
                    </li>
                    <li>
                        <input type="text" maxlength="10" v-model="param.number" placeholder="转拨数量">
                    </li>
                    <li class="pad">
                        <a class="changeA" href="#">我要换货</a>
                        <a class="btn" @click="go">确　　认</a>
                    </li>
                </ul>
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
              token:localStorage.getItem('token'),
              name: '',
              cellphone: '',
              idnumber: '',
              number: '',
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
        go(){
          console.log(1)
        }
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