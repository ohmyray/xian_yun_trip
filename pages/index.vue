<template>
  <div class="index"
       style="height: 700px; ">
    <!-- element-ui 跑马灯 -->
    <el-carousel :interval="5000"
                 arrow="always"
                 style="height: 100%; ">
      <!-- 这里通过 $axios.defaults.baseURL 拿到 nuxt.config.js 中 axios 配置的 baseURL 地址 -->
      <el-carousel-item v-for="(item, key) in banners"
                        :key="key"
                        :style="`background: url(${ $axios.defaults.baseURL + item.url}) center center no-repeat;`">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 轮播图数据
      banners: []
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
    }
  } // methods END

}
</script>

<style lang="less" scoped>
.index {
  /deep/.el-carousel__container {
    position: relative;
    height: 700px;
  }
}
</style>
