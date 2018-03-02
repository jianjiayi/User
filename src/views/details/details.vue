<template>
  <div class="details">
    <mt-header title="详情">
      <router-link to="/" slot="left">
        <mt-button icon="back" @click="handleClose">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <details-banner :detailsBanner="getDetails.bannerList"></details-banner>

    <div class="goods-info">
      <div class="name">{{getDetails.name}}</div>
      <div class="price">￥{{getDetails.price}} <span>/斤</span></div>
      <div  class="postage">快递费：包邮</div>
    </div>

    <div class="shop">
      <div class="title">
            <p>店铺主人</p>
        </div>
        <router-link :to="{path:'/seller',query:{id:'123456'}}">
          <div class="shop-info">
            <span>
               <img  :src="getDetails.avatar">
                {{getDetails.adminName}}
            </span>
          </div>
        </router-link>
    </div>

    <div class="introduction">
      <div class="title">
            <p>店铺公告</p>
        </div>
        <div class="info">束带结发手机发甲方收到房间卡萨</div>
    </div>


    <div class="footerBtn">
      <mt-button class="btn1" @click="handleCollection">
        <img src="@/assets/images/icon/113.png" slot="icon">
        收藏
      </mt-button>
      <mt-button class="btn2" @click="addCart">加入购物车</mt-button>
      <mt-button class="btn3" @click="nowBuy">立即购买</mt-button>
    </div>

    <mt-popup
      v-model="popupBtnGroup"
      position="bottom">
      <div id="details-popover">
				<div class="info">
					<img :src="getDetails.mainImage"/>
					<div class="txt">
						<p class="price">￥<em>58.9</em></p>
						<p class="number">库存：<em>5234</em></p>
					</div>
					<em class="close-popover" @click="closePopup">
            <img src="@/assets/images/icon/420.png" alt="">
          </em>
				</div>
				<div class="order-num">
					购买数量<span class="num-btn">
						<em class="reduce" @click="reduce(number)">
							<img src="@/assets/images/icon/305.png" alt="" />
						</em>
						<input class="number" type="number" v-model="number"/>
						<em class="add" @click="add(number)">
							<img src="@/assets/images/icon/304.png" alt="" />
						</em>
					</span>
				</div>
				<div :class="btnState === 0 ? 'submit-btn add-cart':'submit-btn now-buy'" @click="submitBtn(btnState)">
					确定
				</div>
			</div>
    </mt-popup>
  </div>
</template>
<script>

  import  detailsBanner from '@/components/banner/detailsBanner'

  import {mapGetters,mapActions} from 'vuex'

  export default {

    data(){
      return{
        popupBtnGroup:false,
        btnState:0,
        number:1
      }
    },
    computed:{
      ...mapGetters(['getDetails'])
    },
    methods:{
      ...mapActions(['addToCart']),//...mapActions是Es6扩展运算符;addToCarts是actions中定义的添加购物车方法
      handleClose(){
        this.$router.back(-1)
      },
      handleCollection(){
        let _this = this
        _this.$indicator.open({
          spinnerType: 'fading-circle',
        });
        setTimeout(() => {
          _this.$indicator.close();
        },2000);
      },
      reduce(num){
        if(num<=1) return;
        this.number--
      },
      add(num){
        if(num>=5){
          let instance = this.$toast('库存不足');
          setTimeout(() => {
            instance.close();
          }, 2000);
          return;
        }
        this.number++
      },
      addCart(){
        this.number = 1;
        this.popupBtnGroup = true;
        this.btnState = 0;
      },
      nowBuy(){
        this.number = 1;
        this.popupBtnGroup = true;
        this.btnState = 1;
      },
      submitBtn(state){
        switch (state){
          case 0:
            console.log('加入购物车')
            this.addToCart(this.getDetails);
            break;
          case 1:
            console.log('立即购买')
            break;
          default:
            console.log('error')
        }
        this.popupBtnGroup = false;
      },
      closePopup(){
        this.popupBtnGroup = false;
      }
    },
    components:{
      detailsBanner
    }
  }

</script>

<style scoped lang="scss">
  .mint-header{

  }
  .mint-cell{
    text-align: left;
  }
  .title{
    position: relative;
    margin: 0 auto;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    -webkit-justify-content: center;
    align-items: center;
    -webkit-align-items: center;
    p{
      font-size: 10px;
      color: #959595;
      line-height: 30px;
      text-align: center;
      margin: 0 10px;
      img{
        width: 20px;
        margin-right: 5px;
        vertical-align: middle;
      }
    }
  }
  .title:before{
    content: '';
    display: block;
    width: 40px;
    height: 1px;
    background:#e5e5e5;
  }
  .title:after{
    content: '';
    display: block;
    width: 40px;
    height: 1px;
    background:#e5e5e5;
  }
  .goods-info{
    padding: 10px 10px;
    background: #fff;
    min-height: 80px;
    line-height: 30px;
    border-bottom: 5px solid #e5e5e5;
    text-align: left;
    .name{
      color: #1a1a1a;
      font-size: 14px;
      max-height: 20px;
      overflow: hidden;
    }
    .price{
      color: #c71521;
      font-size: 16px;
      span{
        color: #ff0000;
        font-size: 12px;
      }
    }
    .postage{
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;
      -webkit-justify-content: space-between;
      font-size: 10px;
      .price{
        color: #959595;
        font-size: 10px;
      }
      .txt{
        color: #ff0000;
        font-size:10px;
      }
    }
  }
  .shop{
    padding: 0px 10px 5px 10px;
    border-bottom: 5px solid #e5e5e5;
    background: #fff;
    min-height: 80px;
    .shop-info{
      position: relative;
      display: flex;
      display: -webkit-flex;
      align-items: center;
      -webkit-align-items: center;
      height: 40px;
      margin-top: 4px;
      text-decoration: none;
      span{
        flex: 1;
        -wibkit-flex:1;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        -webkit-align-items: center;
        font-size: 16px;
        color: #1b1b1b;
        img{
          width: 30px;
          height:30px;
          border-radius: 50%;
          margin-right: 20px;
        }
      }
    }
    .shop-info:after{
      content: '';
      display: inline-block;
      width:10px;
      height: 10px;
      border-top: 1px solid #656565;
      border-right: 1px solid #656565;
      transform: rotate(45deg);
      -webkit-transform: rotate(45deg)
    }
  }

  .introduction{
    padding: 10px 10px;
    min-height: 80px;
    background: #fff;
    .info{
      color: #1b1b1b;
      font-size: 14px;
      line-height: 30px;
      text-align: left;
    }
  }
  .footerBtn{
    position: fixed;
    bottom: 0;
    width: 100%;
    left:0;
    display: flex;
    display: -webkit-flex;
    button{
      flex: 1;
      -webkit-flex: 1;
      display: flex;
      display: -webkit-flex;
      align-items: center;
      -webkit-align-items: center;
      justify-content: center;
      -webkit-justify-content: center;
      font-size: 16px;
      border: none;
      border-radius: 0;
      img{
        width: 18px;
        height: 100%;
        margin-right: 10px;
      }
    }
    button.btn2{
      background:#81D8D0;
      color: #ffffff;
    }
    button.btn3{
      background: #ef4f4f;
      color: #ffffff;
    }
  }


  .mint-popup-bottom{
    width: 100%;
  }
  #details-popover{
    background: #fff;
    .info{
      position: relative;
      display: flex;display: -webkit-flex;
      padding: 30px 10px;
      img{
        width: 50px;
        height: 50px;
        margin-right: 10px;
      }
      .txt{
        flex: 1;
        -webkit-flex:1;
        text-align: left;
        .price{
          color: #C71521;
          font-size: 12px;
          margin-bottom: 10px;
        }
        .number{
          color: #1B1B1B;
          font-size: 14px;
        }
      }
      .close-popover{
        position: absolute;
        right: 0;
        top: 0;
        width:40px;
        height: 40px;
        justify-content: center;
        -webkit-justify-content: center;
        align-items: center;
        -webkit-align-items: center;
        display: flex;
        display: -webkit-flex;
        img{
          width: 18px;
          height: 18px;
          margin-right: 0;
        }
      }
      .close-popover:active{
        background: #CCCCCC;
      }
    }
    .order-num{
      display: flex;
      display: -webkit-flex;
      height: 50px;
      margin: 0 10px;
      border-top: 1px solid #EEEEEE;
      justify-content: space-between;
      -webkit-justify-content: space-between;
      align-items: center;
      -webkit-align-items: center;
      color: #1B1B1B;
      .num-btn{
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        -webkit-justify-content: center;
        align-content: center;
        em{
          background: #EEEEEE;
          width: 40px;
          height: 25px;
          border-radius: 5px;
          text-align: center;
          position: relative;
          margin-top: 0px;
          img{
            position: absolute;
            left: 50%;
            top: 50%;
            margin-left: -0.2rem;
            margin-top: -0.2rem;
            width: 0.34rem;
            height: 0.34rem;
          }
        }
        em:active{
          background: #ccc;
        }
        input{
          border: 0;
          width: 40px;
          text-align: center;
          margin: 0;
          padding: 0;
          height: 25px;
          line-height: 25px;
          background: transparent;
        }
      }
    }
    .submit-btn{
      height: 50px;
      color: #fff;
      text-align: center;
      line-height: 50px;
      font-size: 16px;
    }
    .add-cart{
      background: #81D8D0;
    }
    .now-buy{
      background: #C71521;
    }
    .submit-btn:active{
      background: #CCCCCC;
    }
  }
</style>
