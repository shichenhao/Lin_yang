<template>
    <div style="padding-top: 1rem">
        <Header title="云次麟集灵草筑梦" :isApp="isApp" :share="share"></Header>
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
            isApp: false,
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
        },
        share(){
          $Umshare.shareImgUrl(this.img, function(res){
            console.log(res);
          },function(res){
            console.log(res);
          });
        }
      },
      mounted(){
        this.getCode();
        var ua = navigator.userAgent
        if(ua.indexOf("x5webview") > -1){
          // this.isApp = true
        }
        /*var ua = navigator.userAgent
        if(ua.indexOf("x5webviewDreamsoft_WJ") != -1){
          this.isApp = true
          const s = document.createElement('script');
          s.type = 'text/javascript';
          s.src = '../util/cordova.js';
          document.body.appendChild(s);
          document.addEventListener('deviceready',onDeviceReady, false);
          function onDeviceReady(){
            console.log('ok')
          }
        }*/
      }
  }
</script>