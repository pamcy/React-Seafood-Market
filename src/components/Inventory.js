import React from 'react';
import PropTypes from 'prop-types';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';

class Inventory extends React.Component {
  static propTypes = {
    fishes: PropTypes.object,
    addFish: PropTypes.func,
    updateFish: PropTypes.func,
    removeFish: PropTypes.func,
    loadSampleFishes: PropTypes.func,
  };

  render() {
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {Object.keys(this.props.fishes).map(item => (
          <EditFishForm
            key={item}
            id={item}
            details={this.props.fishes[item]}
            updateFish={this.props.updateFish}
            removeFish={this.props.removeFish}
          />
        ))}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSampleFishes}>
          Load Sample Fishes
        </button>
      </div>
    );
  }
}

export default Inventory;
