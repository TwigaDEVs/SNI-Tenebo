import React from 'react';
import { useState } from "react";
import Modal from 'react-modal';
import Navbar from './Navbar';
import StoredataJSON from "../Storedata.json";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../pinata";
import axios from "axios";

function Boma() {

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

  const [bdata, updateFetchedBomaData] = useState(false);
  const [bomasD, updateBomaData] = useState(sampleData);

  const [formParamsBoma, updateFormParamsBoma] = useState({ full_name: '', username: '', social_media_link: ''});
  const [message, updateMessage] = useState('');
  const ethers = require("ethers");
  const [bomaFileURL, setBomaFileURL] = useState(null);
  const [imageURL, seImageURL] = useState("");

  const [dataAdd, updateDataAdd] = useState(sampleData);
  const [dataFetchedAdd, updateFetchedAdd] = useState(false);
  const [listItems, setlistItems] = useState("000");

    //This function uploads the NFT image to IPFS
  async function OnChangeFile(e) {
      var file = e.target.files[0];
      //check for file extension
      try {
          //upload the file to IPFS
          const response = await uploadFileToIPFS(file);
          if(response.success === true) {
              console.log("Uploaded image to Pinata: ", response.pinataURL)
              setBomaFileURL(response.pinataURL);
          }
      }
      catch(e) {
          console.log("Error during file upload", e);
      }
  }

  async function addBoma(e) {
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

        //massage the params to be sent to the create NFT request
        const {boma_owner, conservancy, state} = formParamsBoma;
        //let listingPrice = await contract.getListPrice()
        //listingPrice = listingPrice.toString()

        //actually create the NFT
        let transaction = await contract.addBoma(boma_owner, conservancy, state,bomaFileURL)
        await transaction.wait()

        alert("Successfully added!");
        updateMessage("");
        updateFormParamsBoma({ boma_owner: '', conservancy: '', state: ''});
        window.location.replace("/boma")
    }
    catch(e) {
        alert( "Upload error"+e )
    }
  }
      async function getAdopter() {
        const ethers = require("ethers");
        //After adding your Hardhat network to your metamask, this code will get providers and signers
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        //Pull the deployed contract instance
        let contract = new ethers.Contract(StoredataJSON.address, StoredataJSON.abi, signer)
        let sdata = await contract.getAdopter(5);
        let csdata = sdata;

        let meta = await axios.get(csdata[3]);
        meta = meta.data.image;
        
        

        
        seImageURL(meta)
        setlistItems(csdata)
        updateFetchedAdd(true);
        updateDataAdd(sdata);

    }

    async function getAllBomas() {

      const ethers = require("ethers");
      //After adding your Hardhat network to your metamask, this code will get providers and signers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      //Pull the deployed contract instance
      let contract = new ethers.Contract(StoredataJSON.address, StoredataJSON.abi, signer)
      let bomaData = await contract.getAllBomas();


      


      
        
      updateFetchedBomaData(true);
      updateBomaData(bomaData);

  }
    if(!bdata)
    getAllBomas();

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
    <div className='bg-neutral-50'>
    <Navbar></Navbar>
    <div className="boma mt-0 p-2 m-2">
        <div className='flex flex-col p-2 place-items-center text-gray-50 text-3xl'>
          Bomas
        </div>

        <div className='flex flex-row-reverse pr-4  mr-4'>
          <button onClick={openModal} className="outline outline-offset-2 outline-1 p-2 rounded-lg bg-stone-50">Add Boma</button>
        </div>
      
    </div>

    <div className="overflow-x-auto relative p-2 px-5">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mx-15">
                <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700  text-gray-900 dark:text-white mx-10 px-6">
                    <tr className='px-4'>
                        <th scope="col" className="py-2 px-4">
                            Boma
                        </th>
                        <th scope="col" className="py-2 px-4">
                            Boma owner
                        </th>
                        <th scope="col" className="py-2 px-4">
                            Conservacy
                        </th>
                        <th scope="col" className="py-2 px-4">
                            Sate of Boma
                        </th>
                    </tr>
                </thead>
                <tbody>
                {bomasD.map(boma => (
                    <tr className="bg-white border-b text-gray-900 white:text-dark">
                   
                        <th scope="row" class="py-4 px-6 font-medium text-white whitespace-nowrap">
                        <img src={boma[3]} alt="" className="w-24 h-24 rounded-md" />
                        </th>
                        <td className="py-2 px-4">
                        <p>{boma[1]}</p>
                        </td>
                        <td className="py-2 px-4">
                        <p>{boma[2]}</p>
                        </td>
                        <td className="py-2 px-4">
                        <p>{boma[4]}</p>
                        </td>
                     
                    </tr>
                      ))}
                </tbody>
            </table>
        </div>
      <div className="flex flex-col place-items-center mt-20 ">
            <div className='flex flex-col bg-white place-items-center mt-20 p-5'>
                <strong className="text-green-500 text-sm font-bold mb-2" > {dataAdd[1] }</strong>
                <img src={imageURL} alt="" className="w-72 h-80 rounded-lg object-cover" />
                <strong className="text-green-500 text-sm font-bold mb-2" > {dataAdd[2] }</strong>
                <strong className="text-green-500 text-sm font-bold mb-2" > {dataAdd[3] }</strong>                
            </div>
            <button onClick={getAdopter} className="font-bold mt-10  bg-purple-500 text-white rounded p-2 shadow-lg">
                    get adopter
                </button>
        

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
                        <h3 className="text-center font-bold text-purple-500 mb-8">Add user</h3>
                            <div className="mb-4">
                                <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="name">Boma Owner</label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="owner" onChange={e => updateFormParamsBoma({...formParamsBoma, boma_owner: e.target.value})} value={formParamsBoma.boma_owner}></input>
                            </div>
                            <div className="mb-4">
                                <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="name">Conservacy</label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="conservacy" onChange={e => updateFormParamsBoma({...formParamsBoma, conservancy: e.target.value})} value={formParamsBoma.conservancy}></input>
                            </div>
                            <div className="mb-6">
                                <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="price">Boma State</label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="link"  value={formParamsBoma.state} onChange={e => updateFormParamsBoma({...formParamsBoma, state: e.target.value})}></input>
                            </div>
                            <div>
                                <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="image">Upload Image</label>
                                <input type={"file"} onChange={OnChangeFile}></input>
                            </div>
                            <br></br>
                            <div className="text-green text-center">{message}</div>
                            <button onClick={addBoma} className="font-bold mt-10 w-full bg-purple-500 text-white rounded p-2 shadow-lg">
                                Add Boma
                            </button>
                        </form>
                    </div>

                </Modal>
            </div>
    </div>

    </div>
  )
}

export default Boma