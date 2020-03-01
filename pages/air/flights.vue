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
          <FlightsItem v-for="(item,index) of pageShowList"
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
export default {
  components: {
    FlightsListHead,
    FlightsItem
  },
  data () {
    return {
      pageShowList: [],
      airMap: {
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
      console.log(this.airMap.flights)
      this.total = this.airMap.flights.length
      this.currentPageShowData()
    })
  },
  methods: {
    // 修改分页大小
    handleSizeChange (pageSize) {
      this.pageIndex = 1
      this.pageSize = pageSize
      this.currentPageShowData()
    },
    // 显示指定页数据
    handleCurrentChange (pageIndex) {
      this.pageIndex = pageIndex
      this.currentPageShowData()
    },
    currentPageShowData () {
      // 从第几页开始
      const start = (this.pageIndex - 1) * this.pageSize
      // 从第几条结束
      const end = start + this.pageSize
      this.pageShowList = this.airMap.flights.slice(start, end)
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
