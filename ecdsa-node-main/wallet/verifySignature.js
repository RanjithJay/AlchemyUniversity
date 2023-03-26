const { keccak256 } = require("ethereum-cryptography/keccak")
const secp = require("ethereum-cryptography/secp256k1")
const { hexToBytes} = require("ethereum-cryptography/utils")
const {getPublicKeyFromHash} = require("../wallet/generateKeys")

function verifySignature(signature,message,publicKey){
    console.log({signature,message,publicKey})
    let messageBytes = hexToBytes(message);
    let signatureOnly = signature.slice(0,signature.length-1);
    let recoverBit = parseInt(signature.slice(-1));

    let pubKeyFromSign = secp.recoverPublicKey(messageBytes,signatureOnly,recoverBit);

    pubKeyFromSign = getPublicKeyFromHash(pubKeyFromSign);

    if(publicKey!=pubKeyFromSign)
        console.log("Public key from signature from and from UI is not matching!");
    
    // console.log({signature,message,publicKey,recoverBit,signatureOnly,pubKeyFromSign})
    
    return publicKey==pubKeyFromSign;
}

// console.log(verifySignature("30440220231e491ba6d4b562ea7962ca4f26d0ab321f2b788c6fa7bbe35890b6b9f65e8e022076344ded980c00837cf7326e51878e9b30b67044c27a7a3941b13ea0fc63f6cd1",
// "f7abe1c18e69acb81ae21f69f2763a63a20fb7e25f5e5912ce27453c4506495e",
// "2c9f7ec8902ef4b5d486b8760dac729461fbe5ff"
// ))

module.exports = {verifySignature};