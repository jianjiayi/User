import Vue from 'vue'

export const USER_SIGNIN = 'USER_SIGNIN' //登录成功
export const USER_SIGNOUT = 'USER_SIGNOUT' //退出登录

export default {
  state: JSON.parse(sessionStorage.getItem('user')) || {},
  mutations: {
    [USER_SIGNIN](state, user) {
      sessionStorage.setItem('user', JSON.stringify(user))
      Object.assign(state, user)//Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
    },
    [USER_SIGNOUT](state) {
      sessionStorage.removeItem('user')
      Object.keys(state).forEach(k => Vue.delete(state, k))//Object.keys() 方法会返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和使用 for...in 循环遍历该对象时返回的顺序一致 （两者的主要区别是 一个 for-in 循环还会枚举其原型链上的属性）。
    }
  },
  actions: {
    [USER_SIGNIN]({commit}, user) {
      commit(USER_SIGNIN, user)
    },
    [USER_SIGNOUT]({commit}) {
      commit(USER_SIGNOUT)
    }
  }
}
