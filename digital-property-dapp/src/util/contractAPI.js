import store from '../store'

// move the code for getting contractInstance and address to another function

export function logIn () {
  var web3 = store.getters.web3
  return new Promise(function (resolve, reject) {
    if (web3 == null) reject(new Error('Browser not connected to Metamas'))
    var contractInstance = web3.contractInstance
    var userAddress = web3.coinbase
    contractInstance().methods.getAuth().call({from: userAddress}, (error, result) => {
      if (error) {
        reject(new Error(''))
      } else {
        console.log(result)
        resolve(result)
      }
    })
  })
}
