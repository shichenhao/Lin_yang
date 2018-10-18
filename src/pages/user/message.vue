<template>
    <div class="container">
        <Header title="消息中心"></Header>
        <div class="messageBox">
            <div class="messageItem">
                <h2>阿斯兰的空间撒开了多久<span>2018-09-05 17:50</span></h2>
                <p>萨里看到静安寺点开链接卡拉胶奥斯卡来可视对讲阿萨德</p>
            </div>
            <div class="messageItem">
                <h2>阿斯兰的空间撒开了多久<span>2018-09-05 17:50</span></h2>
                <p>萨里看到静安寺点开链接卡拉胶奥斯卡来得及奥斯卡来得及拉可视对讲阿萨德</p>
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
          }
      },
      methods:{

      },
      mounted(){

      }
  }
</script>
<style>
    @import './../../assets/css/user.css';
</style>