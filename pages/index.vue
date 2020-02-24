<template>
  <div class="index"
       style="height: 700px; ">
    <el-carousel :interval="5000"
                 arrow="always"
                 style="height: 100%; ">
      <el-carousel-item v-for="(item, key) in bgc"
                        :key="key"
                        :style="`background: url(${item.src}) center center no-repeat;`">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data () {
    return {
      bgc: [
        { src: 'http://157.122.54.189:9095/assets/images/th01.jfif' },
        { src: 'http://157.122.54.189:9095/assets/images/th02.jfif' },
        { src: 'http://157.122.54.189:9095/assets/images/th03.jfif' }
      ]
    }
  }
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
