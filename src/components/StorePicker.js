import React from 'react';
import PropTypes from 'prop-types';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  // Create empty ref. storeInput is as a property
  storeInput = React.createRef();

  static propTypes = {
    history: PropTypes.object,
  };

  handleSubmit = e => {
    // 1. Prevent the form from submitting
    e.preventDefault();

    // 2. Get input value
    const storeName = this.storeInput.current.value;

    // 3. change URL to whatever user entered
    // Pushstate: Change URL without refreshing the page
    // Get history props value from mama Router component
    this.props.history.push(`/store/${storeName}`);
  };

  render() {
    return (
      <form action="" className="store-selector" onClick={this.handleSubmit}>
        <h2>Please Enter A Store</h2>
        <input
          type="text"
          placeholder="Enter a store name"
          ref={this.storeInput}
          defaultValue={getFunName()}
          required
        />
        <button type="submit">Visit store →</button>
      </form>
    );
  }
}

export default StorePicker;
