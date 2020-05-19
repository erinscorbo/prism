import React from "react";
import Products from "../containers/Products.js";
import StoreDetails from "../containers/StoreDetails.js";
class Store extends React.Component {
  constructor(props) {
    super(props);
    this.state = { checked: true };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ checked: !this.state.checked });
  }
  render() {
    return (
      <li>
        <input
          type="checkbox"
          onChange={this.handleChange}
          checked={this.state.checked}
        />
        <i></i>
        <h2>
          {" "}
          <img
            src={this.props.thumbnail}
            alt="store logo"
            width="50px"
            height="50px"
          />
          <span>{this.props.name}</span>
          <span>{this.props.city}</span>
        </h2>
        <div className="products">
          <StoreDetails
            mode="edit"
            id={this.props.id}
            storeData={this.props}
            handleDelete={this.props.handleDelete}
            handleSubmit={this.props.handleSubmit}
          />
          <Products productsList={this.props.productsList} />
        </div>
      </li>
    );
  }
}

export default Store;
