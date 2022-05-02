const main = async () => {
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy({
      value: hre.ethers.utils.parseEther("10"),
    });
    await waveContract.deployed();
    console.log("Contract deployed to:", waveContract.address);

    
    let contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log(
      "Contract balance:",
      hre.ethers.utils.formatEther(contractBalance)
    );

    const [waver1, waver2, waver3] = await hre.ethers.getSigners();

    let waveCount;
    let userBalance;
    
    
    waveCount = await waveContract.getTotalWaves();
    console.log(waveCount.toNumber());
        
    userBalance = await hre.ethers.provider.getBalance(waver2.address);
    console.log(
        "Before first wave -------->> ", 
        hre.ethers.utils.formatEther(userBalance)
    );
    const waveTxn = await waveContract.connect(waver2).wave("This is wave #1");
    await waveTxn.wait();
    userBalance = await hre.ethers.provider.getBalance(waver2.address);
    console.log(
        "After first wave -------->> ", 
        hre.ethers.utils.formatEther(userBalance)
    );

    userBalance = await hre.ethers.provider.getBalance(waver3.address);
    console.log(
        "Before second wave -------->> ", 
        hre.ethers.utils.formatEther(userBalance)
    );
    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log(
        "Contract balance:",
        hre.ethers.utils.formatEther(contractBalance)
    );
    
    const waveTxn2 = await waveContract.connect(waver3).wave("This is wave #2");
    await waveTxn2.wait();
    userBalance = await hre.ethers.provider.getBalance(waver3.address);
    console.log(
        "After second wave -------->> ", 
        hre.ethers.utils.formatEther(userBalance)
    );

    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log(
      "Contract balance before sending ETH:",
      hre.ethers.utils.formatEther(contractBalance)
    );

    //--------------------------------------
    const params = [{
        from: waver1.address,
        to: waveContract.address,
        value: hre.ethers.utils.parseEther("4").toHexString()
        ,
        // gasLimit: hre.ethers.utils.hexlify(10000),
        //gasPrice: hre.ethers.utils.hexlify(parseInt(await hre.ethers.provider.getGasPrice()))
    }];

    const transactionHash = await waver1.provider.send('eth_sendTransaction', params);
    console.log("transactionHash is " + transactionHash);

    // const tx = await waver1.sendTransaction(params);
    // await tx.wait();

    // userBalance = await hre.ethers.provider.getBalance(waver1.address);
    // console.log(
    //     "Waver1 balance before sending ETH-------->> ", 
    //     hre.ethers.utils.formatEther(userBalance)
    // );

    // waver1.sendTransaction(params).then((transaction) => {
    //     console.log(transaction);
    //     console.log("Send finished!");
    // });

    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log(
        "Contract balance after receivning some ETH:",
        hre.ethers.utils.formatEther(contractBalance)
    );

    // userBalance = await hre.ethers.provider.getBalance(waver1.address);
    // console.log(
    //     "Waver1 balance After sending ETH-------->> ", 
    //     hre.ethers.utils.formatEther(userBalance)
    // );

    // userBalance = await hre.ethers.provider.getBalance(waver2.address);
    // console.log(
    //     "Waver2 balance -------->> ", 
    //     hre.ethers.utils.formatEther(userBalance)
    // );

    
    // let allWaves = await waveContract.getAllWaves();
    // console.log("Returning struct...",allWaves);
    
}

const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
};
  
runMain();