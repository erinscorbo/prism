import React from "react";
import Store from "../components/Store";
class Stores extends React.Component {
  render() {
    return (
      <ul>
        {this.props.stores.length > 0 &&
          this.props.stores
            .filter((store) => {
              return (
                store.name
                  .toLowerCase()
                  .includes(this.props.filter.toLowerCase()) ||
                this.props.filter === "" ||
                store.Products.filter((product) =>
                  product.productTitle
                    .toLowerCase()
                    .includes(this.props.filter.toLowerCase())
                ).length > 0
              );
            })
            .map((store) => (
              <Store
                key={store._id}
                id={store._id}
                name={store.name}
                city={store.city}
                thumbnail={store.thumbnail}
                productsList={store.Products}
                handleDelete={this.props.handleDelete}
                handleSubmit={this.props.handleSubmit}
              />
            ))}
      </ul>
    );
  }
}

export default Stores;
