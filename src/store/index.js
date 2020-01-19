import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getter'
import state from './state'
import mutations from './mutation'
import actions from './action'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})

export default store
