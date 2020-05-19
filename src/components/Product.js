import React from "react";

class Product extends React.Component {
  render() {
    return (
      <li className="productDisplay">
        <span>
        {this.props.productTitle}
        </span>
        <span>
        {this.props.productDescription}
        </span>
        <span>
        {this.props.price}
        </span>
      </li>
    );
  }
}

export default Product;
