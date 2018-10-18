<template>
    <div class="container">
        <Header title="购物车" :isShow="true"></Header>
        <div class="cartBox">
            <div class="shoppingList">
                <div class="shoppingItem">
                    <div class='choice'>
                        <input type='checkbox' id='checkbox1' name='checkboox'>
                        <label for='checkbox1'></label>
                    </div>
                    <img src="https://tpc.googlesyndication.com/daca_images/simgad/11927477777367109922" alt="">
                    <div>
                        <b>特惠装</b>
                        <p>60g(5g/袋)</p>
                        <span>￥222</span>
                        <div class="cartNumber">
                            <i class="shoppingRemove"></i>
                            1
                            <i class="shoppingAdd"></i>
                        </div>
                    </div>
                </div>
                <div class="shoppingItem">
                    <div class='choice'>
                        <input type='checkbox' id='checkbox2' name='checkboox'>
                        <label for='checkbox2'></label>
                    </div>
                    <img src="https://tpc.googlesyndication.com/daca_images/simgad/11927477777367109922" alt="">
                    <div>
                        <b>特惠装</b>
                        <p>60g(5g/袋)</p>
                        <span>￥222</span>
                        <i class="shoppingRemove"></i>
                        <i class="shoppingNumber">1</i>
                        <i class="shoppingAdd"></i>
                    </div>
                </div>
                <div class="cartResult">
                    应付合计
                    <b>￥100</b>
                    <router-link to="/cart/order">结算</router-link>
                </div>
            </div>
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