<template>
    <div>
        <div class="container">
            <Header title="确认订单"></Header>
            <div class="orderBox">
                <div class="address" v-if="address.user_name" @click="selectAdds">
                    <p>
                        <span>收货人：{{address.user_name}}</span>
                        手机号：{{address.user_phone}}
                    </p>
                    <p>
                        收货地址：{{address.address_province + address.address_city + address.address_area + address.address_text}}
                    </p>
                </div>
                <div class="address" v-else>
                    <p @click="selectAdds">选择地址</p>
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
                        <input type="checkbox" v-model="isRadio" id="radio">
                        <label for="radio"></label>
                        我已阅读并同意<a href="#">《支付协议》</a>
                    </i>
                </div>
            </div>
        </div>
        <div class="cartResult">
            应付合计
            <b>￥100</b>
            <a @click="submit">提交订单</a>
        </div>
        <div class="adsPop" v-if="adsShow">
            <h2>选择地址</h2>
            <div class="addressList">
                <div v-if="!list.length" class="addressNo">
                    <router-link to="/user/address/add?noId=1">您还没有地址，去创建</router-link>
                </div>
                <div class="teamItem" v-for="(item,index) in list" :key="index" @click="checks(item)">
                    <span>选择</span>
                    {{item.user_name}}<br />
                    手机：{{item.user_phone}}<br />
                    收货地址：{{item.address_province + item.address_city + item.address_area + item.address_text}}
                </div>
            </div>
            <div class="btn" @click="adsShow = false">取消</div>
        </div>
    </div>
</template>
<script>
  import Header from '@/components/common/Header.vue';
  import { Toast } from 'mint-ui';
  export default {
      name: 'cart',
      components:{
          Header,
      },
      data () {
          return {
            adsShow:false,
            isRadio:false,
            list:[],
            address:{

            },
            param:{
              "cellphone":"13521389588",
              "name":"test",
              "address":"北京",
              "orderinfo":"特惠装10盒",
              "level":"5",
              "totalprice":"3000",
              "uid":"700"
            },
            adsParam:{
              token:localStorage.getItem('token')
            }
          }
      },
      methods:{
        selectAdds(){ // 选择收货地址
          this.adsShow = true
          this.$axios("GetAddress", this.adsParam).then((res) => {
            this.list = res.address
          })
        },
        checks(item){
          this.address = item
          this.adsShow = false
        },
        submit() {
          if(this.address.user_name){
            Toast('请选择收货地址!')
            return false
          }
          if(this.isRadio){
              this.$axios("MemberOrder", this.param).then((res) => {
                if(res.result){
                  Toast('下单成功!');
                  return false
                  window.location.href= res.payurl
                }
              })
          }else{
            Toast('请同意支付协议!')
          }
        },

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
    .choice input[type='checkbox']:checked + label:after{
        background: #005b53;
        border-color: #fff;
    }
    .choice input[type='checkbox']:checked + label:before{
        border-color: #005b53;
        background: #005b53;
    }
</style>