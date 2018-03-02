<template>
  <div>
    <mt-header fixed :title="selectValue">
      <mt-button icon="more" slot="right" @click="popupBottom"></mt-button>
    </mt-header>
    <mt-popup
      v-model="popupVisible"
      position="bottom">
      <div class="button-top">
        <mt-button  size="small" type="default" @click="cancel">取消</mt-button>
        <mt-button  size="small" type="primary" @click="submit">完成</mt-button>
      </div>
      <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
    </mt-popup>
  </div>
</template>
<style scoped lang="scss">
  .mint-popup-bottom{
    width: 100%;
  }
  .picker{
    width: 80%;
    margin: 20px auto;
  }
  .button-top{
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    -webkit-justify-content: space-between;
    padding: 5px 8px 5px 8px;
    border-bottom: 1px solid #ccc;
  }
</style>
<script>
  export  default {
    props:['selectValue'],
    data(){
      return{
        popupVisible : false,
        pickerVal:'',
        slots: [
          {
            flex: 1,
            values: ['北京', '上海', '天津', '重庆', '广东', '浙江'],
            defaultIndex:3,
            className: 'slot',
            textAlign: 'center'
          }
        ]
      }
    },
    methods:{
      popupBottom(){
        this.popupVisible = true
      },
      onValuesChange(picker, values) {
        this.pickerVal = values
      },
      getSlotValue(index){
        console.log(index)
      },
      cancel(){
        this.popupVisible = false
      },
      submit(){
        this.popupVisible = false
        console.log(this.pickerVal)
        this.$emit('selectAddress',this.pickerVal[0])
      }
    }
  }
</script>
