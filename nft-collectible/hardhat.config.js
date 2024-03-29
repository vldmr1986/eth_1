require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require('dotenv').config();

const { API_URL, PRIVATE_KEY, NETWORK_NAME } = process.env;

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const networkName = ["ropsten", "rinkeby", "mainnet"].find(_i=> _i === NETWORK_NAME); // rinkeby
if (!networkName) {
  throw new Error("NETWORK_NAME in dot env is incorrect");
}

module.exports = {
  solidity: "0.8.4",
  // defaultNetwork: "rinkeby",
  defaultNetwork: networkName,
  networks: {
    [networkName]: {
      url: API_URL,
      accounts: [PRIVATE_KEY],
      // gas: 2100000,
      // gasPrice: 8000000000
    }
  },
  // etherscan: {
  //   apiKey: ETHERSCAN_API
  // }
};