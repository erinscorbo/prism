import React from "react";
import Product from "../components/Product";

class Products extends React.Component {
  render() {
    return (
      <ul>
        {this.props.productsList.map(product => (
          <Product
            key={product.productTitle}
            productTitle={product.productTitle}
            productDescription={product.productDescription}
            price={product.price}
          />
        ))}
      </ul>
    );
  }
}

export default Products;
