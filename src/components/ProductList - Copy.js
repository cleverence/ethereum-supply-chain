import React, { useState, useEffect } from "react";
import Product from "/build/contracts/Product.json";
import SupplyChainContract from "/build/contracts/SupplyChain.json";
import getWeb3 from "../../getWeb3";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [web3, setWeb3] = useState(null);
  const [supplyChain, setSupplyChain] = useState(null);

  useEffect(() => {
    const init = async () => {
      const web3 = await getWeb3();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SupplyChainContract.networks[networkId];
      const supplyChain = new web3.eth.Contract(
        SupplyChainContract.abi,
        deployedNetwork && deployedNetwork.address
      );
      setWeb3(web3);
      setSupplyChain(supplyChain);
      const productCount = await supplyChain.methods.getProductCount().call();
      const products = [];
      for (let i = 0; i < productCount; i++) {
        const product = await supplyChain.methods.getProduct(i).call();
        products.push(product);
      }
      setProducts(products);
    };
    init();
  }, []);

  return (
    <div className="container">
      <h1>Product List</h1>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Origin</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <Product
              key={product.id}
              id={product.id}
              name={product.name}
              origin={product.origin}
              quantity={product.quantity}
              price={product.price}
              supplyChain={supplyChain}
              web3={web3}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

// <button onClick={() => buyProduct(id)}>Buy</button>


export default ProductList;
