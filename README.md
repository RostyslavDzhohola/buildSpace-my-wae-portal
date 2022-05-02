# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```

Articles
- https://medium.com/daox/three-methods-to-transfer-funds-in-ethereum-by-means-of-solidity-5719944ed6e9
- Sending ETH to contract 
    - https://docs.ethers.io/v5/migration/web3/
    - https://ethereum.stackexchange.com/questions/77028/sending-an-ethereum-transaction-with-ethers-js-and-metamask
    - https://docs.ethers.io/v5/single-page/#/v5/api/providers/provider/
    `
    const params = [{
        from: signer.address,
        to: waveContract.address,
        value: hre.ethers.utils.parseEther("4").toHexString()
       
    }];

    const transactionHash = await signer.provider.send('eth_sendTransaction', params);
    console.log("transactionHash is " + transactionHash);
    `
