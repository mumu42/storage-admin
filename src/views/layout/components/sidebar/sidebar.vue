<template>
  <el-menu
    :default-active="activeBar"
    class="el-menu-vertical-demo"
    :collapse="collapse"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
    <template v-for='(item) in routes'>
      <el-submenu :index="item.path" v-if="item.children.length" :key="item.path">
        <template slot="title">
          <svg-icon :icon-class="item.icon"/>
          <span>{{item.title}}</span>
        </template>
        <el-menu-item-group>
          <router-link tag='span'  @click="activeBar = items.path" v-for='(items) in item.children' :key="items.path" :to="items.path">
            <el-menu-item :index="items.path" >
              <svg-icon :icon-class="item.icon"/>
              <span slot="title">{{items.title}}</span>
            </el-menu-item>
          </router-link>
        </el-menu-item-group>
      </el-submenu>
      <router-link v-else :to="item.path" tag='span' @click="activeBar = item.path" :key="item.path">
        <el-menu-item :index="item.path" >
          <svg-icon :icon-class="item.icon"/>
          <span slot="title">{{item.title}}</span>
        </el-menu-item>
      </router-link>
    </template>
  </el-menu>
</template>
<script>
export default {
  props: {
    collapse: {
      type: Boolean,
      default: true
    }
  },
  setup(props, cxt) {
    window.console.log(cxt, 'props')
    const state = {
      activeBar: '/home/edit',
      router: () => {
        const route = cxt.root.$router.options.routes
        let routes = []
        _getRoutes(routes, route, '')
        return routes
      }
    }
    const _getRoutes = (routes, route, basePath) => {
      route.map((item) => {
        if (!item.meta) {
          return
        }
        let obj = {
          title: item.meta.title,
          icon: item.meta.icon,
          path: basePath ? `${basePath}/${item.path}` : item.path,
          children: []
        }
        routes.push(obj)
        if (item.children && item.children.length) {
          _getRoutes(routes[routes.length - 1].children, item.children, obj.path)
        }
      })
    }
    return  {
      ...state,
      routes: state.router()
    }
  }
}
</script>
<style lang="scss">
.el-menu-vertical-demo {
  overflow: hidden;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>