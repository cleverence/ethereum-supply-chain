import React, { useState, useEffect } from 'react';
import SupplyChain from '/build/contracts/SupplyChain.json';
//import getWeb3 from 'getWeb3';
import getWeb3 from 'get-web3';
import ProductList from './components/ProductList';

import './styles.css';

function App() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const initWeb3 = async () => {
      const web3Instance = await getWeb3();
      setWeb3(web3Instance);
      const accounts = await web3Instance.eth.getAccounts();
      setAccounts(accounts);
      const networkId = await web3Instance.eth.net.getId();
      const deployedNetwork = SupplyChain.networks[networkId];
      const supplyChainInstance = new web3Instance.eth.Contract(
        SupplyChain.abi,
        deployedNetwork && deployedNetwork.address
      );
      setContract(supplyChainInstance);
    };
    initWeb3();
  }, []);

  if (!web3) {
    return <div>Loading Web3, accounts, and contract...</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Tanzanian Supply Chain</h1>
      </header>
      <main className="container">
        <ProductList accounts={accounts} contract={contract} />
      </main>
    </div>
  );
}

export default App;
