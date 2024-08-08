import React, { useState } from 'react';
import { ethers } from 'ethers'; // Correct import statement
const UserContractABI = [
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
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "details",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "evidence",
        "type": "string"
      }
    ],
    "name": "CaseSubmitted",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "caseCount",
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
    "name": "cases",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "details",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "evidence",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "submitted",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_details",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_evidence",
        "type": "string"
      }
    ],
    "name": "submitCase",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];  
const UserContractAddress = '0x1236c297c286625282937D5Dbb869eb055F27446'; // Replace with your contract address

const CaseFile = () => {
    const [details, setDetails] = useState('');
    const [evidence, setEvidence] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            if (typeof window.ethereum !== 'undefined') {
                // Using BrowserProvider for recent ethers version
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const contract = new ethers.Contract(UserContractAddress, UserContractABI, signer);

                if (!contract || !contract.submitCase) {
                    throw new Error('Contract or submitCase method is not available');
                }

                const transaction = await contract.submitCase(details, evidence);
                await transaction.wait();
                alert("Case submitted successfully!");
            } else {
                alert('Please install MetaMask');
            }
        } catch (error) {
            console.error("Error submitting case:", error);
            alert("Failed to submit case");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Details:
                <input
                    type="text"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                />
            </label>
            <label>
                Evidence:
                <input
                    type="text"
                    value={evidence}
                    onChange={(e) => setEvidence(e.target.value)}
                />
            </label>
            <button type="submit">Submit Case</button>
        </form>
    );
};

export default CaseFile;
