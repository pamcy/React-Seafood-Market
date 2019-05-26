import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes'; // small case for "sample" becoz it's not a class

class App extends React.Component {
  state = {
    fishes: {},
  };

  addFish = fish => {
    // Take a copy of the existing state
    const fishes = { ...this.state.fishes };

    // Give every fish a unique id, and add new fish into fishes
    fishes[`fish${Date.now()}`] = fish;

    // Set the new fishes object to state
    this.setState({
      fishes: fishes,
    });
  };

  loadSampleFishes = () => {
    this.setState({
      fishes: sampleFishes,
    });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
        </div>
        <Order />
        <Inventory
          addFish={this.addFish}
          loadSampleFishes={this.loadSampleFishes}
        />
      </div>
    );
  }
}

export default App;

// NOTE
/*
1. state 也可以寫在 constructor 裡面
class App extends React.Component {
  constructor() {
    super();
    this.state = {

    }
  }
}
*/

/*
2. state 一定要給個空的預設初始值，在畫面還沒 mount 前用
state = {
  fishes1 = "", // string
  fishes2 = null, // number
  fishes3 = [], // array
  fishes4 = {}, // object
}
*/
