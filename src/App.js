import React from "react";
import Search from "./components/Search";
import Stores from "./containers/Stores";
import StoreDetails from "./containers/StoreDetails";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stores: [],
      searchValue: "",
      addNameValue: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addStore = this.addStore.bind(this);
    this.deleteStore = this.deleteStore.bind(this);
    this.updateStore = this.updateStore.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:1234/stores/getstores")
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => this.setState({ stores: data }))
      .catch((error) => {
        console.log("error", error);
      });
  }
  updateStore(storeID, formData) {
    const storeData = {
      name: formData.name,
      city: formData.city,
      thumbnail: formData.thumbnail,
      Products: formData.Products.map((product) => ({
        productTitle: product.productname,
        productDescription: product.productdescript,
        price: product.productprice,
      })),
    };
    fetch("http://localhost:1234/stores/" + storeID + "/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(storeData),
    })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response;
      })
      .then((data) => console.log(data))
      .then((data) =>
        this.setState((state) => {
          const newList = this.state.stores.map((store) => {
            if (store._id === storeID) {
              return { _id: storeID, ...storeData };
            } else {
              return store;
            }
          });
          return {
            ...state,
            stores: newList,
          };
        })
      )
      .catch((error) => {
        console.log("error", error);
      });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.setState({ searchValue: event.target[0].value });
  }
  deleteStore(storeID) {
    fetch("http://localhost:1234/stores/" + storeID + "/delete/", {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response;
      })
      .then((data) => console.log(data))
      .then((data) =>
        this.setState((state) => {
          const newList = state.stores.filter((store) => store._id !== storeID);
          return {
            ...state,
            stores: newList,
          };
        })
      )
      .catch((error) => {
        console.log("error", error);
      });
  }
  addStore(formData) {
    const storeData = {
      name: formData.name,
      city: formData.city,
      thumbnail: formData.thumbnail,
      Products: formData.Products.map((product) => ({
        productTitle: product.productname,
        productDescription: product.productdescript,
        price: product.productprice,
      })),
    };
    fetch("http://localhost:1234/stores/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(storeData),
    })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response;
      })
      .then((data) => console.log(data))
      .then((data) =>
        this.setState((state) => {
          const newList = [...state.stores, storeData];
          return {
            ...state,
            stores: newList,
          };
        })
      )
      .catch((error) => {
        console.log("error", error);
      });
  }
  render() {
    return (
      <div className="App">
        <header>
          <div className="overlay">PRISM</div>
        </header>
        <div>
          <h1>
            <Search submitFunction={this.handleSubmit} />
          </h1>
          <StoreDetails handleSubmit={this.addStore} mode="add" />
          <Stores
            filter={this.state.searchValue}
            stores={this.state.stores}
            handleDelete={this.deleteStore}
            handleSubmit={this.updateStore}
          />
        </div>
      </div>
    );
  }
}
export default App;
