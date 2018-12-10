<template>
    <div>
        <Header title="注册分享"></Header>
        <img :src="img" alt="">
        <div class="container" v-if="false">
            <div class="extension">
                <div class="extensionBox">
                    <h2>分享一分健康 送虫草给亲友
                        <span>推荐1人成功体验，即领10元奖金</span>
                    </h2>
                    <img src="../../assets/images/rmb.jpg" alt="">
                    <div class="ewm">
                        <img :src="img" alt="">
                        <span v-if="false">推荐1人成功体验</span>
                    </div>
                    <h4>
                        <span>活动介绍</span>
                    </h4>
                    <p><span>1.</span>推荐1人成功体验推荐1人成功体验推荐1人成功体验推荐1人成功体验推荐1人成功</p>
                    <p><span>2.</span>推荐1人成功体验推荐</p>
                    <i>● 推荐1人成功体验推荐1；● 人成功体验推荐1人成功体验</i>
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
            img:'',
            param:{
              cellphone:localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).cellphone,
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