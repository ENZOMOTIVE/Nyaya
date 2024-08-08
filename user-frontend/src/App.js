import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
        toast.success('Wallet connected!');
      } catch (error) {
        console.error('Failed to connect wallet:', error);
        toast.error('Failed to connect wallet');
      }
    } else {
      toast.error('Please install MetaMask');
    }
  };

  const disconnectWallet = () => {
    setWalletAddress('');
  };

  const truncateAddress = (address) => {
    if (address.length > 12) {
      return `${address.slice(0, 6)}...${address.slice(-4)}`;
    }
    return address;
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <Link to="/">Home</Link>
            <Link to="/casefile">File Case</Link>
          </nav>
          <Routes>
            <Route
              path="/"
              element={
                <WelcomePage
                  connectWallet={connectWallet}
                  disconnectWallet={disconnectWallet}
                  walletAddress={walletAddress}
                  truncateAddress={truncateAddress}
                />
              }
            />
            <Route path="/casefile" element={<FileCasePage />} />
            <Route path="/submit" element={<SubmitPage />} />
          </Routes>
        </header>
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnHover draggable />
      </div>
    </Router>
  );
}

export default App;
