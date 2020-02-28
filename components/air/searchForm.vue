<template>
  <div class="search-form">

    <!-- 头部tab切换 -->
    <el-row type="flex"
            class="search-tab">
      <span v-for="(item, index) in tabs"
            :key="index"
            @click="handleSearchTab(item, index)"
            :class="{active: index === currentTab}">
        <i :class="item.icon"></i>{{item.name}}
      </span>
    </el-row>

    <el-form class="search-form-content"
             ref="form"
             label-width="80px">
      <el-form-item label="出发城市">
        <!-- fetch-suggestions 返回输入建议的方法 -->
        <!-- select 点击选中建议项时触发 -->
        <el-autocomplete v-model.trim="queryString.departCity"
                         :fetch-suggestions="queryDepartSearch"
                         @select="handleDepartSelect"
                         @blur="handleDepartBlur"
                         placeholder="请搜索出发城市"
                         class="el-autocomplete">
          <template slot-scope="{ item }">
            <div class="name">{{ item.name }}</div>
          </template>
        </el-autocomplete>
      </el-form-item>
      <el-form-item label="到达城市">
        <el-autocomplete v-model.trim="queryString.destCity"
                         :fetch-suggestions="queryDestSearch"
                         @select="handleDestSelect"
                         @blur="handleDestBlur"
                         placeholder="请搜索到达城市"
                         class="el-autocomplete">
          <template slot-scope="{ item }">
            <div class="name">{{ item.name }}</div>
          </template></el-autocomplete>
      </el-form-item>
      <el-form-item label="出发时间">
        <!-- change 用户确认选择日期时触发 -->
        <el-date-picker type="date"
                        v-model="queryString.departDate"
                        ref="departDateRef"
                        placeholder="请选择日期"
                        style="width: 100%;"
                        @change="handleDate"
                        :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="">
        <el-button style="width:100%;"
                   type="primary"
                   icon="el-icon-search"
                   @click="handleSubmit">
          搜索
        </el-button>
      </el-form-item>
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tabs: [ // 标签页 配置
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      currentTab: 0, // 当前激活标签
      queryList: [],
      queryString: { // 表单的字段
        departCity: "",
        departCode: "",
        destCity: "",
        destCode: "",
        departDate: ""
      },
      // 日期可选配置
      pickerOptions: {
        // 如果返回true表示可选
        disabledDate (time) {
          return time.getTime() + 3600 * 1000 * 24 < Date.now();
        },
      }
    }
  }, // data END
  methods: {
    // tab切换时触发
    handleSearchTab (item, index) { },

    // 根据输入的城市名访问接口，拿到所需的数据
    querySearch (cityName) {
      return this.$axios({
        url: '/airs/city',
        params: {
          name: cityName
        }
      }).then(({ data: res }) => {
        return res.data.map(val => {
          // 数据改造，将所有地名带市的都去掉
          val.name = val.name.replace('市', '')
          return val
        })
      })
    },

    // 出发城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDepartSearch (value, cb) {
      // 若输入的城市不为空，则执行后面查询
      if (!!value) {
        let res = this.querySearch(value).then(res => {
          this.queryList = res
          return cb(res)
        })
      }
      // 若输入框的数据为空的话
      this.queryList = []
      cb([])
    },

    // 目标城市输入框获得焦点时触发
    queryDestSearch (value, cb) {
      if (!!value) {
        let res = this.querySearch(value).then(res => {
          this.queryList = res
          return cb(res)
        })
      }
      this.queryList = []
      cb([])
    },

    // 出发城市下拉选择时触发
    handleDepartSelect (item) {
      // item 下拉时被单击选择的项
      this.queryString.departCity = item.name
      this.queryString.departCode = item.code

    },

    // 目标城市下拉选择时触发
    handleDestSelect (item) {
      this.queryString.destCity = item.name
      this.queryString.destCode = item.code
    },

    // 处理出发城市失去焦点
    handleDepartBlur () {
      // 当数据没有的时候 为空了, 不为空可以让其自动选择第一项
      if (this.queryList.length !== 0) {
        this.queryString.departCity = this.queryList[0].name
        this.queryString.departCode = this.queryList[0].code
        return false
      }
      this.queryString.departCity = ''
      this.queryString.departCode = ''

    },

    // 处理目标城市失去焦点
    handleDestBlur () {
      if (this.queryList.length !== 0) {
        this.queryString.destCity = this.queryList[0].name
        this.queryString.destCode = this.queryList[0].code
        return false
      }
      this.queryString.destCity = ''
      this.queryString.destCode = ''

    },

    // 确认选择日期时触发
    handleDate (value) {
      this.queryString.departDate = this.$refs.departDateRef.displayValue
    },

    // 触发和目标城市切换时触发
    handleReverse () {

      //当出发地和目标地点有一项没选时候
      // 做交换时候应该提示没选全
      let { departDate, ...params } = this.queryString
      for (var key in params) {
        if (params[key] != '0' && !params[key]) {
          this.$message.error('请完善数据!')
          return false
        }
      }

      // 交换城市，先解构拿出数据到内存中，不被赋值修改
      const { departCity, departCode, destCity, destCode } = this.queryString

      this.queryString.departCity = destCity
      this.queryString.departCode = destCode

      this.queryString.destCity = departCity
      this.queryString.destCode = departCode
    },

    // 提交表单是触发
    handleSubmit () {

    }
  } // methods END
}
</script>

<style scoped lang="less">
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}

.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
  }

  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}

.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;

  &:after,
  &:before {
    display: block;
    content: '';
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: '';
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>
