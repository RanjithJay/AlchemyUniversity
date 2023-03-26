import { useState } from "react";
import server from "./server";
import {keccak256} from "ethereum-cryptography/keccak";
import {toHex, utf8ToBytes, utils} from "ethereum-cryptography/utils"

function Transfer({ address, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    try {
      const data = JSON.stringify({
        sender : address,
        amount : parseInt(sendAmount)
      });

      const messageHash = toHex(keccak256(utf8ToBytes(data)));
      const signature = prompt(`Please pass the signature for the data ${messageHash}`)
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        amount: parseInt(sendAmount),
        recipient,
        messageHash,
        signature
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient(Public Key)
        <input
          placeholder="Type an address, for example: efa32b229dc5801b8f6877a49630b8a0ad01ebdb"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
