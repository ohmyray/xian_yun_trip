<template>
  <div class="container"
       style="height: 700px; ">
    <!-- element-ui 跑马灯 -->
    <el-carousel :interval="5000"
                 arrow="always"
                 style="height: 100%; "
                 class="banner-container">
      <!-- 这里通过 $axios.defaults.baseURL 拿到 nuxt.config.js 中 axios 配置的 baseURL 地址 -->
      <el-carousel-item v-for="(item, key) in banners"
                        :key="key"
                        :style="`background: url(${ $axios.defaults.baseURL + item.url}) center center no-repeat;`">
      </el-carousel-item>

      <!-- 搜索框 -->
      <div class="banner-content">
        <div class="search-bar">

          <!-- tab栏 -->
          <el-row type="flex"
                  class="search-tab">
            <span v-for="(item, index) in options"
                  :key="index"
                  :class="{active: index === currentOption}"
                  @click="handleOption(index)">
              <i>{{item.name}}</i>
            </span>
          </el-row>

          <!-- 输入框 -->
          <el-row type="flex"
                  align="middle"
                  class="search-input">
            <input :placeholder="options[currentOption].placeholder"
                   v-model="searchValue"
                   @keyup.enter="handleSearch" />
            <i class="el-icon-search"
               @click="handleSearch"></i>
          </el-row>
        </div>
      </div>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 轮播图数据
      banners: [],
      options: [ // 搜索框tab选项
        {
          name: "攻略",
          placeholder: "搜索城市",
          pageUrl: "/post?city="
        },
        {
          name: "酒店",
          placeholder: "请输入城市搜索酒店",
          pageUrl: "/hotel?city="
        },
        {
          name: "机票",
          placeholder: "请输入出发地",
          pageUrl: "/air"
        }
      ],
      searchValue: "",    // 搜索框的值
      currentOption: 0,   // 当前选中的选项
    }
  }, // data END

  mounted () {
    // 判断是否请求过 banners ，若是请求过则使用本地地址。减轻服务器压力
    this.$store.state.user.banners.length !== 0 ? (this.banners = this.$store.state.user.banners) : this.getBanners()
  }, // mounted END

  methods: {
    getBanners () {
      // 通过 vuex actions 去执行异步操作，并通过 vue-persistedstate 保存至本地
      this.$store.dispatch('user/getBanners').then(res => {
        // 若是本地没有banners数据我们先得自己操作一次数据，才能令banner展示出来，否则会出现没有背景图的 bug
        this.banners = res.data
      })
    },
    // :class="{active: index === currentOption}"
    // 通过遍历的索引值与当前选中的索引值做比较 => bool 值 ，控制显示隐藏
    handleOption (index) {
      if (index === 2) { // 单击的是机票的时候，跳转至机票页
        return this.$router.push({ path: '/air' })
      }
      this.currentOption = index
    },
    handleSearch () { }
  } // methods END

}
</script>

<style scoped lang="less">
.container {
  min-width: 1000px;
  margin: 0 auto;
  position: relative;

  /deep/ .el-carousel__container {
    height: 700px;
  }

  .banner-image {
    width: 100%;
    height: 100%;
  }

  .banner-content {
    z-index: 9;
    width: 1000px;
    position: absolute;
    left: 50%;
    top: 45%;
    margin-left: -500px;
    border-top: 1px transparent solid;

    .search-bar {
      width: 552px;
      margin: 0 auto;
    }

    .search-tab {
      .active {
        i {
          color: #333;
        }
        &::after {
          background: #eee;
        }
      }

      span {
        width: 82px;
        height: 36px;
        display: block;
        position: relative;
        margin-right: 8px;
        cursor: pointer;

        i {
          position: absolute;
          z-index: 2;
          display: block;
          width: 100%;
          height: 100%;
          line-height: 30px;
          text-align: center;
          color: #fff;
        }

        &:after {
          position: absolute;
          left: 0;
          top: 0;
          display: block;
          content: '';
          width: 100%;
          height: 100%;
          border: 1px rgba(255, 255, 255, 0.2) solid;
          border-bottom: none;
          transform: scale(1.1, 1.3) perspective(0.7em) rotateX(2.2deg);
          transform-origin: bottom left;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 1px 2px 0 0;
          box-sizing: border-box;
        }
      }
    }

    .search-input {
      width: 550px;
      height: 46px;
      background: #fff;
      border-radius: 0 4px 4px 4px;
      border: 1px rgba(255, 255, 255, 0.2) solid;
      border-top: none;
      box-sizing: unset;

      input {
        flex: 1;
        height: 20px;
        padding: 13px 15px;
        outline: none;
        border: 0;
        font-size: 16px;
      }

      .el-icon-search {
        cursor: pointer;
        font-size: 22px;
        padding: 0 10px;
        font-weight: bold;
      }
    }
  }
}
</style>
