import axie from "../tile.jpeg";
import {
    BrowserRouter as Router,
    Link,
  } from "react-router-dom";
import React from 'react';

function Bomafile (dataAdd) {
    // const newTo = {
    //     pathname:"/nftPage/"+data.data.tokenId
    // }
    return (
        
        <div className="flex flex-col place-items-center mt-10" id="nftForm">

            <div className="flex flex-col place-items-center mt-10" id="nftForm">
            <form className="bg-white shadow-md rounded px-8 pt-4 pb-8 mb-4">
            <h3 className="text-center font-bold text-purple-500 mb-8">Upload NFT to the Adoption Listing</h3>
            <div className= "text-purple-500 w-full p-2 bg-white rounded-lg pt-5 -mt-20">
                <strong className="text-xl">{dataAdd.dataAdd.full_name}</strong>
                <p className="display-inline">
                    {dataAdd.dataAdd.username}
                </p>
            </div>

            </form>
        </div>
        </div>

        
        
    )
}

export default Bomafile;
