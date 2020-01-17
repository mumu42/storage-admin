<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { getToken } from './common'
export default {
  name: 'app',
  setup(props, ctx) {
    const that = ctx.root
    const expires = getToken()
    if (!expires) {
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
