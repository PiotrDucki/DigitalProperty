import { userType } from '@/common/userType'

const state = {
  userType: userType.UNREGISTERED
}

const getters = {
}

const actions = {
  logInUser ({commit, rootGetters}) {
    var web3 = rootGetters.web3
    if (web3 == null) {
      console.log('You are not connected to Ethereum Blockchain')
    } else {
      var contractInstance = web3.contractInstance
      var userAddress = web3.coinbase
      console.log('loging in')
      console.log(contractInstance().methods)
      contractInstance().methods.getAuth().call({from: userAddress}, (error, result) => {
        if (error) {
          console.log(error)
          this.pending = false
        } else {
          console.log('test! ' + result)
        }
      })
    }
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
