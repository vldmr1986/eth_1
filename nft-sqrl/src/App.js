import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import './App.css';
import contract from './contracts/NFTCollectible.json';
import {WALLET_NETWORKS, DEPLOYED_NETWORK_ID, MAX_PER_MINT, CONTRACT_ADDRESS} from './constants/constants';


const abi = contract.abi;


function App() {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [nftContract, setNtfContract] = useState(null);
  const [mintCount, setMintCount] = useState(1);
  const [chainId, setChainId] = useState(1);
  const {ethereum} = window;



if (ethereum){
  ethereum.on('accountsChanged', function (accounts) {
    // Time to reload your interface with accounts[0]!
    window.location.reload();
  });
  ethereum.on('chainChanged', (chainId)=>{
    console.log("222222 chainId", chainId)
    setChainId(Number(chainId));
  })
}


  

  const checkWalletIsConnected = async() => {
    if (!ethereum){
      console.log("Make sure you have metamask installed");
      return;
    } else {
      console.log("Wallet exist! we are ready to go");
      const accounts = await ethereum.request({ method: 'eth_requestAccounts'});
      if (accounts.length !==0) {
        setCurrentAccount(accounts[0]);
        console.log("Found an account! Address: ", accounts[0]);
      }
    }
   }

  const connectWalletHandler = async () => {
    if (!ethereum){
      console.log("Show POPUP install Metamask");
    } else {
      try {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts'});
        setCurrentAccount(accounts[0]);
        console.log("Found an account! Address: ", accounts[0]);
      } catch (err) {
        console.log(err)
      }
    }
  }

  const mintNftHandler = async () => {
    try {
      if (nftContract){
//         ntfOwner1: "0xAA41cd650626ddFDac20a2f417C4A4B33Aab7f9F"
// ntfOwner2: "0x7E89cCAB2080D6ECb0E14186b11D8aFB4Dd3aFfd"
// ntfOwner3: "0x481C40b8e475821422cB3F0baDe75E0953ebEf54"
// ntfOwner4: "0xAA41cd650626ddFDac20a2f417C4A4B33Aab7f9F"

        const nftowners = await nftContract.tokensOfOwner(currentAccount);
        const balancentfOwner2 = await nftContract.balanceOf("0xAA41cd650626ddFDac20a2f417C4A4B33Aab7f9F");
        console.log("ntfOwner1",{balancentfOwner2, nftowners});
        const ethersValue = 0.0001 * mintCount + "";
        const nftTxn = await nftContract.mintNFTs(mintCount, {
          value: ethers.utils.parseEther(ethersValue)
        });

        await nftTxn.wait();

        console.log(`Mined, see transaction https://ropsten.etherscan.io/tx/${nftTxn.hash}`);
      }

    } catch (err) {
      console.log(err)
    }
   }

  const connectWalletButton = () => {
    return (
      <button onClick={connectWalletHandler} className='cta-button connect-wallet-button'>
        Connect Wallet
      </button>
    )
  }

  const mintNftButton = () => {
    return (
      <button onClick={mintNftHandler} className='cta-button mint-nft-button'>
        Mint NFT
      </button>
    )
  }

  useEffect(() => {
    checkWalletIsConnected();
    try{
      if (window.ethereum){
        setTimeout(()=>{setChainId(Number(window.ethereum.chainId));}, 2000)
        console.log("11111111 chain id", chainId, Number(window.ethereum.chainId));
        const provider = new ethers.providers.Web3Provider(ethereum);
        const singer = provider.getSigner();
        const _nftContract = new ethers.Contract(CONTRACT_ADDRESS, abi, singer);
        setNtfContract(_nftContract);
      }
    } catch (err){
      console.log("contract err",err);
    }
  }, [])

  const someHandler =async ()=>{
    console.log("nftContract0", nftContract);
      //tokenURI contractURI
      if (nftContract) {
        const tokenurl = await nftContract.contractURI();
        console.log("tokenurl", tokenurl);
      }
  }
  const withdraw = async()=>{
    const _withdraw = await nftContract.withdraw();
    console.log("_withdraw", _withdraw);

  }

  const chainLabel = (WALLET_NETWORKS.find(({id})=>chainId == id) || {}).label;
  const shouldNetworkBeLabel = (WALLET_NETWORKS.find(({id})=>DEPLOYED_NETWORK_ID == id) || {}).label;
  

  return (
    <div className='main-app'>
      <h1>Scrappy Squirrels Tutorial</h1>
      {DEPLOYED_NETWORK_ID === chainId
      ?  <div>
      {currentAccount ? mintNftButton() : connectWalletButton()}
      <button onClick={someHandler}>handler</button>
      <div>
      <button onClick={()=>{
        if (mintCount-1 < 0) return;
        setMintCount(mintCount-1)
        }}>-</button>
      {mintCount}
      <button onClick={()=>{
        if (mintCount+1 > MAX_PER_MINT) return;
        setMintCount(mintCount+1);
        }}>+</button>
  
      </div>
      <button onClick={withdraw}>withdraw</button>
      {chainLabel || "Connect MetaMask Wallet"}
    </div>
    : <div>
      You are under {chainLabel}, please switch to {shouldNetworkBeLabel}
    </div>
    }


    </div>
  )
}

export default App;
