export const state = () => ({
  // 轮播图
  banners: []
})

export const mutations =  {
  /**
   * 保存轮播图
   * @param {*} state
   * @param {*} data
   */
  setBanners({banners}, data) {
    banners = data
  }
}

export const actions = {
  getBanners({commit}) {
    return this.$axios({
      url: '/scenics/banners'
    }).then(({data: res}) => {
      console.log(res)
      return res
    })
  }
}
