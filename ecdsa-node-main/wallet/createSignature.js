const secp = require("ethereum-cryptography/secp256k1");
const {toHex, bytesToHex} = require("ethereum-cryptography/utils");
const log = require("log-beautify")

let arguments = process.argv;

let data = arguments[3];
let privateKey = arguments[2];

console.log("Data: " + data);
console.log("Private Key: " + privateKey);

if(data === undefined || privateKey === undefined){
    log.error("Provide both the parameters!")
    return;
}

data = secp.utils.hexToBytes(data);

secp.sign(data,privateKey).then(signatureData=>{
    const recoveryBit=1;
    signature = toHex(signatureData);
    let sign = signature+recoveryBit
    log.info("Signature with Recovery bit: "+sign)
})