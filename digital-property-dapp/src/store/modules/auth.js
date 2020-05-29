import { userType } from '@/common/userType'
import { logIn } from '@/util/contractAPI'

const state = {
  userType: userType.UNREGISTERED
}

const getters = {
  isUserAdmin: (state) => state.userType === userType.ADMIN,
  isUserRegisterd: (state) => state.userType === userType.REGISTERED
}

const actions = {
  logInUser ({commit}) {
    logIn().then(result => {
      commit('setUserType', result)
    }).catch(e => console.log(e))
  }
}

const mutations = {
  setUserType (state, payload) {
    state.userType = payload
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
