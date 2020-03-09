import axios from 'axios'
import { Message } from 'element-ui'
import { getToken } from '../common'

axios.defaults.timeout = 30 * 1000
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.baseURL = ''

// 请求拦截器
axios.interceptors.request.use((config) => {
  return config
}, (err) => {
  Message({
    message: err,
    type: 'error'
  })
})

// 响应拦截器
axios.interceptors.response.use((rs) => {
  return rs
}, (err) => {
  Message({
    message: err,
    type: 'error'
  })
})

function request (params) {
  return new Promise(async (resolve, reject) => {
    let param = {
      ...params
    }
    let expires = {}
    getToken().then(res => {
      expires = res
      // token信息不存在
      if (!expires && window.location.href.indexOf('login') < 0) {
        window.location.href = window.location.origin
        return
      }
      param['headers'] = {
        token: expires && expires.token,
        id: expires && expires.userId
      }
      axios(param).then(rs => {
        if (rs.data.code === 403) {
          Message({
            message: '登录权限已失效，请重新登录~',
            type: 'error'
          })
          window.location.href = window.location.origin
        } else {
          resolve(rs.data)
        }
      }, (err) => {
        reject(err)
      })
    })
  })
}

export function post (url, data = {}) {
  return request({
    url,
    data,
    method: 'post'
  })
}

export function get (url, data) {
  return request({
    url,
    data,
    method: 'get'
  })
}
