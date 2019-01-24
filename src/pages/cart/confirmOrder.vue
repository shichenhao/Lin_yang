<template>
    <div>
        <div class="container" style="padding-bottom:1.2rem">
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
                    <div class="orderInfoItem" v-for="item in list">
                        <span>
                            {{item.goodsname}}<br />
                            {{item.goodscomment}}
                        </span>
                        <b>
                            {{item.product_num}} 箱
                        </b>
                    </div>
                    <div class="orderInfoResult">
                        合计:
                        <b>￥{{price}}</b>
                    </div>
                </div>
                <div class="orderMoney">
                    <ul>
                        <li>
                            库存
                            <span>
                                <img src="./../../assets/images/money-icon1.png" alt="">
                                {{info['库值']}}箱
                            </span>
                        </li>
                        <li v-if="false">
                            奖金
                            <span>
                                <img src="./../../assets/images/money-icon2.png" alt="">
                                {{info['奖金']}}
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
            合计:
            <b>{{price}} 箱</b>
            <a @click="submit">提交订单</a>
        </div>
        <div class="adsPop" v-if="adsShow">
            <h2>选择地址</h2>
            <div class="addressList">
                <div v-if="!addList.length" class="addressNo">
                    <router-link to="/user/address/add?noId=1">您还没有地址，去创建</router-link>
                </div>
                <div class="teamItem" v-for="(item,index) in addList" :key="index" @click="checks(item)">
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
            addList:[],
            info:{},
            price:'',
            address:{

            },
            param:{
              token:localStorage.getItem('token')
            },
            adsParam:{
              token:localStorage.getItem('token')
            }
          }
      },
      methods:{
        getCar(){
          this.list = JSON.parse(localStorage.getItem('car'))
          this.price = localStorage.getItem('carPrice')
          this.level = localStorage.getItem('userInfo').level

          this.$axios("GetWealthInfo",this.param).then((res) => {
            if(res.result){
              //Toast(res.message);
              this.info= res
              //window.location.href= res.payurl
            }
          })
        },
        selectAdds(){ // 选择收货地址
          this.adsShow = true
          this.$axios("GetAddress", this.adsParam).then((res) => {
            this.addList = res.address
          })
        },
        checks(item){
          this.address = item
          this.adsShow = false
        },
        submit() {
          if(!this.address.user_name){
            Toast('请选择收货地址!')
            return false
          }
          if(this.isRadio){
            let param = {
              token:localStorage.getItem('token'),
              name: this.address.user_name,
              phone:this.address.user_phone,
              address:this.address.address_province + this.address.address_city + this.address.address_area + this.address.address_text
            }
            this.$axios("CartOrder", param).then((res) => {
              if(res.result){
                Toast('发货成功!');
                // window.location.href= res.payurl
                setTimeout(()=>{
                  this.$router.push('/')
                })
              }
            })


              /*this.$axios("MemberOrder", this.param).then((res) => {
                if(res.result){
                  Toast('下单成功!');
                  return false
                  window.location.href= res.payurl
                }
              })*/
          }else{
            Toast('请同意支付协议!')
          }
        },

      },
      created(){
        this.getCar()
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