<template>
    <div class="container">
        <div class="banner" v-if="bannerUrl.length">
            <mt-swipe :auto="3000" :show-indicators="false">
                <mt-swipe-item v-for="(item,index) in bannerUrl" :key="index">
                    <a :href="item.gotoUrl"><img :src="item.imgUrl" /></a>
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <div class="indexBanner">
            <router-link to="/experience">
                <img src="./../assets/images/index-icon1.png" alt="">
                即可体验
            </router-link>
            <router-link to="shopping">
                <img src="./../assets/images/index-icon2.png" alt="">
                虫草商城
            </router-link>
            <router-link to="register">
                <img src="./../assets/images/index-icon3.png" alt="">
                注册会员
            </router-link>
            <router-link to="news">
                <img src="./../assets/images/index-icon4.png" alt="">
                新闻动态
            </router-link>
        </div>
        <div class="indexLane">
            <router-link to="">
                <img src='./../assets/images/index-banner.png' alt="">
            </router-link>
        </div>
    </div>
</template>
<script>
  import { Indicator } from 'mint-ui';
  import bannerImg1 from './../assets/images/index-banner1.png'
  import bannerImg2 from './../assets/images/index-banner2.png'
  import bannerImg3 from './../assets/images/index-banner3.png'
  import bannerImg4 from './../assets/images/index-banner4.png'
  export default {
    name: 'index',
    data () {
      return {
          selected:'首页',
          // 广告图
          bannerUrl: [
              {
                  gotoUrl:null,
                  imgUrl:bannerImg1
              },
              {
                  gotoUrl:null,
                  imgUrl:bannerImg2
              },
              {
                  gotoUrl:null,
                  imgUrl:bannerImg3
              }
          ],

      }
    },
    methods:{
    },
    mounted(){
    }
  }
</script>