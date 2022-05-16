const { expect } = require("chai");
const { formatEther } = require("ethers/lib/utils");
const { ethers } = require("hardhat");

describe("Wave Contract", function() {
    let contract;
    let waver1;
    let waver2;
    let waver3;

    beforeEach(async function() {
        const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
        const waveContract = await waveContractFactory.deploy({
          value: hre.ethers.utils.parseEther("10"),
        });
        contract = await waveContract.deployed();
        [waver1, waver2, waver3] = await hre.ethers.getSigners();
        let waveCount;
        let userBalance;
    });

    it("passes if contract ballance is 10 ETH", async function () {
        let contractBalance = await hre.ethers.provider.getBalance(contract.address);
        expect(hre.ethers.utils.formatEther(contractBalance)).to.equal("10.0");
    });

    it("passes if total waves increased by 1", async function () {
        expect(await contract.getTotalWaves()).to.equal("0");
        const waveTxn = await contract.connect(waver2).wave("This is wave #1");
        await waveTxn.wait();
        expect(await contract.getTotalWaves()).to.equal("1");
    });

    it("Cotract balance should be 0 account balance should increase", async function () {
        let contractBalance = await hre.ethers.provider.getBalance(contract.address);
        expect(hre.ethers.utils.formatEther(contractBalance)).to.equal("10.0");
        let waverBalance1 = await hre.ethers.provider.getBalance(waver1.address);
        const withdrawAll = await contract.withdrawAll();
        await withdrawAll.wait();
        let waverBalance2 = await hre.ethers.provider.getBalance(waver1.address);
        expect(waverBalance2).to.be.above(waverBalance1);
        expect(await hre.ethers.provider.getBalance(contract.address)).to.equal("0");
        console.log("Waver after withdrawal", hre.ethers.utils.formatEther(waverBalance2));
    });

    it("Increace contract balance by 5.1 ETH", async function () {
        let contractBalance = await hre.ethers.provider.getBalance(contract.address);
        expect(hre.ethers.utils.formatEther(contractBalance)).to.equal("10.0");
        const params = [{
            from: waver1.address,
            to: contract.address,
            value: hre.ethers.utils.parseEther("5.1").toHexString()
        }];
        const transactionHash = await waver1.provider.send('eth_sendTransaction', params);
        console.log("transactionHash is " + transactionHash);
        contractBalance = await hre.ethers.provider.getBalance(contract.address);
        expect(hre.ethers.utils.formatEther(contractBalance)).to.equal("15.1");
    });

    it("Withdraw all should revert with 'Not the owner'", async function () {
        let contractBalance = await hre.ethers.provider.getBalance(contract.address);
        await expect(contract.connect(waver2).withdrawAll()).to.be.revertedWith("Not the owner");
        expect(hre.ethers.utils.formatEther(contractBalance)).to.equal("10.0");
    });

    it("Should increse contract balance by 2", async function () {
        await expect(await waver3.sendTransaction({to: contract.address, value: 2})).to.changeEtherBalance(contract, 2);
        let contractBalance = await hre.ethers.provider.getBalance(contract.address);
        console.log("Contract balance is ", hre.ethers.utils.formatEther(contractBalance));
    });

    it("Should write True to a struct if won" , async function () {
        let waverBalance1 = await ethers.provider.getBalance(waver2.address);
        const waveTxn = await contract.connect(waver2).wave("This is wave #1");
        await waveTxn.wait();
        let waverBalance2 = await ethers.provider.getBalance(waver2.address);
        let allWaves = await contract.getAllWaves();
        console.log("Returning struct...",allWaves);
        if(allWaves[0].lucky) {
            expect(waverBalance2).to.be.gt(waverBalance1);
        } 
        expect(allWaves[0].message).to.equal('This is wave #1');
    });

}); 