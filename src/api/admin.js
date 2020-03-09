import {post} from '@/utils/request'

export function loginFun (data = {}) {
  window.console.log(data, 'login')
  return post('/login', data)
}

export function add (data = {}) {
  return post('/admin/add', data)
}

export function getList (data = {}) {
  window.console.log('getlist')
  return post('/getAdmins', data)
}

export function getAdmin (data = {}) {
  return post('/getAdmin', data)
}

export function exportAdmin (data = {}) {
  return post('/admin/export', data)
}
