<template>
    <div class="container" style="bottom: 0;">
        <Header></Header>
        <div class="login">
            <div class="loginLogo"></div>
            <ul>
                <li>
                    <input type="number" maxlength="11" v-model="param.cellphone" placeholder="请输入手机号" @blur="chekPhone">
                </li>
                <li>
                    <input type="password" maxlength="20" v-model="param.password" placeholder="请输入密码">
                </li>
                <li>
                    <input type="password" maxlength="20" v-model="param.password2" placeholder="请确认密码">
                </li>
                <li>
                    <input type="text" maxlength="6" v-model="param.name" placeholder="请输入姓名">
                </li>
                <li>
                    <select v-model="param.level">
                        <option :value="item.val" v-for="item in levelList">{{item.text}}</option>
                    </select>
                </li>
                <li>
                    <input type="text" maxlength="18" v-model="param.idnumber" placeholder="请输入身份证号" @blur="chekId">
                </li>
                <li>
                    <input type="text" maxlength="20" v-model="param.bankname" placeholder="请输入银行卡名称">
                </li>
                <li>
                    <input type="text" maxlength="18" v-model="param.bankaccount" placeholder="请输入银行卡卡号">
                </li>
                <li>
                    <input type="text" maxlength="12" v-model="param.realname" placeholder="请输入昵称">
                </li>
                <li>
                    <a class="btn" @click="register" v-if="param.cellphone && param.password && param.password2 && param.name && param.idnumber && param.bankname && param.bankaccount && param.realname">注　　册</a>
                    <a class="btn btnDisabled" v-if="!param.cellphone || !param.password || !param.password2 || !param.name || !param.idnumber || !param.bankname || !param.bankaccount || !param.realname">注　　册</a>
                </li>
                <li class="loginDown">
                    已有账号？
                    <router-link to="/login">立即登录</router-link>
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
    name: 'register',
    components: {
      Header,
    },
    data() {
      return {
        levelList:[
          {
            val:'3',
            text:'县级代理'
          },
          {
            val:'4',
            text:'市级代理'
          },
          {
            val:'5',
            text:'省级代理'
          },
        ],
        check:{
          phone:false,
          id:false,
        },
        param: {
          key: 'Regist',
          cellphone: null,
          password: null,
          level:'3',
          sid:''
        }
      }
    },
    methods: {
      register() {
        if(this.param.password !==  this.param.password2){
          Toast('两次输入的密码不一致!');
          return false;
        }
        if(!this.check.phone){
          Toast('手机号已存在请更换!');
          return false;
        }
        if(!this.check.id){
          Toast('身份证号码已存在请更换!');
          return false;
        }
        this.$axios("Regist", this.param).then((res) => {
          if(res.result){
            Toast('注册成功!');
            localStorage.setItem('token',res.token);
            this.$router.push('/login')
          }
        })
      },
      chekPhone() {
        this.$axios("CheckPhone", {cellphone : this.param.cellphone}).then((res) => {
          if(res.result){
            this.check.phone = true
          }else{
            this.check.phone = false
          }
        })
      },
      chekId() {
        this.$axios("CheckID", {cellphone : this.param.idnumber}).then((res) => {
          if(res.result){
            this.check.id = true
          }else{
            this.check.id = false
          }
        })
      },

    },
    mounted() {
        this.param.sid = this.$router.history.current.query.sid || localStorage.getItem('sid') || ''
    }
  }
</script>
<style>
    @import './../../assets/css/user.css';
</style>