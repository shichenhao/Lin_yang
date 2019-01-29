<template>
    <div class="container indexContiner">
        <div class="indexIcon">
            <div class="indexLeft" @click="goLogin">
                <img src="../assets/images/icon1.png"> {{loginName}}
            </div>
            <div class="indexRight" @click="isIndexPop = !isIndexPop" v-if="isLogin && isApp">
                <img src="../assets/images/icon-add.png">
                <div class="indexPop" :class="{indexPopActive : isIndexPop}">
                    <span @click="share(2)">
                        <img src="../assets/images/icon3.png"> 分享加盟
                    </span>
                    <span @click="share(1)">
                        <img src="../assets/images/icon2.png"> 分享体验
                    </span>
                </div>
            </div>
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
                <img src="./../assets/images/index-icon2.png">虫草配送
            </router-link>
            <a @click="goPath('register')">
                <img src="./../assets/images/index-icon3.png">代理注册
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
        loginName: '登录',
        isIndexPop: false,
        isApp: false,
        isLogin:localStorage.getItem('token') || false,
        param:{
          token:localStorage.getItem('token') || ''
        },
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
      share(type){
        if(type === 1){
          this.$axios("GetTryCode", this.param).then((res) => {
            this.shareWx(res.qrcode)
          })
        }else{
          this.$axios("GetQRCode", this.param).then((res) => {
            this.shareWx(res.qrcode)
          })
        }
      },
      shareWx(imgSrc){
        $Umshare.shareImgUrl(imgSrc, function(res){
          console.log(res);
        },function(res){
          console.log(res);
        });
      },
      goPath(path){
        let level = localStorage.getItem("userInfo") && JSON.parse(localStorage.getItem("userInfo")).level
        console.log(level)
        //if(level == 3 || level == 4 || level == 5){
        if(level){
          this.$router.push('/shopping')
        }else {
          this.$router.push('/login')
        }
      },
      // 去登录或个人中心
      goLogin(){
        let level = localStorage.getItem("userInfo") && JSON.parse(localStorage.getItem("userInfo")).level
        if(level){
          this.$router.push('/user')
        }else {
          this.$router.push('/login')
        }
      }
    },
    mounted(){
      // localStorage.setItem('sid', this.$router.history.current.query.sid || localStorage.getItem('sid') || '')
      // localStorage.setItem('level', this.$router.history.current.query.level || localStorage.getItem('level') || 4)
      this.loginName = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).realname : '登录'
      var ua = navigator.userAgent
      if(ua.indexOf("x5webview") > -1){
        this.isApp = true
      }
    }
  }
</script>