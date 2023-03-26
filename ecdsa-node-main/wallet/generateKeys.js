const secp = require("ethereum-cryptography/secp256k1")
const {toHex, hexToBytes} = require("ethereum-cryptography/utils")
const log = require("log-beautify")
const {keccak256} = require("ethereum-cryptography/keccak");

function getPublicKeyFromHash(key){
    // return publicKey = toHex(keccak256(key.slice(1)).slice(-20));
    return publicKey = toHex(keccak256(key).slice(-20));
}

function generateKeys(){

let privateKey = secp.utils.randomPrivateKey();
let publicKey = secp.getPublicKey(privateKey)

privateKey = toHex(privateKey)
publicKey = getPublicKeyFromHash(publicKey)

log.info("Public and Private key generated")
log.show("Private Key: " + privateKey)
log.show("Public Key: "+ publicKey)

return {privateKey,publicKey}

}

module.exports = {generateKeys,getPublicKeyFromHash};