<template>
  <section class="container">
    <el-row type="flex"
            justify="space-between">

      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div>
          <FlightsFilters :data="airMapBack"
                          @getData="getData"></FlightsFilters>
        </div>

        <!-- 航班头部布局 -->
        <div>
          <FlightsListHead></FlightsListHead>
        </div>

        <!-- 航班信息 -->
        <div>
          <FlightsItem v-for="(item,index) of showItem"
                       :data="item"
                       :key="index"></FlightsItem>
        </div>
        <!-- 分页 -->
        <el-row type="flex"
                justify="center"
                style="margin-top:10px;">
          <!-- size-change：切换条数时候触发 -->
          <!-- current-change：选择页数时候触发 -->
          <!-- current-page: 当前页数 -->
          <!-- page-size：当前条数 -->
          <!-- total：总条数 -->
          <el-pagination @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :current-page="pageIndex"
                         :page-sizes="[5, 10, 15, 20,100]"
                         :page-size="pageSize"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="total">
          </el-pagination>
        </el-row>
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
import FlightsFilters from '@/components/air/flightsFilters'
export default {
  components: {
    FlightsListHead,
    FlightsItem,
    FlightsFilters
  },
  data () {
    return {
      pageShowList: [],
      airMap: {
        info: {},
        flights: [],
        options: {}
      },
      airMapBack: {
        info: {},
        flights: [],
        options: {}
      },
      pageIndex: 1, // 当前页数
      pageSize: 5,  // 显示条数
      total: 0
    }
  },
  mounted () {
    this.$store.dispatch('air/findFlights', this.$route.query).then(res => {
      this.airMap = res
      this.airMapBack = { ...res }
      console.log(this.airMap)
      this.total = this.airMap.flights.length
    })
  },
  computed: {
    showItem () {
      if (!this.airMap.flights) {
        return []
      }
      // 从第几页开始
      const start = (this.pageIndex - 1) * this.pageSize
      // 从第几条结束
      const end = start + this.pageSize
      const arr = this.airMap.flights.slice(start, end)

      return arr
    }
  },
  methods: {
    // 修改分页大小
    handleSizeChange (pageSize) {
      this.pageIndex = 1
      this.pageSize = pageSize
    },
    // 显示指定页数据
    handleCurrentChange (pageIndex) {
      this.pageIndex = pageIndex
    },
    getData (val) {
      console.log(val)
      if (!this.airMap.flights.length === 0) {
        this.airMap.flights = []
        this.pageShowList = []
        return
      }
      this.airMap.flights = val
      this.total = val.length
    }
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
