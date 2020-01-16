<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  setup(props, ctx) {
    window.console.log('app')
    const that = ctx.root
    let expires = window.localStorage.getItem('expires')
    if (expires) {
      expires = JSON.parse(expires)
      const now = new Date().getTime()
      if (expires - now >= 25 * 60 * 1000) {
        that.$message.error('登录权限已过期，请重新登录~')
        that.$router.push('/login')
      }
    } else {
      that.$router.push('/login')
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  outline: none;
}
body, html {
  height: 100%;
  width: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  height: 100%;
  width: 100%;
}
</style>
