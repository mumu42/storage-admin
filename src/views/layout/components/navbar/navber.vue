<template>
  <div class='app-navbar'>
    <i class="el-icon-s-fold" v-if="!isFold" @click="sideFold" ></i>
    <i class="el-icon-s-unfold" v-else @click="sideUnFold" ></i>
  </div>
</template>
<script>
import { reactive, toRefs } from '@vue/composition-api'
export default {
  setup(props, ctx) {
    const state = reactive({
      isFold: false
    })
    const sideFold = () => {
      ctx.emit('fold')
      state.isFold = true
    }
    const sideUnFold = () => {
      ctx.emit('unfold')
      state.isFold = false
    }
    return {
      sideFold,
      sideUnFold,
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
</style>