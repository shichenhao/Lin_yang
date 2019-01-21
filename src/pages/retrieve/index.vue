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
                    <a class="btn" :class="{btnDisabled : !param.cellphone}" @click="login">找回密码</a>
                </li>
                <li class="loginDown">
                    <router-link to="/login">立即登录</router-link>
                    <router-link to="/register">立即注册</router-link>
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
    name: 'retrieve',
    components: {
      Header,
    },
    data() {
      return {
        param: {
          cellphone: null,
        }
      }
    },
    methods: {
      login() {
        if(this.param.cellphone){
          this.$axios("SendSMSCode", this.param).then((res) => {
            if(res.result){
              Toast('密码已发送到您的手机上请及时查收!');
            }
          })
        }
      },

    },
    mounted() {

    }
  }
</script>
<style>
    @import './../../assets/css/user.css';
</style>