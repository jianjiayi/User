import Vue from 'vue'
import Vuex from 'vuex'


import user from './modules/user'//导入user
import cart from './modules/cart'//导入购物车

Vue.use(Vuex)//使用vuex

export default new Vuex.Store({
  modules: {
    user,
    cart
  },
  strict: process.env.NODE_ENV !== 'production', //在非生产环境下，使用严格模式
})
