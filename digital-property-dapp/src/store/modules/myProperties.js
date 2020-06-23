import { loadMyPropertiesContracCall } from '@/util/contractAPI'

const state = {
  propertyList: []
}

const getters = {
}

const actions = {
  loadMyPropertiesProperty ({commit}) {
    return loadMyPropertiesContracCall().then(result => {
      const nuberOfProperties = result[0].length
      var propertyList = []
      for (var i = 0; i < nuberOfProperties; i++) {
        const d = new Date(result[6][i] * 1000)
        const date = d.toISOString().split('T')[0]
        const time = d.toTimeString().split(' ')[0]
        const formatedDate = `${date} ${time}`
        var property = {
          id: result[0][i],
          data: JSON.parse(result[1][i]),
          ifForSale: result[2][i],
          offer: {
            price: result[3][i],
            buyer: result[4][i]
          },
          previousOvner: result[5][i],
          purchaseDate: formatedDate
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
