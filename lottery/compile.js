const path = require('path');
const fs = require('fs');
const solc = require('solc');

const lotteryPath = path.join(__dirname, 'contracts', 'Lottery.sol');
const source = fs.readFileSync(lotteryPath, 'utf8');

const input = {
    language: 'Solidity',
    sources: {
        'Lottery.sol' : {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
};



var output = JSON.parse(solc.compile(JSON.stringify(input)));
console.log("1111 output", output);
const contractInctance = output.contracts['Lottery.sol'].Lottery;


module.exports = {
    abi: contractInctance.abi,
    bytecode: contractInctance.evm.bytecode.object
};

// console.log(Object.keys(output.contracts['Inbox.sol'].Inbox.evm));
// console.log(output.contracts['Inbox.sol'].Inbox.evm.bytecode);
