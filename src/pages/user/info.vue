<template>
    <div class="container">
        <Header title="个人资料"></Header>
        <div class="userBox">
            <div class="userNav userNav2">
                <ul>
                    <li class="headPic">
                        头像
                        <label>
                            <img :src="userInfo.photourl || '../../assets/images/head.png'">
                            <input id="upload_file" type="file" class="file-input" accept="image/png,image/jpeg,image/jpg" @change="uploadPic" style="display: none" />
                        </label>
                    </li>
                    <li>
                        用户名
                        <span>{{userInfo.realname}}</span>
                    </li>
                    <li>
                        级别编号
                        <span>{{leveTxt(userInfo.level)}}</span>
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
              cellphone:localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).cellphone,
              token:localStorage.getItem('token') || ''
            }
          }
      },
      methods:{
        leveTxt(val){
          let text = ''
          if(val == 6){
            text = '合伙人'
          }
          else if(val == 5){
            text = '总代'
          }
          else if(val == 4){
            text = '一级代理'
          }
          else if(val == 3){
            text = '团购客户'
          }
          return text
        },
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
        uploadPic(e){
          this.file=e.target.files[0];
          //this.file.name = this.file.name + ',token=12312312'
          let formData = new FormData();
          formData.append('file', this.file)
          formData.append('token', this.param.token)
          formData.append('key', 'UploadPhoto')
          this.param.pic = formData
          this.multipart.post("/apitest/", formData).then((res) => {
            if(res.data.result){
              this.getInit();
            }else{
              Toast(res.data.message);
            }
          })
        }
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