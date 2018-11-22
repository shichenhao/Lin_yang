<template>
    <div class="container">
        <Header title="即可体验"></Header>
        <div class="modelBanner">
            <img src="../../assets/images/experience-banner.png" alt="">
        </div>
        <div class="experienceBox">
            <a class="btn">立即参与</a>
        </div>
        <div class="experienceBox">
            <h2>
                <span>活动介绍</span>
            </h2>
            <div class="experienceCont">
                <div class="experienceCont1">
                    <p>
                        分享二维码邀请好友分享二维码邀请好友分享二维码邀请好友分享二维码邀请好友分享二维码邀请好友分享二维码邀请好友分享二维码邀请好友
                    </p>
                    <p>
                        好友下单支付后，你将获得10元红包！
                    </p>
                    <div>
                        <span>每个手机号码限购一次;</span>
                        <span>每个手机号码限购一次;</span>
                        <span>每个手机号码限购一次;</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="experienceBox">
            <h2>
                <span>填写信息</span>
            </h2>
            <div class="experienceCont">
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
                        <input type="text" @click="bathdayShow" v-model="param.bathday" placeholder="选择出生日期">
                    </li>
                    <li>
                        <span>联系电话</span>
                        <input type="text" v-model="param.cellphone" placeholder="填写申请人手机号码" />
                    </li>
                    <li>
                        <span>收货地址</span>
                        <input type="text" v-model="param.address" />
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
                <span class="btn" @click="submit">提交申请</span>
                <div class="experienceAgreement">
                    点击提交按钮，即表示已阅读并同意 <router-link to="/">《体验条款》</router-link>
                </div>
            </div>
        </div>
        <div class="experienceBox">
            <h2>
                <span>体验反馈</span>
            </h2>
            <div class="experienceCont">
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
                <p>我们期望看到您对 S7 </p>
                <span class="btn">确认上传</span>
            </div>
        </div>
        <mt-datetime-picker
            ref="picker"
            v-model="pickerVisible"
            type="date"
            year-format="{value}年"
            month-format="{value}月"
            date-format="{value}日"
            @confirm="handleBathday">
        </mt-datetime-picker>
    </div>
</template>
<script>
  import Header from '@/components/common/Header.vue';
  import { Toast } from 'mint-ui';
  export default {
      name: 'experience',
      components:{
          Header,
      },
      data () {
          return {
            pickerVisible:'',
              param:{
                bathday:'',
                gender:null,
                cellphone:"13521389588",
                name:"test",
                address:"北京",
                orderinfo:"体验装1份",
                level:"1",
                totalprice:"47.7",
                uid:"700",
                feedback:"反馈信息"
              },
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
        submit() {
          let feedback = [];
          feedback.push(this.value,this.value2)
          this.param.feedback = feedback.toString()
          this.$axios("TryOrder", this.param).then((res) => {
            if(res.result){
              Toast('下单成功!');
              window.location.href= res.payurl
            }
          })
        },
        bathdayShow(){
          this.$refs.picker.open();
        },
        handleBathday(){
          this.param.bathday = this.pickerVisible
        }
      },
      mounted(){

      }
  }
</script>

<style>
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