<template>
  <section class="mainBox">
    <router-view></router-view>
    <my-tabbar></my-tabbar>
  </section>
</template>
<style scoped lang="scss">
  .mainBox{
    padding-bottom: 50px;
  }
</style>
<script>
  import myTabbar from '@/components/tabbar/tabbar.vue'

  export default {
    data(){
      return{

      }
    },
    components:{
      myTabbar
    }
  }
</script>
