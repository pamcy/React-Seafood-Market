import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes'; // small case for "sample" becoz it's not a class
import Fish from './Fish';

class App extends React.Component {
  state = {
    fishes: {},
    order: {},
  };

  addFish = fish => {
    // Take a copy of the existing state
    const fishes = { ...this.state.fishes };

    // Give every fish a unique id, and add new fish into fishes
    fishes[`fish${Date.now()}`] = fish;

    // Set the new fishes object to state
    this.setState({
      fishes, // fishes: fishes (es5)
    });
  };

  addToOrder = id => {
    // Take a copy of existing state
    const order = { ...this.state.order };

    // Default amount is 1 (add to the order), or update the amount in order
    // ex. order.fish1 = order.fish1 + 1 || 1
    // If order.fish1 exists, then increment by 1, if not, then return 1
    order[id] = order[id] + 1 || 1;

    // Set the new order object to state
    this.setState({
      order, // order: order (es5)
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
          <ul className="list-of-fishes">
            {/* Turn object keys into array then map over it */}
            {Object.keys(this.state.fishes).map(item => (
              <Fish
                key={item}
                id={item}
                details={this.state.fishes[item]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
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
