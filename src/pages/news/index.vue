<template>
    <div class="container">
        <Header title="消息中心" :isShow="true"></Header>
        <div class="news">
            <div class="banner">
                <img src="../../assets/images/news_banner.jpg" alt="">
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