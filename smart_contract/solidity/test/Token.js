const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

describe("token contract", function(){

	async function deployTokenFixture(){
		const Token = await ethers.getContractFactory("Token");
		const [owner, addr1, addr2] = await ethers.getSigners();
		const hardhatToken = await Token.deploy();
		await hardhatToken.deployed();
		return { Token, hardhatToken, owner, addr1, addr2 };
	}

	it("should assign the total supply of tokens to the owner", async function(){
		const { hardhatToken, owner } = await loadFixture(deployTokenFixture);
		const ownerBalance = await hardhatToken.balanceOf(owner.address);
		expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
	});

	it("should transfer tokens between accounts", async function(){
		const { hardhatToken, owner, addr1, addr2 } = await loadFixture(deployTokenFixture);
		await expect(hardhatToken.connect(addr1).transfer(addr2.address, 50)).to.changeTokenBalances(hardhatToken, [addr1, addr2], [50, 50]);
	});


	/*
	it("deployment should assign a total supply of tokens to the owner", async function(){
		const [owner] = await ethers.getSigners();
		const Token = await ethers.getContractFactory("Token");
		const hardhatToken = await Token.deploy();
		const ownerBalance = await hardhatToken.balanceOf(owner.address);
		expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
	});

	it("should transfer tokens between accounts", async function(){
		const [owner, addr1, addr2] = await ethers.getSigners();
		const Token = await ethers.getContractFactory("Token");
		const hardhatToken = await Token.deploy();

		await hardhatToken.transfer(addr1.address, 50);
		expect(await hardhatToken.balanceOf(addr1.address)).to.equal(50)

		await hardhatToken.connect(addr1).transfer(addr2.address, 50);
		expect(await hardhatToken.balanceOf(addr2.address)).to.equal(50);
	});*/
});

