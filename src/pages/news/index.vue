<template>
    <div class="container containerBn">
        <Header title="新闻一览"></Header>
        <div class="news">
            <div class="newsBanner">
                <img src="../../assets/images/news_banner.jpg" alt="">
            </div>
            <div class="newsBox">
                <div class="newsLeft" v-if="false">
                    <span class="active">公司新闻</span>
                    <span>产品动态</span>
                    <span>产品动态</span>
                    <span>产品动态</span>
                </div>
                <div class="newsRight">
                    <div class="newsTit">公司新闻</div>
                    <div class="newsCont">
                        <div class="newsItem" v-for="item in list" :key="item.news_id" @click="newsCont(item.news_text)">
                            <h2>{{item.news_title}}</h2>
                            <div v-html="item.news_text">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="contentPop" v-if="content">
            <span class="contentClose" @click="content = false">×</span>
            <div v-html="content"></div>
        </div>
    </div>
</template>
<script>
  import Header from '@/components/common/Header.vue';
  export default {
      name: 'cart',
      components:{
          Header,
      },
      data () {
          return {
            list:[],
            content:'',
            param:{
              start:'1',
              count:'10',
            }
          }
      },
      methods:{
        getList(){ // 查询购物车列表
          this.$axios("GetNews", this.param).then((res) => {
            if(res.result){
              this.list = res.Members
            }
          })
        },
        newsCont(content){
          this.content = content
        }
      },
      mounted(){
        this.getList();
      }
  }
</script>