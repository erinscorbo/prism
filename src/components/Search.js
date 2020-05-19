import React from "react";

class Search extends React.Component {
  render() {
    //logic
    return (
      <form onSubmit={this.props.submitFunction}>
        <label htmlFor="query"> Search for product:</label>
        <br />
        <input type="text" id="query" name="query" />
        <br />
      </form>
    );
  }
}

export default Search;
