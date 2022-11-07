import Navbar from "./Navbar";
import NFTTile from "./NFTTile";
import DefaultTile from "./DefaultTile"
import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import { useState } from "react";
import Web3 from "web3";
import timon from "./timon.jpeg"
import conleo from "./conleo.png";
import conlio from "./conlio.png";
import conyn from "./conyn.png";

export default function Marketplace() {

const sampleData = [
    {
        "name": "NFT#1",
        "description": "Mara-SNI  First Adoption NFT",
        "website":"https://sovereignnature.com/",
        "image":conleo,
        "price":"0.03ETH",
        "currentlySelling":"True",
        "address":"0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13",
    },
    {
        "name": "NFT#2",
        "description": "Mara-SNI  second Adoption NFT",
        "website":"https://sovereignnature.com/",
        "image":conlio,
        "price":"0.03ETH",
        "currentlySelling":"True",
        "address":"0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
    },
    {
        "name": "NFT#3",
        "description": "Mara-SNI  third Adoption NFT",
        "website":"https://sovereignnature.com/",
        "image":conyn,
        "price":"0.03ETH",
        "currentlySelling":"True",
        "address":"0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
    },
];
const tbalance = "no balance"
const [connect,updateStatus] = useState(" Click Connect wallet to start")
const [data, updateData] = useState(sampleData);
const [dataFetched, updateFetched] = useState(false);

const [balance, updateBalnceData] = useState(tbalance);


const [tdata, updateTeneboData] = useState(tbalance);
const [tdataFetched, updateFetchedTeneboaData] = useState(false);

async function getAllNFTs() {
    const ethers = require("ethers");
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    //Pull the deployed contract instance
    let contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer)
    //create an NFT Token
    let transaction = await contract.getAllNFTs()

    //Fetch all the details of every NFT from the contract and display
    const items = await Promise.all(transaction.map(async i => {
        const tokenURI = await contract.tokenURI(i.tokenId);
        let meta = await axios.get(tokenURI);
        meta = meta.data;

        let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
        let item = {
            price,
            tokenId: i.tokenId.toNumber(),
            seller: i.seller,
            owner: i.owner,
            image: meta.image,
            name: meta.name,
            description: meta.description,
        }
        return item;
    }))

    updateFetched(true);
    updateData(items);
    updateStatus("")
}

// flex mt-5 justify-between flex-wrap max-w-screen-xl text-center

if(!dataFetched)
    getAllNFTs();

    async function getBalance() {

        const ethers = require("ethers");
        var Web3 = require('web3');
        //After adding your Hardhat network to your metamask, this code will get providers and signers
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        //Pull the deployed contract instance
        let contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer)
        let teneboData = await contract.getBalance();
        let bal = teneboData[0].toString()

        
        const etherValue = Web3.utils.fromWei(bal, 'ether');

  
        updateBalnceData(etherValue)
        updateFetchedTeneboaData(true);
        updateTeneboData(teneboData);
  
    }
      if(!tdataFetched)
      getBalance();

return (
    <div>
        <Navbar></Navbar>
        <div className="flex flex-col place-items-center mt-15 ">
            <div className="md:text-xl font-bold text-black">
                Listed for Adoption
            </div>
            
            {/* <div className="md:text-xl font-bold text-black flex flex-row">
            <p>Funds Raised: </p>
                <p className="text-cyan-700 px-2"> {balance}</p>
            </div>
            <div className="md:text-xl font-bold text-black flex flex-row">
                <p > account: </p>
                <p className="text-cyan-700 px-2">{tdata[1]}</p>
            </div> */}

            <div className="p-2 text-green-500 text-xs">
                <p> {connect}</p>
            </div>
            

            <div className="flex mt-5 justify-center flex-wrap max-w-screen-xl text-center ml-3">
                {data.map((value, index) => {
                    if (connect === ""){
                        return <NFTTile data={value} key={index} ></NFTTile>;
                    } 
                    else{
                        return <DefaultTile data={value} key={index} ></DefaultTile>;
                    }
                    
                })}
            </div>
        </div>            
    </div>
);

}