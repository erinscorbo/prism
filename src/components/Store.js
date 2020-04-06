import React from 'react'
//questions: how do we receive the props?
//should I use class architecture or not?
class Store extends React.Component
{
  render() {
    return (
      <li>
        {this.props.name}
        {this.props.address}
    </li>
    );
  }
}
