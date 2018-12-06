<template>
    <div class="container">
        <div class="userBox">
            <div class="userImg">
                <img src="../../assets/images/head.png" />
                <img class="userLogo" src="../../assets/images/user-logo.png" alt="">
                <router-link to="/login" v-show="!isLogin">
                    立即登录
                </router-link>
                <div v-show="isLogin">
                    张先生 <span>{{userInfo.level}}S</span>
                    <p>ID:{{userInfo.UID}}</p>
                </div>
            </div>
            <div class="userNav">
                <ul>
                    <li @click="routerPath('/user/address')">
                        <img src="../../assets/images/user-icon1.png" />
                        我的地址
                    </li>
                    <li @click="routerPath('/user/info')">
                        <img src="../../assets/images/user-icon1.png" />
                        个人资料
                    </li>
                    <li @click="routerPath('/user/message')">
                        <img src="../../assets/images/user-icon2.png" />
                        我的消息
                    </li>
                    <li @click="routerPath('/user/money')">
                        <img src="../../assets/images/user-icon3.png" />
                        我的财富
                    </li>
                    <li @click="routerPath('/user/team')">
                        <img src="../../assets/images/user-icon4.png" />
                        我的团队
                    </li>
                    <li @click="routerPath('/user/toker')">
                        <img src="../../assets/images/user-icon5.png" />
                        拓客信息
                    </li>
                    <li @click="routerPath('/user/about')">
                        <img src="../../assets/images/user-icon6.png" />
                        帮助反馈
                    </li>
                </ul>
            </div>
            <div class="indexLane" v-if="isLogin">
                <router-link to="/extension">
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