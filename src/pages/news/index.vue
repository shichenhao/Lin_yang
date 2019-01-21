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
                    <div class="newsCont"
                         v-infinite-scroll="loadMore"
                         infinite-scroll-disabled="loading"
                         infinite-scroll-distance="10">
                        <div class="newsItem" v-for="item in list" :key="item.news_id" @click="newsCont(item.content.news_item[0].content)">
                            <h2>{{item.content.news_item[0].title}}</h2>
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
            loading:false,
            list:[],
            content:'',
            param:{
              offset:0,
              count:10
            }
          }
      },
      methods:{
        getList(){ // 查询购物车列表
          this.$axios("GetNews", this.param).then((res) => {
            if(res.result){
              this.list = res.news ? JSON.parse(res.news).item : []
            }
          })
        },
        loadMore() { //下拉加载数据
          if(this.param.count == 10){
            let newStart = this.param.offset;
            this.param.offset=newStart+1;
            this.loading = true;
            //setTimeout(() => {
            this.$axios('GetNews',this.param).then((res)=>{
              console.log(JSON.parse(res.news).item.length)
              if(res.news && res.result){
                this.param.count=JSON.parse(res.news).item.length
                this.list=[...this.list, ...JSON.parse(res.news).item]
              }
              this.loading = false;
            })
            //}, 1500);
          }
        },
        newsCont(content){
          this.content = content
        }
      },
      mounted(){
        // this.getList();
      }
  }
</script>