<template>
    <div class="container">
        <Header title="个人资料"></Header>
        <div class="userBox">
            <div class="userNav userNav2">
                <ul>
                    <li>
                        用户名
                        <span>{{userInfo.realname}}</span>
                    </li>
                    <li>
                        级别编号
                        <span>{{userInfo.level}}</span>
                    </li>
                    <li>
                        注册手机
                        <span>{{userInfo.cellphone}}</span>
                    </li>
                </ul>
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