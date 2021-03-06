import store from '../store'
var Web3 = require('web3')

/// //////////////////////////
//  Read acctions
/// /////////////////////////

export function loadPropertyContracCall (propertyId) {
  var web3 = store.state.web3
  return new Promise(function (resolve, reject) {
    checkWeb3(web3, reject)
    web3.contractInstance.methods.getProperty(propertyId).call()
      .then((result) => resolve(result))
      .catch((error) => reject(new Error(getErrorMessage(error))))
  })
}

export function loadMyPropertiesContracCall () {
  var web3 = store.state.web3
  return new Promise(function (resolve, reject) {
    checkWeb3(web3, reject)
    web3.contractInstance.methods.getMyProperties().call()
      .then((result) => resolve(result))
      .catch((error) => reject(new Error(getErrorMessage(error))))
  })
}

export function loadUserDataContracCall (address) {
  var web3 = store.state.web3
  return new Promise(function (resolve, reject) {
    checkWeb3(web3, reject)
    web3.contractInstance.methods.getUser(address).call()
      .then((result) => resolve(result))
      .catch((error) => reject(new Error(getErrorMessage(error))))
  })
}

export function loadUserPropertiesContracCall (address) {
  var web3 = store.state.web3
  return new Promise(function (resolve, reject) {
    checkWeb3(web3, reject)
    web3.contractInstance.methods.getUserProperties(address).call()
      .then((result) => resolve(result))
      .catch((error) => reject(new Error(getErrorMessage(error))))
  })
}

export function loadPropertytTransactionsContracCall (propertyId) {
  var web3 = store.state.web3
  return new Promise(function (resolve, reject) {
    checkWeb3(web3, reject)
    web3.contractInstance.methods.getPropertyHistory(propertyId).call()
      .then((result) => resolve(result))
      .catch((error) => reject(new Error(getErrorMessage(error))))
  })
}

export function loadTransactionContracCall (transactionId) {
  var web3 = store.state.web3
  return new Promise(function (resolve, reject) {
    checkWeb3(web3, reject)
    web3.contractInstance.methods.getTransation(transactionId).call()
      .then((result) => resolve(result))
      .catch((error) => reject(new Error(getErrorMessage(error))))
  })
}

export function loadRecentTransactionsContracCall () {
  var web3 = store.state.web3
  return new Promise(function (resolve, reject) {
    checkWeb3(web3, reject)
    web3.contractInstance.methods.getRecentTransations().call()
      .then((result) => resolve(result))
      .catch((error) => reject(new Error(getErrorMessage(error))))
  })
}

/// //////////////////////////
//  Write acctions
/// /////////////////////////

export function removeOfferContracCall (propertyId) {
  var web3 = store.state.web3
  return new Promise(function (resolve, reject) {
    checkWeb3(web3, reject)
    web3.contractInstance.methods.removeOffer(propertyId).send()
      .then(resolve())
      .catch(reject(new Error('Error removeOfferContracCall')))
  })
}

export function createOfferContracCall (offer) {
  var web3 = store.state.web3
  return new Promise(function (resolve, reject) {
    checkWeb3(web3, reject)
    web3.contractInstance.methods.createOffer(offer.propertyId, Web3.utils.toWei(offer.price.toString(), 'ether'), offer.buyerAddress).send()
      .then(resolve())
      .catch(reject(new Error('Error removeOfferContracCall')))
  })
}

export function buyPropertyContracCall (offerDetails) {
  var web3 = store.state.web3
  return new Promise(function (resolve, reject) {
    checkWeb3(web3, reject)
    web3.contractInstance.methods.confirmOffer(offerDetails.propertyId).send({value: Web3.utils.toWei(offerDetails.price.toString(), 'ether')})
      .then(resolve())
      .catch(reject(new Error('Error removeOfferContracCall')))
  })
}

export function addUserContracCall (user) {
  var web3 = store.state.web3
  return new Promise(function (resolve, reject) {
    checkWeb3(web3, reject)
    console.log(user)
    web3.contractInstance.methods.addUser(user.address, user.peselHash).send()
      .then(resolve())
      .catch(reject(new Error('Error addUserContracCall')))
  })
}

export function addPropertyContracCall (property) {
  var web3 = store.state.web3
  return new Promise(function (resolve, reject) {
    checkWeb3(web3, reject)
    console.log(property)
    web3.contractInstance.methods.addProperty(property.ownerAddress, JSON.stringify(removeEmpty(property.data))).send()
      .then(resolve())
      .catch(reject(new Error('Error addPropertyContracCall')))
  })
}

/// //////////////////////////
//  Helper functions
/// /////////////////////////

function checkWeb3 (web3, reject) {
  if (web3.contractInstance == null) reject(new Error('Browser not connected to Metamas'))
}

function getErrorMessage (error) {
  var errorString = error.toString()
  var message = errorString.match(/("reason"*:["a-zA-Z0-9\- :]*)/g)[0]
  message = message.substring(11, (message.length - 1))
  return message
}

const removeEmpty = (obj) => {
  Object.keys(obj).forEach((k) => (!obj[k] && obj[k] !== undefined && obj[k] !== undefined) && delete obj[k])
  return obj
}
