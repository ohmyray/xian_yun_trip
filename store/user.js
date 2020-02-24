export const state = () => ({
  /**
   * 轮播图数据
   */
  banners: []
})

export const mutations =  {
  /**
   * 保存轮播图
   * @param {*} state
   * @param {*} data
   */
  setBanners(state, data) {
    state.banners = data
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
  }
}
