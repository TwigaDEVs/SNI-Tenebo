import marafiki from "./marafiki.png";
import Navbar from "./Navbar";
import StoredataJSON from "../Storedata.json";
import { useState } from "react";
import { Link } from "react-router-dom";

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
        <div className="mb-2">
            <Navbar></Navbar>
            <div className="w-full bg-[url('./leig.jpg')] bg-cover bg-center">
                <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                    <div>
                        <div className="flex items-center justify-between py-3 md:py-5 md:block">
                            <br />
                            <br />
                            <br />
                            <br />
                            <h1 className="text-3xl py-2 font-bold text-white">
                                Adopt a predator to save a predator
                            </h1>
                            <p className="py-2 text-white">
                                the role you play goes a long way. find out how
                            </p>
                            <button
                                type="button"
                                className="inline-block px-6 py-2 border-2 border-gray-200 text-gray-200 leading-tight font-extrabold rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                            >
                                <Link to="/adoptions" className="text-gray-200">
                                    Let's Go !!!
                                </Link>
                            </button>
                        </div>
                        <br />
                        <br />
                        <br />
                    </div>
                </div>
            </div>
            <div className="bg-gradient-to-r from-indigo-100">
                <div>
                    <div className="text-blue flex flex-col place-items-center flex-wrap">
                        <br />
                        <br />
                        <img
                            src={marafiki}
                            className="rounded-full w-40 h-40"
                        />
                        <br />
                        {/*<h1>Hello world</h1>*/}
                        <p className="p-2">
                            We use Proceeds from Mara Predator Adoption NFTs, to
                            subsidize the reinforcement of Maasai Bomas
                            (Livestock Enclosure). Making the Maasai the Mara
                            Happy and Mara predators safe from Human Conflict
                            !!!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
