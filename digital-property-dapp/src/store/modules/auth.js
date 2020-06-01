import { userType } from '@/common/userType'

const state = {
  userType: userType.INICIAL_TYPE
}

const getters = {
  isUserAdmin: (state) => state.userType === userType.ADMIN,
  isUserRegisterd: (state) => state.userType === userType.REGISTERED,
  isUserUnregisterd: (state) => state.userType === userType.UNREGISTERED,
  isUserDataLoaded: (state) => state.userType !== userType.INICIAL_TYPE
}

const actions = {
}

const mutations = {
  setUserType (state, payload) {
    state.userType = Number(payload)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
