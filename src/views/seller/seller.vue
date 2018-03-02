<template>
  <div class=""  :style="{ height: wrapperHeight + 'px',background:'url('+background+') no-repeat',backgroundPosition: 'top center',backgroundSize: (100+moveTranslate*10)+'%'}">
    <div class="page-loadmore">
      <div class="page-loadmore-wrapper" ref="wrapper">
        <mt-loadmore  :top-method="loadTop" @translate-change="translateChange" @top-status-change="handleTopChange" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
          <!--<img id="scaleBackground" src="@/assets/images/01.jpg" :style="{ transform: 'scale3d(' + moveTranslate + ',' + moveTranslate + ',1)' }" alt="">-->
          <ul class="page-loadmore-list">
            <li v-for="item in list" class="page-loadmore-listitem">{{ item }}</li>
          </ul>


          <div slot="top" class="mint-loadmore-top">
            <span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">↓</span>
            <span v-show="topStatus === 'loading'">
            <mt-spinner type="snake"></mt-spinner>
          </span>
          </div>


          <div slot="bottom" class="mint-loadmore-bottom">
            <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
            <span v-show="bottomStatus === 'loading'">
            <mt-spinner type="snake"></mt-spinner>
          </span>
          </div>
        </mt-loadmore>
      </div>
    </div>
  </div>

</template>

<style scoped lang="scss">
  .page-loadmore{
    position: relative;
    overflow-x: hidden;
    top: 0px
  }
  .page-loadmore{
    /*background: url("../../assets/images/01.jpg") no-repeat;*/
    /*!*background-size: 100% 100%;*!*/
    background-position: top center;
  }


</style>

<script type="text/babel">
  import myHeader from '@/components/header/header'
  export default {
    data() {
      return {
        title:'卖家主页',
        background:'./static/images/01.jpg',
        list: [],
        allLoaded: false,


        bottomStatus: '',
        wrapperHeight: 0,



        topStatus: '',
        //wrapperHeight: 0,
        translate: 0,
        moveTranslate: 0
      };
    },

    methods: {
      handleBottomChange(status) {
        this.bottomStatus = status;
      },
      loadBottom() {
        setTimeout(() => {
          let lastValue = this.list[this.list.length - 1];
          if (lastValue < 10000) {
            for (let i = 1; i <= 10; i++) {
              this.list.push(lastValue + i);
            }
          } else {
            this.allLoaded = true;
          }
          this.$refs.loadmore.onBottomLoaded();
        }, 1500);
      },
      handleTopChange(status) {
        this.moveTranslate = 1;
        this.topStatus = status;
      },
      translateChange(translate) {
        console.log('translate：'+translate)
        if(translate<0) return;
        const translateNum = +translate;
        this.translate = translateNum.toFixed(2);
        this.moveTranslate = (1 + translateNum / 100).toFixed(2);
      },
      loadTop() {
        setTimeout(() => {
          let firstValue = this.list[0];
          for (let i = 1; i <= 10; i++) {
            this.list.unshift(firstValue - i);
          }
          this.$refs.loadmore.onTopLoaded();
        }, 1500);
      },

    },
    created() {
      for (let i = 1; i <= 60; i++) {
        this.list.push(i);
      }
    },
    mounted() {
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    },
    components:{
      myHeader
    }
  };
</script>

