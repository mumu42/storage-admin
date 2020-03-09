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
import { getToken } from '@/common'
import { getAdmin } from '@/api/admin'
export default {
  name: 'navber',
  setup(props, ctx) {
    const that = ctx.root
    
    const state = reactive({
      isFold: false,
      userName: that.$store.state.user.userName,
      token: ''
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
      that.$router.push('/login')
    }
    const init = async () => {
      getToken().then(res => {
        state.token = res
        if (!state.token && window.location.href.indexOf('login') < 0) {
          that.$router.push('/login')
          return
        }
        if (!state.userName) {
          // 重新获取用户资料
          getAdmin({id: state.token.userId}).then((res) => {
            const { result } = res
            if (res.code === 200) {
              that.$store.commit('setUser', {
                isAdmin: result.isAdmin,
                userName: result.nickname,
                userId: result.id
              })
              state.userName = result.nickname
            }
          })
        }
      })
    }
    init()
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
    cursor: pointer;
  }
}
</style>