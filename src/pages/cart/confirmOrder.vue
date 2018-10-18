<template>
    <div>
        <div class="container">
            <Header title="确认订单"></Header>
            <div class="orderBox">
                <div class="address">
                    <p>
                        <span>收货人：订单</span>
                        手机号：111
                    </p>
                    <p>
                        收货地址：
                    </p>
                </div>
                <div class="address orderInfo">
                    <p>订单信息</p>
                    <div class="orderInfoItem">
                        <span>
                            撒旦立刻<br />
                            礼品在(50g/100元)
                        </span>
                        <span>
                            x1
                        </span>
                        <b>￥100</b>
                    </div>
                    <div class="orderInfoResult">
                        合计
                        <b>￥100</b>
                    </div>
                </div>
                <div class="orderMoney">
                    <ul>
                        <li>
                            使用库值
                            <span>
                                <img src="./../../assets/images/money-icon1.png" alt="">
                                5000
                            </span>
                        </li>
                        <li>
                            使用奖金
                            <span>
                                <img src="./../../assets/images/money-icon2.png" alt="">
                                5000
                            </span>
                        </li>
                    </ul>
                </div>
                <div class="agreement">
                    <i class="choice">
                        <input type="checkbox" id="radio">
                        <label for="radio"></label>
                        我已阅读并同意<a href="#">《支付协议》</a>
                    </i>
                </div>
            </div>
        </div>
        <div class="cartResult">
            应付合计
            <b>￥100</b>
            <a>提交订单</a>
        </div>
    </div>
</template>
<script>
  import Header from '@/components/common/Header.vue';
  export default {
      name: 'cart',
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
<style scoped>
    .cartResult{
        bottom: 0;
    }
    .choice{
        padding-left: .42rem;
    }
    .choice label:before{
        top: .0rem;
        border-radius: 0;
        width: .3rem;
        height: .3rem;
        background: #a2d7d4;
        border-color: #a2d7d4;
        border-width: 1px;
    }
    .choice label:after{
        width: .05rem;
        height: .15rem;
        left: .14rem;
        background: #a2d7d4;
        border-width: 1px;
    }
    .choice input[type='checkbox']:checked + label:before{
        border-color: #005b53;
    }
</style>