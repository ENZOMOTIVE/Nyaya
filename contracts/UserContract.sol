
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserContract {
    struct Case {
        uint id;
        address user;
        string details;
        string evidence;
        bool submitted;
    }
    
    uint public caseCount = 0;
    mapping(uint => Case) public cases;
    
    event CaseSubmitted(uint id, address user, string details, string evidence);

    function submitCase(string memory _details, string memory _evidence) public {
        caseCount++;
        cases[caseCount] = Case(caseCount, msg.sender, _details, _evidence, true);
        emit CaseSubmitted(caseCount, msg.sender, _details, _evidence);
    }
}
