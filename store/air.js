export const state = () => ({

})

export const mutations =  {

}

export const actions = {
  /**
   *  查询机票
   * @param {*} param0 store
   * @param {*} params get?url
   */
  findFlights({commit},params){
    return this.$axios({
        url: '/airs',
        params
      }).then(({data: res}) => {
        return res
      })
  }
}
