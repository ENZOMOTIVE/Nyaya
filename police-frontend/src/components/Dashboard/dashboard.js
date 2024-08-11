import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [cases, setCases] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);

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

    try {
      // Notify the user about FIR registration
      await axios.post('http://localhost:5000/notify-user', { caseId });
      alert('FIR registered and user notified');
    } catch (error) {
      console.error('Error during FIR registration:', error);
      alert('FIR registration failed');
    }
  };

  return (
    <div className="dashboard">
      <h2>Police Dashboard</h2>
      {cases.map((caseData, index) => (
        <div key={caseData.id} className="case-box">
          <div className="case-details">
            <h3>Case #{caseData.id}</h3>
            <p><strong>Incident Date:</strong> {caseData.incidentDetails.dateTime}</p>
            <p><strong>Nature of Incident:</strong> {caseData.incidentDetails.natureOfIncident}</p>
            <p><strong>Place of Occurrence:</strong> {caseData.incidentDetails.placeOfOccurrence}</p>
            <p><strong>Description:</strong> {caseData.description}</p>
            <p><strong>Digital Signature:</strong> {caseData.digitalSignature}</p>
            <p><strong>Evidence:</strong> {caseData.evidence}</p>
          </div>
          <div className="case-actions">
            <button onClick={() => handleViewCase(caseData)}>View Case</button>
            {selectedCase?.id === caseData.id && (
              <button onClick={() => registerFIR(caseData.id)}>Register FIR</button>
            )}
          </div>
        </div>
      ))}
  
      {selectedCase && (
        <div className="selected-case">
          <h3>Case Details</h3>
          <p><strong>Incident Date:</strong> {selectedCase.incidentDetails.dateTime}</p>
          <p><strong>Nature of Incident:</strong> {selectedCase.incidentDetails.natureOfIncident}</p>
          <p><strong>Place of Occurrence:</strong> {selectedCase.incidentDetails.placeOfOccurrence}</p>
          <p><strong>Description:</strong> {selectedCase.description}</p>
          <p><strong>Digital Signature:</strong> {selectedCase.digitalSignature}</p>
          <p><strong>Evidence:</strong> {selectedCase.evidence}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
