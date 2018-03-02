<template>
  <section class="login">
    <img id="background" src="@/assets/images/icon/4100.png" alt="">
    <img class="close" src="@/assets/images/icon/420.png" @click="$router.back(-1)">

    <div class="loginreg_body">
      <div class="loginreg_input">
        <img class="label" src="@/assets/images/icon/4102.png"/>
        <input id='userTel' type="number" placeholder="输入手机号" v-model="form.phone">
      </div>
      <div class="loginreg_input">
        <img class="label" src="@/assets/images/icon/4101.png"/>
        <input id='password' type="password" placeholder="输入密码" v-model="form.password">
      </div>
      <p class="forget_password_p">
        忘记密码?
      </p>
      <div class="loginreg_button">
        <button id='login' type="button" @click="submit">登录</button>
      </div>
      <div class="loginreg_button">
        <p class="loginreg_p_line"></p>
        <a id='register'>新用户注册</a>
        <p class="loginreg_p_line"></p>
      </div>
    </div>
  </section>

</template>
<style scoped lang="scss">
  #background{
    position: absolute;
    left:0;
    right:0;
    bottom: 0;
    top:0;
    width: 100%;
    height: 100%;
  }
  .login{
    overflow-y: auto;
    .close{
      position: absolute;
      left:20px;
      top:10px;
      width: 20px;
    }
    .loginreg_body{
      position: absolute;
      left:10%;
      top:150px;
      width: 80%;
      .loginreg_input{
        border: 1px solid #fff;
        border-radius: 10px;
        height: 40px;
        margin-bottom: 20px;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        -webkit-align-items: center;
        .label{
          width: 30px;
          margin: 0 10px;
        }
        input{
          flex: 1;
          -webkit-flex: 1;
          margin-right: 10px;
          height: 36px;
          background: transparent;
          border: none;
          outline: none;
        }
      }
      .forget_password_p{
        text-align: right;
        color: #cccccc;
        font-size: 14px;
      }
      .loginreg_button{
        display: flex;
        display: -webkit-flex;
        align-items: center;
        -webkit-align-items: center;
        justify-content: center;
        -webkit-justify-content: center;
        margin: 15px auto;
        button{
          background: #4caf50;
          border-radius: 10px;
          height: 40px;
          width: 80%;
          border: none;
          color: #ffffff;
          font-size: 14px;
        }
        .loginreg_p_line{
          width: 50px;
          height: 1px;
          background: #fff;
          margin: 0;
        }
        #register{
          margin: 0 10px;
          color: #ffffff;
          font-size: 14px;
        }
      }
    }
  }
</style>
<script>
  import {mapActions} from 'vuex'
  import {USER_SIGNIN} from '@/store/modules/user'

  export default {
    data(){
      return{
        form:{
          phone:'',
          password:''
        }
      }
    },
    methods:{
      ...mapActions([USER_SIGNIN]),
      submit() {
        this.btn = true
        if(!this.form.phone || !this.form.password) return
        this.USER_SIGNIN(this.form)
        this.$router.replace({ path: '/' })
      }
    }
  }
</script>
