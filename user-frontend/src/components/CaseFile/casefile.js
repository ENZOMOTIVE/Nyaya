import React, { useState } from 'react';
import { ethers } from 'ethers'; // Correct import statement
import axios from 'axios';
import './casefile.css';

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
const pinataApiKey = 'your_pinata_api_key'; // Replace with your Pinata API key
const pinataSecretApiKey = 'your_pinata_secret_api_key'; // Replace with your Pinata secret API key

const CaseFile = () => {
  const [incidentDetails, setIncidentDetails] = useState({
      dateTime: '',
      natureOfIncident: '',
      placeOfOccurrence: '',
  });
  const [description, setDescription] = useState('');
  const [digitalSignature, setDigitalSignature] = useState('');
  const [evidence, setEvidence] = useState('');
  const [photo, setPhoto] = useState(null);
  const [photoHash, setPhotoHash] = useState('');

  const handleSubmit = async (event) => {
      event.preventDefault();

      try {
          if (photo) {
              const photoHash = await uploadPhotoToPinata(photo);
              setPhotoHash(photoHash);
          }

          if (typeof window.ethereum !== 'undefined') {
              const provider = new ethers.BrowserProvider(window.ethereum);
              const signer = await provider.getSigner();
              const contract = new ethers.Contract(UserContractAddress, UserContractABI, signer);

              if (!contract || !contract.submitCase) {
                  throw new Error('Contract or submitCase method is not available');
              }

              const transaction = await contract.submitCase(
                  incidentDetails.dateTime,
                  incidentDetails.natureOfIncident,
                  incidentDetails.placeOfOccurrence,
                  description,
                  digitalSignature,
                  evidence,
                  photoHash
              );
              await transaction.wait();
              alert("Case submitted to blockchain!");

              // Send case data to backend server
              await axios.post('http://localhost:5000/send-case', {
                  incidentDetails,
                  description,
                  digitalSignature,
                  evidence,
                  photoHash,
              });
              alert("Case sent to police server!");
          } else {
              alert('Please install MetaMask');
          }
      } catch (error) {
          console.error("Error submitting case:", error);
          alert("Failed to submit case");
      }
  };

  const uploadPhotoToPinata = async (photoFile) => {
      const formData = new FormData();
      formData.append('file', photoFile);

      try {
          const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
              headers: {
                  'Content-Type': 'multipart/form-data',
                  'pinata_api_key': pinataApiKey,
                  'pinata_secret_api_key': pinataSecretApiKey,
              },
          });

          const photoHash = response.data.IpfsHash;
          return photoHash;
      } catch (error) {
          console.error('Error uploading file to Pinata:', error);
          alert('Failed to upload photo');
          return null;
      }
  };

  const handleChange = (e) => {
      setIncidentDetails({ ...incidentDetails, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
      setPhoto(e.target.files[0]);
  };

  return (
      <form onSubmit={handleSubmit}>
          <div className="form-group">
              <label>Date & Time:</label>
              <input
                  type="text"
                  name="dateTime"
                  value={incidentDetails.dateTime}
                  onChange={handleChange}
              />
          </div>

          <div className="form-group">
              <label>Nature of Incident:</label>
              <input
                  type="text"
                  name="natureOfIncident"
                  value={incidentDetails.natureOfIncident}
                  onChange={handleChange}
              />
          </div>

          <div className="form-group">
              <label>Place of Occurrence:</label>
              <input
                  type="text"
                  name="placeOfOccurrence"
                  value={incidentDetails.placeOfOccurrence}
                  onChange={handleChange}
              />
          </div>

          <div className="form-group">
              <label>Description of Incident:</label>
              <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
              />
          </div>

          <div className="form-group">
              <label>Digital Signature:</label>
              <input
                  type="text"
                  value={digitalSignature}
                  onChange={(e) => setDigitalSignature(e.target.value)}
              />
          </div>

          <div className="form-group">
              <label>Evidence:</label>
              <input
                  type="text"
                  value={evidence}
                  onChange={(e) => setEvidence(e.target.value)}
              />
          </div>

          <div className="form-group">
              <label>Upload Photo:</label>
              <input
                  type="file"
                  onChange={handlePhotoChange}
              />
          </div>

          <button type="submit">Submit Case</button>
      </form>
  );
};

export default CaseFile;