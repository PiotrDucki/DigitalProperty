import {address, ABI} from '@/util/contractData'

var Web3 = require('web3')

let getWeb3 = new Promise(function (resolve, reject) {
  var web3js = window.web3
  if (typeof web3js !== 'undefined') {
    var web3 = new Web3(web3js.currentProvider)
    resolve({
      injectedWeb3: true,
      web3 () {
        return web3
      }
    })
  } else {
    reject(new Error('Metamask not detected. Please instal Metamask browser extention'))
  }
})
  .then(result => {
    return new Promise(function (resolve, reject) {
      result.web3().eth.net.getId((err, networkId) => {
        if (err) {
          reject(new Error('Couldnt conect to Ethereum network. Please check network setting in Metamask'))
        } else {
          result = Object.assign({}, result, {networkId})
          resolve(result)
        }
      })
    })
  })
  .then(result => {
    return new Promise(function (resolve, reject) {
      result.web3().eth.getCoinbase((err, coinbase) => {
        if (err) {
          reject(new Error('Unable to retrieve coinbase'))
        } else {
          result = Object.assign({}, result, { coinbase })
          resolve(result)
        }
      })
    })
  })
  .then(result => {
    return new Promise(function (resolve, reject) {
      result.web3().eth.getBalance(result.coinbase, (err, balance) => {
        if (err) {
          reject(new Error('Unable to retrieve balance for address: ' + result.coinbase))
        } else {
          result = Object.assign({}, result, { balance })
          resolve(result)
        }
      })
    })
  })
  .then(result => {
    return new Promise(function (resolve, reject) {
      let web3 = result.web3()
      const contractInstance = new web3.eth.Contract(ABI, address)
      if (contractInstance == null) {
        reject(new Error('Unable to retrieve contract'))
      } else {
        result = Object.assign({}, result, { contractInstance })
        resolve(result)
      }
    })
  })
  .then(result => {
    return new Promise(function (resolve, reject) {
      let contractInstance = result.contractInstance
      contractInstance.methods.getAuth().call((error, userType) => {
        if (error) {
          reject(new Error('Unable to retrieve user data. Please make sure that you are connected to main network.'))
        } else {
          result = Object.assign({}, result, { userType })
          resolve(result)
        }
      })
    })
  })

export default getWeb3
