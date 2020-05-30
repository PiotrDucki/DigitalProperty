import store from '../store'

// move the code for getting contractInstance

export function logIn () {
  var web3 = store.state.web3
  return new Promise(function (resolve, reject) {
    if (web3 == null) reject(new Error('Browser not connected to Metamas'))
    var contractInstance = web3.contractInstance
    contractInstance().methods.getAuth().call((error, result) => {
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

export function loadProperty (propertyId) {
  var web3 = store.state.web3
  return new Promise(function (resolve, reject) {
    if (web3 == null) reject(new Error('Browser not connected to Metamas'))
    var contractInstance = web3.contractInstance
    console.log(propertyId)
    contractInstance().methods.getProperty(propertyId).call((error, result) => {
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
