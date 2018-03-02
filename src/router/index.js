import Vue from 'vue'
// import Router from 'vue-router'
// import index from '@/components/index'

import main from '@/views/main'

import mainpage from '@/views/barItem/mainpage'
import productList from '@/views/barItem/productList'
import shopping from '@/views/barItem/shopping'
import usercenter from '@/views/barItem/usercenter'

import details from '@/views/details/details'

import seller from '@/views/seller/seller'

import classy from '@/views/classy/classy'

import login from '@/views/login/login'

// Vue.use(Router)

export default [
  {
    path: '/',
    name: 'main',
    component: main,
    children:[
      {
        path:'/',
        name:'精选',
        component:mainpage
      },
      {
        path:'/productList',
        name:'逛逛',
        component:productList
      },
      {
        path:'/shopping',
        name:'购物车',
        meta: { auth: false },
        component:shopping
      },
      {
        path:'/usercenter',
        name:'我的',
        component:usercenter
      },
    ]
  },
  {
    path:'/details',
    name:'产品详情',
    component:details
  },
  {
    path:'/classy',
    name:'分类',
    component:classy
  },
  {
    path:'/seller',
    name:'卖家主页',
    component:seller
  },
  {
    path:'/login',
    name:'登录',
    component:login
  },
  {
    path: '*', //其他页面，强制跳转到登录页面
    redirect: '/login'
  }
]
