import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css'; // Ensure to import the CSS file

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
    setSelectedCase(selectedCase?.id === caseData.id ? null : caseData);
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
      <h2 className="dashboard-title">Police Dashboard</h2>
      <div className="cases-container">
        {cases.map((caseData) => (
          <div key={caseData.id} className="case-box">
            <div className="case-summary">
              <h3>Case #{caseData.id}</h3>
              <p><strong>Date:</strong> {caseData.incidentDetails.dateTime}</p>
              <p><strong>Nature:</strong> {caseData.incidentDetails.natureOfIncident}</p>
              <p><strong>Place:</strong> {caseData.incidentDetails.placeOfOccurrence}</p>
              <button onClick={() => handleViewCase(caseData)} className="view-case-button">
                {selectedCase?.id === caseData.id ? 'Hide Details' : 'View Details'}
              </button>
              {selectedCase?.id === caseData.id && (
                <div className="case-details">
                  <p><strong>Description:</strong> {caseData.description}</p>
                  <p><strong>Digital Signature:</strong> {caseData.digitalSignature}</p>
                  <p><strong>Evidence:</strong> {caseData.evidence}</p>
                  <button onClick={() => registerFIR(caseData.id)} className="register-fir-button">
                    Register FIR
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
