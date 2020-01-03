<template>
  <div class='app-layout'>
    <sidebar :collapse="collapse"></sidebar>
    <div class="app-content">
      <navbar @fold='fold' @unfold='unfold'/>
      <div class="app-contents">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import Sidebar from './components/sidebar/sidebar'
import Navbar from './components/navbar/navber'
import { reactive, toRefs } from '@vue/composition-api'
export default {
  name: 'layout',
  components: {
    Sidebar,
    Navbar
  },
  setup() {
    const state = reactive({
      collapse: false
    })
    const fold = () => {
      state.collapse = true
    }
    const unfold = () => {
      state.collapse = false
    }
    return {
      fold,
      unfold,
      ...toRefs(state)
    }
  }
}
</script>
<style lang="scss">
.app-layout {
  width: 100%;
  height: 100%;
  display: flex;
}
.app-content {
  flex: 1;
}
.app-contents {
  margin: 20px;
  padding: 30px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
</style>