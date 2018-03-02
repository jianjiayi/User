<template>
  <mt-tabbar fixed v-model="selected">
    <mt-tab-item id="精选">
      <img slot="icon" src="@/assets/images/icon/01.png">
      精选
    </mt-tab-item>
    <mt-tab-item id="逛逛">
      <img slot="icon" src="@/assets/images/icon/02.png">
      逛逛
    </mt-tab-item>
    <mt-tab-item id="购物车">
      <img slot="icon" src="@/assets/images/icon/03.png">
      购物车
    </mt-tab-item>
    <mt-tab-item id="我的">
      <img slot="icon" src="@/assets/images/icon/04.png">
      我的
    </mt-tab-item>
  </mt-tabbar>

</template>
<style scoped lang="scss">
  .mint-tabbar{
    bottom: 0;
  }
  .mint-tabbar > .mint-tab-item.is-selected{
    background-color: transparent ;
  }
</style>
<script>
  import {mapState,mapActions,mapGetters} from 'vuex'

  export default {
    data(){
      return{
        selected: '精选'
      }
    },
    watch:{
      selected: function (val, oldVal) {
        // 这里就可以通过 val 的值变更来确定
        switch (val){
          case '精选':
            this.$router.push('/');
            break;
          case '逛逛':
            this.$router.push('/productList');
            break;
          case '购物车':
            this.$router.push('/shopping');
            break;
          case '我的':
            this.$router.push('/usercenter');
            break;
        }
      }
    },
    methods:{
    }
  }
</script>


