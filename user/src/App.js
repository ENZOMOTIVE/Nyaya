import React, { useState } from 'react';
import { ethers } from 'ethers';
import FIRSystemABI from './FIRSystemABI.json';

//const FIRSystemAddress = 'YOUR_DEPLOYED_CONTRACT_ADDRESS';

function App() {
    const [account, setAccount] = useState(null);
    const [firSystem, setFIRSystem] = useState(null);

    const connectWallet = async () => {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setAccount(accounts[0]);
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(FIRSystemAddress, FIRSystemABI, signer);
            setFIRSystem(contract);
        }
    };

    return (
        <div>
            <h1>Welcome to the FIR System</h1>
            <button onClick={connectWallet}>Connect Wallet</button>
            {account && <FileCasePage firSystem={firSystem} />}
        </div>
    );
}

function FileCasePage({ firSystem }) {
    const [name, setName] = useState('');
    const [details, setDetails] = useState('');

    const fileCase = async (e) => {
        e.preventDefault();
        if (!firSystem) return;
        const tx = await firSystem.fileCase(name, details);
        await tx.wait();
        alert("Case filed successfully");
    };

    return (
        <form onSubmit={fileCase}>
            <input
                type="text"
                placeholder="Case Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <textarea
                placeholder="Case Details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
            ></textarea>
            <button type="submit">Submit</button>
        </form>
    );
}

export default App;
