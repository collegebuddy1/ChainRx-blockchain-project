import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import WalletConnect from './../utils/WalletConnect';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from './../utils/contractDetails';
import './AddUser.css';


const AppUser = () => {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [newUser, setNewUser] = useState('');
  const [newUserRole, setNewUserRole] = useState('');
  const [userToUpdate, setUserToUpdate] = useState('');
  const [newUserRoleUpdate, setNewUserRoleUpdate] = useState('');
  const [connectedWallet, setConnectedWallet] = useState('');
  const [userRole, setUserRole] = useState(null);
  const [userMedicineCount, setUserMedicineCount] = useState(null);
  const [newOwnerAddress, setNewOwnerAddress] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [updateUserRoleSuccessMessage, setUpdateUserRoleSuccessMessage] = useState(null);
  const [getUserRoleSuccessMessage, setGetUserRoleSuccessMessage] = useState(null);
  const [getMedicineCountSuccessMessage, setGetMedicineCountSuccessMessage] = useState(null);
  const [transferOwnershipSuccessMessage, setTransferOwnershipSuccessMessage] = useState(null);

  useEffect(() => {
    const initWeb3 = async () => {
      try {
        if (window.ethereum) {
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);

          // Request account access using eth_requestAccounts
          const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
          });

          setAccounts(accounts);

          const contract = new web3Instance.eth.Contract(
            CONTRACT_ABI,
            CONTRACT_ADDRESS
          );
          setContract(contract);
        } else {
          console.error('Web3 provider not found. Please install MetaMask.');
        }
      } catch (error) {
        console.error('Error initializing Web3:', error);
      }
    };

    initWeb3();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (contract && accounts.length > 0) {
        try {
          const fetchedUserRole = await contract.methods.getUserRole(accounts[0]).call();
          setUserRole(fetchedUserRole);
          setGetUserRoleSuccessMessage('User role fetched successfully');

          const fetchedMedicineCount = await contract.methods.getUserMedicineCount(accounts[0]).call();
          setUserMedicineCount(fetchedMedicineCount);
          setGetMedicineCountSuccessMessage('Medicine count fetched successfully');
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [contract, accounts]);

  const handleAddUser = async () => {
    try {
      await contract.methods.addUser(newUser, newUserRole).send({ from: accounts[0] });
      setSuccessMessage('User added successfully');
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleUpdateUserRole = async () => {
    try {
      await contract.methods.updateUserRole(userToUpdate, newUserRoleUpdate).send({ from: accounts[0] });
      setUpdateUserRoleSuccessMessage('User role updated successfully');
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  const handleGetUserRole = async () => {
    try {
      const fetchedUserRole = await contract.methods.getUserRole(accounts[0]).call();
      setUserRole(fetchedUserRole);
      if(Number(userRole)==0)
        console.log("User Role: Manufacturer");
       if(Number(userRole)==1)
        console.log("User Role: Distributor");
      if(Number(userRole)==2)
        console.log("User Role: Retailer");
      setGetUserRoleSuccessMessage('Please press F12 Key [Open Console]');
    } catch (error) {
      console.error('Error fetching user role:', error);
    }
  };

  const handleGetMedicineCount = async () => {
    try {
      const fetchedMedicineCount = await contract.methods.getUserMedicineCount(accounts[0]).call();
      setUserMedicineCount(fetchedMedicineCount);
      console.log("Medicine Count: ",Number(userMedicineCount));
      setGetMedicineCountSuccessMessage("Please press F12 Key [Open Console]")
    } catch (error) {
      console.error('Error fetching medicine count:', error);
    }
  };

  const handleWalletConnect = (walletAddress) => {
    // Perform any additional actions when the wallet is connected
    console.log(`Wallet connected: ${walletAddress}`);
    setConnectedWallet(walletAddress);
  };

  const handleTransferOwnership = async () => {
    try {
      await contract.methods.transferOwnership(newOwnerAddress).send({ from: accounts[0] });
      setTransferOwnershipSuccessMessage('Ownership transferred successfully');
    } catch (error) {
      console.error('Error transferring ownership:', error);
    }
  };

  return (
    <div>
      <h1>Only Owner Functions</h1>
      <WalletConnect onWalletConnect={handleWalletConnect} />
      {connectedWallet && (
        <div>
          <p>Connected Wallet: {connectedWallet}</p>
          {userRole !== null && (
            <p>User Role: {userRole}</p>
          )}
          {userMedicineCount !== null && (
            <p>User Medicine Count: {userMedicineCount}</p>
          )}
        </div>
      )}
      <br />
      <br />
      <div className='cards-container'>
        <div className='card'>
          <h2>Add User</h2>
          <input
            type="text"
            placeholder="New User Address"
            value={newUser}
            onChange={(e) => setNewUser(e.target.value)}
          />
          <input
            type="text"
            placeholder="New User Role"
            value={newUserRole}
            onChange={(e) => setNewUserRole(e.target.value)}
          />
          <button onClick={handleAddUser}>Add User</button>
          {successMessage && (
            <div>
              <p>{successMessage}</p>
            </div>
          )}
        </div>
        <div className='card'>
          <h2>Update User Role</h2>
          <input
            type="text"
            placeholder="User Address to Update"
            value={userToUpdate}
            onChange={(e) => setUserToUpdate(e.target.value)}
          />
          <input
            type="text"
            placeholder="New User Role"
            value={newUserRoleUpdate}
            onChange={(e) => setNewUserRoleUpdate(e.target.value)}
          />
          <button onClick={handleUpdateUserRole}>Update User Role</button>
          {updateUserRoleSuccessMessage && (
            <div>
              <p>{updateUserRoleSuccessMessage}</p>
            </div>
          )}
        </div>
        <div className='card'>
          <h2>Get User Role</h2>
          <button onClick={handleGetUserRole}>Get User Role</button>
          {getUserRoleSuccessMessage && (
            <div>
              <p>{getUserRoleSuccessMessage}</p>
            </div>
          )}
        </div>
        <div className='card'>
          <h2>Get Medicine Count</h2>
          <button onClick={handleGetMedicineCount}>Get Medicine Count</button>
          {getMedicineCountSuccessMessage && (
            <div>
              <p>{getMedicineCountSuccessMessage}</p>
            </div>
          )}
        </div>
        <div className='card'>
          <h2>Transfer Ownership</h2>
          <input
            type="text"
            placeholder="New Owner Address"
            value={newOwnerAddress}
            onChange={(e) => setNewOwnerAddress(e.target.value)}
          />
          <button onClick={handleTransferOwnership}>Transfer Ownership</button>
          {transferOwnershipSuccessMessage && (
            <div>
              <p>{transferOwnershipSuccessMessage}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppUser;
