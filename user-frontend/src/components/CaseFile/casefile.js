import React, { useState } from 'react';
import { ethers } from 'ethers'; // Correct import statement
import axios from 'axios';
import './casefile.css';

const UserContractABI =[
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
        "name": "dateTime",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "natureOfIncident",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "placeOfOccurrence",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "digitalSignature",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "evidence",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "photoHash",
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
        "name": "dateTime",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "natureOfIncident",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "placeOfOccurrence",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "digitalSignature",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "evidence",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "photoHash",
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
        "name": "_dateTime",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_natureOfIncident",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_placeOfOccurrence",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_description",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_digitalSignature",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_evidence",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_photoHash",
        "type": "string"
      }
    ],
    "name": "submitCase",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];  
const UserContractAddress = '0xE6Cacbf03319ABB3e19C97943705D8DA1f57e934'; // Replace with your contract address
const pinataApiKey = '88ed209b792a500230ad'; // Replace with your Pinata API key
const pinataSecretApiKey = '92bc59c9db47bb18cde9f5fad9c89e3aa8c338a537171b51c2bf4d77efc8e28c'; // Replace with your Pinata secret API key

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