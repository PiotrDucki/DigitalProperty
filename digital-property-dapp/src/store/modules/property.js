import { loadProperty } from '@/util/contractAPI'

const state = {
  id: 0,
  data: '',
  owner: 0,
  ifForSale: false,
  offer: {
    price: 0,
    buyer: 0
  }
}

const getters = {
  getProperty: () => state
}

const actions = {
  loadProperty ({commit}, propertyId) {
    // API call
    loadProperty(propertyId).then(result => {
      // Process results
      var property = {
        id: result[0],
        data: result[1],
        owner: result[2],
        ifForSale: result[3],
        offer: {
          price: result[4],
          buyer: result[5]
        }
      }
      console.log('inside acction')
      console.log(property)
      // Set changes
      commit('setProperty', property)
    }).catch(e => console.log(e))
  }
}

const mutations = {
  setProperty (state, payload) {
    state.id = payload.id
    state.data = payload.data
    state.owner = payload.owner
    state.ifForSale = payload.ifForSale
    state.offer = payload.offer
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
