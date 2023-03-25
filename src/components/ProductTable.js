import React from "react";
import ProductRow from "./ProductRow";

const ProductTable = ({ products, handleBuy }) => {
  return (
    <table>
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
          <ProductRow key={product.id} product={product} handleBuy={handleBuy} />
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
