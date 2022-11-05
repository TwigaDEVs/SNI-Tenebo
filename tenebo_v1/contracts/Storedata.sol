// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Storedata {
    uint storedData = 10;

   // struct to store marafiki details
    struct Marafiki {
         uint userId; // id will autogenerate
         string fullName;
         address username; // username becomes the ERC Address
         string ipfshash;
         string social_media_link;
         uint256 timestamp;
    }

    Marafiki[] public users; // array to store All marafiki users
    uint public userId; 
    uint public rafikiCount;
    uint public liong_id; 
    uint public boma_id;
    // userId variable made visible in public and also a state variable


    constructor(){
       // initializing the userId to start with 1
       userId = 1;
       rafikiCount=0;
       liong_id = 1;
       boma_id = 1;
    }
    struct Boma {
        uint boma_id;        // IPFS hash
        string owner;           // Image title
        string conservancy; 
        string imageHash;    // Image description
        string state;            // Image tags in comma separated format
                     // Uploaded timestamp
    }
    
    Boma[] public bomas;

      struct LionGuardian{
            uint liong_id;
            string name;
            address username;
            string  imageiphash;

        }
      
       LionGuardian[] public guardians;

    function set(uint x) public {
        storedData = x;
    }
    function get() public view returns (uint) {
        return storedData;
    }

    
   // function to add adopter info
   // it takes fullName and the username as the parameters
    function addAdopterInfo(
        string memory _fullName,
        address _username,
        string memory _ipfshash,
        string memory _social_media_link


    ) public{
       // pushing to the adopter's data
       users.push(Marafiki(userId, _fullName, _username, _ipfshash, _social_media_link, block.timestamp));
       userId++;
    }

   // function to return adopter info
   function getAdopter(uint _id) public view returns (uint, string memory, address,string memory) {
      // calling the find adopter with the ID parameter
      // reverts the contract to the original state no ID is found
      uint i = findAdopter(_id);

      // returns the user info after assuming the search went successful 
      return (
         users[i].userId,
         users[i].fullName, 
         users[i].username,
         users[i].ipfshash
      );
    }

   // function to find the adopter id;
    function findAdopter(uint _id) public view returns (uint){
      // assigning a local counter variable to track the number of users
      uint counter;

      // looping through all users stored in the array
      for (uint i = 0; i < users.length; i++) {
         //suppose the user is found
         if(users[i].userId == _id){

            //increment the counter
            counter++;
            return i; // return the found integer
         }
      }

      if (counter < 1){
         // revert to default state suppose no user is found
         revert("user does not exist"); 
     
      }

      
    }

   // function to update adopter details using the parameters
    function updateAdopter(uint _userId, string memory _fullName, string memory _ipfshash, string memory _social_media_link)public{
       uint i = findAdopter(_userId);
       users[i].fullName = _fullName;
       users[i].ipfshash = _ipfshash;
       users[i].social_media_link = _social_media_link;
    }

    function getAllUsers() public view returns(Marafiki[] memory){
      return users;
    }

   // deleter adopter info
    function deleteAdopter(uint _id) public {
       uint i = _id;
       delete users[i];


    }


   function addLionGuardian(
        string memory _name,
        address _username,
        string memory _imageiphash
   
    ) public{
       // pushing to the adopter's data
       guardians.push(LionGuardian(liong_id, _name, _username, _imageiphash));
       liong_id++;
    }

   function getLionGuardian(uint _id) public view returns (uint, string memory, address,string memory) {
      // calling the find adopter with the ID parameter
      // reverts the contract to the original state no ID is found
      uint i = findLionGuardian(_id);

      // returns the user info after assuming the search went successful 
      return (
         guardians[i].liong_id,
         guardians[i].name, 
         guardians[i].username,
         guardians[i].imageiphash
      );
    }

 // function to find the adopter id;
    function findLionGuardian(uint _id) public view returns (uint){
      // assigning a local counter variable to track the number of users
      uint counter;

      // looping through all users stored in the array
      for (uint i = 0; i < guardians.length; i++) {
         //suppose the user is found
         if(guardians[i].liong_id == _id){

            //increment the counter
            counter++;
            return i; // return the found integer
         }
      }

      if (counter < 1){
         // revert to default state suppose no user is found
         revert("user does not exist"); 
     
      }

      
    }

   function updateAdopter(uint _liong_id, string memory _name, address _username, string memory _imageiphash)public{
       uint i = findLionGuardian(_liong_id);
       guardians[i].name = _name;
       guardians[i].username = _username;
       guardians[i].imageiphash = _imageiphash;
    }

    function getAllLionGuardians() public view returns(LionGuardian[] memory){
      return guardians;
    }

   // deleter adopter info
    function deleteLionGuardian(uint _id) public {
       uint i = _id;
       delete guardians[i];


    }

     function addBoma(
        string memory _owner,
        string memory _conservancy,
        string memory _state,
        string memory _imageHash
        
   
    ) public{
       // pushing to the adopter's data
       bomas.push(Boma(boma_id, _owner,_conservancy, _imageHash, _state));
       boma_id++;
    }

   function getBoma(uint _id) public view returns (uint, string memory, string memory,string memory,string memory) {
      // calling the find adopter with the ID parameter
      // reverts the contract to the original state no ID is found
      uint i = findBoma(_id);

      // returns the user info after assuming the search went successful 
      return (
         bomas[i].boma_id,
         bomas[i].owner, 
         bomas[i].conservancy,
         bomas[i].state,
         bomas[i].imageHash
      );
    }

 // function to find the adopter id;
    function findBoma(uint _id) public view returns (uint){
      // assigning a local counter variable to track the number of users
      uint counter;

      // looping through all users stored in the array
      for (uint i = 0; i < bomas.length; i++) {
         //suppose the user is found
         if(bomas[i].boma_id == _id){

            //increment the counter
            counter++;
            return i; // return the found integer
         }
      }

      if (counter < 1){
         // revert to default state suppose no user is found
         revert("user does not exist"); 
     
      }

      
    }

   function updateBoma(uint _boma_id, string memory _owner, string memory _conservancy, string memory _state, string memory _imageHash)public{
       uint i = findBoma(_boma_id);
       bomas[i].owner = _owner;
       bomas[i].conservancy = _conservancy;
       bomas[i].state = _state;
       bomas[i].imageHash = _imageHash;
    }

    function getAllBomas() public view returns(Boma[] memory){
      return bomas;
    }

   // deleter adopter info
    function deleteBoma(uint _id) public {
       uint i = _id;
       delete bomas[i];


    }  
}