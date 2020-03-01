<template>
  <div class="filters">
    <el-row type="flex"
            class="filters-top"
            justify="space-between"
            align="middle">
      <el-col :span="8">
        单程：
        {{data.info.departCity}} - {{data.info.destCity}}
        /
        {{data.info.departDate}}
      </el-col>
      <el-col :span="4">
        <el-select size="mini"
                   v-model="airport"
                   placeholder="起飞机场"
                   @change="handleAirport">
          <el-option :label="item"
                     :value="item"
                     :key="index"
                     v-for="(item,index) of data.options.airport">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini"
                   v-model="flightTimes"
                   placeholder="起飞时间"
                   @change="handleFlightTimes">
          <el-option :key="index"
                     :label="`${item.from}:00 - ${item.to}:00`"
                     :value="`${item.from},${item.to}`"
                     v-for="(item, index) of data.options.flightTimes">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini"
                   v-model="company"
                   placeholder="航空公司"
                   @change="handleCompany">
          <el-option :label="item"
                     :value="item"
                     :key="index"
                     v-for="(item, index) of data.options.company">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini"
                   v-model="airSize"
                   placeholder="机型"
                   @change="handleAirSize">
          <el-option :label="item.label"
                     :value="item.value"
                     :key="index"
                     v-for="(item, index) of airSizeList">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <div class="filter-cancel">
      筛选：
      <el-button type="primary"
                 round
                 plain
                 size="mini"
                 @click="handleFiltersCancel">
        撤销
      </el-button>
    </div>
    <span>{{searchAir}}</span>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      airport: "",        // 机场
      flightTimes: "",    // 出发时间
      company: "",        // 航空公司
      airSize: "",        // 机型大小
      airSizeList: [      // 机型大小的列表
        { label: "大", value: "L" },
        { label: "中", value: "M" },
        { label: "小", value: "S" }
      ]
    }
  },

  computed: {
    searchAir () {
      const newData = this.data.flights.filter(v => {
        // 假设当前的数据都是符合条件
        let valid = true;
        // 找到不符合条件的
        if (this.company && v.airline_name !== this.company) {
          valid = false;
        }
        // 机型大小
        if (this.airSize && v.plane_size !== this.airSize) {
          valid = false;
        }
        // 机场
        if (this.airport && v.org_airport_name !== this.airport) {
          valid = false;
        }
        // 时间
        if (this.flightTimes) {
          // 选中的时间段
          const arr = this.flightTimes.split(","); // ["6","12"]
          // 当前航班小时
          const hours = Number(v.dep_time.split(":")[0]);

          // 如果出发的小时不在时间段内，认为是不合法
          if (Number(arr[0]) > hours || hours >= Number(arr[1])) {
            valid = false;
          }
        }
        return valid;
      })
      this.$emit("getData", newData)
      return ""
    }
  },
  methods: {
    // 选择机场时候触发
    handleAirport (value) {

    },

    // 选择出发时间时候触发
    handleFlightTimes (value) {

    },

    // 选择航空公司时候触发
    handleCompany (value) {

    },

    // 选择机型时候触发
    handleAirSize (value) {

    },

    // 撤销条件时候触发
    handleFiltersCancel () {
      this.airport = ""        // 机场
      this.flightTimes = ""    // 出发时间
      this.company = ""        // 航空公司
      this.airSize = ""       // 机型大小
    }
  }
}
</script>

<style scoped lang="less">
.filters {
  margin-bottom: 20px;
}

.filters-top {
  > div {
    /deep/ .el-select {
      margin-left: 10px;
    }
  }
}

.filter-cancel {
  margin-top: 10px;
}
</style>
