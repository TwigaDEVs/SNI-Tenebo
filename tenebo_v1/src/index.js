import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import SellNFT from './components/SellNFT';
import Adoptions from './components/Adoptions';
import Profile from './components/Profile';
import NFTPage from './components/NFTpage';
import Home from './components/Home';
import Boma from './components/Boma';
import LionGuardian from './components/LionGuardian';
import Partners from './components/Partners';
import Offers from './components/Offers';
import Vote from './components/Vote';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/adoptions" element={<Adoptions />}/>
        <Route path="/sellNFT" element={<SellNFT />}/> 
        <Route path="/nftPage/:tokenId" element={<NFTPage />}/>        
        <Route path="/profile" element={<Profile />}/> 
        <Route path="/boma" element={<Boma />}/>
        <Route path="/lionGuardian" element={<LionGuardian />}/>
        <Route path="/partners" element={<Partners />}/>
        <Route path="/offers" element={<Offers />}/>
        <Route path="/vote" element={<Vote />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


reportWebVitals();
