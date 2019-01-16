<template>
    <div class="container indexContiner">
        <div class="indexIcon">
            <img @click="goLogin" src="../assets/images/nav-icon4-a.png">
            <img src="../assets/images/share.png">
        </div>
        <div class="banner" v-if="bannerUrl.length">
            <mt-swipe :auto="3000">
                <mt-swipe-item v-for="(item,index) in bannerUrl" :key="index">
                    <a :href="item.gotoUrl"><img :src="item.imgUrl" /></a>
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <div class="indexBanner">
            <router-link to="/experience"><img src="./../assets/images/index-icon1.png">即刻体验</router-link>
            <router-link to="shopping">
                <img src="./../assets/images/index-icon2.png">虫草商城
            </router-link>
            <a @click="goPath('register')">
                <img src="./../assets/images/index-icon3.png">代理中心
            </a>
            <router-link to="news"><img src="./../assets/images/index-icon4.png">新闻一览</router-link>
        </div>
        <div class="indexLane" v-if="isLogin">
            <router-link to="/share">
                <img src='./../assets/images/index-banner.png'>
            </router-link>
        </div>
    </div>
</template>
<script>
  import { Indicator } from 'mint-ui';
  import bannerImg1 from './../assets/images/index-banner1.png'
  import bannerImg2 from './../assets/images/index-banner2.jpg'
  import bannerImg3 from './../assets/images/index-banner3.png'
  import bannerImg4 from './../assets/images/index-banner4.jpg'
  export default {
    name: 'index',
    data () {
      return {
        isLogin:localStorage.getItem('token') || false,
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
              },
              {
                  gotoUrl:null,
                  imgUrl:bannerImg4
              }
          ],

      }
    },
    methods:{
      goPath(path){
        let level = localStorage.getItem("userInfo") && JSON.parse(localStorage.getItem("userInfo")).level
        console.log(level)
        //if(level == 3 || level == 4 || level == 5){
        if(level){
          this.$router.push('/shopping')
        }else {
          this.$router.push('/login')
        }
      }
    },
    mounted(){
      localStorage.setItem('sid', this.$router.history.current.query.sid || '')
    }
  }
</script>