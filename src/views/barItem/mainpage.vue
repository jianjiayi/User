<template>
  <div class="select">
    <search-header></search-header>
    <icon-swiper></icon-swiper>
    <ul class="selectList"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
      <li v-for="item in dataList" @click="goDetails(item)">
        <img class="product-img" :src="item.mainImage" alt="" />
        <div class="sub-title">
          <div class="title">
            <p class="txt">{{item.name}}</p>|
            <p class="num">
              <img src="@/assets/images/icon/101.png" alt="" />
              {{item.collection}}
            </p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<style scoped lang="scss">
  .select{
    padding-top: 50px;
  }
  .selectList{
    li{
      height: 180px;
      position: relative;
      margin-bottom: 5px;
      .product-img{
        width: 100%;
        height:100%;
      }
      .sub-title{
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        background: rgba(0,0,0,0.1);
        .title{
          display: flex;
          display: -webkit-flex;
          margin: 0 30px;
          height: 40px;
          align-items: center;
          -webkit-align-items: center;
          overflow: hidden;
          background: rgba(225,225,225,0.8);
          .txt{
            font-size: 12px;
            height: 20px;
            overflow: hidden;
            color: #1b1b1b;
            flex: 1;
            -webkit-flex:1;
            margin: 0;
          }
          .num{
            height: 20px;
            min-width: 60px;
            font-size: 12px;
            margin: 0 10px;
            color: #1b1b1b;
            text-align: right;
            display: flex;
            display: -webkit-flex;
            align-items: center;
            -webkit-align-items: center;
            img{
              width:12px;
              height:12px;
              margin-right:10px;
            }
          }
        }
      }
    }
  }
</style>
<script>
  import searchHeader from '@/components/header/searchHeader'
  import iconSwiper from '@/components/iconSwiper/iconSwiper'

  import {mapGetters,mapMutations} from 'vuex'

  export default {
    data(){
      return{
        topStatus: '',

        dataList: [
          {
            id: 100000121,
            categoryId: 14000,
            name: "爱睡懒觉倒海翻江阿斯达",
            subtitle: "阿拉斯加侃大山",
            mainImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519983978196&di=e24cc3a5b44da574ec1dc975afc770ca&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dpixel_huitu%252C0%252C0%252C294%252C40%2Fsign%3Da71fedfd01d162d991e36a5c78a7cc80%2F0b46f21fbe096b635333fd6907338744ebf8ace5.jpg",
            bannerList:[
              'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519986512144&di=1ca08b2fe057e5d8089378ade12d834c&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fb21bb051f8198618b4505a5040ed2e738ad4e6cb.jpg',
              'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519986535010&di=90a058f57ee38f6eb6b0c1c4a51b88e6&imgtype=0&src=http%3A%2F%2Fimg1.3lian.com%2F2015%2Fa1%2F82%2Fd%2F158.jpg',
              'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519986555649&di=27e682896da8fcf60043c975ceef102a&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F15%2F14%2F49%2F08G58PIC2Hy_1024.jpg'
            ],
            price: 1.5,
            adminName: "河南的老乡",
            status: 1,
            collection: 3,
            createTime: 1508661016000,
            updateTime: 1519785771000,
            adminId: 101,
            avatar: "http://59.110.136.67:8080/dwshop/upload/3139122f-4862-4b54-b33c-58d0f10955fc.JPG"
          },
          {
            id: 100000122,
            categoryId: 14000,
            name: "麟凤龟龙时代峻峰",
            subtitle: "自然生长，不套袋，不打蜡，当天摘当天发",
            mainImage: "http://a.hiphotos.baidu.com/image/pic/item/8cb1cb13495409231dd1835d9e58d109b3de495d.jpg",
            bannerList:[
              'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519986512144&di=1ca08b2fe057e5d8089378ade12d834c&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fb21bb051f8198618b4505a5040ed2e738ad4e6cb.jpg',
              'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519986535010&di=90a058f57ee38f6eb6b0c1c4a51b88e6&imgtype=0&src=http%3A%2F%2Fimg1.3lian.com%2F2015%2Fa1%2F82%2Fd%2F158.jpg',
              'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519986555649&di=27e682896da8fcf60043c975ceef102a&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F15%2F14%2F49%2F08G58PIC2Hy_1024.jpg'
            ],
            price: 33,
            adminName: "大大大鸭梨",
            status: 1,
            collection: 3,
            createTime: 1508661016000,
            updateTime: 1519785771000,
            adminId: 102,
            avatar: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519986157362&di=f235a84e57fccb95b36e36e05b8b6ea6&imgtype=0&src=http%3A%2F%2Fww4.sinaimg.cn%2Fthumb180%2F862dc77cly1fm4snr045dj20j60j5wfe.jpg"
          },
          {
            id: 100000123,
            categoryId: 14000,
            name: "蓝色大海水电费",
            subtitle: "自然生长，不套袋，不打蜡，当天摘当天发",
            mainImage: "http://d.hiphotos.baidu.com/image/pic/item/8601a18b87d6277fcdb9b01d24381f30e924fc68.jpg",
            bannerList:[
              'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519986512144&di=1ca08b2fe057e5d8089378ade12d834c&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fb21bb051f8198618b4505a5040ed2e738ad4e6cb.jpg',
              'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519986535010&di=90a058f57ee38f6eb6b0c1c4a51b88e6&imgtype=0&src=http%3A%2F%2Fimg1.3lian.com%2F2015%2Fa1%2F82%2Fd%2F158.jpg',
              'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519986555649&di=27e682896da8fcf60043c975ceef102a&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F15%2F14%2F49%2F08G58PIC2Hy_1024.jpg'
            ],
            price: 45.2,
            adminName: "阿斯顿加快速度",
            status: 1,
            collection: 3,
            createTime: 1508661016000,
            updateTime: 1519785771000,
            adminId: 103,
            avatar: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519986239504&di=08e3d131601d4faa0488e9be5a82f76f&imgtype=0&src=http%3A%2F%2Fimg1.2345.com%2Fduoteimg%2FqqTxImg%2F2%2F4d9488012aefe59c5ae4fd4a760ee37d.jpg"
          },
          {
            id: 100000124,
            categoryId: 14000,
            name: "人口剪短发你的积分",
            subtitle: "自然生长，不套袋，不打蜡，当天摘当天发",
            mainImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519984036093&di=600916af2e20ee3f0ad5c1b77a6450b2&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F7a899e510fb30f24f4e7fecac295d143ac4b03fd.jpg",
            bannerList:[
              'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519986512144&di=1ca08b2fe057e5d8089378ade12d834c&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fb21bb051f8198618b4505a5040ed2e738ad4e6cb.jpg',
              'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519986535010&di=90a058f57ee38f6eb6b0c1c4a51b88e6&imgtype=0&src=http%3A%2F%2Fimg1.3lian.com%2F2015%2Fa1%2F82%2Fd%2F158.jpg',
              'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519986555649&di=27e682896da8fcf60043c975ceef102a&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F15%2F14%2F49%2F08G58PIC2Hy_1024.jpg'
            ],
            price: 60,
            adminName: "快递师傅",
            status: 1,
            collection: 3,
            createTime: 1508661016000,
            updateTime: 1519785771000,
            adminId: 104,
            avatar: "http://h.hiphotos.baidu.com/image/pic/item/4b90f603738da977eefc9700bc51f8198718e3ce.jpg"
          }
        ]
      }
    },
    methods:{
      ...mapMutations(['setDetails']),
      handleTopChange(status) {
        this.topStatus = status;
      },
      loadMore() {
        this.loading = true;
        setTimeout(() => {
          let last = this.dataList.length - 1;
          for (let i = last; i <= last+10; i++) {
            this.dataList.push(
              {
                id: 100000122,
                categoryId: 14000,
                name: "昭通红富士苹果0000"+i,
                subtitle: "自然生长，不套袋，不打蜡，当天摘当天发",
                mainImage: "http://59.110.136.67:8080/dwshop/upload/admproductimg/64eb419d-0221-4c15-8048-b6ff664ebc49.jpg",
                bannerList:[
                  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519986512144&di=1ca08b2fe057e5d8089378ade12d834c&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fb21bb051f8198618b4505a5040ed2e738ad4e6cb.jpg',
                  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519986535010&di=90a058f57ee38f6eb6b0c1c4a51b88e6&imgtype=0&src=http%3A%2F%2Fimg1.3lian.com%2F2015%2Fa1%2F82%2Fd%2F158.jpg',
                  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519986555649&di=27e682896da8fcf60043c975ceef102a&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F15%2F14%2F49%2F08G58PIC2Hy_1024.jpg'
                ],
                price: 60,
                adminName: "13308703309",
                status: 1,
                collection: 3,
                createTime: 1508661016000,
                updateTime: 1519785771000,
                adminId: 104,
                avatar: "http://59.110.136.67:8080/dwshop/upload/3139122f-4862-4b54-b33c-58d0f10955fc.JPG"
              }
            );
          }
          this.loading = false;
        }, 2500);
      },
      goDetails(item){
        this.setDetails(item);
        this.$router.push({path:'/details',query:{id:item.id}})
      }
    },
    components:{
      searchHeader,
      iconSwiper
    }
  }
</script>
