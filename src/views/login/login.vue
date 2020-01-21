<template>
  <div class="login-page">
    <div class='login-box'>
      <img class="login-img greeting" v-show="logo === 'greeting'" src="../../assets/images/greeting.1415c1c.png"/>
      <img class="login-img blindfold" v-show="logo === 'blindfold'" src="../../assets/images/blindfold.58ce423.png"/>
      <img class="login-img" v-show="logo === 'normal'" src="../../assets/images/normal.0447fe9.png"/>
      <el-input v-model="nickname" placeholder="用户名" class="input-box" @focus="logo = 'normal'"></el-input>
      <el-input v-model="password" placeholder="密码"  class="input-box" @focus="logo = 'blindfold'" @blur="logo = 'normal'" show-password></el-input>
      <div>
        <el-button type="primary" @click="onSubmit" size="medium">登录</el-button>
        <el-button @click="reset" size="medium">重置</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, toRefs } from '@vue/composition-api'
import { loginFun } from '@/api/admin.js'
import { setToken } from '@/common'
import md5 from 'js-md5'
export default {
  setup(props, ctx) {
    const that = ctx.root
    const state = reactive({
      nickname: '',
      password: '',
      logo: 'greeting'
    })
    const onSubmit = () => {
      // 登录
      loginFun({
        nickname: state.nickname,
        password: md5(state.password)
      }).then(res => {
        if (res.code === 200) {
          const id = res.result.detail.id
          that.$store.commit('setUser', {
            isAdmin: res.result.detail.isAdmin,
            userName: res.result.detail.nickname,
            userId: id
          })
          setToken({id})
          that.$router.push('/home/list')
        } else {
          that.$message.error(res.msg)
        }
      }).catch(err => {
        that.$message.error(err)
      })
    }
    // 重置
    const reset = () => {
      state.nickname = ''
      state.password = ''
    }
    return {
      ...toRefs(state),
      onSubmit,
      reset
    }
  }
}
</script>
<style lang="scss">
.login-page {
  height: 100%;
  width: 100%;
  background-image: radial-gradient(#698BFD, #7583FF, #797FFF, #8376FE, #8B6CFF);
}
.login-box {
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 40px;
  box-shadow: 0 2px 5px 0 rgba(0,0,0,.15);
  background: rgba(0, 0, 0, .2);
  text-align: center;
  transform: translateX(-50%) translateY(-50%);
  .input-box {
    width: 300px;
    display: block;
    margin: 10px;
  }
}
.login-img {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%) translateY(-80%);
}
.greeting, .blindfold {
  transform: translateX(-50%) translateY(-76%);
}
</style>