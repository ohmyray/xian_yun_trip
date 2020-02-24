<template>
  <div class="header">
    <!-- Layout 布局 -->
    <el-row type="flex"
            justify="space-between"
            class="container">

      <!-- LOGO -->
      <div class="logo">
        <!-- this.$axios.defaults.baseURL -->
        <nuxt-link to="/">
          <img src="http://157.122.54.189:9093/images/logo.jpg"
               alt="LOGO">
        </nuxt-link>
      </div>

      <!-- 导航栏 -->
      <el-row type="flex"
              class="navs">
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">国内机票</nuxt-link>
      </el-row>

      <!-- 登录/用户信息 -->
      <el-row>
        <nuxt-link to="/user/login"
                   class="account">
          登录/注册
        </nuxt-link>
      </el-row>

    </el-row>
  </div>
</template>

<script>
export default {
  data () { return {} }
}
</script>

<style lang="less" scoped>
.header {
  height: 60px;
  width: 100%;
  min-width: 1000px;
  // border-bottom: 1px solid #ccc;
  box-shadow: 1px 2px 3px #ccc;
  .container {
    width: 1000px;
    margin: 0 auto;
    line-height: 60px;
    .logo {
      width: 156px;
      padding-top: 8px;
      img {
        display: block;
        width: 100%;
      }
    }
    .navs {
      flex: 1;
      margin: 0 20px;
      a {
        display: block;
        padding: 0 20px;
        height: 60px;
        box-sizing: border-box;
      }
    }
    .account {
      color: #666;
      font-size: 14px;
      &:hover {
        text-decoration: underline;
        color: #409eff;
        cursor: pointer;
      }
    }
  }
}
</style>
