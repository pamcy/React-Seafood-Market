import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends React.Component {
  state = {
    fishes: {},
    order: {},
  };

  static propTypes = {
    match: PropTypes.object,
  };

  /**
   * Sync data between firebase and state when component is on the page
   * https://github.com/tylermcginnis/re-base
   */
  componentDidMount() {
    const { params } = this.props.match;
    const localStorageValue = localStorage.getItem(params.storeId);

    if (localStorageValue) {
      this.setState({
        order: JSON.parse(localStorageValue), // Turn string into object
      });
    }

    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes',
    });
  }

  componentDidUpdate() {
    const { params } = this.props.match;

    // Turn object into string
    localStorage.setItem(params.storeId, JSON.stringify(this.state.order));
  }

  // Clean up when you left the store （memory leak）
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish = fish => {
    // Take a copy of the existing state
    const fishes = { ...this.state.fishes };

    // Give every fish a unique id, and add new fish into fishes
    fishes[`fish${Date.now()}`] = fish;

    // Set the new fishes object to state
    this.setState({
      fishes, // Equal to fishes: fishes (es5)
    });
  };

  updateFish = (id, updatedInfo) => {
    // ES6 computed property name
    const fishes = {
      ...this.state.fishes,
      [id]: updatedInfo,
    };

    // Same as above
    // const fishes = { ...this.state.fishes };
    // fishes[id] = fish;

    this.setState({ fishes });
  };

  removeFish = id => {
    const fishes = {
      ...this.state.fishes,
      [id]: null, // Set the fish i don't want to "null" not "delete" (Use "null" becoz there's weird thing on Firebase)
    };

    // Same as above
    // const fishes = { ...this.state.fishes };
    // fishes[id] = null;

    this.setState({ fishes });

    const order = { ...this.state.order };
    delete order[id];
    this.setState({ order });
  };

  addToOrder = id => {
    // Take a copy of existing state
    const order = { ...this.state.order };

    // Default amount is 1, or update the amount in order
    // ex. order.fish1 = order.fish1 + 1 || 1
    // If order.fish1 exists, then increment by 1, if not, then return 1
    order[id] = order[id] + 1 || 1;

    // Set the new order object to state
    this.setState({
      order,
    });
  };

  removeFromOrder = id => {
    const order = { ...this.state.order };

    delete order[id];
    this.setState({ order });
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
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          fishes={this.state.fishes}
          addFish={this.addFish}
          updateFish={this.updateFish}
          removeFish={this.removeFish}
          loadSampleFishes={this.loadSampleFishes}
          storeId={this.props.match.params.storeId}
        />
      </div>
    );
  }
}

export default App;
