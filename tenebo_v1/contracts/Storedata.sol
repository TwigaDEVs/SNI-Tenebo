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
    string[] public levels;
    uint public partner_id;
    uint public offer_id;
    uint public voter_id;
 
   
    // userId variable made visible in public and also a state variable


    constructor(){
       // initializing the userId to start with 1
       userId = 1;
       rafikiCount=0;
       liong_id = 1;
       boma_id = 1;
       partner_id =1;
       offer_id = 1;
       voter_id = 1;
      
     
       // African lions, leopards, rhinoceros, elephants, and Cape buffalo
       levels = ["Level 1","Level 2","Level 3","Level 4","Level 5"];
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

   struct Partner{
      uint partner_id;
      string name;
      string description;
      string partnerImage;
   }

   Partner[] public partner;


   struct Offer{
      uint offer_id;
      string partner_name;
      string offer_name;
      string offer_description;
      string offer_image;
      string offer_level;
   }

   Offer[] public offer;

   struct Candidates{
      uint cand_id;
      uint256 voteCount;

   }

   Candidates[] public candidates;


   struct Voter{

      address voter_adress;

   }

   Voter[] public voter;

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


   function getLevel() public view returns(string[] memory){
         return levels;
    }

      // uint partner_id;
      // string name;
      // string description;
      // string partnerImage;
   
   function addPartner(
        string memory _name,
        string memory _description,
        string memory _partnerImage       
   
    ) public{
       // pushing to the adopter's data
       partner.push(Partner(partner_id,_name,_description,_partnerImage));
       partner_id++;
    }

   function getPartner(uint _id) public view returns (uint, string memory, string memory,string memory) {
      // calling the find adopter with the ID parameter
      // reverts the contract to the original state no ID is found
      uint i = findPartner(_id);

      // returns the user info after assuming the search went successful 
      return (
         partner[i].partner_id,
         partner[i].name, 
         partner[i].description,
         partner[i].partnerImage
         
      );
    }

 // function to find the adopter id;
    function findPartner(uint _id) public view returns (uint){
      // assigning a local counter variable to track the number of users
      uint counter;

      // looping through all users stored in the array
      for (uint i = 0; i < partner.length; i++) {
         //suppose the user is found
         if(partner[i].partner_id == _id){

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

   function updatePartner(uint _partner_id, string memory _name, string memory _description, string memory _partnerImage)public{
       uint i = findPartner(_partner_id);
       partner[i].name = _name;
       partner[i].description = _description;
       partner[i].partnerImage = _partnerImage;
  
    }

    function getAllPartners() public view returns(Partner[] memory){
      return partner;
    }

   // deleter adopter info
    function deletePartner(uint _id) public {
       uint i = _id;
       delete partner[i];


    }  

      // string partner;
      // string offer_name;
      // string offer_description;
      // string offer_image;
 
   function addOffer(
        string memory _partner_name,
        string memory _offer_name,
        string memory _offer_description,
        string memory _offer_image,
        string memory _offer_level    
   
    ) public{
       // pushing to the adopter's data
       offer.push(Offer(offer_id,_partner_name,_offer_name,_offer_description,_offer_image,_offer_level));
       offer_id++;
    }

   function getOffer(uint _id) public view returns (uint, string memory, string memory,string memory,string memory,string memory ) {
      // calling the find adopter with the ID parameter
      // reverts the contract to the original state no ID is found
      uint i = findOffer(_id);

      // returns the user info after assuming the search went successful 
      return (
         offer[i].offer_id,
         offer[i].partner_name,
         offer[i].offer_name, 
         offer[i].offer_description,
         offer[i].offer_image,
         offer[i].offer_level
         
      );
    }

 // function to find the adopter id;
    function findOffer(uint _id) public view returns (uint){
      // assigning a local counter variable to track the number of users
      uint counter;

      // looping through all users stored in the array
      for (uint i = 0; i < offer.length; i++) {
         //suppose the user is found
         if(offer[i].offer_id == _id){

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

   function updateOffer(uint _offer_id,string memory _partner_name, string memory _offer_name, string memory _offer_description, string memory _offer_image,string memory _offer_level)public{
       uint i = findOffer(_offer_id);
       offer[i].partner_name = _partner_name;
       offer[i].offer_name = _offer_name;
       offer[i].offer_description = _offer_description;
       offer[i].offer_image = _offer_image;
       offer[i].offer_level = _offer_level;
  
    }

    function getAllOffers() public view returns(Offer[] memory){
      return offer;
    }

   // deleter adopter info
    function deleteOffer(uint _id) public {
       uint i = _id;
       delete offer[i];


    }  

   function addCandidate(
        uint _cand_id,
        uint256 _vote_count
      
    ) public{
       // pushing to the adopter's data
       candidates.push(Candidates(_cand_id,_vote_count));

    }

       function getCandidate(uint _id) public view returns (uint, uint256) {
      // calling the find adopter with the ID parameter
      // reverts the contract to the original state no ID is found
      uint i = findCandidate(_id);

      // returns the user info after assuming the search went successful 
      return (
         candidates[i].cand_id,
         candidates[i].voteCount
      
      );
    }

 // function to find the adopter id;
    function findCandidate(uint _id) public view returns (uint){
      // assigning a local counter variable to track the number of users
      uint counter;

      // looping through all users stored in the array
      for (uint i = 0; i < candidates.length; i++) {
         //suppose the user is found
         if(candidates[i].cand_id == _id){

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


function getAllCandidates() public view returns(Candidates[] memory){
      return candidates;
    }

       // deleter adopter info
    function deleteCanditate(uint _id) public {
       uint i = _id;
       delete candidates[i];


    } 
      // uint voter_id;
      // uint voter_adress;
      // uint voter_allowed;
      // bool voter_voted;
      // uint voter_vote;


   
function getAllVoters() public view returns(Voter[] memory){
      return voter;
    }

function voteCandidate(uint _id) public{
   voter.push(Voter(msg.sender));
   updateCandidateVote(_id);

}

function updateCandidateVote(uint _cand_id)public returns(uint256){
       uint i = findCandidate(_cand_id);
       uint256 current_vote = candidates[i].voteCount;
       uint256 new_vote = current_vote ++;
       candidates[i].voteCount = new_vote;
       return new_vote;
 
    }
function getVotes(uint _id) public view returns(uint256){
         uint i = findCandidate(_id);

      // returns the user info after assuming the search went successful 
      return (
         candidates[i].voteCount
      
      );
}

}