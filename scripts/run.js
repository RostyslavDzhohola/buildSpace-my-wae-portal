const main = async () => {
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy({
      value: hre.ethers.utils.parseEther("0.1"),
    });
    await waveContract.deployed();
    console.log("Contract deployed to:", waveContract.address);

    let contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log(
      "Contract balance:",
      hre.ethers.utils.formatEther(contractBalance)
    );

    let waveCount;
    let waveTxnByAddress;
    waveCount = await waveContract.getTotalWaves();
    console.log(waveCount.toNumber());
  
    const waveTxn = await waveContract.wave("This is wave #1");
    await waveTxn.wait();

    const waveTxn2 = await waveContract.wave("This is wave #2");
    await waveTxn2.wait();

    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log(
      "Contract balance:",
      hre.ethers.utils.formatEther(contractBalance)
    );

    waveCount = await waveContract.getTotalWaves();
    console.log("After two waves", waveCount.toNumber());
  
    const [_, randomPerson] = await hre.ethers.getSigners();
    waveTxn3 = await waveContract.connect(randomPerson).wave("Another message from randomPerson!");
    await waveTxn3.wait();

    let allWaves = await waveContract.getAllWaves();
    console.log("Returning struct...",allWaves);
  
    waveCount = await waveContract.getTotalWaves();
    console.log("Total amount of waves before random person waves", waveCount.toNumber());

    let randomWaves = Math.floor(Math.random() * 10) + 1;
    for (let index = 0; index < randomWaves; index++) {
        waveTxn3 = await waveContract.connect(randomPerson).wave("I am so random");
        await waveTxn3.wait();
        
    };

    waveTxnByAddress = await waveContract.connect(randomPerson).getMyWaves();
    console.log("Number of times randomPerson waved...", waveTxnByAddress.toNumber());

    waveCount = await waveContract.getTotalWaves();
    console.log("Total amount of waves after random person waves", waveCount.toNumber());

  };
  
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