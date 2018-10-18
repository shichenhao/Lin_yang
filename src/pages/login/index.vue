<template>
    <div class="container">
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
                    <a class="btn" @click="login">登　　录</a>
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
        this.$axios("Login", this.param).then((res) => {
          if(res.result){
            Toast('登录成功!');
            localStorage.setItem('token',res.token);
            this.$router.push('/')
          }
        })
      },

    },
    mounted() {

    }
  }
</script>
<style>
    @import './../../assets/css/user.css';
</style>