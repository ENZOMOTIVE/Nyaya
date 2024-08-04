// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PoliceContract {
    struct FIR {
        uint id;
        uint caseId;
        address officer;
        bool registered;
    }

    uint public firCount = 0;
    mapping(uint => FIR) public firs;

    event FIRRegistered(uint id, uint caseId, address officer);

    function registerFIR(uint _caseId) public {
        firCount++;
        firs[firCount] = FIR(firCount, _caseId, msg.sender, true);
        emit FIRRegistered(firCount, _caseId, msg.sender);
    }
}
