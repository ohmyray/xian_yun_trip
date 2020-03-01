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
        <nuxt-link to="/"
                   :class="active">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">国内机票</nuxt-link>
      </el-row>

      <!-- 登录/用户信息 -->
      <el-row type="flex"
              align="middle">

        <!-- 已经登录 -->
        <el-dropdown v-if="$store.state.user.userInfo['token'] !== ''">
          <el-row type="flex"
                  align="middle"
                  class="el-dropdown-link">
            <nuxt-link to="#">
              <img :src="$axios.defaults.baseURL + $store.state.user.userInfo['user'].defaultAvatar"
                   class="user-icon" />
              {{$store.state.user.userInfo['user'].nickname}}
            </nuxt-link>
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </el-row>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <nuxt-link to="#">个人中心</nuxt-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <div @click="handleLogout">退出</div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <!-- 未登录 -->
        <nuxt-link to="/user/login"
                   v-else
                   class="account">
          登录/注册
        </nuxt-link>

      </el-row>

    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 'active'
    }
  },
  methods: {
    handleLogout () {
      this.$store.commit('user/setUserInfo', { token: '', user: {} })
      this.$router.push({ path: '/' })
    }
  }
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
        &:hover {
          border-bottom: 6px solid #409eff;
        }
      }
      /deep/ .nuxt-link-exact-active {
        background: #409eff;
        color: #fff !important;
      }
    }
    .account {
      color: #666;
      margin-left: 10px;
      font-size: 14px;
      &:hover {
        color: #409eff;
        text-decoration: underline;
      }
    }
  }
  .user-icon {
    width: 32px;
    height: 32px;
    vertical-align: middle;
    border-radius: 50%;
  }
}
</style>
