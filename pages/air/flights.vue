<template>
  <section class="container">
    <el-row type="flex"
            justify="space-between">

      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div>

        </div>

        <!-- 航班头部布局 -->
        <div>
          <FlightsListHead></FlightsListHead>
        </div>

        <!-- 航班信息 -->
        <div>
          <FlightsItem v-for="(item,index) of airMap.flights"
                       :data="item"
                       :key="index"></FlightsItem>
        </div>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
      </div>
    </el-row>
  </section>
</template>

<script>
import FlightsListHead from '@/components/air/flightsListHead'
import FlightsItem from '@/components/air/flightsItem'
export default {
  components: {
    FlightsListHead,
    FlightsItem
  },
  data () {
    return {
      airMap: {}
    }
  },

  mounted () {
    this.$store.dispatch('air/findFlights', this.$route.query).then(res => {
      this.airMap = res
      console.log(this.airMap)
    })

  }
}
</script>

<style scoped lang="less">
.container {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>
