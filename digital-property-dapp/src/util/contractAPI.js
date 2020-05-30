import store from '../store'

export function loadProperty (propertyId) {
  var web3 = store.state.web3
  return new Promise(function (resolve, reject) {
    if (web3 == null) reject(new Error('Browser not connected to Metamas'))
    web3.contractInstance.methods.getProperty(propertyId).call((error, result) => {
      if (error) {
        reject(new Error(''))
      } else {
        console.log('result :')
        console.log(result)
        resolve(result)
      }
    })
  })
}
