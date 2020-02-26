import {Message} from 'element-ui'

export default function({$axios, redirect}){
  $axios.onError( err => {
    const { statusCode, message } = err.response.data

    // 请求到需要权限的接口时候
    //  => 让未登录的用户先去登录
    if (statusCode === 401 || statusCode === 403) {
        Message.warning({message: "请先登录yo~"})
        redirect("/user/login")
    }

    // 用户的错误操作
    // => 触发的问题的时候
    if (statusCode === 400) {
      Message.warning({message})
    }
  })
}
