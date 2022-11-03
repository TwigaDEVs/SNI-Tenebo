import logo from "../logo_3.png";
import mara from "../mara.jpg";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

function Navbar() {
  const [dropdown, setDropdown] = useState(false);
  const [connected, toggleConnect] = useState(false);
  const location = useLocation();
  const [currAddress, updateAddress] = useState("0x");

  async function getAddress() {
    const ethers = require("ethers");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();
    updateAddress(addr);
  }

  function updateButton() {
    const ethereumButton = document.querySelector(".enableEthereumButton");
    ethereumButton.textContent = "Connected";
    ethereumButton.classList.remove("hover:bg-blue-70");
    ethereumButton.classList.remove("bg-blue-500");
    ethereumButton.classList.add("hover:bg-green-70");
    ethereumButton.classList.add("bg-green-500");
  }

  async function connectWebsite() {
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    if (chainId !== "0x5") {
      //alert('Incorrect network! Switch your metamask network to Rinkeby');
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x5" }],
      });
    }
    await window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then(() => {
        updateButton();
        console.log("here");
        getAddress();
        window.location.replace(location.pathname);
      });
  }

  const handleDropdown = () => {
    setDropdown(!dropdown);
  };

  useEffect(() => {
    let val = window.ethereum.isConnected();
    if (val) {
      console.log("here");
      getAddress();
      toggleConnect(val);
      updateButton();
    }

    window.ethereum.on("accountsChanged", function (accounts) {
      window.location.replace(location.pathname);
    });
  });

  return (
    <div className="">
      <nav className="w-screen">
        <ul className="flex items-end justify-between py-3 bg-transparent text-white pr-5">
          <li className="flex items-end ml-5 pb-2">
            <Link to="/">
              <img
                src={mara}
                alt=""
                width={50}
                height={50}
                className="inline-block -mt-2"
              />
              <div className="inline-block font-bold text-xl ml-2">
                Adoption Listings
              </div>
            </Link>
          </li>
          <li className="w-2/6">
            <ul className="lg:flex justify-between font-bold mr-10 text-lg">
              <li className="border-b-2 hover:pb-0 p-2">
                <div class="relative inline-block text-left">
                  <div>
                    <button
                      type="button"
                      class="inline-flex"
                      id="menu-button"
                      aria-expanded="true"
                      aria-haspopup="true"
                      onClick={handleDropdown}
                    >
                      Mode
                    </button>
                  </div>
                  {dropdown && (
                    <>
                      <div
                        class="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="menu-button"
                        tabindex="-1"
                      >
                        <div class="py-1" role="none">
                          <Link to="Boma"
                            href="#"
                            class="text-gray-700 block px-4 py-2 text-sm"
                            role="menuitem"
                            tabindex="-1"
                            id="menu-item-0"
                          >
                            Boma
                          </Link>
                        </div>
                        <div class="py-1" role="none">
                          <Link to="/lion-guardians"
                            href="#"
                            class="text-gray-700 block px-4 p-2 py-2 text-sm"
                            role="menuitem"
                            tabindex="-1"
                            id="menu-item-2"
                          >
                            Lion Guardians
                          </Link>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </li>
              <li className='w-2/6'>
                <ul className='lg:flex justify-between font-bold mr-10 text-lg'>
                {location.pathname === "/" ? 
                  <li className='border-b-2 hover:pb-0 p-2'>
                    <Link to="/">Home</Link>
                  </li>
                  :
                  <li className='hover:border-b-2 hover:pb-0 p-2'>
                    <Link to="/">Home</Link>
                  </li>              
                  }
                  {location.pathname === "/" ? 
                  <li className='border-b-2 hover:pb-0 p-2'>
                    <Link to="/adoptions">Adoptions</Link>
                  </li>
                  :
                  <li className='hover:border-b-2 hover:pb-0 p-2'>
                    <Link to="/adoptions">Adoptions</Link>
                  </li>              
                  }
                  {location.pathname === "/sellNFT" ? 
                  <li className='border-b-2 hover:pb-0 p-2'>
                    <Link to="/sellNFT">List Adoption by NFT</Link>
                  </li>
                  :
                  <li className='hover:border-b-2 hover:pb-0 p-2'>
                    <Link to="/sellNFT">List Adoption by NFT</Link>
                  </li>              
                  }              
                  {location.pathname === "/profile" ? 
                  <li className='border-b-2 hover:pb-0 p-2'>
                    <Link to="/profile">Profile</Link>
                  </li>
                  :
                  <li className='hover:border-b-2 hover:pb-0 p-2'>
                    <Link to="/profile">Profile</Link>
                  </li>              
                  }  
                  <li>
                    <button
                      className="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm"
                      onClick={connectWebsite}
                    >
                      {connected ? "Connected" : "Connect Wallet"}
                    </button>
                  </li>
                </ul>
              </li>
              </ul>
          </li>
        </ul>
      </nav>
      <div className="text-white text-bold text-right mr-10 text-sm">
        {currAddress !== "0x"
          ? "Connected to"
          : "Not Connected. Please login to view NFTs"}{" "}
        {currAddress !== "0x" ? currAddress.substring(0, 15) + "..." : ""}
      </div>
    </div>
  );
}

export default Navbar;
