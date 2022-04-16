require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0",
  networks: {
    rinkeby: {
      url: "YOUR_ALCHEMY_AP",
      accounts: ["YOUR_PRIVATE_RINKEBY_ACCOUNT_KEY"]
    },
  },
};