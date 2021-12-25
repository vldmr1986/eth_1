const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.join(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

const input = {
    language: 'Solidity',
    sources: {
        'Inbox.sol' : {
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
const contractInctance = output.contracts['Inbox.sol'].Inbox;


module.exports = {
    abi: contractInctance.abi,
    bytecode: contractInctance.evm.bytecode.object
};

// console.log(Object.keys(output.contracts['Inbox.sol'].Inbox.evm));
// console.log(output.contracts['Inbox.sol'].Inbox.evm.bytecode);
