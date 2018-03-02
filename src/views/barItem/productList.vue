<template>
  <div>
    <address-header :selectValue="selectValue1" @selectAddress="onSelect"></address-header>
    <hot-banner :bannerData="banner"></hot-banner>

    <mt-loadmore class="list" @translate-change="translateChange" :top-method="loadTop"  @top-status-change="handleTopChange"    :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
      <ul class="productList">
        <li class="item" v-for="(item,index) in list" :key="index">
          <img class="product-img" src="@/assets/images/01.jpg" alt="" />
          <div class="sub-title">
            <p class="txt">鬼怒甘无公害草莓</p>
            <div class="price">
              <p>￥56.8 </p><img src="@/assets/images/icon/202.png"/>
            </div>
          </div>
        </li>
      </ul>

      <div slot="top" class="mint-loadmore-top">
        <span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">
           <img  src="@/assets/images/icon/01.png"  :style="{ transform: 'scale3d(' + moveTranslate + ',' + moveTranslate + ',1)'}">
        </span>
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
</template>
<style scoped lang="scss">
  .loading-background, .mint-loadmore-top span {
    -webkit-transition: .2s linear;
    transition: .2s linear
  }
  .mint-loadmore-top span {
    display: inline-block;
    vertical-align: middle
  }

  .mint-loadmore-top span.is-rotate {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg)
  }

  .page-loadmore .mint-spinner {
    display: inline-block;
    vertical-align: middle
  }

  .page-loadmore-desc {
    text-align: center;
    color: #666;
    padding-bottom: 5px
  }

  .page-loadmore-desc:last-of-type,
  .page-loadmore-listitem {
    border-bottom: 1px solid #eee
  }

  .page-loadmore-listitem {
    height: 50px;
    line-height: 50px;
    text-align: center
  }

  .page-loadmore-listitem:first-child {
    border-top: 1px solid #eee
  }

  .page-loadmore-wrapper {
    overflow: scroll
  }

  .mint-loadmore-bottom span {
    display: inline-block;
    -webkit-transition: .2s linear;
    transition: .2s linear;
    vertical-align: middle
  }

  .mint-loadmore-bottom span.is-rotate {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg)
  }

  .productList{
    background: #fff;
    margin-top: 10px;
  }
  .productList:after {
    content:'';
    display:block;
    clear:both;
  }
  .item{
    width: 48%;
    background: #fff;
    margin-bottom: 10px;
    .product-img{
      height: 60px;
      width: 100%;
    }
    .sub-title{
      margin-top: 0.29rem;
      .txt{
        height: 0.4rem;
        padding: 0 0.13rem;
        line-height: 0.4rem;
        font-size: 0.34rem;
        color: #1b1b1b;
        overflow: hidden;
      }
      .price{
        display: flex;display: -webkit-flex;
        margin-bottom: 0.4rem;
        margin-top: 0.23rem;
        padding: 0 0.13rem;
        align-items: center;-webkit-align-items: center;
        p{
          flex: 1;-webkit-flex:1;
          color: #81D8D0;
          font-size: 0.45rem;
          .spec{
            font-size: 0.29rem;
          }
        }
        img{
          width: 0.41rem;
          height: 0.38rem;
          vertical-align: middle;
        }
      }
    }
  }
  .item:nth-child(odd){
    float: left;
  }
  .item:nth-child(even){
    float: right;
  }
</style>
<script>
  import addressHeader from '@/components/header/addressHeader.vue'
  import hotBanner from '@/components/banner/hotBanner'
  export default {
    data(){
      return{
        allLoaded: false,
        topStatus: '',
        bottomStatus: '',
        moveTranslate: 0,

        list:[1,2,3,4],

        selectValue1:'北京',
        banner:[
          {
            img:'./static/images/01.jpg'
          },
          {
            img:'./static/images/003.png'
          },
          {
            img:'./static/images/004.png'
          }
        ]
      }
    },
    methods:{
      onSelect(e){
        console.log('e+:'+e)
        this.selectValue1 = e
      },

      handleTopChange(status) {
        this.topStatus = status;
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
      translateChange(translate) {
        const translateNum = +translate;
//        this.translate = translateNum.toFixed(2);
        this.moveTranslate = (1 + translateNum / 70).toFixed(2);
      },
      handleBottomChange(status) {
        this.bottomStatus = status;
      },
      loadBottom() {
        setTimeout(() => {
          let lastValue = this.list[this.list.length - 1];
          if (lastValue < 90) {
            for (let i = 1; i <= 10; i++) {
              this.list.push(lastValue + i);
            }
          } else {
            this.allLoaded = true;
          }
          this.$refs.loadmore.onBottomLoaded();
        }, 1500);
      },

    },
    components:{
      addressHeader,
      hotBanner
    }
  }
</script>
