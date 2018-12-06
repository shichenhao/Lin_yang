import Vue from 'vue'
import Router from 'vue-router'
import Index from './../pages/'
import Shopping from '@/pages/shopping/'
import Cart from '@/pages/cart/'
import ConfirmOrder from '@/pages/cart/confirmOrder/'
import Experience from '@/pages/experience/'
import Login from '@/pages/login/'
import Retrieve from '@/pages/retrieve/'
import Register from '@/pages/register/'
import User from '@/pages/user/'
import UserMessage from '@/pages/user/message'
import UserMoney from '@/pages/user/money'
import UserTeam from '@/pages/user/team'
import UserToker from '@/pages/user/toker'
import UserAddress from '@/pages/user/address'
import UserAddressAdd from '@/pages/user/addressAdd'
import Extension from '@/pages/extension'
import News from '@/pages/news'

Vue.use(Router)

export default new Router({
  routes: [
      {
          path: '/',
          component: Index,
          meta: {
              title: '首页',
              navShow: true
          }
      },
      {
          path: '/shopping',
          component: Shopping,
          meta: {
              title: '虫草商城',
              navShow: true
          }
      },
      {
          path: '/cart',
          component: Cart,
          meta: {
              title: '购物车',
              navShow: true
          }
      },
      {
          path: '/cart/order',
          component: ConfirmOrder,
          meta: {
              title: '确认订单',
              navShow: false
          }
      },
      {
          path: '/login',
          component: Login,
          meta: {
              title: '登录',
              navShow: false
          }
      },
      {
          path: '/retrieve',
          component: Retrieve,
          meta: {
              title: '找回密码',
              navShow: false
          }
      },
      {
          path: '/register',
          component: Register,
          meta: {
              title: '注册',
              navShow: false
          }
      },
      {
          path: '/user',
          component: User,
          meta: {
              title: '我的',
              navShow: true
          }
      },
      {
          path: '/user/message',
          component: UserMessage,
          meta: {
              title: '消息',
              navShow: true
          }
      },
      {
          path: '/user/address',
          component: UserAddress,
          meta: {
              title: '我的地址',
              navShow: false
          }
      },
      {
          path: '/user/address/add',
          component: UserAddressAdd,
          meta: {
              title: '我的地址',
              navShow: false
          }
      },
      {
          path: '/user/money',
          component: UserMoney,
          meta: {
              title: '我的财富',
              navShow: false
          }
      },
      {
          path: '/user/team',
          component: UserTeam,
          meta: {
              title: '我的团队',
              navShow: false
          }
      },
      {
          path: '/user/toker',
          component: UserToker,
          meta: {
              title: '拓客信息',
              navShow: false
          }
      },
      {
          path: '/experience',
          component: Experience,
          meta: {
              title: '即可体验',
              navShow: true
          }
      },
    {
      path: '/extension',
      component: Extension,
      meta: {
        title: '体验推广',
        navShow: false
      }
    },
    {
      path: '/news',
      component: News,
      meta: {
        title: '消息中心',
        navShow: false
      }
    },
  ]
})
