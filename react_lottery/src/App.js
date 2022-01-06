import {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {doSomething} from './web3';
import {isInstalled, isConnected, connectMetamask, disconectMetaMask} from './actions/accounts';

function App() {
  // const isInstalled = 
  const [isMetamaskInstalled, setIsInstalled] = useState(false)
  const [isMetamaskConnected, setIsConnected] = useState(false)
  const asd = doSomething();
  // console.log("web3 is", web3_ether);

  const updateIsInstalled = ()=>{
    setIsInstalled(isInstalled())
  }

  const updateIsConnected = ()=>{
    setIsConnected(isConnected());
  }

  useEffect(() => {
     connectMetamask();
     updateIsInstalled();
     updateIsConnected();
  }, []);

  console.log('isInstalled', {
    isMetamaskInstalled, isMetamaskConnected
  })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div>isMetamaskInstalled:  {isMetamaskInstalled + ""}</div>
        <div>isMetamaskConnected:  {isMetamaskConnected+ ""}</div>
        <button className="App-" onClick={updateIsInstalled}>Get is installed</button>
        <br></br>
        <button className="App-" onClick={updateIsConnected}>Get is connected</button>
        <br></br>
        <button className="App-" onClick={connectMetamask}>Click to connect</button>
        <br></br>
        <button className="App-" onClick={disconectMetaMask}>Click to disconnect</button>
      </header>
    </div>
  );
}

export default App;
