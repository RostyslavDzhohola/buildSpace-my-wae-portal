const { expect } = require("chai");
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

    it("Contract ballance is 10 ETH", async function () {
        let contractBalance = await hre.ethers.provider.getBalance(contract.address);
        expect(hre.ethers.utils.formatEther(contractBalance)).to.equal("10.0");
    });

    it("Increase amount of waves by 1", async function () {
        expect(await contract.getTotalWaves()).to.equal("0");
        const waveTxn = await contract.connect(waver2).wave("This is wave #1");
        await waveTxn.wait();
        expect(await contract.getTotalWaves()).to.equal("1");
    });

}); 