import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';

const PoliceContractAddress = "0x905AdE0F6CDbae009034293DAFBee66690aF6B98";

const PoliceContractABI =  [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "caseId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "officer",
        "type": "address"
      }
    ],
    "name": "FIRRegistered",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "firCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "firs",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "caseId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "officer",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "registered",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_caseId",
        "type": "uint256"
      }
    ],
    "name": "registerFIR",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

  
const Dashboard = () => {
  const [cases, setCases] = useState([]);

  useEffect(() => {
      const fetchCases = async () => {
          try {
              const result = await axios.get('http://localhost:5000/cases');
              console.log('Fetched cases:', result.data);  // Log the fetched cases
              setCases(result.data);
          } catch (error) {
              console.error('Error fetching cases:', error);
          }
      };
      fetchCases();
  }, []);

  const registerFIR = async (caseId) => {
      if (typeof window.ethereum !== 'undefined') {
          const provider = new ethers.BrowserProvider(window.ethereum);
          await provider.send('eth_requestAccounts', []);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(PoliceContractAddress, PoliceContractABI, signer);
          const transaction = await contract.registerFIR(caseId);
          await transaction.wait();
      }
  };

  return (
      <div>
          <h2>Police Dashboard</h2>
          {cases.map((caseData, index) => (
              <div key={index}>
                  <p>{caseData.details}</p>
                  <button onClick={() => registerFIR(caseData.id)}>Register FIR</button>
              </div>
          ))}
      </div>
  );
};

export default Dashboard;