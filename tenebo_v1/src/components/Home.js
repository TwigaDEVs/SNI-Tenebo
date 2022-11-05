import Navbar from "./Navbar";
import StoredataJSON from "../Storedata.json";
import { useState } from "react";

import React from "react";

function Home() {
    const sampleData = [
        {
            storedData: "no data",
        },
    ];

    const [data, updateData] = useState(sampleData);
    const [dataFetched, updateFetched] = useState(false);
    const [number, setNmber] = useState("0");

    async function get() {
        const ethers = require("ethers");
        //After adding your Hardhat network to your metamask, this code will get providers and signers
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        //Pull the deployed contract instance
        let contract = new ethers.Contract(
            StoredataJSON.address,
            StoredataJSON.abi,
            signer
        );
        let sdata = await contract.get();
        let csdata = sdata.toNumber();

        setNmber(csdata);
        updateFetched(true);
        updateData(sdata);
    }

    if (!dataFetched) get();

    return (
        <div>
            <Navbar></Navbar>
            <div className="w-full bg-[url('./leig.jpg')]">
                <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                    <div>
                        <div className="flex items-center justify-between py-3 md:py-5 md:block">
                        <br />
                        <br />
                        <br />
                        <br />
                            <h1 className="text-3xl py-2 font-bold text-white">The security of our predators start with us</h1>
                            <p className="py-2 text-white">Trying to  solve the problem of human wildlife conflict</p>
                            <button className="py-2 bg-transparent hover:bg-blue-500 text-white-700 font-semibold hover:text-white py-2 px-4 border border-white-500 hover:border-transparent rounded">Get Started</button>
                        </div>
                        <br />
                        <br />
                        <br />
                    </div>
                </div>
            </div>
        </div>
        
        

  )
}

export default Home