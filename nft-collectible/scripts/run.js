require('dotenv').config();
const { utils } = require("ethers");
require("@nomiclabs/hardhat-waffle");

const { TOKEN_URL, CONTRACT_URL } = process.env;

const shouldDeploy = true;
async function main() {
    // await hre.run('compile');
    // Get owner/deployer's wallet address
    const [owner] = await hre.ethers.getSigners();
    // console.log("1 owner", owner)
    // Get contract that we want to deploy

    const contractFactory = await ethers.getContractFactory("NFTCollectible");
    // console.log("2 getContractFactory", )
    if (shouldDeploy){
    // Deploy contract with the correct constructor arguments
    const contract = await contractFactory.deploy(TOKEN_URL, CONTRACT_URL);
    console.log("3 contracted");
    // Wait for this transaction to be mined
    await contract.deployed();

    // Get contract address
    console.log("Contract deployed to:", contract.address);

    // Reserve NFTs
    let txn = await contract.reserveNFTs();
    await txn.wait();
    console.log("3 NFTs have been reserved");

    // Mint 3 NFTs by sending 0.03 ether
    txn = await contract.mintNFTs(3, { value: utils.parseEther('0.0003') });
    await txn.wait()

    // Get all token IDs of the owner
    let tokens = await contract.tokensOfOwner(owner.address)
    console.log("Owner has tokens: ", tokens);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });