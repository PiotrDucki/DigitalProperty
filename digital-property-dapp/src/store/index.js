import Vue from 'vue'
import Vuex from 'vuex'
import web3 from './modules/web3'
import auth from './modules/auth'
import property from './modules/property'
import myProperties from './modules/myProperties'

// Load Vuex
Vue.use(Vuex)

// Create store
export default new Vuex.Store({
  modules: {
    web3,
    auth,
    property,
    myProperties
  }
})
