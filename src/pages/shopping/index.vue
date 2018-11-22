<template>
    <div class="container">
        <Header title="虫草商城"></Header>
        <div class="modelBanner">
            <img src="../../assets/images/shopping-banner.png" alt="">
        </div>
        <div class="shoppingList">
            <div class="shoppingItem">
                <img src="https://tpc.googlesyndication.com/daca_images/simgad/11927477777367109922" alt="">
                <div>
                    <b>{{order.name}}</b>
                    <p>{{order.orderinfo}}</p>
                    <span>￥{{order.price}}</span>
                    <i class="shoppingAdd" @click="subOrder"></i>
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
            order:{
              orderinfo:"60g(5g/袋)",
              price:"46",
              name:"特惠装",
            },
            selected:'首页',
            param:{
              "cellphone":"13521389588",
              "name":"test",
              "address":"北京",
              "orderinfo":"特惠装1盒",
              "level":"2",
              "totalprice":"777",
              "uid":"700"
            }
          }
      },
      methods:{
        subOrder() {
          this.$axios("SaleOrder", this.param).then((res) => {
            if(res.result){
              Toast('下单成功!');
              window.location.href= res.payurl
            }
          })
        },


      },
      mounted(){

      }
  }
</script>