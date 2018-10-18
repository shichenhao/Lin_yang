<template>
    <div class="box">
        <router-view></router-view>
        <mt-tabbar v-model="selected" :fixed="true" v-show="$route.meta.navShow">
            <mt-tab-item id="/">
                <img slot="icon" src="./assets/images/nav-icon1.png">
                首页
            </mt-tab-item>
            <mt-tab-item id="/user/message">
                <img slot="icon" src="./assets/images/nav-icon2.png">
                消息
            </mt-tab-item>
            <mt-tab-item id="/cart">
                <img slot="icon" src="./assets/images/nav-icon3.png">
                购物车
            </mt-tab-item>
            <mt-tab-item id="/user">
                <img slot="icon" src="./assets/images/nav-icon4.png">
                我的
            </mt-tab-item>
        </mt-tabbar>
    </div>
</template>

<script>
    export default {
        name: 'index',
        data() {
            return {
                selected: '首页',
            }
        },
        watch: {
            selected: function (val, oldVal) {
                // 这里就可以通过 val 的值变更来确定
                this.$router.push(val)
            }
        }
    }
  function pgScale(){
    let deviceWidth = document.documentElement.clientWidth;
    if(deviceWidth > 720) deviceWidth = 720;
      document.documentElement.style.fontSize = deviceWidth / 7.2 + 'px';
  }
  pgScale();
  window.onresize=function(){pgScale();};
 </script>