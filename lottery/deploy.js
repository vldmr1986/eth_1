require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const {abi, bytecode} = require('./compile'); 

const mnemonic = process.env.MNEMONIC;

const provider = new HDWalletProvider({
    mnemonic: {
        phrase: mnemonic
      },
      providerOrUrl: "https://ropsten.infura.io/v3/8da23f51dda346cb936d0fb70586f512"
    //   providerOrUrl: 'https://rinkeby.infura.io/v3/9560e2a66c6f412eb1c975bde025be36'
    }   
);

const web3 = new Web3(provider);

const deploy = async ()=>{
    const accounts = await web3.eth.getAccounts();

    console.log("Triyng to deploy account", accounts[0]);

    const result = await new web3.eth.Contract(abi)
    .deploy({data: "0x" + bytecode})
    .send({
        // gas: '1000000', 
        // gas: 1500000,
        // gasPrice: 3000000,
        from: accounts[0] 
    });
    console.log("deployed to", result.options.address);
}

deploy();

// https://rinkeby.etherscan.io/    result.oprions.address
