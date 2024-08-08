import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import WelcomePage from './components/Welcome/welcome';
import FileCasePage from './components/CaseFile/casefile';
import SubmitPage from './components/Submit/submit';
import './App.css';

function App() {
  const [walletAddress, setWalletAddress] = useState('');

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts[0]);
        // Show notification
        alert('Wallet connected!');
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    } else {
      alert('Please install MetaMask');
    }
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <Link to="/">Home</Link>
            <Link to="/casefile">File Case</Link>
            {walletAddress ? (
              <p>Wallet Address: {walletAddress}</p>
            ) : (
              <button onClick={connectWallet}>Connect Wallet</button>
            )}
          </nav>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/casefile" element={<FileCasePage />} />
            <Route path="/submit" element={<SubmitPage />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
