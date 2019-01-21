<template>
    <div class="box">
        <router-view></router-view>
        <mt-tabbar v-model="selected" :fixed="true" v-show="$route.meta.navShow">
            <mt-tab-item id="/">
                <img slot="icon" src="./assets/images/nav-icon1-a.png" v-if="selected == '首页' || selected == '/'">
                <img slot="icon" src="./assets/images/nav-icon1.png" v-else>
                首页
            </mt-tab-item>
            <mt-tab-item id="/user/message">
                <img slot="icon" src="./assets/images/nav-icon2-a.png" v-if="selected == '/user/message'">
                <img slot="icon" src="./assets/images/nav-icon2.png" v-else>
                消息
                <span v-if="msgArr"></span>
            </mt-tab-item>
            <mt-tab-item id="/cart">
                <img slot="icon" src="./assets/images/nav-icon3-a.png" v-if="selected == '/cart'">
                <img slot="icon" src="./assets/images/nav-icon3.png" v-else>
                购物车
            </mt-tab-item>
            <mt-tab-item id="/user">
                <img slot="icon" src="./assets/images/nav-icon4-a.png" v-if="selected == '/user'">
                <img slot="icon" src="./assets/images/nav-icon4.png" v-else>
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
        msgArr:false
      }
    },
    watch: {
      selected: function (val, oldVal) {
        // 这里就可以通过 val 的值变更来确定
        // console.log(val, oldVal)
        if(val === '/user/message'){
          this.msgArr = false
          localStorage.removeItem('msgArr')
        }
        this.$router.push(val)
      },
      '$route': function (newVal, oldVal) {
        // console.log(newVal,222)
        if(newVal.path === '/user'){
          this.selected = '/user'
        }
        else if(newVal.path === '/user/message'){
          this.selected = '/user/message'
        }
        else if(newVal.path === '/cart'){
          this.selected = '/cart'
        }
        else if(newVal.path === '/'){
          this.selected = '/'
        }
      }
    },
    created() {
      this.msgArr = localStorage.getItem('msgArr')
      if (this.$router.history.current.path === "/user/message") {
        this.selected = '/user/message'
      } else if (this.$router.history.current.path === "/user") {
        this.selected = '/user'
      } else if (this.$router.history.current.path === "/cart") {
        this.selected = '/cart'
      } else if (this.$router.history.current.path === '/'){
        this.selected = '/'
      }
    }
  }

  function pgScale() {
    let deviceWidth = document.documentElement.clientWidth;
    if (deviceWidth > 720) deviceWidth = 720;
    document.documentElement.style.fontSize = deviceWidth / 7.2 + 'px';
  }

  pgScale();
  window.onresize = function () {
    pgScale();
  };
</script>