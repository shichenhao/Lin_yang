<template>
    <div class="container">
        <Header title="修改密码"></Header>
        <div class="userBox">
            <div class="userNav userNav2">
                <ul>
                    <li>
                        <input type="password" v-model="param.oldpass" placeholder="旧密码">
                    </li>
                    <li>
                        <input type="password" v-model="param.pass" placeholder="新密码">
                    </li>
                    <li>
                        <input type="password" v-model="param.pass2" placeholder="确认密码">
                    </li>
                    <li>
                        <a class="btn">修改密码</a>
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
              pass:'',
              token:localStorage.getItem('token') || ''
            }
          }
      },
      methods:{
        upPass(){
          this.$axios("GetMemberInfo", this.param).then((res) => {
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