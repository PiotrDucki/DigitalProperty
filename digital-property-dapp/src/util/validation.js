var web = require('web3')

export function isIdValid (id) {
  return id === parseInt(id, 10) && id > 0
}

export function isAddresValid (address) {
  return web.utils.isAddress(address)
}

export function isPeselValid (pesel) {
  return pesel === parseInt(pesel, 10) && pesel.toString().length === 11
}
