import Vue from 'vue'
import MintUI from 'mint-ui'
import { Toast } from 'mint-ui';
import 'mint-ui/lib/style.css'
import '@/assets/css/common.css'
import '@/assets/css/index.css'
import router from './router';
import './assets/common'
import { http, multipart, getNews } from './util/api'
import App from './App.vue'

Vue.use(MintUI)
Vue.prototype.$axios = http;
Vue.prototype.getNews = getNews;
Vue.prototype.multipart = multipart;
Vue.prototype.Toast = Toast;

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
})

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})