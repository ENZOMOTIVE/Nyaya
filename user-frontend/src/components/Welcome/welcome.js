import React from 'react';

const WelcomePage = ({ connectWallet, disconnectWallet, walletAddress, truncateAddress }) => (
  <div>
    <h1>Welcome to the FIR Filing System</h1>
    {walletAddress ? (
      <div>
        <p>Wallet Address: {truncateAddress(walletAddress)}</p>
        <button onClick={disconnectWallet}>Disconnect</button>
      </div>
    ) : (
      <button onClick={connectWallet}>Connect Wallet</button>
    )}
  </div>
);

export default WelcomePage;
