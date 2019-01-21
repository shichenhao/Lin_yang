<template>
    <div style="padding-top: 1rem">
        <Header title="云次麟集灵草筑梦"></Header>
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
              token:localStorage.getItem('token') || ''
            }
          }
      },
      methods:{
        getCode(){
          this.$axios("GetQRCode", this.param).then((res) => {
            this.img = res.qrcode
          })
        }
      },
      mounted(){
        this.getCode();
      }
  }
</script>