import React from 'react'
import Navbar from './Navbar'
import { useState } from "react";

import StoredataJSON from "../Storedata.json";



function Vote() {

    const sampleData =[
        {
            storedData:"No voting Underway ...."
        }]


    const [candD,updateCandidateData] = useState(sampleData)
    const [can,updateFetchedCandidateData] = useState(false)

    async function getAllCandidates() {
  
        const ethers = require("ethers");
        //After adding your Hardhat network to your metamask, this code will get providers and signers
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        //Pull the deployed contract instance
        let contract = new ethers.Contract(StoredataJSON.address, StoredataJSON.abi, signer)
        let candData = await contract.getAllCandidates();
  
      
        updateFetchedCandidateData(true);
        updateCandidateData(candData);
  
    }
      if(!can)
      getAllCandidates();

  return (
    <div>
        <Navbar></Navbar>
        <div className="flex flex-col place-items-center font-semibold p-5 text-gray-500 text-3xl">
                Vote
        </div>
        <div>
        {candD.map(cand => (
                <div className='flex flex-col text-center items-center mt-11 text-cyan-600'>

                    <div>
                        <p> Boma ID:  //</p>
                    </div>

                    <div>
                        <p> Vote Count: {cand[1]}</p>
                    </div>

                </div>
            ))}
        </div>
    </div>
  )
}

export default Vote