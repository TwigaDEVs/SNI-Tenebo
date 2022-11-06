import React from 'react';
import Fisi from '../fisi.jpeg';

const topDiv = {
	alignItems: 'center',
}

const NoNFT = () => {
    return (
        <div style={topDiv}>
        	<img src={Fisi} alt="fisi" style={{margin: 'auto', height: "150px", width: "150px", borderRadius: "50%"}} />
        	<div>
        	<br />
        		<h3 className="text-2xl">You Have 0 Adoption, Adopt Now</h3>
        		<br />
        		<span className="text-sm">Your NFTS</span>
        		<br />
        		<span className="text-sm">Oops, No data to display, are you logged in?</span>
        	</div>
        </div>
    );
};
export default NoNFT;
