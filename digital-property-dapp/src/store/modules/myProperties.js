import { loadMyPropertiesContracCall } from '@/util/contractAPI'

const state = {
  propertyList: []
}

const getters = {
  // getProperty: () => state
}

const actions = {
  loadMyPropertiesProperty ({commit}) {
    return loadMyPropertiesContracCall().then(result => {
      const nuberOfProperties = result[0].length
      var propertyList = []
      for (var i = 0; i < nuberOfProperties; i++) {
        var property = {
          id: result[0][i],
          data: result[1][i],
          ifForSale: result[2][i],
          offer: {
            price: result[3][i],
            buyer: result[4][i]
          }
        }
        propertyList.push(property)
      }
      commit('setMyProperties', propertyList)
    })
  }
}

const mutations = {
  setMyProperties (state, payload) {
    state.propertyList = payload
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
