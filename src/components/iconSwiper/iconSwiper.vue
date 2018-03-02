<template>
  <div class="icon_swiper">
    <ul class="icon_list">
      <li class="icon" v-for="(item,index)  in iconList" :key="index" @click="$router.push({path:'/classy', query:{id:item.id}})">
        <a class="icon_btn" :data-id="item.id" :data-name="item.name">
          <span class="icon-circle">
            <img :src="item.icon" alt="" />
          </span>
          <span class="icon-desc">{{item.name}}</span>
        </a>
      </li>
    </ul>
  </div>
</template>
<style scoped lang="scss">
  .icon_swiper{
    padding: 20px 10px;
    .icon_list{
      font-size: 14px;
      display: flex;
      display: -webkit-flex;
      flex-wrap:wrap;
      -webkit-flex-wrap:wrap;
      li{
        width:25%;
        margin-bottom: 10px;
        .icon_btn{
          .icon-circle{
            display: block;
            img{
              width: 60%;
            }
          }
        }
      }
      li:active{
        background: #ccc;
      }
    }

  }
</style>
<script>
  export default {
    data(){
      return{
        iconList:[
          {
            id:15000,
            name:'蔬菜',
            icon:'./static/images/icon/0101.png'
          },
          {
            id:13000,
            name:'干果',
            icon:'./static/images/icon/0102.png'
          },
          {
            id:20000,
            name:'肉类蛋类',
            icon:'./static/images/icon/0103.png'
          },
          {
            id:19000,
            name:'特色小吃',
            icon:'./static/images/icon/0104.png'
          },
          {
            id:12000,
            name:'杂粮',
            icon:'./static/images/icon/0105.png'
          },
          {
            id:22000,
            name:'山珍',
            icon:'./static/images/icon/0106.png'
          },
          {
            id:16000,
            name:'休闲食品',
            icon:'./static/images/icon/0107.png'
          },
          {
            id:0,
            name:'更多',
            icon:'./static/images/icon/0108.png'
          }
        ]
      }
    }
  }
</script>
