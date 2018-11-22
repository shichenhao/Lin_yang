<template>
    <div class="container">
        <Header title="我的团队"></Header>
        <div class="teamBox">
            <div class="teamItem">
                阿萨德(ID:11111) 代理级别：4S<br />
                手机：13333333333<br />
                收货地址：撒开了多久奥斯卡来得及撒开了多久奥斯卡来得及撒开了多久奥斯卡来得及
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
            param:{
              UID:"700",
            }
          }
      },
      methods:{
        getInit() {
          this.$axios("GetMembers", this.param).then((res) => {
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