# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

1. create .env file with the following keys:
API_URL=https://eth-rinkeby.alchemyapi.io/v2/{alchemi_key} // alchemi_key or infura url
PRIVATE_KEY=45b756b6df151642494c... // privatkey of the account from where it be deployed
TOKEN_URL=ipfs://QmS6Cwi8ek7xeSLcy.../    // ipfs cid of the folder of tokens json  - 1,2,3,4,5
CONTRACT_URL=ipfs://QmR6yriKegGTwmshJZoGs...   // ipfs cid of the contract file - creator fees, img collection
NETWORK_NAME=rinkeby    // mainnet ropsten


2. Edit NFTCollectible.sol 
    ERC721(NEW_COLLECTION_NAME, NEW_COLLECTION_TOKEN_NAME)
    // set correct constants values for the collection
  uint public constant MAX_SUPPLY = 10; // collection length
    uint public constant PRICE = 0.0001 ether;    // price per item
    uint public constant MAX_PER_MINT = 2;  // mint count per transaction 
    uint public constant MAX_RESERVE = 3;

mkdir nft-collectible && cd nft-collectible && npm init -y
npm install --save-dev hardhat
npx hardhat
npx hardhat run scripts/sample-script.js
npm install @openzeppelin/contracts
npm install dotenv
npx hardhat clean 
npx hardhat run scripts/run.js
npx hardhat run scripts/run.js --network rinkeby

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
