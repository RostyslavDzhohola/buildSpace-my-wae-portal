const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy();
    await waveContract.deployed();
  
    console.log("Contract deployed to:", waveContract.address);
    console.log("Contract deployed by:", owner.address);
    console.log("Random person address:", randomPerson.address);
  
    let waveCount;
    let waveCountByAddress;
    let waveTxnByAddress;
    waveCount = await waveContract.getTotalWaves();
  
    let waveTxn = await waveContract.wave();
    await waveTxn.wait();
  
    waveCount = await waveContract.getTotalWaves();

    let randomWaves = Math.floor(Math.random() * 10) + 1;
    for (let index = 0; index < randomWaves; index++) {
        waveTxn = await waveContract.connect(randomPerson).wave();
        await waveTxn.wait();
        
    };

    waveTxnByAddress = await waveContract.connect(randomPerson).getMyWaves();

    waveCount = await waveContract.getTotalWaves();

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