import store from '../store'

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
    web3.contractInstance.methods.createOffer(offer.propertyId, offer.price, offer.buyerAddress).send()
      .then(resolve())
      .catch(reject(new Error('Error removeOfferContracCall')))
  })
}

export function buyPropertyContracCall (offerDetails) {
  var web3 = store.state.web3
  return new Promise(function (resolve, reject) {
    checkWeb3(web3, reject)
    web3.contractInstance.methods.confirmOffer(offerDetails.propertyId).send({value: offerDetails.price})
      .then(resolve())
      .catch(reject(new Error('Error removeOfferContracCall')))
  })
}

export function addUserContracCall (userData) {
  var web3 = store.state.web3
  return new Promise(function (resolve, reject) {
    checkWeb3(web3, reject)
    console.log(userData)
    web3.contractInstance.methods.addUser(userData.address, userData.peselHash).send()
      .then(resolve())
      .catch(reject(new Error('Error addUserContracCall')))
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
