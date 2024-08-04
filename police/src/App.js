import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import FIRSystemABI from './FIRSystemABI.json'; // Ensure this is the correct path

const FIRSystemAddress = 'YOUR_DEPLOYED_CONTRACT_ADDRESS';

function App() {
    const [cases, setCases] = useState([]);
    const [firSystem, setFIRSystem] = useState(null);

    // Load cases when the component mounts
    useEffect(() => {
        const loadCases = async () => {
            // Connect to Ethereum provider and contract
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(FIRSystemAddress, FIRSystemABI, provider);
            setFIRSystem(contract);

            // Get the number of cases and load cases that are not filed yet
            const caseCount = await contract.caseCount();
            let casesArray = [];
            for (let i = 1; i <= caseCount; i++) {
                const c = await contract.getCase(i);
                if (!c.isFiled) {
                    casesArray.push(c);
                }
            }
            setCases(casesArray);
        };

        loadCases();
    }, []);

    // Approve the case by updating the blockchain
    const approveCase = async (caseId) => {
        if (!firSystem) return;
        const signer = firSystem.connect(new ethers.providers.Web3Provider(window.ethereum).getSigner());
        const tx = await signer.approveCase(caseId);
        await tx.wait();
        setCases(cases.filter(c => c.id !== caseId)); // Update state to remove the approved case
    };

    return (
        <div>
            <h1>Police Dashboard</h1>
            {cases.length === 0 ? (
                <p>No cases to review.</p>
            ) : (
                <ul>
                    {cases.map((c, index) => (
                        <li key={index} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
                            <p><strong>Case ID:</strong> {c.id.toString()}</p>
                            <p><strong>Name:</strong> {c.name}</p>
                            <p><strong>Details:</strong> {c.details}</p>
                            <button onClick={() => approveCase(c.id.toString())}>Approve</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default App;
