<template>
  <div id="shop-cart">
    <!--购物车-->
    <div v-if="cartDataList.length" class="shop-cart">
      <!--购物车商品类表-->
      <div class="list-item" v-for="(items,index) in cartDataList" :key="index">
        <div class="shop-name">
          <input type="checkbox" :checked="items.shopChecked" @click="selectedShop(items.adminId)"/>
          <img class="adminAvatar" :src="items.adminAvatar" alt="">
          <em>{{items.adminName}}</em>
        </div>
        <ul class="product-list">
          <li class="item  shop-info" v-for="(item,i) in items.goodsList" :key="i">
            <div class="body-media">
              <input type="checkbox" :checked="item.checked" @click="selectedGoods(items.adminId,item.id)"/>
              <img class="product-img" :src="item.goodsInfo.mainImage">
              <div class="info">
                <div class="txt">
                  <p class="name">{{item.goodsInfo.name}}</p>
                  <p class="einheit">单位：{{item.goodsInfo.price}}</p>
                  <p class="price">￥ <em class="price1">{{item.goodsInfo.price}}</em></p>
                </div>
                <span class="del" @click="delBtn(items.adminId,item.id)">
                    <img src="@/assets/images/icon/303.png"/>
                  </span>
              </div>
            </div>
            <div class="num-btn">
                <span class="box">
                  <em class="reduce" @click="update(-1,items.adminId,item.id)"></em>
                  <span class="number">{{item.number}}</span>
                  <em class="add" @click="update(1,items.adminId,item.id)"></em>
                </span>
            </div>
          </li>
        </ul>
      </div>
      <!--购物车底部按钮-->
      <div class="bottomBar">
        <p class="txt">
          <span>
            <input type="checkbox" v-model="selectAll"/>
            全选
            <mt-button v-if="selectAll" class="clearBtn" @click="clearCart()">删除</mt-button>
          </span>

          <span>
            合计：{{ totalPrice }} 元
          </span>
        </p>
        <mt-button :class=" isActive ? 'active' : '' "  @click="submitBtn(isActive)">提交（{{totalNum}}）</mt-button>
      </div>
    </div>

    <!--购物车为空提示-->
    <div v-else class="toastTxt">购物车为空</div>

  </div>
</template>


<script>
  import {mapGetters,mapMutations} from 'vuex'
  export default {
    data(){
      return{

      }
    },
    computed:{
      ...mapGetters(['cartDataList','totalPrice','totalNum','isActive']),//cartDataList:购物车列表；totalPrice：购物车总价；totalNum：确定购买数量；isActive：按钮是否被激活
      //全选按钮
      selectAll: {
        //获取是否全选
        get: function () {
          return this.cartDataList.filter(function (items) { //动态判断全选按钮是否选中（根据 选中的商店数量==items数组长度）
            return items.shopChecked === true;
          }).length == this.cartDataList.length;
        },
        //修改全选按钮状态
        set: function (val) {
          this.setSelectAll(val);//调用methods中setSelectAll方法，修改vuex中所有商家和商品选中状态
        }
      }
    },
    methods:{
      ...mapMutations(['setSelectAll','checkedShop','checkedGodds','updateGoods','delGodds','clearAllCart']),

      //选择商家
      selectedShop(adminId){
        this.checkedShop(adminId)
      },
      //选择商品
      selectedGoods(shopId,goodsId){
        let item = {
          shopId:shopId,//商家id
          goodsId:goodsId//商品id
        }
        this.checkedGodds(item)
      },
      //更新指定商品数量，加减
      update(n,shopId,goodsId){
        let item = {
          value:n,//改变数值
          shopId:shopId,//商家id
          goodsId:goodsId//商品id
        };
        console.log(item)
        this.updateGoods(item);
      },
      //删除指定商品
      delBtn(shopId,goodsId){
        this.$messageBox.confirm('确定执行此操作?').then(action => {
          let item = {
            shopId:shopId,//商家id
            goodsId:goodsId//商品id
          }
          console.info(item)
          this.delGodds(item)
        });
      },
      //清空购物车
      clearCart(){
        this.clearAllCart();
      },
      //结算按钮
      submitBtn(isActive){
        console.log(isActive)
      }
    }
  }
</script>


<style scoped lang="scss">
  #shop-cart{
    margin-bottom: 50px;
    text-align: left;
    .list-item{
      margin-bottom: 10px;
      background: #ffffff;
      .shop-name{
        position: relative;
        height: 40px;
        border-bottom: 1px solid #eeeeee;
        display: flex;
        display: -webkit-flex;
        padding: 5px 10px;
        line-height: 40px;
        align-items:center;/*垂直居中*/
        .radio{
          position: relative;
          width: 20px;
          height: 20px;
          vertical-align: middle;
        }
        .adminAvatar{
          width: 30px;
          height: 30px;
          border-radius: 50%;
          margin: 0 5px 0 10px;
        }
        em{
          font-size: 14px;
          color: #1B1B1B;
          padding-right: 10px;
        }
        em:after{
          content: '';
          display: inline-block;
          vertical-align: middle;
          width: 8px;
          height: 8px;
          border-top: 1px solid #656565;
          border-right: 1px solid #656565;
          transform: rotate(45deg);
          -webkit-transform: rotate(45deg)
        }
      }
      .product-list{
        padding: 0 10px;
        .item{
          position: relative;
          padding: 5px 0 0 0;
          border-bottom: 1px solid #eeeeee;
          .body-media{
            position: relative;
            display: flex;
            display: -webkit-flex;
            align-items:center;/*垂直居中*/
            -webkit-align-items: center;
            .product-img{
              width: 100px;
              height: 60px;
              margin-left: 10px;
            }
            .info{
              flex: 1;
              -webkit-flex:1;
              display: flex;
              display: -webkit-flex;
              margin-left: 10px;
              .txt{
                flex: 1;
                -webkit-flex:1;
                .name{
                  font-size: 12px;
                  color: #1B1B1B;
                  height:30px;
                  line-height: 30px;
                }
                .einheit{
                  font-size: 12px;
                  height: 30px;
                  color: #959595;
                  display: flex;
                  display: -webkit-flex;
                  justify-content: space-between;
                  -webkit-justify-content: space-between;
                }
                .price{
                  font-size: 12px;
                  color: #81d8d0;
                  display: flex;display: -webkit-flex;
                  .spec{
                    color: #959595;
                    font-size: 12px;
                  }
                }
                .cMailTex{
                  color: #ff0000;
                  font-size: 14px;
                  flex: 1;
                  -webkit-flex: 1;
                  display: flex;
                  display: -webkit-flex;
                  justify-content: flex-end;
                  -webkit-justify-content: flex-end;
                  em{
                    text-align: right;
                  }
                }
              }
              .del{
                width: 18px;
                height: 18px;
                img{
                  width: 100%;
                }
              }
            }

          }
          .num-btn{
            display: flex;
            display: -webkit-flex;
            padding: 10px 0;
            justify-content:flex-end;
            .box{
              display: flex;
              display: -webkit-flex;
            }
            .reduce{
              width: 20px;
              height: 15px;
              display: inline-block;
              background: url(../../assets/images/icon/305.png) no-repeat;
              background-size: 20px 15px;
              background-position: center center;
            }
            .add{
              width: 20px;
              height: 15px;
              display: inline-block;
              background: url(../../assets/images/icon/304.png) no-repeat;
              background-size: 20px 15px;
              background-position: center center;
            }
            .reduce:active,
            .add:active{
              background: #cccccc;
            }
            .number{
              padding: 0 20px;
              font-size: 14px;
              height: 20px;
              line-height: 20px;
              padding: 0;
              margin: 0;
              color: #1B1B1B;
              display: inline-block;
              text-align: center;
            }
          }
        }
      }
    }
    #invalidList{
      background: #fff;
      padding-bottom: 0.13rem;
      display: none;
      .topTitle{
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        background: #FFF;
        height: 1.33rem;
        align-items: center;
        -webkit-align-items: center;
        margin:0 0.42rem;
        font-size: 0.34rem;
        color: #1B1B1B;
        border-bottom: 1px solid #cccccc;
        em#clearBtn{
          color: #ff0000;;
        }
      }
      .product-list{
        padding: 0 0.42rem;
        .item{
          position: relative;
          padding: 0.2rem 0 0.2rem 0;
          border-bottom: 1px solid #eeeeee;
          .body-media{
            position: relative;
            display: flex;
            display: -webkit-flex;
            align-items:center;/*垂直居中*/
            .lebal{
              position: relative;
              padding: 0 0.26rem;
              background: #cccccc;
              border-radius: 0.13rem;
              vertical-align: middle;
              color: #ffffff;
            }
            .product-img{
              width: 3.2rem;
              height: 2.13rem;
              margin-left: 0.26rem;
            }
            .info{
              flex: 1;
              -webkit-flex:1;
              display: flex;
              display: -webkit-flex;
              margin-left: 0.4rem;
              .txt{
                flex: 1;-webkit-flex:1;
                .name{
                  font-size: 0.34rem;
                  color: #cccccc;
                  height: 1.4rem;
                  line-height: 0.37rem;
                  overflow: hidden;
                }
                .reason{
                  color: #1B1B1B;
                  margin-top: 0.13rem;
                  font-size: 0.4rem;
                  line-height: 0.37rem;
                }
                .cMailTex{
                  color: #ff0000;
                  margin-top: 0.13rem;
                  font-size: 0.4rem;
                  line-height: 0.5rem;
                  justify-content: flex-end;
                  -webkit-justify-content: flex-end;
                }
              }

            }
          }
        }
      }
    }
    #settlement-bar{
      display: flex;
      display: -webkit-flex;
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      background: #f5fffe;
      height: 1.17rem;
      line-height: 1.17rem;
      z-index: 88;
      .all-check{
        font-size: 0.45rem;
        width: 2.4rem;
        color: #1B1B1B;
        padding-left: 0.42rem;
      }
      .price-submit{
        flex: 1;
        -webkit-flex:1;
        display: flex;
        display: -webkit-flex;
        justify-content:flex-end;
        .sum{
          font-size: 0.34rem;
          color: #1B1B1B;
          padding-right: 0.42rem;
          em{
            margin-left: 0.42rem;
            color: #FF0000;
          }
        }
        .submit-btn{
          width: 3.33rem;
          background: #81d8d0;
          text-align: center;
          color: #fff;
          font-size: 0.34rem;
        }
        .submit-btn:active{
          background: #ccc;
        }
      }
    }
  }
  .bottomBar{
    position: fixed;
    bottom: 54px;
    left:0;
    width: 100%;
    height: 40px;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: center;
    background: #ffffff;
    border-top: 1px solid #cccccc;
    .txt{
      flex: 1;
      -webkit-flex: 1;
      display: flex;
      display: -webkit-flex;
      align-items: center;
      -webkit-align-items: center;
      padding: 0 10px;
      span{
        flex: 1;
        -webkit-flex: 1;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        -webkit-align-items: center;
        input{
          margin-right: 10px;
        }
      }
    }
    .clearBtn{
      width: 40px;
      background: red;
      height: 25px;
      margin-left: 10px;
      font-size: 10px;
      padding:0;
      border-radius: 5px;
    }
    button{
      width: 100px;
      font-size: 16px;
      border: none;
      border-radius: 0;
      background: #cccccc;
      color: #ffffff;
      padding: 0;
    }
    button.active{
      background:#81D8D0;
    }
  }
  .toastTxt{
    position: fixed;
    width: 100%;
    height: 100%;
    top:0;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: center;
    justify-content:center;
    -webkit-justify-content: center;
  }
</style>
