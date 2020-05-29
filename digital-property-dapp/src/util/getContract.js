import {address, ABI} from '@/util/contract'

var Web3 = require('web3')

let getContract = new Promise(function (resolve, reject) {
  let web3 = new Web3(window.web3.currentProvider)
  let contractInstance = new web3.eth.Contract(ABI, address)
  resolve(contractInstance)
})

export default getContract
