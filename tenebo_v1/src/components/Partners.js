import React from 'react';
import { useState } from "react";
import Modal from 'react-modal';
import Navbar from './Navbar';
import StoredataJSON from "../Storedata.json";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../pinata";
import axios from "axios";

const Partners = () => {

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
      const [formParamsPartner, updateFormParamsPartner] = useState({name: '', description: ''});
      const [message, updateMessage] = useState('');
      const ethers = require("ethers");
      const [filePartnerURL, setPartnerFileURL] = useState(null);
      const [imagePartnerURL, setPartnerImageURL] = useState("");
      const [imageLGURL, seILGmageURL] = useState("");
    
      const [dataPartner, updatePartnerDataAdd] = useState(sampleData);
      const [pdata, updateFetchedPartnerData] = useState(false);
      const [dataPartnerFetchedAdd, updatePartnerFetchedAdd] = useState(false);
      const [plistItems, setPartnerlistItems] = useState("000");
      const [partnerD, updatePartnerData] = useState(sampleData);
    
    async function OnChangeFile(e) {
        var file = e.target.files[0];
        //check for file extension
        try {
            //upload the file to IPFS
            const response = await uploadFileToIPFS(file);
            if(response.success === true) {
                console.log("Uploaded image to Pinata: ", response.pinataURL)
                setPartnerFileURL(response.pinataURL);
            }
        }
        catch(e) {
            console.log("Error during file upload", e);
        }
    }
  
        //This function uploads the metadata to IPFS
        async function uploadMetadataToIPFS() {
          const {name, description} = formParamsPartner;
          //Make sure that none of the fields are empty
          if( !name || !description ||!filePartnerURL)
              return;
  
          const nftJSON = {
            name, description, image: filePartnerURL
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
  
    async function  addPartner(e) {
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
        //   string name;
        //   string description;
        //   string partnerImage;
          //massage the params to be sent to the create NFT request
          const {name, description} = formParamsPartner;
          //let listingPrice = await contract.getListPrice()
          //listingPrice = listingPrice.toString()
  
          //actually create the NFT
          let transaction = await contract. addPartner(name, description, filePartnerURL)
          await transaction.wait()
  
          alert("Successfully added!");
          updateMessage("");
          updateFormParamsPartner({ name: '', description: ''});
          window.location.replace("/partners")
      }
      catch(e) {
          alert( "Upload error"+e )
      }
    }
        async function getPartner() {
          const ethers = require("ethers");
          //After adding your Hardhat network to your metamask, this code will get providers and signers
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          //Pull the deployed contract instance
          let contract = new ethers.Contract(StoredataJSON.address, StoredataJSON.abi, signer)
          let pdata = await contract.getPartner(1);
          let cpdata = pdata;
  
          let meta = await axios.get(cpdata[3]);
          meta = meta.data.image;
          
          
          
          
          setPartnerImageURL(meta)
          setPartnerlistItems(cpdata)
          updatePartnerFetchedAdd(true);
          updatePartnerDataAdd(cpdata);
  
      }
  
      async function getAllPartners() {
  
        const ethers = require("ethers");
        //After adding your Hardhat network to your metamask, this code will get providers and signers
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        //Pull the deployed contract instance
        let contract = new ethers.Contract(StoredataJSON.address, StoredataJSON.abi, signer)
        let partnersData = await contract.getAllPartners();
  
  
        
  
  
        
          
        updateFetchedPartnerData(true);
        updatePartnerData(partnersData);
  
    }
      if(!pdata)
      getAllPartners();
  
      
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
  return (
    <div>
        <Navbar></Navbar>
        <div className="leig bg-no-repeat bg-cover bg-center mt-0 p-2 m-2">
            <div className="flex flex-col place-items-center font-semibold p-5 text-gray-500 text-3xl">
                Partners
            </div>
            <div className='flex flex-row-reverse pr-4  mr-4 '>
                <div>
                    <button onClick={openModal} className ="outline outline-offset-2 outline-1 p-2 rounded-lg bg-stone-50">Join Tenebo Partners</button>
                </div>
            
            </div>
        </div>
        <div className='mt-2 mb-2'>
          <hr/>
        </div>
        
        <div className="overflow-x-auto relative p-2">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700  text-gray-900 dark:text-white">
                    <tr>
                        <th scope="col" className="py-3 px-6">
                            Profile Picture
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Partner Name
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Info
                        </th>
                    </tr>
                </thead>
                <tbody>
                {partnerD.map(partner => (
                    <tr className="bg-white border-b text-gray-900 white:text-dark">
                   
                        <th scope="row" class="py-4 px-6 font-medium text-white whitespace-nowrap">
                        <img src={partner[3]} alt="" className="w-20 h-20 rounded-full" />
                        </th>
                        <td className="py-4 px-6">
                        <p>{partner[1]}</p>
                        </td>
                        <td className="py-4 px-6">
                        <p className='truncate ...'>{partner[2]} </p>
                        </td>

                     
                    </tr>
                      ))}
                </tbody>
            </table>
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
                        <h3 className="text-center font-bold text-purple-500 mb-8">Partner</h3>
                            <div className="mb-4">
                                <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="name">Name</label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="name" onChange={e => updateFormParamsPartner({...formParamsPartner, name: e.target.value})} value={formParamsPartner.name}></input>
                            </div>
                            <div className="mb-4">
                                <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="name">Description</label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="description" onChange={e => updateFormParamsPartner({...formParamsPartner, description: e.target.value})} value={formParamsPartner.description}></input>
                            </div>
                            <div>
                                <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="image">Upload profile Picture</label>
                                <input type={"file"} onChange={OnChangeFile}></input>
                            </div>
                            <br></br>
                            <div className="text-green text-center">{message}</div>
                            <button onClick={addPartner} className="font-bold mt-10 w-full bg-purple-500 text-white rounded p-2 shadow-lg">
                                Join
                            </button>
                        </form>
                    </div>

                </Modal>
            </div>
        </div>

    
    </div>
  )
}

export default Partners