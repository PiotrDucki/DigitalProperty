import getWeb3 from '@/util/inicializeWeb3'
import NETWORKS from '@/util/networks'

const state = {
  coinbase: null,
  networkId: null,
  balance: null,
  isInjected: null,
  web3Instance: null,
  contractInstance: null
}

const getters = {
  networkName: (state) => NETWORKS[state.networkId]
}

const actions = {
  registerWeb3 ({commit, dispatch}) {
    console.log('registerWeb3 Action being executed')
    return getWeb3.then(result => {
      console.log('committing result to registerWeb3Instance mutation')
      commit('setWeb3', result)
      commit('setUserType', result.userType)
    })
  }
}

const mutations = {
  setWeb3 (state, payload) {
    if (payload != null) {
      state.coinbase = payload.coinbase
      state.networkId = payload.networkId
      state.balance = parseInt(payload.balance, 10)
      state.isInjected = payload.injectedWeb3
      state.web3Instance = payload.web3
      state.contractInstance = payload.contractInstance
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
