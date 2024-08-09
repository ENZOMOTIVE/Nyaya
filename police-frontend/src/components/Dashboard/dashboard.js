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

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const result = await axios.get('http://localhost:5000/cases');
        setCases(result.data);
      } catch (error) {
        console.error('Error fetching cases:', error);
      }
    };
    fetchCases();
  }, []);

  const registerFIR = async (caseId) => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(PoliceContractAddress, PoliceContractABI, signer);
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
      alert('MetaMask is not installed');
    }
  };

  const handleViewCase = (caseData) => {
    setSelectedCase(caseData);
  };

  const handleCloseModal = () => {
    setSelectedCase(null);
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Police Dashboard</h2>
      <div className="cases-list">
        {cases.map((caseData, index) => (
          <div key={index} className="case-item">
            <div className="case-info">
              <p>Case #{index + 1}: {caseData.brief}</p> {/* Case numbering added here */}
              <button className="view-case-button" onClick={() => handleViewCase(caseData)}>View Case</button>
            </div>
          </div>
        ))}
      </div>

      {selectedCase && (
        <div className="modal">
          <div className="modal-content">
            <h3>Case Details</h3>
            <p>{selectedCase.details}</p>
            <button className="register-fir-button" onClick={() => registerFIR(selectedCase.id)}>Register FIR</button>
            <button className="close-modal-button" onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;