import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  redirect: '/home'
}, {
  path: '/home',
  name: 'layout',
  meta: {
    title: '管理员',
    icon: 'set'
  },
  component: () => import('../views/layout/layout.vue'),
  children: [{
    path: 'edit',
    name: 'admin-edit',
    meta: {
      title: '编辑管理员',
      icon: 'set'
    },
    component: () => import('../views/index/index.vue')
  }, {
    path: 'list',
    name: 'admin-list',
    meta: {
      title: '管理员列表',
      icon: 'set'
    },
    component: () => import('../views/index/index.vue'),
    children: [
      {
        path: 'delete',
        name: 'admin-delete',
        meta: {
          title: '删除管理员',
          icon: 'set'
        },
        component: () => import('../views/index/index.vue')
      }
    ]
  }]
}, {
  path: '/storage',
  name: 'll',
  meta: {
    title: '仓库管理',
    icon: 'set'
  },
  component: () => import('../views/layout/layout.vue'),
  children: [{
    path: 'list',
    name: 'storage-list',
    meta: {
      title: '仓库列表',
      icon: 'set'
    },
    component: () => import('../views/storage/list.vue')
  }, {
    path: 'detail',
    name: 'storage-detail',
    meta: {
      title: '仓科详情',
      icon: 'set'
    },
    component: () => import('../views/index/index.vue')
  }, {
    path: 'edit',
    name: 'storage-edit',
    meta: {
      title: '仓库编辑',
      icon: 'set'
    },
    component: () => import('../views/index/index.vue')
  }]
}]

const router = new VueRouter({
  routes
})

export default router
