import React from 'react';
import './WelcomePage.css'; // Import the CSS file for styling
import Image from './logo.png'; // Import the image

const WelcomePage = ({ connectWallet, disconnectWallet, walletAddress, truncateAddress }) => (
  <div>
    
    <div className="welcome-page">
      <div className="content-container">
        <div className="content">
          <h1>Nyaya</h1>
          <p>FIR Filing with anonymous ID</p>
          <br />
          <p>File your First Information Report securely on the blockchain.</p>
          
          {walletAddress ? (
            <div>
              <button className="disconnect-wallet" onClick={disconnectWallet}>Disconnect</button>
              <p className="wallet-address">Wallet Address: {truncateAddress(walletAddress)}</p>
            </div>
          ) : (
            <button className="connect-wallet" onClick={connectWallet}>Connect Wallet</button>
          )}
        </div>

        <div className="image-container">
          <img src={Image} alt="Environment" />
        </div>
      </div>
    </div>

    {/* Features Section */}
    <section className="features-section">
      <h2>Features</h2>
      <div className="feature-box">
        <h3>Secure FIR Filing</h3>
        <p>File your FIR securely on the blockchain, ensuring data integrity and privacy.</p>
      </div>
      <div className="feature-box">
        <h3>Anonymous ID</h3>
        <p>Protect your identity while filing complaints using an anonymous ID.</p>
      </div>
      <div className="feature-box">
        <h3>Real-time Status Updates</h3>
        <p>Get real-time updates on the status of your FIR and case processing.</p>
      </div>
      <div className="feature-box">
        <h3>Easy Wallet Integration</h3>
        <p>Seamlessly connect your wallet to manage your FIR filings and updates.</p>
      </div>
      <div className="feature-box">
        <h3>Efficient Case Management</h3>
        <p>Manage and track your cases efficiently through our platform.</p>
      </div>

    </section>
    <p>Made with ❤️ by Aayushman</p>
  </div>
);

export default WelcomePage;
