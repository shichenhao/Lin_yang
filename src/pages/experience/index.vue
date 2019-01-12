<template>
    <div class="container">
        <Header title="即刻体验"></Header>
        <div class="modelBanner">
            <img src="../../assets/images/experience-banner.png" alt="">
        </div>
        <div class="experienceBox" style="background: none">
            <a class="btn" @click="returnTop">即刻分享</a>
        </div>
        <div class="experienceBox experienceBox2" :class="{active : active.active1 }">
            <h2 @click="isActive(1)">
                <span>活动介绍</span>
            </h2>
            <div class="experienceCont" v-if="active.active1">
                <div class="experienceCont1">
                    <p>
                        <span>1.</span>
                        邀请好友(仅限新用户)体验,好友仅需47.7元，即可得到原价193元绿麒麟S7富硒虫草茶分享装一份。
                    </p>
                    <p>
                        <span>2.</span>
                        好友下单支付后，你将获得10元红包！
                    </p>
                    <div>
                        <span>每个手机号码限购一次，每次最多可购买两份；</span>
                        <span>分享装限量100万份，先到先得，售完为止。</span>
                        <span>服务监督电话：18519815108(微信同号），可随时反馈意见及建议。</span>
                    </div>
                </div>
            </div>
            <span class="after" @click="isActive(1)"></span>
        </div>
        <div class="experienceBox experienceBox2" id="a1" :class="{active : active.active2 }">
            <h2 @click="isActive(2)">
                <span>填写信息</span>
            </h2>
            <div class="experienceCont" v-if="active.active2">
                <ul>
                    <li>
                        <span>申请人姓名</span>
                        <input type="text" maxlength="10" v-model="param.name" placeholder="填写申请人真实姓名">
                    </li>
                    <li>
                        <span>性别</span>
                        <div class="checkboxList2">
                            <mt-radio
                                    v-model="param.gender"
                                    :options="gender">
                            </mt-radio>
                        </div>
                    </li>
                    <li>
                        <span>出生日期</span>
                        <font @click="bathdayShow">{{param.bathday || '选择出生日期'}}</font>
                    </li>
                    <li>
                        <span>联系电话</span>
                        <input type="text" v-model="param.cellphone" placeholder="填写申请人手机号码" />
                    </li>
                    <li>
                        <span>收货地址</span>
                        <div class="inputText" @click="popupVisible = true">{{param.ssq || '收货地址省市区'}}</div>
                    </li>
                    <li>
                        <span>体验数量</span>
                        <div class="checkboxList2">
                            <mt-radio
                                    v-model="param.count"
                                    :options="count">
                            </mt-radio>
                        </div>
                    </li>
                    <li>
                        <input style="margin-left: 0" type="text" v-model="param.address2" placeholder="请填写详细收货地址" />
                    </li>
                </ul>
                <h4>选择试用的原因(勾选)</h4>
                <div class="checkboxList">
                    <mt-radio
                        v-model="value"
                        :options="options">
                    </mt-radio>
                </div>
                <h4>自身存在的健康问题或不良习惯(勾选)</h4>
                <div class="checkboxList checkboxList2">
                    <mt-radio
                        v-model="value2"
                        :options="options2">
                    </mt-radio>
                </div>
                <span class="btn btn2" :class="{btn3 : param.name && param.bathday && param.cellphone && param.gender && param.address2 && param.ssq}" @click="submit">提交申请</span>
                <div class="experienceAgreement" v-if="false">
                    点击提交按钮，即表示已阅读并同意 <router-link to="/">《体验条款》</router-link>
                </div>
            </div>
            <span class="after" @click="isActive(2)"></span>
        </div>
        <div class="experienceBox experienceBox2 experienceBox3" v-if="param.level" :class="{active : active.active3,clickNo : !param.level || param.level!=1}">
            <h2 @click="isActive(3)">
                <span>体验反馈</span>
            </h2>
            <div class="experienceCont" v-if="active.active3">
                <h4>1.您期望调整的问题是否有改善？</h4>
                <div class="checkboxList checkboxList2">
                    <mt-radio
                            v-model="value3"
                            :options="options3">
                    </mt-radio>
                </div>
                <h4>2.您感觉在哪些方面体感强烈？</h4>
                <div class="checkboxList">
                    <div class="checkboxList2">
                        <mt-radio
                                v-model="value4"
                                :options="options4">
                        </mt-radio>
                    </div>
                </div>
                <h4>3.您是否有长期服用的打算？</h4>
                <div class="checkboxList">
                    <div class="checkboxList2">
                        <mt-radio
                                v-model="value5"
                                :options="options3">
                        </mt-radio>
                    </div>
                </div>
                <p v-if="false">我们期望看到您对 S7 </p>
                <span class="btn" @click="feedback">确认反馈</span>
            </div>
            <span class="after" @click="isActive(3)"></span>
        </div>
        <mt-datetime-picker
            ref="picker"
            v-model="pickerVisible"
            type="date"
            :startDate="new Date('1950-01-01')"
            year-format="{value}年"
            month-format="{value}月"
            date-format="{value}日"
            @confirm="handleBathday">
        </mt-datetime-picker>
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
  import { Toast } from 'mint-ui';
  export default {
      name: 'experience',
      components:{
          Header,
      },
      data () {
          return {
            popupVisible:false,
            active:{
              active1:false,
              active2:true,
              active3:false,
            },
            pickerVisible:'',
              param:{
                sid:'',
                bathday:'',
                gender:null,
                cellphone:"",
                name:"",
                address:"",
                address2:"",
                province:'',
                city:'',
                area:'',
                addr:'',
                orderinfo:"体验装1份",
                level:localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).level : '',
                totalprice:"47.7",
                uid:localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).UID : '',
                feedback:"反馈信息"
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
            ],
              value:'活动价格给力',
              value2:'失眠',
              value3:'是',
              value4:'失眠',
              value5:'是',
              gender:[
                  {
                      label: '男',
                      value: 'A',
                  },
                  {
                      label: '女',
                      value: 'B',
                  }
              ],
              count:[
                  {
                      label: '1份',
                      value: '1',
                  },
                  {
                      label: '2份',
                      value: '2',
                  }
              ],
              options:[
                  {
                      label: '活动价格给力',
                      value: '活动价格给力',
                  },
                  {
                      label: '朋友强烈推荐',
                      value: '朋友强烈推荐',
                  },
                  {
                      label: '为改善健康状况做尝试',
                      value: '为改善健康状况做尝试',
                  },
                  {
                      label: '希望成为代理商',
                      value: '希望成为代理商',
                  }
              ],
              options2:[
                  {
                      label: '失眠',
                      value: '失眠',
                  },
                  {
                      label: '肾虚',
                      value: '肾虚',
                  },
                  {
                      label: '便秘',
                      value: '便秘',
                  },
                  {
                      label: '吸烟',
                      value: '吸烟',
                  }
              ],
              options3:[
                  {
                      label: '是',
                      value: '是',
                  },
                  {
                      label: '否',
                      value: '否',
                  }
              ],
              options4:[
                  {
                      label: '失眠',
                      value: '失眠',
                  },
                  {
                      label: '肾虚',
                      value: '肾虚',
                  },
                  {
                      label: '便秘',
                      value: '便秘',
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
        checkAddrs(){
          this.popupVisible= false
        },
        isActive(type){
          if(type === 1){
            this.active.active1 = !this.active.active1
          }
          if(type === 2){
            this.active.active2 = !this.active.active2
          }
          if(type === 3){
            if(this.param.level != 1 || !this.param.level){

            }else{
              this.active.active3 = !this.active.active3
            }
          }
        },
        formatDate(date) {
          const y = date.getFullYear()
          let m = date.getMonth() + 1
          m = m < 10 ? '0' + m : m
          let d = date.getDate()
          d = d < 10 ? ('0' + d) : d
          return y + '-' + m + '-' + d
        },
        returnTop(){
          //document.querySelector("#a1").scrollIntoView(true);
          this.$router.push('/share')
        },
        submit() {
          if(!this.param.name || !this.param.bathday || !this.param.cellphone || !this.param.gender || !this.param.address2 || !this.param.ssq){
            return false
          }
          if(!this.param.name || !this.param.bathday || !this.param.cellphone || !this.param.gender || !this.param.address2 || !this.param.ssq){
            Toast('请填写个人信息!');
            return false
          }

          if(!Check.phone(this.param.cellphone)){
            this.Toast('请填写正确的手机号！')
            return false;
          }

          this.param.address = this.param.province +'-'+ this.param.city +'-'+  this.param.area + this.param.address2

          let feedback = [];
          feedback.push(this.value,this.value2)
          this.param.feedback = feedback.toString()
          this.$axios("TryOrder", this.param).then((res) => {
            if(res.result){
              Toast('下单成功!');
              //console.log(`${res.payurl}?orderid=${res.member}&totalprice=${this.param.totalprice}`)
              window.location.href= `${res.payurl}?orderid=${res.member}&totalprice=${this.param.totalprice}`
            }
          })
        },
        feedback() {
          let feedback = [];
          let params = {}
          feedback.push(this.value3,this.value4,this.value5)
          params.feedback = feedback.toString()
          params.token = localStorage.getItem('token')
          this.$axios("Feedback", params).then((res) => {
            if(res.result){
              Toast('反馈成功!');
              //window.location.href= res.payurl
            }
          })
        },
        bathdayShow(){
          this.$refs.picker.open();
        },
        handleBathday(){
          this.param.bathday = this.formatDate(this.pickerVisible)
        }
      },
      mounted(){
        this.param.sid = this.$router.history.current.query.sid || localStorage.getItem('sid') || ''
      }
  }
</script>

<style>
    .inputText{
        padding-left: .4rem;
        color: #999;
    }
    .mint-radiolist-label{
        padding: 0;
    }
    .checkboxList2 .mint-radiolist{
        padding: .1rem 0;
        display: flex;
        margin-left: -12px;
    }
    .mint-cell-wrapper{
        background: #fff!important;
    }
    .checkboxList2 .mint-radiolist-label{
        white-space: nowrap;
    }
</style>