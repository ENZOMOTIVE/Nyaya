import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';
import './dashboard.css';

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
  const [selectedCase, setSelectedCase] = useState(null);
  const [walletConnected, setWalletConnected] = useState(false);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const result = await axios.get('http://localhost:5000/cases');
        console.log('Fetched cases:', result.data);
        setCases(result.data);
      } catch (error) {
        console.error('Error fetching cases:', error);
      }
    };
    fetchCases();
  }, []);

  const handleViewCase = (caseData) => {
    setSelectedCase(caseData);
  };

  const registerFIR = async (caseId) => {
    if (!caseId) {
      console.error('Invalid caseId:', caseId);
      alert('Case ID is invalid');
      return;
    }

    if (typeof window.ethereum !== 'undefined' && walletConnected) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(PoliceContractAddress, PoliceContractABI, signer);
        console.log('Registering FIR for caseId:', caseId);
        const transaction = await contract.registerFIR(caseId);
        await transaction.wait();

        // Notify the user about FIR registration
        await axios.post('http://localhost:5000/notify-user', { caseId });

        alert('FIR registered and user notified');
      } catch (error) {
        console.error('Error during FIR registration:', error);
        alert('FIR registration failed');
      }
    } else {
      alert('Please connect your wallet first');
    }
  };

  return (
    <div>
      <h2>Police Dashboard</h2>
      {cases.map((caseData, index) => (
        <div key={caseData.id || index} className="case-box">
          <h3>Case #{index + 1}</h3>
          <p><strong>Incident Date:</strong> {caseData.incidentDetails.dateTime}</p>
          <p><strong>Nature of Incident:</strong> {caseData.incidentDetails.natureOfIncident}</p>
          <p><strong>Place of Occurrence:</strong> {caseData.incidentDetails.placeOfOccurrence}</p>
          <p><strong>Description:</strong> {caseData.description}</p>
          <p><strong>Digital Signature:</strong> {caseData.digitalSignature}</p>
          <p><strong>Evidence:</strong> {caseData.evidence}</p>
          <button onClick={() => handleViewCase(caseData)}>View Case</button>
        </div>
      ))}
  
      {selectedCase && (
        <div className="case-details">
          <h3>Case Details</h3>
          <p><strong>Incident Date:</strong> {selectedCase.incidentDetails.dateTime}</p>
          <p><strong>Nature of Incident:</strong> {selectedCase.incidentDetails.natureOfIncident}</p>
          <p><strong>Place of Occurrence:</strong> {selectedCase.incidentDetails.placeOfOccurrence}</p>
          <p><strong>Description:</strong> {selectedCase.description}</p>
          <p><strong>Digital Signature:</strong> {selectedCase.digitalSignature}</p>
          <p><strong>Evidence:</strong> {selectedCase.evidence}</p>
          <button onClick={() => registerFIR(selectedCase.id)}>Register FIR</button>
        </div>
      )}
  
      {!walletConnected && (
        <button onClick={async () => {
          if (typeof window.ethereum !== 'undefined') {
            try {
              const provider = new ethers.providers.Web3Provider(window.ethereum);
              await provider.send('eth_requestAccounts', []);
              setWalletConnected(true);
              alert('Wallet connected');
            } catch (error) {
              console.error('Error connecting wallet:', error);
              alert('Wallet connection failed');
            }
          } else {
            alert('Ethereum wallet not detected');
          }
        }}>Connect Wallet</button>
      )}
    </div>
  );
}

export default Dashboard;