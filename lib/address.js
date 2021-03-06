var sha256 = require('fast-sha256')
var RIPEMD160 = require('ripemd160')
var base58check = require('./base58check')

const NORMAL_PREFIX = 'E' // Start form charactor E

module.exports = {
  isAddress: function (address) {
    if (typeof address !== 'string') {
      return false
    }
    if (!/^[0-9]{1,20}$/g.test(address)) {
      if (!base58check.decodeUnsafe(address.slice(1))) {
        return false
      }
      if (['E'].indexOf(address[0]) == -1) {
        return false
      }
    }
    return true
  },

  generateBase58CheckAddress: function (publicKey) {
    if (typeof publicKey === 'string') {
      publicKey = Buffer.from(publicKey, 'hex')
    }
    var h1 = sha256.hash(publicKey)
    var h2 = new RIPEMD160().update(Buffer.from(h1)).digest()
    return NORMAL_PREFIX + base58check.encode(h2)
  },
}