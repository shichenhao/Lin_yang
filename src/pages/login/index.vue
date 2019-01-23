<template>
    <div class="container" style="padding-bottom: 0">
        <Header></Header>
        <div class="login">
            <div class="loginLogo"></div>
            <ul>
                <li>
                    <input type="text" v-model="param.cellphone" placeholder="请输入手机号">
                </li>
                <li>
                    <input type="password" v-model="param.password" placeholder="请输入密码">
                </li>
                <li>
                    <a class="btn" :class="{btnDisabled : !param.cellphone || !param.password}" @click="login">登　　录</a>
                </li>
                <li class="loginDown">
                    <router-link to="/register">立即注册</router-link>
                    <router-link to="/retrieve">忘记密码？</router-link>
                </li>
            </ul>
            <div class="loginBottom"></div>
        </div>
    </div>
</template>
<script>
  import Header from '@/components/common/Header.vue';
  import { Toast } from 'mint-ui';

  export default {
    name: 'message',
    components: {
      Header,
    },
    data() {
      return {
        param: {
          cellphone: null,
          password: null,
        }
      }
    },
    methods: {
      login() {
        if(this.param.password && this.param.cellphone){
          this.$axios("Login", this.param).then((res) => {
            if(res.result){
              console.log(res)
              Toast('登录成功!');
              localStorage.setItem('token',res.token);
              this.getUserInfo(res.token);
            }
          })
        }
      },
      getUserInfo(token){ // 获取用户信息
        this.$axios("GetMemberInfo", {token}).then((res) => {
          if(res.result){
            localStorage.setItem('level', res.level)
            localStorage.setItem('userInfo',JSON.stringify(res))
            //this.$router.push('/')
            this.$router.push('/')
          }
        })
      },
      getImg() {
        this.$axios("GetAuthCode", {}).then((res) => {
          if(res.result){
          }
        })
      },

    },
    mounted() {
        this.getImg();
    }
  }
</script>
<style>
    @import './../../assets/css/user.css';
</style>