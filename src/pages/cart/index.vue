<template>
    <div class="container">
        <Header title="购物车" :isShow="true"></Header>
        <div class="cartBox">
            <div class="shoppingList">
                <div class="shoppingItem" v-for="item in cartList" :key="item.goodsid">
                    <div class='choice'>
                        <label @click="check(item)" :class="{isCheck : item.selected == 1}"></label>
                    </div>
                    <img :src="item.goodspic" alt="">
                    <div class="cartItem">
                        <b>{{item.goodsname}}</b>
                        <p>{{item.goodscomment || cartInfo.content}}</p>
                        <span>￥{{item.newprice || cartInfo.price}}</span>
                        <div class="cartNumber">
                            <i class="shoppingRemove" @click="updateGoods(item,0)"></i>
                            {{item.product_num}}
                            <i class="shoppingAdd" @click="updateGoods(item,1)"></i>
                        </div>
                    </div>
                </div>
                <div class="cartResult">
                    应付合计
                    <b>￥{{price || 0}}</b>
                    <a @click="setOrder">结算</a>
                </div>
            </div>
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
            param:{
              token:localStorage.getItem('token'),
              uid: '7' || JSON.parse(localStorage.getItem('userInfo')).UID
            },
            cartList:[],
            cartInfo:{
                'name':'特惠装1',
                'content':'60g(5g/袋)',
                'num':'1',
                'price':'46',
                'img':'https://tpc.googlesyndication.com/daca_images/simgad/11927477777367109922',
            },
          }
      },
      computed: {
        price() {
          let num = null
          this.cartList.forEach(item=>{
            if(item.selected === '1'){
              num+=(item.newprice * item.product_num).toFixed(2)*1
            }
          })
          return num
        }
      },
      methods:{
        check(item){
          let param = {
            token:localStorage.getItem('token'),
            gid:item.goodsid,
            gcount:0,
            selected:item.selected == 0 ? 1 : 0
          }
          this.$axios("ChangeCartInfo", param).then((res) => {
            if(res.result){
              item.isCheck = !item.isCheck
              this.getList();
              //window.location.href= res.payurl
            }
          })


        },
        getList(){ // 查询购物车列表
          this.$axios("GetCartInfo", this.param).then((res) => {
            if(res.result){
              //Toast(res.message);
              this.cartList= res.goodsinfo.map(item=>{
                item.isCheck=false
                return item
              })
              //window.location.href= res.payurl
            }
          })
        },
        updateGoods(item,type){ //更新数量
          console.log(item.product_num)
          if(type === 0 && item.product_num === '1'){
            return false
          }
          let param = {
            token:localStorage.getItem('token'),
            gid:item.goodsid,
            gcount:type ? '1' : '-1',
            selected:item.selected
          }
          this.$axios("ChangeCartInfo", param).then((res) => {
            if(res.result){
              this.getList();
              //window.location.href= res.payurl
            }
          })
        },
        setOrder(){
          if(this.cartList.some(item=>{
            return item.selected === '1'
            })){
            localStorage.setItem('car', JSON.stringify(this.cartList))
            localStorage.setItem('carPrice', this.price)
            this.$router.push('/cart/order')
          }else{
            Toast('请选择要结算的商品');
            return false
          }
          //this.$router.push('/cart/order')
        }

      },
      mounted(){
        this.getList();
        // localStorage.setItem('msgArr',true)
      }
  }
</script>