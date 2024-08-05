// src/components/SubmitPage.js
import React from 'react';
import axios from 'axios';

const SubmitPage = () => {
  const sendToPolice = async () => {
    await axios.post('http://localhost:5000/send-case', { caseId: caseId });
  };

  return (
    <div>
      <h2>Case Submitted</h2>
      <button onClick={sendToPolice}>Send to Police</button>
    </div>
  );
};

export default SubmitPage;
