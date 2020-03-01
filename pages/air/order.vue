<template>
  <div class="container">
    <el-row type="flex"
            justify="space-between">
      <!-- 订单表单 -->
      <div class="main">
        <OrderForm :data="infoData" />
      </div>

      <!-- 侧边栏 -->
      <div class="aside">

      </div>
    </el-row>
  </div>
</template>

<script>
import OrderForm from "@/components/air/orderForm.vue"
export default {
  components: {
    OrderForm
  },
  data () {
    return {
      // 机票信息
      infoData: {
        insurances: [] // 初始化保险数据
      }
    }
  },
  mounted () {
    const { query } = this.$route;
    this.$store.dispatch('air/findOrder', query).then(res => {
      console.log(res);
      this.infoData = res
    })
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 20px auto;
}

/*aside*/
.aside {
  width: 350px;
  height: fit-content;
  border: 1px #ddd solid;
}
</style>
