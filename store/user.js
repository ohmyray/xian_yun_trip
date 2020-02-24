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
  }
}
