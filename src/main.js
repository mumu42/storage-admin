import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueCompositionApi from '@vue/composition-api'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './icons'

Vue.config.productionTip = false
Vue.use(VueCompositionApi)
Vue.use(ElementUi)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
