<template>
    <div class="container" style="padding-bottom: 0;">
        <Header title="注册中心"></Header>
        <div class="login register">
            <ul>
                <li>
                    <select v-model="param.level">
                        <option :value="item.val" v-for="item in levelList">{{item.text}}</option>
                    </select>
                </li>
                <li>
                    <input type="text" maxlength="6" v-model="param.name" placeholder="代理商姓名">
                    <font>请填写注册人真实姓名</font>
                </li>
                <li>
                    <input type="number" maxlength="11" v-model="param.cellphone" placeholder="绑定手机号码" @blur="chekPhone">
                </li>
                <li>
                    <input type="text" maxlength="18" v-model="param.idnumber" placeholder="身份证号" @blur="chekId">
                </li>
                <li>
                    <input type="password" maxlength="20" v-model="param.password" placeholder="设置登录密码">
                </li>
                <li>
                    <input type="password" maxlength="20" v-model="param.password2" placeholder="确认登录密码">
                </li>
                <li>
                    <a class="btn" @click="register" v-if="param.cellphone && param.password && param.password2 && param.name && param.idnumber && param.name">注　　册</a>
                    <a class="btn btnDisabled" v-if="!param.cellphone || !param.password || !param.password2 || !param.name || !param.idnumber || !param.name">注　　册</a>
                </li>
                <li class="loginDown">
                    已有账号？
                    <router-link to="/login">立即登录</router-link>
                </li>
            </ul>
            <div class="loginBottom"></div>
        </div>
        <div class="registerOk" v-if="isOk">
            <span>{{param.name}} {{getGrender(param.idnumber || 0)}}：</span>
            <p>
                感谢您注册成为“绿麒麟 S7 富通虫草茶”，{{getLev(param.level)}}请等待上级代理商激活并调配库存。
            </p>
            <img src="../../assets/images/logoDown2.png">
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
        // 注册等待击获
        isOk:false,
        isRegister:true,
        levelList:[
          {
            val:6,
            text:'合伙人'
          },
          {
            val:5,
            text:'总代'
          },
          {
            val:4,
            text:'一级代理'
          },
          {
            val:3,
            text:'团购客户'
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
          level: '',
          sid:localStorage.getItem('sid')
        }
      }
    },
    methods: {
      // 获取性别
      getGrender(val){
        if(val){
          let gender = val.slice(14, 17) % 2 ? "1" : "2"; // 1代表男性，2代表女性
          gender === "1" ? '先生' : '女士'
          return gender
        }
      },
      // 获取级别
      getLev(val){
        this.levelList.filter(item=>item.val === val)
      },
      register() {
        if(this.param.password !==  this.param.password2){
          Toast('两次输入的密码不一致!');
          return false;
        }
        if(!this.check.phone){
          Toast('手机号已存在请更换!');
          return false;
        }
        if(this.isRegister){
          if(!this.check.id){
            Toast('身份证号码已存在请更换!');
            return false;
          }
        }
        this.$axios("Regist", this.param).then((res) => {
          if(res.result){
            this.isOk = true
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
        let reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
        if(reg.test(this.param.idnumber)){
            this.$axios("CheckID", {cellphone : this.param.idnumber}).then((res) => {
              if(res.result){
                this.check.id = true
              }else{
                this.check.id = false
              }
            })
        }else{
          Toast('请输入正确的身份证号!');
        }
      },

    },
    mounted() {
      /*
      if(this.$router.history.current.query.isRegister){
        this.isRegister = false
        this.param.level =  0
      }*/
      console.log(this.$route.query)
      this.level = this.$route.query.level || localStorage.getItem('level') && JSON.parse(localStorage.getItem('level'))
      this.levelList = this.levelList.filter(item=> item.val <= this.level)
      this.param.level = this.level
    }
  }
</script>
<style>
    @import './../../assets/css/user.css';
</style>