const axios = require('axios')
export function getToken () {
  /**
   * 使用了async，返回一个promise对象
   * 如果async的函数中return一个值，就相当于执行了promise对象中的resolve('值')
   * 如果async的函数中throw一个值，就相当于执行promise对象中的reject('err')
   */
  return new Promise(resolve => {
    let expires = window.localStorage.getItem('expires')
    if (expires) {
      expires = JSON.parse(expires)
      const now = new Date().getTime()
      const wordTime = 8 * 60 * 60 * 1000
      const distance = now - +expires.date
      if (distance >= 25 * 60 * 1000 && distance < wordTime) {
        setToken({id: expires.userId}).then(res => {
          resolve(res)
        })
        return
      } else if (distance >= wordTime) {
        expires = ''
        window.localStorage.removeItem('expires')
      }
      resolve(expires)
    } else {
      resolve(expires)
    }
  })
}

export function setToken (data = {}) {
  let expires = ''
  return new Promise(resolve => {
    axios({
      url: '/getToken',
      data: {
        id: data.id
      },
      method: 'post'
    }).then((result) => {
      const res = result.data
      if (res.code === 200) {
        const { token, id } = res.result
        expires = {
          token,
          date: new Date().getTime(),
          userId: id
        }
        window.localStorage.setItem('expires', JSON.stringify(expires))
      }
      resolve(expires)
    })
  })
}
