<template>
    <div class="container" style="padding-bottom: 1rem;">
        <Header title="我的地址"></Header>
        <div class="addressList">
            <div class="teamItem" v-for="(item,index) in list" :key="index">
                {{item.user_name}}<br />
                手机：{{item.user_phone}}<br />
                收货地址：{{item.address_province + item.address_city + item.address_area + item.address_text}}
                <span @click="deleteItem(item.address_id)">✖</span>
            </div>
            <div class="listNull" v-if="!list.length && !isLoading">
                您还没有团队信息！
            </div>
            <router-link to="/user/address/add">
                添加地址
            </router-link>
        </div>
    </div>
</template>
<script>
  import Header from '@/components/common/Header.vue';
  import { Toast } from 'mint-ui';
  export default {
      name: 'addres',
      components:{
          Header,
      },
      data () {
          return {
            isLoading:true,
            list:[],
            param:{
              token:localStorage.getItem('token')
            },
            removeParam:{
              token:localStorage.getItem('token'),
              addrid: ''
            }
          }
      },
      methods:{
        getInit() {
          this.isLoading= true
          this.$axios("GetAddress", this.param).then((res) => {
            this.isLoading= false
            this.list = res.address
          })
        },
        deleteItem(addrid){
          this.removeParam.addrid = addrid
          this.$axios("DeleteAddress", this.removeParam).then((res) => {
            if(res.result){
              Toast('删除成功!')
              this.getInit();
            }else{
              Toast(res.message)
            }
          })
        }
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