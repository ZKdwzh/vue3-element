import axios from 'axios'
import store from '@/store'
import { Message, MessageBox } from 'element-ui'

//axios 初始化
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 50000 //超时时效
})

//请求前
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['token'] = store.getters.token
    }
    return config
  },
  error => {
    return Promise.reject(error) //错误返回在接口中
  }
)

//请求回调
service.interceptors.response.use(
  response => {
    const res = response.data
    //非200拦截
    if (res.status !== 200) {
      if (res.status === 50000) {
        //50000代表token过期
        MessageBox.confirm('登录已失效，请重新登录', '登录失效', {
          confirmButtonText: '重新登录页面',
          cancelButtonText: '关闭当前页面'
        })
          .then(() => {
            store.dispatch('LoginOut').then(() => {
              location.reload()
            })
          })
          .catch(() => {
            window.close()
          })
      } else {
        Message({
          message: res.msg || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
      }
      return Promise.reject(res.msg || 'Error')
    } else {
      return res
    }
  },
  error => {
    Message({
      message: error || 'Error',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
