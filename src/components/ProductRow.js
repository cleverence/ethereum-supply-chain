import React from "react";

class ProductRow extends React.Component {
  constructor(props) {
    super(props);
    this.handleBuy = this.handleBuy.bind(this);
  }

  handleBuy() {
    const { id, price } = this.props.product;
    this.props.buyProduct(id, price);
  }

  render() {
    const { name, origin, quantity, price } = this.props.product;
    return (
      <tr>
        <td>{this.props.id}</td>
        <td>{name}</td>
        <td>{origin}</td>
        <td>{quantity}</td>
        <td>{price}</td>
        <td>
          <button onClick={this.handleBuy}>Buy</button>
        </td>
      </tr>
    );
  }
}

export default ProductRow;
