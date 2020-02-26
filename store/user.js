export const state = () => ({
  /**
   * 轮播图数据
   */
  banners: [],
  /**
   * 用户信息
   */
  userInfo: {
    token: '',
    user:{}
  }
})

export const mutations =  {
  /**
   * 保存轮播图
   * @param {*} state
   * @param {*} data
   */
  setBanners(state, data) {
    state.banners = data
  },

  setUserInfo(state, user){
    state.userInfo = user
  }
}

export const actions = {
  /**
   * 获取并保存 banners 至 store
   */
  getBanners({commit}) {
    return this.$axios({
      url: '/scenics/banners'
    }).then(({data: res}) => {
      commit('setBanners',res.data)
      return res
    })
  },

  /**
   * 用户登录
   * @param {*} store
   * @param {*} userForm 用户名密码数据
   */
  login({commit}, userForm){
    return this.$axios({
      method: 'POST',
      url: '/accounts/login',
      data: userForm
    }).then(({data: res}) => {
      // console.log(res)
      commit('setUserInfo', res)
      return res
    })
  },

  /**
   * 获取手机验证码
   * @param {*} store
   * @param {object} tel { tel:username }
   */
  captcha(store, tel){
    return this.$axios({
      method: 'POST',
      url: '/captchas',
      data: tel
    }).then(({data:res}) => {
      return res
    })
  },

  /**
   * 注册账号
   * @param {*} param0 store.commit
   * @param {object} userInfoFormData data
   */
  register({commit}, userInfoFormData) {
    return this.$axios({
      method: 'POST',
      url: '/accounts/register',
      data: userInfoFormData
    }).then(({data: res}) => {
      // 在这里我们可以讲拿到的数据通过 mutation 存储至 state 这样我们就可以实现自动登录了
      commit('setUserInfo', res)
      return res
    })
  }
}
