<template>
  <mt-search
    fixed
    v-model="value"
    cancel-text="取消"
    placeholder="搜索">
  </mt-search>
</template>
<style>
  .mint-search{
    position: fixed;
    top:0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 50px;
  }
</style>
<script>
  export default {
    data(){
      return{
        value:''
      }
    }
  }
</script>
