// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'

import App from './App'
import routes from './router'//导入注册路由表
import store from './store'//导入vuex

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

import '@/assets/css/reset.css'

Vue.config.productionTip = false

Vue.use(MintUI)
Vue.use(VueRouter)

Vue.prototype.$ajax = axios

const router = new VueRouter({
  routes
})

router.beforeEach(({meta, path}, from, next) => {
  var { auth = true } = meta
  var isLogin = Boolean(store.state.user.phone) //true用户已登录， false用户未登录
  console.log('isLogin:'+isLogin+',,,auth:'+auth+',,,path:'+path)

  if (!auth && !isLogin && path !== '/login') {
    return next({ path: '/login' })
  }
  next()
})


/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

