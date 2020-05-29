import getWeb3 from '@/util/getWeb3'
import getContract from '@/util/getContract'

const state = {
  coinbase: null,
  networkId: null,
  balance: null,
  isInjected: null,
  web3Instance: null,
  contractInstance: null
}

const getters = {
  web3: (state) => state.isInjected ? state : null,
  web3Instance: (state) => state.web3Instance,
  contractInstance: (state) => state.contractInstance
}

const actions = {
  registerWeb3 ({commit, dispatch}) {
    console.log('registerWeb3 Action being executed')
    getWeb3.then(result => {
      console.log('committing result to registerWeb3Instance mutation')
      commit('setWeb3', result)
      dispatch('getContractInstance')
    }).catch(e => {
      console.log('error in action registerWeb3', e)
    })
  },
  getContractInstance ({commit}) {
    getContract.then(result => {
      commit('setContractInstance', result)
    }).catch(e => console.log(e))
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
  },
  setContractInstance (state, payload) {
    state.contractInstance = () => payload
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
