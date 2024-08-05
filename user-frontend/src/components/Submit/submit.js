import React, { useState } from 'react';
import axios from 'axios';

const SubmitPage = () => {
  // Define the caseId state
  const [caseId, setCaseId] = useState('');

  const sendToPolice = async () => {
    try {
      await axios.post('http://localhost:5000/send-case', { caseId: caseId });
      alert('Case sent to police successfully!');
    } catch (error) {
      console.error('Error sending case:', error);
      alert('Failed to send case to police.');
    }
  };

  return (
    <div>
      <h2>Case Submitted</h2>
      {/* Assuming you need to input or set caseId before sending */}
      <input 
        type="text" 
        value={caseId} 
        onChange={(e) => setCaseId(e.target.value)} 
        placeholder="Enter Case ID"
      />
      <button onClick={sendToPolice}>Send to Police</button>
    </div>
  );
};

export default SubmitPage;
