import React from 'react';
import Navbar from './Navbar';
import { useState } from "react";
import Modal from 'react-modal';
import StoredataJSON from "../Storedata.json";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../pinata";
import axios from "axios";
import MarketplaceJSON from "../Marketplace.json";
import { useLocation, useParams } from 'react-router-dom';

function Offers() {
    
    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      };
    
      const sampleData =[
        {
            storedData:"no data"
        }
    ]

    const [data, updateData] = useState([]);
    const [dataFetched, updateFetched] = useState(false);
    const [address, updateAddress] = useState("0x");
    const [totalPrice, updateTotalPrice] = useState("0");

      const [formParamsOffer, updateFormParamsOffer] = useState({ partner_name: '', offer_name: '',offer_description: '', offer_level: ''});
      const [message, updateMessage] = useState('');
      const ethers = require("ethers");
      const [fileOfferURL, setOfferFileURL] = useState(null);
      const [imagePartnerURL, setPartnerImageURL] = useState("");
      const [imageOfferURL, setOfferImageURL] = useState("");
    
      const [dataOffer, updateOfferDataAdd] = useState(sampleData);
      const [odata, updateFetchedOfferData] = useState(false);
      const [dataPartnerFetchedAdd, updateOfferFetchedAdd] = useState(false);
      const [olistItems, setOfferlistItems] = useState("000");
      const [offerD, updateOfferData] = useState(sampleData);
      const [level, updateLevel] = useState("Level 0");
    
    async function OnChangeFile(e) {
        var file = e.target.files[0];
        //check for file extension
        try {
            //upload the file to IPFS
            const response = await uploadFileToIPFS(file);
            if(response.success === true) {
                console.log("Uploaded image to Pinata: ", response.pinataURL)
                setOfferFileURL(response.pinataURL);
            }
        }
        catch(e) {
            console.log("Error during file upload", e);
        }
    }
  
        //This function uploads the metadata to IPFS
        async function uploadMetadataToIPFS() {
          const {partner_name, offer_name,offer_description,offer_level} = formParamsOffer;
          //Make sure that none of the fields are empty
          if( !partner_name || !offer_name || !offer_description ||! offer_level ||!fileOfferURL)
              return;
  
          const nftJSON = {
            partner_name, offer_name,offer_description, offer_level,image: fileOfferURL
          }
  
          try {
              //upload the metadata JSON to IPFS
              const response = await uploadJSONToIPFS(nftJSON);
              if(response.success === true){
                  console.log("Uploaded JSON to Pinata: ", response)
                  return response.pinataURL;
              }
          }
          catch(e) {
              console.log("error uploading JSON metadata:", e)
          }
      }
  
    async function  addOffer(e) {
      e.preventDefault();
  
      //Upload data to IPFS
      try {
          //const metadataURL = await uploadMetadataToIPFS();
          //After adding your Hardhat network to your metamask, this code will get providers and signers
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          updateMessage("Please wait.. uploading ...")
  
          //Pull the deployed contract instance
          let contract = new ethers.Contract(StoredataJSON.address, StoredataJSON.abi, signer)
        //   string partner_name;
        //   string offer_name;
        //   string offer_description;
        //   string offer_image;
        //   string offer_level;
          //massage the params to be sent to the create NFT request
          const {partner_name, offer_name,offer_description,offer_level} = formParamsOffer;
          //let listingPrice = await contract.getListPrice()
          //listingPrice = listingPrice.toString()
  
          //actually create the NFT
          let transaction = await contract. addOffer(partner_name, offer_name,offer_description,fileOfferURL,offer_level)
          await transaction.wait()
  
          alert("Successfully added!");
          updateMessage("");
          updateFormParamsOffer({ partner_name: '', offer_name: '',offer_description: '', offer_level: ''});
          window.location.replace("/offers")
      }
      catch(e) {
          alert( "Upload error"+e )
      }
    }
        async function getOffer() {
          const ethers = require("ethers");
          //After adding your Hardhat network to your metamask, this code will get providers and signers
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          //Pull the deployed contract instance
          let contract = new ethers.Contract(StoredataJSON.address, StoredataJSON.abi, signer)
          let odata = await contract.getOffer(1);
          let codata = odata;
  
          let meta = await axios.get(codata[4]);
          meta = meta.data.image;
          
          
          
          
          setOfferImageURL(meta)
          setOfferlistItems(codata)
          updateOfferFetchedAdd(true);
          updateOfferDataAdd(codata);
  
      }
  
      async function getAllOffers() {
  
        const ethers = require("ethers");
        //After adding your Hardhat network to your metamask, this code will get providers and signers
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        //Pull the deployed contract instance
        let contract = new ethers.Contract(StoredataJSON.address, StoredataJSON.abi, signer)
        let offerData = await contract.getAllOffers();
  
  
        
  
  
        
          
        updateFetchedOfferData(true);
        updateOfferData(offerData);
  
    }
      if(!odata)
      getAllOffers();
  
      
          let subtitle;
          const [modalIsOpen, setIsOpen] = React.useState(false);
  
          function openModal() {
            setIsOpen(true);
          }
  
          function afterOpenModal() {
            // references are now sync'd and can be accessed.
            subtitle.style.color = '#f00';
          }
  
          function closeModal() {
            setIsOpen(false);
          }
  
  
  console.log("Working", process.env);



  async function getNFTData(tokenId) {
      const ethers = require("ethers");
      let sumPrice = 0;
      //After adding your Hardhat network to your metamask, this code will get providers and signers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const addr = await signer.getAddress();

      //Pull the deployed contract instance
      let contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer)

      //create an NFT Token
      let transaction = await contract.getMyNFTs()

      /*
      * Below function takes the metadata from tokenURI and the data returned by getMyNFTs() contract function
      * and creates an object of information that is to be displayed
      */
      
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
          sumPrice += Number(price);
          return item;
      }))

      updateData(items);
      updateFetched(true);
      updateAddress(addr);
      updateTotalPrice(sumPrice.toPrecision(3));
  }

  const params = useParams();
  const tokenId = params.tokenId;
  if(!dataFetched)
      getNFTData(tokenId);


  function onVisit(){
    if (data.length >=1 && data.length <=4){

        updateLevel("Level 1")

    }
    else if((data.length >=5 && data.length <=10)){
        updateLevel("Level 2")
    }

    else {
        updateLevel("Level 3")
    }
  }
  return (
    <div>
        <Navbar></Navbar>
        <div className="leig bg-no-repeat bg-cover bg-center mt-0 p-2 m-2">
            <div className="flex flex-col place-items-center font-semibold p-5 text-gray-500 text-3xl">
                Offers
            </div>
            <div className='flex flex-row-reverse pr-4  mr-4 '>
                <div>
                    <button onClick={openModal} className ="outline outline-offset-2 outline-1 p-2 rounded-lg bg-stone-50">Add Offer</button>
                </div>
            
            </div >
            <div className="flex flex-col place-items-center font-semibold p-5 text-teal-500 text-3xl">

                <p className='flex flex-row'> You are a <p className='px-2 text-rose-700'> {level} </p>   adopter</p>

            </div>
            <div className="flex justify-center mt-5 bg-white  rounded-md m-5 flex-wrap max-w-screen-xl text-center justify-items-stretch">
                {offerD.map(offer => (

              <div className="bg-white border-b text-gray-900 white:text-dark rounded-lg m-1 ">
                    <img src={offer[4]} alt="" className="w-96 h-96 rounded-lg p-2 m-1" />
                    <div className='bg-gray-100 rounded-lg'>
                        <div>
                            <p>{offer[1]}</p>
                        </div>
                        <div>
                            <p>{offer[2]}</p>
                        </div>
                        <div>
                            <p>{offer[3]}</p>
                        </div>
                        <div className='p-2'>
                            <p className='text-red-600'> Must be a {offer[5]} Adopter</p>
                        </div>
                    </div>
                    <div className='bg-gray-100 p-2'>
                    { offer[5] == level ?
                        <button className ="outline outline-offset-2 outline-1 p-2 rounded-lg bg-stone-50">Claim</button>
                        : <div className="text-emerald-700 flex flex-row place-items-center px-3">Reach level <p className='text-fuchsia-400 px-2'> {offer[5]}  </p> to claim reward</div>
                    }
                    
                </div>
              </div>

              ))}
            </div>
            <div className="flex flex-col place-items-center mt-20 ">
            <div>
                
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                           

                    
                    <button onClick={closeModal}>close</button>
                    <div className="flex flex-col place-items-center mt-10" id="nftForm">

                        <form className="bg-white shadow-md rounded px-8 pt-4 pb-8 mb-4">
                        <h3 className="text-center font-bold text-purple-500 mb-8"> Offer !!</h3>
                            <div className="mb-4">
                                <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="name">Partners Name</label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="name" onChange={e => updateFormParamsOffer({...formParamsOffer, partner_name: e.target.value})} value={formParamsOffer.partner_name}></input>
                            </div>
                            <div className="mb-4">
                                <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="name">Offers Name</label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="offer" onChange={e => updateFormParamsOffer({...formParamsOffer, offer_name: e.target.value})} value={formParamsOffer.offer_name}></input>
                            </div>
                            <div className="mb-6">
                                <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="description">Offer Description</label>
                                <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" cols="40" rows="5" id="description" type="text" placeholder="offer_desc" value={formParamsOffer.offer_description} onChange={e => updateFormParamsOffer({...formParamsOffer, offer_description: e.target.value})}></textarea>
                            </div>
                            <div className="mb-4">
                                <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="name">Must Attain level</label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="level" onChange={e => updateFormParamsOffer({...formParamsOffer, offer_level: e.target.value})} value={formParamsOffer.offer_level}></input>
                            </div>
                            <div>
                                <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="image">Upload offer Picture</label>
                                <input type={"file"} onChange={OnChangeFile}></input>
                            </div>
                            <br></br>
                            <div className="text-green text-center">{message}</div>
                            <button onClick={addOffer} className="font-bold mt-10 w-full bg-purple-500 text-white rounded p-2 shadow-lg">
                                Add
                            </button>
                        </form>
                    </div>

                </Modal>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Offers