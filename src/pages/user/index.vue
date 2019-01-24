<template>
    <div class="container" style="padding: 0rem;margin-bottom: 1rem">
        <div class="userBox">
            <div class="userImg" @click="routerPath('/user/info')">
                <div class="userHead">
                    <img v-if="userInfo.photourl" :src="userInfo.photourl" />
                </div>
                <img class="userLogo" src="../../assets/images/user-logo.png" alt="">
                <router-link to="/login" v-show="!isLogin">
                    立即登录
                </router-link>
                <div v-show="isLogin" @click="routerPath('/user/info')">
                    {{userInfo.realname}}
                    <span v-if="userInfo.level">
                        <img v-for="item in parseInt(userInfo.level)" src="../../assets/images/score_03.png" alt="">
                    </span>
                    <p>ID:{{userInfo.UID}}</p>
                </div>
            </div>
            <div class="userNav">
                <ul>
                    <li @click="routerPath('/user/info')">
                        <img src="../../assets/images/ziliao.png" />
                        个人资料
                    </li>
                    <li @click="routerPath('/user/address')">
                        <img src="../../assets/images/dizhi.png" />
                        我的地址
                    </li>
                    <li @click="routerPath('/user/message')">
                        <img src="../../assets/images/xiaoxi.png" />
                        我的消息
                    </li>
                    <li @click="routerPath('/user/money')">
                        <img src="../../assets/images/kuzhi.png" />
                        我的库存
                    </li>
                    <li @click="routerPath('/user/jf')">
                        <img src="../../assets/images/jifen.png" />
                        我的积分
                    </li>
                    <li @click="routerPath('/user/team')">
                        <img src="../../assets/images/tuandui.png" />
                        我的团队
                    </li>
                    <li @click="routerPath('/user/toker')">
                        <img src="../../assets/images/yeji.png" />
                        我的业绩
                    </li>
                    <li @click="routerPath('/share2')">
                        <img src="../../assets/images/icon3.png" />
                        分享加盟
                    </li>
                    <li @click="routerPath('/share')">
                        <img src="../../assets/images/icon2.png" />
                        分享体验
                    </li>
                    <li class="lout" v-if="isLogin">
                        <a class="btn" @click="lout">退出登录</a>
                    </li>
                </ul>
            </div>
            <div class="indexLane" v-if="false">
                <router-link to="/share">
                    <img src='../../assets/images/index-banner.png' alt="">
                </router-link>
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
            userInfo:{},
            isLogin:localStorage.getItem('token') || false,
            param:{
              cellphone:localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).cellphone,
              token:localStorage.getItem('token') || ''
            }
          }
      },
      methods:{
        lout(){
          localStorage.clear();
          this.$router.push('/')
        },
        routerPath(url) {
          if(this.isLogin){
            this.$router.push(url)
          }else{
            this.$router.push('/login')
          }
        },
        getInit(){
          this.$axios("GetMemberInfo", this.param).then((res) => {
            if(res.result){
              this.userInfo = res
              //this.$router.push('/')
            }
          })
        },
      },
      mounted(){
        if(this.isLogin){
          this.getInit();
        }
      }
  }
</script>
<style>
    @import './../../assets/css/user.css';
</style>
<style scoped>
    .container{
        background: #fff;
    }
    .indexLane{
        margin-top: .5rem;
    }
</style>