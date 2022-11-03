// SPDX-License-Identifier: UNLICENCED

pragma solidity ^0.8.9;

/**
* Tenebo Contract
*/
contract Tenebo {

   // struct to store marafiki details
    struct Marafiki {
         uint userId; // id will autogenerate
         string fullName;
         address username; // username becomes the ERC Address
         string image;
         string[] social_media_links;
         uint256 timestamp;
    }

    Marafiki[] public users; // array to store All marafiki users
    uint public userId; 
    // userId variable made visible in public and also a state variable


    constructor(){
       // initializing the userId to start with 1
       userId = 1;
    }


   // function to add adopter info
   // it takes fullName and the username as the parameters
    function addAdopterInfo(
        string memory _fullName,
        address _username,
        string memory _image,
        string[] memory _social_media_links


    ) public{
       // pushing to the adopter's data
       users.push(Marafiki(userId, _fullName, _username, _image, _social_media_links, block.timestamp));
       userId++;
    }

   // function to return adopter info
   function getAdopter(uint _id) public view returns (uint, string memory, address) {
      // calling the find adopter with the ID parameter
      // reverts the contract to the original state no ID is found
      uint i = findAdopter(_id);

      // returns the user info after assuming the search went successful 
      return (
         users[i].userId,
         users[i].fullName, 
         users[i].username
      );
    }

   // function to find the adopter id;
    function findAdopter(uint _id) internal view returns (uint){
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
    function updateAdopter(uint _userId, string memory _fullName, string memory _image, string[] memory _social_media_links)public{
       uint i = findAdopter(_userId);
       users[i].fullName = _fullName;
       users[i].image = _image;
       users[i].social_media_links = _social_media_links;
    }

   // deleter adopter info
    function deleteAdopter(uint _id) public {
       uint i = _id;
       delete users[i];
    }
}
