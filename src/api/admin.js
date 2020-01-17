import {post} from '../utils/request'

export function loginFun (data = {}) {
  return post('/login', data)
}

export function add (data = {}) {
  return post('/admin/add', data)
}

export function getList (data = {}) {
  return post('/getAdmins', data)
}