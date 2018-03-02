<template>
  <mt-header :title="titleName">
    <router-link to="/" slot="left">
      <mt-button icon="back" @click="handleClose">返回</mt-button>
    </router-link>
  </mt-header>
</template>
<style scoped lang="scss">

</style>
<script>
  export default{
    props:[
      'titleName'
    ],
    data(){
      return{}
    },
    methods:{
      handleClose(){
        this.$router.back(-1)
      }
    }
  }
</script>
