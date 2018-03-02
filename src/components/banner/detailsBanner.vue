<template>
  <div class="banner">
    <mt-swipe :auto="0">
      <mt-swipe-item v-for="(item,index) in detailsBanner" :key="index">
        <img :src="item" alt="">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<style scoped lang="scss">
  .banner{
    height: 200px;
    width: 100%;
    .mint-swipe-item{
      img{
        width: 100%;
        height: 200px;
      }
    }
  }
</style>
<script>
  export default {
    props:[
      'detailsBanner'
    ],
    data(){
      return {

      }
    },
    methods:{

    }
  }
</script>
