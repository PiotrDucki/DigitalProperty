import { userType } from '@/common/userType'

const state = {
  userType: userType.UNREGISTERED
}

const getters = {
  isUserAdmin: (state) => state.userType === userType.ADMIN,
  isUserRegisterd: (state) => state.userType === userType.REGISTERED
}

const actions = {
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
