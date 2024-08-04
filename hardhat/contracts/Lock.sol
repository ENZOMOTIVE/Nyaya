// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FIRSystem {
    struct Case {
        uint id;
        string name;
        string details;
        address filedBy;
        bool isFiled;
    }

    mapping(uint => Case) public cases;
    uint public caseCount;

    event CaseFiled(uint id, string name, string details, address filedBy);
    event CaseApproved(uint id);

    function fileCase(string memory _name, string memory _details) public {
        caseCount++;
        cases[caseCount] = Case(caseCount, _name, _details, msg.sender, false);
        emit CaseFiled(caseCount, _name, _details, msg.sender);
    }

    function approveCase(uint _id) public {
        require(_id > 0 && _id <= caseCount, "Invalid case ID");
        require(!cases[_id].isFiled, "Case already filed");

        cases[_id].isFiled = true;
        emit CaseApproved(_id);
    }

    function getCase(uint _id) public view returns (Case memory) {
        return cases[_id];
    }
}
