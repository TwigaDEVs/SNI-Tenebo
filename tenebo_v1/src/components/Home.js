import Navbar from './Navbar';
import StoredataJSON from "../Storedata.json";
import { useState } from "react";


import React from 'react'

function Home() {

const sampleData =[
    {
        storedData:"no data"
    }
]

const [data, updateData] = useState(sampleData);
const [dataFetched, updateFetched] = useState(false);
const [number, setNmber] = useState("0");

async function get() {
    const ethers = require("ethers");
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    //Pull the deployed contract instance
    let contract = new ethers.Contract(StoredataJSON.address, StoredataJSON.abi, signer)
    let sdata = await contract.get();
    let csdata = sdata.toNumber()

    setNmber(csdata)
    updateFetched(true);
    updateData(sdata);

}

if(!dataFetched)
    get();

  return (
    
    <div >
        <Navbar></Navbar>
        <div  className="flex flex-col place-items-center mt-20 ">
            Home
            
        </div>

        <div className="flex flex-col place-items-center mt-20">
        <strong className="text-xl">{number}</strong>
        </div>
        
        
    </div>
  )
}

export default Home