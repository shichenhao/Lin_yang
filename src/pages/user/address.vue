<template>
    <div class="container" style="bottom: 0;">
        <Header title="我的地址"></Header>
        <div class="addressList">
            <div class="teamItem" v-for="(item,index) in list" :key="index">
                {{item.user_name}}<br />
                手机：{{item.user_phone}}<br />
                收货地址：{{item.address_province + item.address_city + item.address_area + item.address_text}}
            </div>
            <router-link to="/user/address/add">
                添加地址
            </router-link>
        </div>
    </div>
</template>
<script>
  import Header from '@/components/common/Header.vue';
  export default {
      name: 'addres',
      components:{
          Header,
      },
      data () {
          return {
            list:[],
            param:{
              token:localStorage.getItem('token')
            }
          }
      },
      methods:{
        getInit() {
          this.$axios("GetAddress", this.param).then((res) => {
            this.list = res.address
          })
        },
      },
      mounted(){
        this.getInit();
      }
  }
</script>
<style>
    @import './../../assets/css/user.css';
</style>
<style scoped>
    .teamItem{
        padding: .2rem;
        border-bottom: 1px solid #ccc;
    }
</style>