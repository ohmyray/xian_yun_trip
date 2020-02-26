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
  }
}
