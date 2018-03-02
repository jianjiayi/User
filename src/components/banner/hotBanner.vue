<template>
  <div class="banner">
    <mt-swipe :auto="0">
      <mt-swipe-item v-for="(item,index) in bannerData" :key="index">
        <img :src="item.img" alt="">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<style scoped lang="scss">
  .banner{
    height: 140px;
    width: 100%;
    .mint-swipe-item{
      img{
        width: 100%;
        height: 140px;
      }
    }
  }
</style>
<script>
  export default {
    props:[
      'bannerData'
    ],
    data(){
      return {

      }
    },
    methods:{

    }
  }
</script>
