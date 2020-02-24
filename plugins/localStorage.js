import createPersistedState from 'vuex-persistedstate'

export default ({store}) => {
  window.onNuxtReady(() => {
    createPersistedState({
        key: 'xian_yun_store'//读取数据到本地
    })(store)
  })
}
