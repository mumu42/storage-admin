import {post} from '../utils/request'

export function regainToken (data = {}) {
  return post('/getToken', data)
}
