<template>
    <div class="container">
        <Header title="虫草商城"></Header>
        <div class="modelBanner">
            <img src="../../assets/images/shopping-banner.png" alt="">
        </div>
        <div class="shoppingList">
            <div class="shoppingItem" v-for="order in list">
                <img :src="order.goodspic">
                <div>
                    <b>{{order.goodsname}}</b>
                    <p>{{order.goodscomment}}</p>
                    <span>￥{{order.newprice}}</span>
                    <input type="number" class="text" v-model="order.gcount">
                    <i class="shoppingAdd" @click="subOrder(order)"></i>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  import Header from '@/components/common/Header';
  import { Toast } from 'mint-ui';
  export default {
      name: 'shopping',
      components:{
          Header,
      },
      data () {
          return {
            list:[],
            selected:'首页',
            param:{
              goodsinfo:
                {"gid":"1","gname":"绿麒麟S7","gcount":"1",'uid':'7'}
            },
            orderParam:{
              level: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).level : '0',
              token:localStorage.getItem('token') || '',
            }
          }
      },
      methods:{
        subOrder(order) {
          let params={
            token:localStorage.getItem('token'),
            gid: order.goodsid,
            gcount: order.gcount || 1,
          }
          this.$axios("AddToCart", params).then((res) => {
            if(res.result){
              Toast(res.message);
              //this.$router.push('/cart')
            }
          })
        },
        getList() {
          this.$axios("GetGoodsInfo", this.orderParam).then((res) => {
            if(res.result){
              this.list = res.goodsinfo.map(item=>{
                item.gcount = 1
                return item
              })
              //Toast(res.message);
              //window.location.href= res.payurl
            }
          })
        },


      },
      mounted(){
        this.getList();
      }
  }
</script>