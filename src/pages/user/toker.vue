<template>
    <div class="container">
        <Header title="拓客信息"></Header>
        <div class="teamBox">
            <div class="teamItem" v-for="item in list" :key="item.MemberUID">
                {{item.MemberName}}(ID:{{item.MemberUID}}) 代理级别：4S<br />
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
            list:[],
            param:{
              token:localStorage.getItem('token'),
              level: JSON.parse(localStorage.getItem('userInfo')).level
            }
          }
      },
      methods:{
        getInit() {
          this.$axios("GetTryUser", this.param).then((res) => {
            this.list = res.Members
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