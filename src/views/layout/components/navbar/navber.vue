<template>
  <div class='app-navbar'>
    <i class="el-icon-s-fold" v-if="!isFold" @click="sideFold" ></i>
    <i class="el-icon-s-unfold" v-else @click="sideUnFold" ></i>
    <div class="user-info" v-if="userName">
      <span>{{userName}}</span>
      <span @click="outLogin">退出</span>
    </div>
  </div>
</template>
<script>
import { reactive, toRefs } from '@vue/composition-api'
export default {
  setup(props, ctx) {
    const state = reactive({
      isFold: false,
      userName: ctx.root.$store.state.user.userName
    })
    const sideFold = () => {
      ctx.emit('fold')
      state.isFold = true
    }
    const sideUnFold = () => {
      ctx.emit('unfold')
      state.isFold = false
    }
    const outLogin = () => {
      window.localStorage.removeItem('expires')
      ctx.root.$router.push('login')
    }
    return {
      sideFold,
      sideUnFold,
      outLogin,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss">
.app-navbar {
  line-height: 35px;
  border-bottom: 1px solid #eee;
  i {
    color: #909399;
    font-size: 20px;
  }
}
.user-info {
  float: right;
  span {
    margin: 0 10px;
  }
}
</style>