import { regainToken } from '../api/token'
export function getToken () {
  let expires = window.localStorage.getItem('expires')
  if (expires) {
    expires = JSON.parse(expires)
    const now = new Date().getTime()
    if (now - expires.date >= 25 * 60 * 1000) {
      expires = setToken({id: expires.userId})
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
