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
  },
  findSale(){
    return this.$axios({
      url:'/airs/sale'
    }).then(({data: res})=>{
      return res
    })
  },
  /**
   * 查询订单信息
   * @param {*} store
   * @param {*} query id, xid
   */
  findOrder(store, query) {
    return this.$axios({
      url: `/airs/${query.id}`,
      params: {
        seat_xid: query.seat_xid
      }
    }).then(({data: res})=>{
      return res
    })
  }
}
