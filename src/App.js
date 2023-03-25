import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import SupplyChain from '/build/contracts/SupplyChain.json';
import ProductList from './components/ProductList';

import './styles.css';

function App() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
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
        } catch (error) {
          console.error(error);
        }
      }
      else if (window.web3) {
        const web3Instance = new Web3(window.web3.currentProvider);
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
      }
      else {
        console.log('No web3 instance detected');
      }
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
