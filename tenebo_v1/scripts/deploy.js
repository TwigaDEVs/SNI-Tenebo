const { ethers } = require("hardhat");
const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const [deployer] = await ethers.getSigners();
  const balance = await deployer.getBalance();
  const Marketplace = await hre.ethers.getContractFactory("NFTMarketplace");
  const marketplace = await Marketplace.deploy();

  await marketplace.deployed();

  const data = {
    address: marketplace.address,
    abi: JSON.parse(marketplace.interface.format('json'))
  }


  //This writes the ABI and address to the mktplace.json
  fs.writeFileSync('./src/Marketplace.json', JSON.stringify(data))


  const Stores = await hre.ethers.getContractFactory("Storedata");
  const strores = await Stores.deploy();

  await strores.deployed();

  const storeData = {
    address: strores.address,
    abi: JSON.parse(strores.interface.format('json'))
  }


    //This writes the ABI and address to the mktplace.json
  fs.writeFileSync('./src/Storedata.json', JSON.stringify(storeData))



}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
