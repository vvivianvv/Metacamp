import Vue from 'vue'
import Vuex from 'vuex'
import Department from './models/department'
import User from './models/user'
import Device from './models/device'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Department,
    User,
    Device
  }
})

// export default new Vuex.Store({
//   state: {},
//   mutations: {},
//   actions: {},
//   modules: {}
// })
