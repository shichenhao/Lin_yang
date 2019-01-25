<template>
    <div class="container">
        <Header title="修改密码"></Header>
        <div class="userBox">
            <div class="userNav userNav2">
                <ul>
                    <li>
                        <input type="password" v-model="param.password" placeholder="新密码">
                    </li>
                    <li>
                        <input type="password" v-model="param.password2" placeholder="确认密码">
                    </li>
                    <li>
                        <a style="margin-top: .2rem" class="btn" :class="{btnDisabled : !param.password || !param.password2}" @click="upPass">修改密码</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
  import Header from '@/components/common/Header.vue';
  import { Toast } from 'mint-ui';
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
              password:'',
              token:localStorage.getItem('token') || ''
            }
          }
      },
      methods:{
        upPass(){
          if(this.param.password && this.param.password2){
            if(this.param.password !== this.param.password2){
              Toast('两次密码输入不一致')
              return false
            }
            this.$axios("UpdatePassword", this.param).then((res) => {
              if(res.result){
                Toast('修改成功')
                setTimeout(()=>{
                  this.$router.push('/user/info')
                },500)
                //this.$router.push('/')
              }
            })
          }
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