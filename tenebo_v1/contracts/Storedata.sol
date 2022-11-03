// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Storedata {
    uint storedData = 10;

    struct Boma {
        string ipfsHash;        // IPFS hash
        string title;           // Image title
        string description;     // Image description
        string tags;            // Image tags in comma separated format
        uint256 uploadedOn;     // Uploaded timestamp
    }
    function set(uint x) public {
        storedData = x;
    }
    function get() public view returns (uint) {
        return storedData;
    }
    
}