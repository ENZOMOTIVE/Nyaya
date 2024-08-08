import React from 'react';
import './WelcomePage.css'; // Import the CSS file for styling

const WelcomePage = ({ connectWallet, disconnectWallet, walletAddress, truncateAddress }) => (
  <div className="welcome-page">
    <div className="content">
      <h1>FIR Filing System</h1>
      <p>Welcome to the FIR Filing System.<br />File your First Information Report securely on the blockchain.</p>
      
      {walletAddress ? (
        <div>
          <p>Wallet Address: {truncateAddress(walletAddress)}</p>
          <button className="disconnect-wallet" onClick={disconnectWallet}>Disconnect</button>
        </div>
      ) : (
        <button className="connect-wallet" onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>

    <div className="image-container">
      <img src="path/to/environment_image.png" alt="Environment" />
    </div>
  </div>
);

export default WelcomePage;
