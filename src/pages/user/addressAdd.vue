<template>
    <div class="container" style="padding-bottom: 0;">
        <Header title="我的地址"></Header>
        <div class="addressAdd">
            <input type="text" v-model="param.name" placeholder="收货人姓名">
            <input type="text" v-model="param.phone" placeholder="收货手机号">
            <div class="inputText" @click="popupVisible = true">{{param.ssq || '收货地址省市区'}}</div>
            <input type="text" v-model="param.addr" placeholder="收货人地址">
            <span class="btn" v-if="noId" @click="add(true)">添加</span>
            <span class="btn" v-else @click="add(false)">添加</span>
        </div>
        <mt-popup
            v-model="popupVisible"
            position="bottom">
            <span class="addPop" @click="checkAddrs">确定</span>
            <mt-picker v-if="popupVisible" :slots="slots" valueKey="label" @change="onValuesChange"></mt-picker>
        </mt-popup>
    </div>
</template>
<script>
  import Header from '@/components/common/Header.vue';
  import Check from '../../util/check'
  import myaddress from '../../util/citys'
  export default {
      name: 'addressAdd',
      components:{
          Header,
      },
      data () {
          return {
            noId:false,
            popupVisible:false,
            param:{
              token:localStorage.getItem('token'),
              uid:JSON.parse(localStorage.getItem('userInfo')).UID,
              province:'',
              city:'',
              area:'',
              addr:'',
              name:'',
              phone:'',
            },
            slots: [
              {
                flex: 1,
                values: myaddress,
                defaultIndex: 110000,
                className: 'slot1',
                textAlign: 'center'
              }, {
                divider: true,
                content: '-',
                className: 'slot2'
              }, {
                flex: 1,
                values: myaddress[0].children,
                defaultIndex: 0,
                className: 'slot3',
                textAlign: 'center'
              }, {
                divider: true,
                content: '-',
                className: 'slot4'
              }, {
                flex: 1,
                values: myaddress[0].children[0].children,
                defaultIndex: 0,
                className: 'slot5',
                textAlign: 'center'
              }
            ]
          }
      },
      methods:{
        onValuesChange (picker, values) {
          if (!values[0]) {
            this.$nextTick(() => {
              if (this.myAdress) {
                // 赋默认值
              } else {
                picker.setValues([myaddress[0], myaddress[0].children[0], myaddress[0].children[0].children[0]])
              }
            })
          } else {
            picker.setSlotValues(1, values[0].children)
            let town = []
            if (values[1]) {
              town = values[1].children
            }
            picker.setSlotValues(2, town)
            this.param.province = values[0].label
            this.param.city = values[1].label
            this.param.area = values[2].label,
            this.param.ssq = this.param.province +'-'+ this.param.city +'-'+  this.param.area
          }
        },
        add(type) {
          if(!this.param.name || !this.param.phone || !this.param.addr || !this.param.ssq){
            this.Toast('请填写全部收货信息！')
            return false;
          }
          if(!Check.phone(this.param.phone)){
            this.Toast('请填写正确的手机号！')
            return false;
          }
          this.$axios("AddAddress", this.param).then((res) => {
            //this.list = res
            if(res.result){
              this.Toast(res.message)
              if(type){
                this.$router.push('/cart/order')
              }else{
                this.$router.go(-1);
              }
            }
          })
        },
        checkAddrs(){
          this.popupVisible= false
        }
      },
      mounted(){
        if(this.$router.history.current.query.noId){
          this.noId = true
        }
      }
  }
</script>
<style>
    @import './../../assets/css/user.css';
</style>