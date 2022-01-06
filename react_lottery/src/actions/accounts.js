import {getEthInstance} from '../constants';

export const connectMetamask = async() => {
    try {
        const res = await getEthInstance()?.request({ method: 'eth_requestAccounts' });
        console.log("res", {res});
        return res;
    } catch(err){
        console.log("777777777 eroor, ", {
            err
        })
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // If this happens, the user rejected the connection request.
          console.log('Please connect to MetaMask.');
        } else {
          console.error(err);
        }
      };
      return null;
  }

export const getAccounts = async () => {
    let currentAccount = null;
      try {
        const accounts = await getEthInstance()?.request({ method: 'eth_accounts' });
        console.log("accounts", {accounts})
        handleAccountsChanged(accounts, currentAccount);
        return accounts
    } catch (err){
    // Some unexpected error.
    // For backwards compatibility reasons, if no accounts are available,
    // eth_accounts will return an empty array.
    console.error(err);
    return null;
  };
}


function handleAccountsChanged(accounts, currentAccount) {
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      console.log('Please connect to MetaMask.');
    } else if (accounts[0] !== currentAccount) {
      currentAccount = accounts[0];
      // Do any other work!
    }
  }

  export const disconectMetaMask = async () => {
      console.log('disconecting');
    const res = await getEthInstance()?.on('disconnect', async (res) => {
        console.log("8888888888 logout", res)
    })
    return res
  }

export const isConnected = () => getEthInstance()?.isConnected();
export const isInstalled = () => getEthInstance()?.isMetaMask;

