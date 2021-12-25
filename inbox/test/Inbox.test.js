const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const INITIAL_STRING = 'Hi there!'; 
const {abi, bytecode} = require('../compile');

const web3 = new Web3(ganache.provider());
let accounts;
let inbox;

beforeEach(async ()=>{
    accounts = await web3.eth.getAccounts();
    inbox = await new web3.eth.Contract(abi)
        .deploy({data: bytecode, arguments: [INITIAL_STRING]})
        .send({from: accounts[0], gas: '1000000'});

    console.log("contract: ", {inbox})
})

describe('Inbox', ()=>{
    it('deploys a contracts', ()=>{
        assert.ok(inbox.options.address)
    });
    it('has a default message', async ()=>{
        const message = await inbox.methods.message().call();
        assert.equal(message, INITIAL_STRING);
    });
    it('can change message', async ()=>{
        const changedVAlue = "another";
        await inbox.methods.setMessage(changedVAlue).send({
            from: accounts[0], 
            // gas: '1000000'
        });
        const message = await inbox.methods.message().call();
        assert.equal(message, changedVAlue);
    })


    console.log("1111111 bytecode", {bytecode});
})



/*
console.log("1111111", {
    accounts: accounts,
    inbox,
    contractInfo: Object.keys(contractInfo),
    abi: contractInfo.abi,
    bytecode: contractInfo.evm.object,
    deployedBytecode: contractInfo.evm.deployedBytecode
});
*/