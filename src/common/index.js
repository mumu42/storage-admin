import { regainToken } from '../api/token'
export async function getToken () {
  /**
   * 使用了async，返回一个promise对象
   * 如果async的函数中return一个值，就相当于执行了promise对象中的resolve('值')
   * 如果async的函数中throw一个值，就相当于执行promise对象中的reject('err')
   */
  let expires = window.localStorage.getItem('expires')
  if (expires) {
    expires = JSON.parse(expires)
    const now = new Date().getTime()
    const wordTime = 8 * 60 * 60 * 1000
    const distance = now - +expires.date
    if (distance >= 25 * 60 * 1000 && distance < wordTime) {
      expires = await setToken({id: expires.userId})
    } else if (distance >= wordTime) {
      expires = ''
      window.localStorage.removeItem('expires')
    }
  } else {
    expires = ''
  }
  return expires
}

export async function setToken (data = {}) {
  let expires = ''
  await regainToken({
    id: data.id
  }).then((res) => {
    if (res.code === 200) {
      const { token, id } = res.result
      expires = {
        token,
        date: new Date().getTime(),
        userId: id
      }
      window.localStorage.setItem('expires', JSON.stringify(expires))
    }
  })
  return expires
}
