<template>
  <section>
    <div class="top-backgroung">
      <img src="@/assets/images/icon/mine-topbg.jpg" alt="">
      <div class="info">
        <img id="author" src="@/assets/images/icon/mine-author.png" @click="actionSheetAuthor" alt="">
        <p>
          <mt-button class="login" type="default" >登录</mt-button>
        </p>
      </div>
    </div>
    <mt-cell title="我的订单" is-link>
      <span></span>
      <img slot="icon" src="@/assets/images/icon/401.png" width="24" height="24">
    </mt-cell>
    <mt-cell title="我的收藏" is-link>
      <span></span>
      <img slot="icon" src="@/assets/images/icon/403.png" width="24" height="24">
    </mt-cell>
    <mt-cell title="我的关注" is-link>
      <span></span>
      <img slot="icon" src="@/assets/images/icon/404.png" width="24" height="24">
    </mt-cell>
    <mt-cell title="地址管理" is-link>
      <span></span>
      <img slot="icon" src="@/assets/images/icon/405.png" width="24" height="24">
    </mt-cell>
    <mt-cell title="安全设置" is-link>
      <span></span>
      <img slot="icon" src="@/assets/images/icon/406.png" width="24" height="24">
    </mt-cell>
    <mt-cell title="关于我们" is-link>
      <span></span>
      <img slot="icon" src="@/assets/images/icon/407.png" width="24" height="24">
    </mt-cell>


    <mt-button  class="signout" type="default"  @click="actionSheetSignout">退出</mt-button>

    <!--修改头像-->
    <mt-actionsheet
      :actions= "authordata"
      v-model="authorVisible">
    </mt-actionsheet>
    <!--退出-->
    <mt-actionsheet
      :actions= "sigoutdata"
      v-model="sigoutVisible">
    </mt-actionsheet>
  </section>
</template>

<style scoped lang="scss">
  .top-backgroung{
    height: 200px;
    img{
      width: 100%;
    }
    .info{
      margin-top: -180px;
      img{
        width: 80px;
      }
      .login{
        font-size: 14px;
        border: none;
      }
    }
  }
  .mint-cell{
    text-align: left;
  }
  .signout{
    width: 80%;
    margin-top: 50px;
  }
</style>

<script>
  import {mapActions} from 'vuex'
  import {USER_SIGNOUT} from '@/store/modules/user'

  export default {
    name: 'hello',
    data () {
      return {
        // action sheet 选项内容
        authordata: [{
          name: '拍照',
          method : this.getCamera// 调用methods中的函数
        }, {
          name: '从相册中选择',
          method : this.getLibrary// 调用methods中的函数
        }],
        // action sheet 默认不显示，为false。操作sheetVisible可以控制显示与隐藏
        authorVisible: false,

        sigoutdata:[{
          name: '确定退出',
          method : this.sigout// 调用methods中的函数
        }],
        sigoutVisible: false
      }
    },
    methods: {
      ...mapActions([USER_SIGNOUT]),
      sigout:function(){
        console.log('退出登录')
        this.USER_SIGNOUT()
        this.$router.replace({ path: '/usercenter/login' })
      },

      actionSheetAuthor: function(){// 打开action sheet
        this.authorVisible = true;
      },
      getCamera: function(){
        console.log("打开照相机")
      },
      getLibrary: function(){
        console.log("打开相册")
      },
      actionSheetSignout: function(){// 打开action sheet
        this.sigoutVisible = true;
      }
    }
  }
</script>
