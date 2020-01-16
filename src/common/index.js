export function getToken () {
  let expires = window.localStorage.getItem('expires')
  if (expires) {
    expires = JSON.parse(expires)
    const now = new Date().getTime()
    if (now - expires.date >= 25 * 60 * 1000) {
      expires = ''
    }
  } else {
    expires = ''
  }
  return expires
}
