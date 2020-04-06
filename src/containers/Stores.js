import React from 'react';
import data from '.data/mockData.json'
//is the import statement correct?
render() {
 return (
   //should i be defining a list as a constant with a key using li and then ul?
  <ul>
    {data.map(store => {<Store name={store.name}
       address={store.address} />
      })
    }
</ul>
)}
