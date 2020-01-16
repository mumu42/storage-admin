import axios from 'axios'
import {Message} from 'element-ui'
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
  return new Promise((resolve, reject) => {
    let param = {
      ...params
    }
    param['headers'] = {
      token: getToken()
    }
    axios(param).then(rs => {
      resolve(rs.data)
    }, (err) => {
      reject(err)
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
