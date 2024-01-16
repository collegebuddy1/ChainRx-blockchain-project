export const CONTRACT_ADDRESS = "0x5503E87194cdE5F4614F3D13B7D560DD843F5dCF";
export const CONTRACT_ABI = [
    {
      "type": "constructor",
      "name": "",
      "inputs": [],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "event",
      "name": "MedicineManufactured",
      "inputs": [
        {
          "type": "address",
          "name": "manufacturer",
          "indexed": true,
          "internalType": "address"
        },
        {
          "type": "string",
          "name": "batchNumber",
          "indexed": false,
          "internalType": "string"
        }
      ],
      "outputs": [],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "MedicineSold",
      "inputs": [
        {
          "type": "address",
          "name": "seller",
          "indexed": true,
          "internalType": "address"
        },
        {
          "type": "address",
          "name": "buyer",
          "indexed": true,
          "internalType": "address"
        },
        {
          "type": "string",
          "name": "batchNumber",
          "indexed": false,
          "internalType": "string"
        },
        {
          "type": "uint256",
          "name": "quantity",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "OwnershipTransferred",
      "inputs": [
        {
          "type": "address",
          "name": "from",
          "indexed": true,
          "internalType": "address"
        },
        {
          "type": "address",
          "name": "to",
          "indexed": true,
          "internalType": "address"
        },
        {
          "type": "string",
          "name": "batchNumber",
          "indexed": false,
          "internalType": "string"
        }
      ],
      "outputs": [],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "RoleUpdated",
      "inputs": [
        {
          "type": "address",
          "name": "user",
          "indexed": true,
          "internalType": "address"
        },
        {
          "type": "uint8",
          "name": "newRole",
          "indexed": false,
          "internalType": "enum PharmaDataRegistry.UserRole"
        }
      ],
      "outputs": [],
      "anonymous": false
    },
    {
      "type": "function",
      "name": "addUser",
      "inputs": [
        {
          "type": "address",
          "name": "user",
          "internalType": "address"
        },
        {
          "type": "uint8",
          "name": "role",
          "internalType": "enum PharmaDataRegistry.UserRole"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "getUserMedicine",
      "inputs": [
        {
          "type": "address",
          "name": "user",
          "internalType": "address"
        },
        {
          "type": "uint256",
          "name": "index",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "type": "address",
          "name": "manufacturer",
          "internalType": "address"
        },
        {
          "type": "string",
          "name": "name",
          "internalType": "string"
        },
        {
          "type": "string",
          "name": "batchNumber",
          "internalType": "string"
        },
        {
          "type": "uint256",
          "name": "manufacturingDate",
          "internalType": "uint256"
        },
        {
          "type": "uint256",
          "name": "expiryDate",
          "internalType": "uint256"
        },
        {
          "type": "uint256",
          "name": "price",
          "internalType": "uint256"
        },
        {
          "type": "uint256",
          "name": "quantity",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getUserMedicineCount",
      "inputs": [
        {
          "type": "address",
          "name": "user",
          "internalType": "address"
        }
      ],
      "outputs": [
        {
          "type": "uint256",
          "name": "",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getUserRole",
      "inputs": [
        {
          "type": "address",
          "name": "user",
          "internalType": "address"
        }
      ],
      "outputs": [
        {
          "type": "uint8",
          "name": "",
          "internalType": "enum PharmaDataRegistry.UserRole"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "manufactureMedicine",
      "inputs": [
        {
          "type": "string",
          "name": "name",
          "internalType": "string"
        },
        {
          "type": "string",
          "name": "batchNumber",
          "internalType": "string"
        },
        {
          "type": "uint256",
          "name": "manufacturingDate",
          "internalType": "uint256"
        },
        {
          "type": "uint256",
          "name": "expiryDate",
          "internalType": "uint256"
        },
        {
          "type": "uint256",
          "name": "price",
          "internalType": "uint256"
        },
        {
          "type": "uint256",
          "name": "quantity",
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "owner",
      "inputs": [],
      "outputs": [
        {
          "type": "address",
          "name": "",
          "internalType": "address"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "sellMedicine",
      "inputs": [
        {
          "type": "address",
          "name": "buyer",
          "internalType": "address"
        },
        {
          "type": "string",
          "name": "batchNumber",
          "internalType": "string"
        },
        {
          "type": "uint256",
          "name": "quantity",
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "transferOwnership",
      "inputs": [
        {
          "type": "address",
          "name": "newOwner",
          "internalType": "address"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "updateUserRole",
      "inputs": [
        {
          "type": "address",
          "name": "user",
          "internalType": "address"
        },
        {
          "type": "uint8",
          "name": "newRole",
          "internalType": "enum PharmaDataRegistry.UserRole"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    }
  ];