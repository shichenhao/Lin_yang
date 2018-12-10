<template>
    <div>
        <Header title="一封信一份情"></Header>
        <img :src="img" alt="">
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
            img:'',
            param:{
              cellphone:localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).cellphone,
              token:localStorage.getItem('token') || ''
            }
          }
      },
      methods:{
        getCode(){
          this.$axios("GetTryCode", this.param).then((res) => {
            this.img = res.qrcode
          })
        }
      },
      mounted(){
        this.getCode();
      }
  }
</script>