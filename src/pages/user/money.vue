<template>
    <div class="container">
        <Header title="我的库存"></Header>
        <div class="moneyBox">
            <div class="moneyItem">
                <h2>
                    <span><img src="../../assets/images/money-icon1.png" /></span>
                </h2>
                <div class="h2">我的库存</div>
                <p style="border:0 none">
                    {{ info['库值'] || 0}}
                    <span>箱</span>
                </p>
            </div>
        </div>
        <div class="moneyBox moneyBox2 moneyBox3">
            <div class="moneyItem">
                <h2>
                    <span>库存分配</span>
                </h2>
                <ul>
                    <li v-if="levelList.length">
                        <select v-model="param.level" @change="handleChange">
                            <option :value="item.val" v-for="item in levelList">{{item.html}}</option>
                        </select>
                    </li>
                    <li v-if="toList.length">
                        <select v-model="param.toid">
                            <option :value="item.MemberUID" v-for="item in toList">{{item.MemberUID + ' - ' + item.MemberName+ ' - ' + leveTxt(item.MemberLevel)}}</option>
                        </select>
                    </li>
                    <li>
                        <input type="number" maxlength="10" v-model="param.goods" placeholder="分配数量">
                    </li>
                    <li class="pad">
                        <a class="changeA" @click="showList">查看分配明细</a>
                        <a class="btn" :class="{btnDisabled : !param.toid || !param.goods}" @click="changeGoods">确　　认</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="popList" v-if="popListShow">
            <div class="popListTit">
                分配明细
                <span @click="popListShow = false">✖</span>
            </div>
            <ul>
                <li v-for="item in popList">
                    {{item.news_title + item.news_text}}
                </li>
            </ul>
            <div class="listNull" v-if="!popList.length && !isLoading">
                无分配记录！
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
        isLoading:false,
        popListShow:false,
        info:{},
        popList:[],
        toList:[],
        toList2:[],
        levelList:[{
          val:0,
          html:'全部'
        },{
          val:1,
          html:'体验客户'
        },{
          val:3,
          html:'团购客户'
        },{
          val:4,
          html:'一级代理'
        },{
          val:5,
          html:'总代'
        }],
        param:{
          level:0,
          token:localStorage.getItem('token'),
        }
      }
    },
    methods:{
      handleChange(){
        let val = this.param.level
        this.toList = this.toList2.filter(item=>{
          if(val === 0){
            return item
          } else{
            return item.MemberLevel == val
          }
        })
        if(!this.toList.length){
          this.toList = [{MemberUID:'',MemberName:'无分配人'}]
        }
        this.param.toid = this.toList[0] && this.toList[0].MemberUID
      },
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
        else if(val == 1){
          text = '体验客户'
        }
        return text
      },
      showList(){
        this.popListShow = true
        const param = {
          token: this.param.token,
          classId: '1'
        }
        this.isLoading = true
        this.$axios("GetMessages", param).then((res) => {
          if(res.result){
            this.isLoading = false
            this.popList=res.Messages
          }
        })
      },
      getInfo(){ // 查询库存
        this.$axios("GetWealthInfo",this.param).then((res) => {
          if(res.result){
            //Toast(res.message);
            this.info= res
            //window.location.href= res.payurl
          }
        })
      },
      changeGoods(){ // 修改库存
        let reg =/^[0-9]*[1-9][0-9]*$/
        if(!this.param.toid){
          Toast('当前无分配人不能分配');
          return false
        }
        if(!reg.test(this.param.goods)){
          Toast('请输入正确的数量');
          return false
        }
        this.$axios("SendGoods",this.param).then((res) => {
          console.log(res)
          if(res.result){
            Toast(res.message);
            this.param.goods = null
            // this.info= res
            // this.$router.push('/user')
          }
        })
      },
      // 查询团队用户
      getTeam(){
        this.$axios("GetTeamInfo", this.param).then((res) => {
          this.toList = res.teaminfo.length ? res.teaminfo : [{MemberUID:'',MemberName:'无分配人'}]
          this.toList2 = res.teaminfo.length ? res.teaminfo : [{MemberUID:'',MemberName:'无分配人'}]
          this.param.toid = res.teaminfo[0] && res.teaminfo[0].MemberUID
        })
      },
      go(){
        console.log(1)
      }
    },
    mounted(){
      this.getTeam();
      this.getInfo();
    }
  }
</script>
<style>
    @import './../../assets/css/user.css';
</style>
<style scoped>
    .container{
        background: #fff;
        padding-bottom: 0;
    }
</style>