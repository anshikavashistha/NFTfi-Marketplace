import React, { useState } from 'react';
import Web3 from 'web3';
import NFTfiMarketplace from './NFTfiMarketplace.json';

function App() {
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [nftUri, setNftUri] = useState('');

  const connectWallet = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);

      const networkId = await web3.eth.net.getId();
      const networkData = NFTfiMarketplace.networks[networkId];
      if (networkData) {
        const abi = NFTfiMarketplace.abi;
        const address = networkData.address;
        const contract = new web3.eth.Contract(abi, address);
        setContract(contract);
      } else {
        alert('Smart contract not deployed to detected network.');
      }
    }
  };

  const createNFT = async () => {
    if (contract) {
      await contract.methods.createFinancialNFT('Example Financial Contract', nftUri)
        .send({ from: account });
    }
  };

  return (
    <div>
      <h1>NFTfi Marketplace</h1>
      <button onClick={connectWallet}>Connect Wallet</button>
      <br />
      <input
        type="text"
        value={nftUri}
        onChange={(e) => setNftUri(e.target.value)}
        placeholder="NFT URI"
      />
      <button onClick={createNFT}>Create Financial NFT</button>
    </div>
  );
}

export default App;
