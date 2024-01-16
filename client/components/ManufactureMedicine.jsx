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

const ManufactureMedicine = ({ walletConnected }) => {
  const [name, setName] = useState("");
  const [batchNumber, setBatchNumber] = useState("");
  const [manufacturingDate, setManufacturingDate] = useState(0);
  const [expiryDate, setExpiryDate] = useState(0);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [walletAddress, setWalletAddress] = useState("");

  const handleManufacture = async () => {
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
          .manufactureMedicine(
            name,
            batchNumber,
            manufacturingDate,
            expiryDate,
            price,
            quantity
          )
          .send({ from: userAddress });

        console.log("Medicine manufactured successfully.");
      } else {
        alert("No accounts found. Please connect to your wallet.");
      }
    } catch (error) {
      console.error("Error manufacturing medicine:", error);
    }
  };

  return (
    <div>
      <h2>Manufacture Medicine</h2>
      {walletConnected ? (
        <>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Batch Number:</label>
          <input
            type="text"
            value={batchNumber}
            onChange={(e) => setBatchNumber(e.target.value)}
          />
          <label>Manufacturing Date:</label>
          <input
            type="number"
            value={manufacturingDate}
            onChange={(e) => setManufacturingDate(e.target.value)}
          />
          <label>Expiry Date:</label>
          <input
            type="number"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
          />
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <label>Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <button onClick={handleManufacture}>Manufacture</button>
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
      <ManufactureMedicine walletConnected={walletConnected} />
    </div>
  );
}

export default App;
