import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../utils/contractDetails";

const WalletConnect = ({ setWalletConnected }) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [balance, setBalance] = useState("");

  const mumbaiTestnetRPC =
    "https://polygon-mumbai.infura.io/v3/4458cf4d1689497b9a38b1d6bbf05e78";
  const web3 = new Web3(new Web3.providers.HttpProvider(mumbaiTestnetRPC));

  const connectWalletHandler = async () => {
    if (window.ethereum) {
      try {
        const newAccounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (newAccounts.length > 0) {
          const address = newAccounts[0];
          setWalletAddress(address);

          const balanceWei = await web3.eth.getBalance(address);
          const balanceEther = web3.utils.fromWei(balanceWei, "ether");
          setBalance(balanceEther);

          setWalletConnected(true);
        } else {
          alert("No accounts found. Please connect to your wallet.");
        }
      } catch (error) {
        console.error("An error occurred: ", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  return (
    <div>
      <button onClick={connectWalletHandler}>
        {walletAddress
          ? `${walletAddress.substring(0, 5)}... | Balance: ${parseFloat(
              balance
            ).toFixed(4)} MATIC`
          : "Connect Wallet"}
      </button>
    </div>
  );
};

const SellMedicine = ({ walletConnected }) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [buyer, setBuyer] = useState("");
  const [batchNumber, setBatchNumber] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);

  const handleSellMedicine = async () => {
    if (!walletConnected) {
      alert("Please connect your wallet first.");
      return;
    }

    const web3 = new Web3(window.ethereum);
    try {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length > 0) {
        const userAddress = accounts[0];
        setWalletAddress(userAddress);

        const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

        await contract.methods
          .sellMedicine(buyer, batchNumber, quantity)
          .send({ from: walletAddress });
        console.log("Medicine sold successfully!");
      }
    } catch (error) {
      console.error("Error selling medicine: ", error);
    }
  };

  return (
    <div>
      <h2>Sell Medicine</h2>
      {walletConnected ? (
        <>
          <div>
            <input
              type="text"
              placeholder="Buyer Address"
              value={buyer}
              onChange={(e) => setBuyer(e.target.value)}
            />
            <input
              type="text"
              placeholder="Batch Number"
              value={batchNumber}
              onChange={(e) => setBatchNumber(e.target.value)}
            />
            <input
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <button onClick={handleSellMedicine}>Sell Medicine</button>
          </div>
        </>
      ) : (
        <p>Please connect your wallet to manufacture medicine.</p>
      )}
    </div>
  );
};

function App() {
  const [walletConnected, setWalletConnected] = useState(false);

  return (
    <div>
      <WalletConnect setWalletConnected={setWalletConnected} />
      <SellMedicine walletConnected={walletConnected} />
    </div>
  );
}

export default App;
