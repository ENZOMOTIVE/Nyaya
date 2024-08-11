// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserContract {
    struct Case {
        uint id;
        address user;
        string dateTime;
        string natureOfIncident;
        string placeOfOccurrence;
        string description;
        string digitalSignature;
        string evidence;
        string photoHash;
        bool submitted;
    }
    
    uint public caseCount = 0;
    mapping(uint => Case) public cases;
    
    event CaseSubmitted(
        uint id,
        address user,
        string dateTime,
        string natureOfIncident,
        string placeOfOccurrence,
        string description,
        string digitalSignature,
        string evidence,
        string photoHash
    );

    function submitCase(
        string memory _dateTime,
        string memory _natureOfIncident,
        string memory _placeOfOccurrence,
        string memory _description,
        string memory _digitalSignature,
        string memory _evidence,
        string memory _photoHash
    ) public {
        caseCount++;
        cases[caseCount] = Case(
            caseCount,
            msg.sender,
            _dateTime,
            _natureOfIncident,
            _placeOfOccurrence,
            _description,
            _digitalSignature,
            _evidence,
            _photoHash,
            true
        );
        emit CaseSubmitted(
            caseCount,
            msg.sender,
            _dateTime,
            _natureOfIncident,
            _placeOfOccurrence,
            _description,
            _digitalSignature,
            _evidence,
            _photoHash
        );
    }
}
