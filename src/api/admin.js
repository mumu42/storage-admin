import {post} from '../utils/request'

export function loginFun (data = {}) {
  return post('/login', data)
}

export function addAdmin (data = {}) {
  return post('/admin/add', data)
}
