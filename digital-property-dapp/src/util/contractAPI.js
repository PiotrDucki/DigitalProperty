import store from '../store'

export function loadPropertyContracCall (propertyId) {
  var web3 = store.state.web3
  return new Promise(function (resolve, reject) {
    if (web3 == null) reject(new Error('Browser not connected to Metamas'))
    web3.contractInstance.methods.getProperty(propertyId).call((error, result) => {
      if (error) {
        reject(new Error('Property with such a id does not existst'))
      } else {
        console.log('result :')
        console.log(result)
        resolve(result)
      }
    })
  })
}

export function loadMyPropertiesContracCall () {
  var web3 = store.state.web3
  return new Promise(function (resolve, reject) {
    if (web3 == null) reject(new Error('Browser not connected to Metamas'))
    web3.contractInstance.methods.getMyProperties().call((error, result) => {
      if (error) {
        reject(new Error('Couldnt get user poropeties'))
      } else {
        console.log('result :')
        console.log(result)
        resolve(result)
      }
    })
  })
}
