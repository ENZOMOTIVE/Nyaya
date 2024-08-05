import React, { useState } from 'react';
import WelcomePage from './components/Welcome/welcome';
import FileCasePage from './components/CaseFile/casefile';
import SubmitPage from './components/Submit/submit';
import './App.css';

function App() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        {!submitted ? (
          <>
            <WelcomePage />
            <FileCasePage setSubmitted={setSubmitted} />
          </>
        ) : (
          <SubmitPage />
        )}
      </header>
    </div>
  );
}

export default App;
