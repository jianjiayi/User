//初始化数据
const state = {
  detailsData:{},//临时保存详情页信息
  addCart:[]//添加到购物车的商品（已选商品）
}


//getter 抛出去的数据
const getters ={
  //获取详情页信息
  getDetails:state => {
    return state.detailsData
  },
  //购物车的列表
  cartDataList:state =>{
    console.log(state.addCart)
    return state.addCart;
  },
  //计算总价
  totalPrice:(state,getters) => {
    let total = 0;
    getters.cartDataList.map(//遍历所有商家
      item => {
        item.goodsList.map((n) => {//遍历该商家下所有商品
          if(n.checked === true){//筛选选中的商品

            //---------这里可以添加运费，减免运费的等条件-------------

            total += n.goodsInfo.price * n.number;//计算所有选中商品价格*数量，相加
          }
        });
      }
    );
    return total;
  },
  //计算选中商品总数量
  totalNum:(state,getters) => {
    let total = 0;
    getters.cartDataList.map(
      item => {
        item.goodsList.map((n) => {//遍历该商家下所有商品
          if(n.checked === true){//筛选选中的商品
            total += n.number//计算所有选中商品数量，相加
          }
        });
      }
    );
    return total;
  },
  //提交按钮是否被激活
  isActive:(state,getters) => {
    let active = true;
    getters.cartDataList.map(item => {
      active = item.goodsList.find(n => n.checked === true );
    })
    return active;
  }
}


//action 异步的操作
const actions = {
  //设置详情页信息
  setDetails({commit},item){
    commit('setDetails',{item})
  },
  //添加购物车
  addToCart({commit},item){
    commit('addToCart',{item})
  },
  //修改全选状态
  setSelectAll({commit},val){
    commit('setSelectAll',val)
  },
  //选择商家下所有商品
  checkedShop({commit},id){
    commit('checkedShop',id)
  },
  //选择某一件商品
  checkedGodds({commit},item){
    commit('checkedGodds',item)
  },
  //更新某一件商品数量
  updateGoods({commit},item){
    commit('updateGoods',{item})
  },
  //删除某一件商品
  delGodds({commit},item){
    commit('delGodds',{item})
  },
  //清空购物车
  clearAllCart({commit}){
    commit('clearAllCart')
  }
}


//mutations 同步的操作
const mutations = {
  //设置详情页信息
  setDetails(state,item){
    state.detailsData = item;
  },
  //添加购物车方法
  addToCart(state,{item}){//当接受的参数为对象时用{},字符串时不用{}

    let recordAdmin = state.addCart.find(n => n.adminId === item.adminId);//遍历购物车是否存在该商家

    if(!recordAdmin){//购物车不存在该商家

      state.addCart.push({//在数组首部插入，确保新加入购物车的商品在购物车列表最上部显示
        adminId:item.adminId,//商家ID
        adminName:item.adminName,//商家名称
        adminAvatar:item.avatar,//商家头像
        shopChecked:true,//店铺全选
        goodsList:[
          {
            id:item.id,//商品
            checked:true,//商品是否被选中
            goodsInfo:item,//商品详情
            number:1//添加数量
          }
        ]
      })

    }else{//购物车已存在该商家

      let recordProduct = recordAdmin.goodsList.find(n => n.id === item.id);//遍历是否存在该商品

      if(!recordProduct){//购物车不存在该商品
        recordAdmin.goodsList.push(
          {
            id:item.id,//商品
            checked:true,//商品是否被选中
            goodsInfo:item,//商品详情
            number:1//添加数量
          }
        )
      }else{//购物车存在该商品
        recordProduct.checked = true;//商品是否被选中
        recordProduct.number++
      }

      console.log(recordAdmin)
    }

    console.info(state.addCart)
  },
  //修改全选状态
  setSelectAll(state,val){
    state.addCart.map(item => {//遍历所有商家
      item.shopChecked = val;//修改该商家选中状态
      item.goodsList.map(n => {//遍历该商家下所有商品
        n.checked = val;//修改该商品选中状态
      })
    })
  },
  //选择商家
  checkedShop(state,id){
    let shopItem = state.addCart.find(n => n.adminId === id);//获取（adminID===item.shopId）商家
    shopItem.goodsList.map((n) => {//遍历该商家下所有商品
      if(!shopItem.shopChecked){//商家下商品全选
        n.checked != true ? n.checked = !n.checked : '';//已选中的商品不执行
      }else{
        n.checked = false;
      }
    });
    shopItem.shopChecked = !shopItem.shopChecked;//修改商家选中状态
  },
  //选择商品
  checkedGodds(state,item){
    let shopItem = state.addCart.find(n => n.adminId === item.shopId);//获取（adminID===item.shopId）商家
    let goodsItem = shopItem.goodsList.find(n => n.id === item.goodsId);//该商家下（id===item.goodsId）的商品

    goodsItem.checked = !goodsItem.checked;//修改商品选中状态

    let shopChecked = shopItem.goodsList.find(n => n.checked === false);//查看该商家下是否有没有选中的商品

    if(!shopChecked){//没有未选中的商品
      shopItem.shopChecked = true;//将该商家选中状态
    }else{
      shopItem.shopChecked = false;
    }

  },
  //更新商品数量
  updateGoods(state,item){
    let shopItem = state.addCart.find(n => n.adminId === item.shopId);//获取（adminID===item.shopId）商家
    let goodsItem = shopItem.goodsList.find(n => n.id === item.goodsId);//该商家下（id===item.goodsId）的商品

    goodsItem.number = goodsItem.number+item.value < 1 ?1 : goodsItem.number+item.value;//修改该商品数量
  },
  //删除购物车指定商品
  delGodds(state,item){
    let shopItemIndex = state.addCart.findIndex(n => n.adminId === item.shopId);//获取（adminID===item.shopId）商家index
    let goodsItemIndex = state.addCart[shopItemIndex].goodsList.findIndex(n => n.id === item.goodsId);//该商家下（id===item.goodsId）的商品index

    state.addCart[shopItemIndex].goodsList.splice(goodsItemIndex,1);//删除该商家该商品

    if(!state.addCart[shopItemIndex].goodsList.length){//商品为空，删除该商家
        state.addCart.splice(shopItemIndex,1);
    }
  },
  //清空购物车
  clearAllCart(state){
    state.addCart = []
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
