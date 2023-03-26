const express = require("express");
const app = express();
const cors = require("cors");
const {generateKeys} = require("../wallet/generateKeys")
const {verifySignature} = require("../wallet/verifySignature")
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;

  const balance = balances[address] || 0;
  res.send({ balance,balances });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, messageHash, signature } = req.body;

  let validTransaction = verifySignature(signature,messageHash,sender)

  if(!validTransaction){
    res.status(400).send({message: "Signature is not valid!"})
    return
  }
  
  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
  console.log(balances);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
  
  for(let i=0;i<3;i++){
    keys = generateKeys()
    balances[keys["publicKey"]] = 100;
  }

  console.log(balances);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
