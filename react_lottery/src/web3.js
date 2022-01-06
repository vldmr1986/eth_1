/* eslint-disable */
// import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';
import {getEthInstance} from './constants';
// import {ethers} from 'ethers';

// export const web3 = new Web3(window.ethereum);
// export const web3_ether = new ethers.providers.Web3Provider(window.ethereum);

getEthInstance()?.on('accountsChanged', function (accounts) {
    console.log("reload page");
    // Time to reload your interface with accounts[0]!
  });

  getEthInstance()?.on('chainChanged', (chainId) => {
    // Handle the new chain.
    // Correctly handling chain changes can be complicated.
    // We recommend reloading the page unless you have good reason not to.
    window.location.reload();
  });




export const doSomething = async ()=> {

    const provider = await detectEthereumProvider();
    if (provider) { // eslint-disable-line
        await window.ethereum.enable();
 
        console.log('Ethereum successfully detected!')
       
        // From now on, this should always be true:
        // provider === window.ethereum
       
        // Access the decentralized web!
       
        // Legacy providers may only have ethereum.sendAsync
        const chainId = await provider.request({
          method: 'eth_chainId'
        })
        console.log("Chain ID ", chainId)
        return chainId;
      } else {
       
        // if the provider is not detected, detectEthereumProvider resolves to null
        console.error('Please install MetaMask!', error)
      }
      return false;
}





