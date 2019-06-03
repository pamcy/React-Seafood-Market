import React from 'react';
import { formatPrice } from '../helpers';

class Order extends React.Component {
  renderOrder = id => {
    const order = this.props.order[id];
    const fish = this.props.fishes[id];
    const isAvailable = fish && fish.status === 'available';

    if (!fish) return null; // If there's no fish, then null will return nothing (Make sure the fish is loaded)

    if (!isAvailable) {
      return (
        <li key={id}>
          Sorry, {fish ? fish.name : 'fish'} is no longer available!
        </li>
      );
    }

    // Render should always "return" single element
    return (
      <li key={id}>
        {order}lbs {fish.name}
        {formatPrice(fish.price * order)}
      </li>
    );
  };

  render() {
    const orderIDs = Object.keys(this.props.order);
    const total = orderIDs.reduce((sum, id) => {
      const count = this.props.order[id];
      const fish = this.props.fishes[id];
      const isAvailable = fish && fish.status === 'available'; // If there's a fish and is available

      if (isAvailable) {
        return sum + count * fish.price;
      }

      return sum;

      // return isAvailable ? sum + count * fish.price : sum + 0;
    }, 0);

    return (
      <div className="order-wrap">
        <h2>Your Order</h2>
        <ul className="order">
          {orderIDs.map(this.renderOrder)}
          <li className="total">
            <strong>Total:</strong>
            {formatPrice(total)}
          </li>
        </ul>
      </div>
    );
  }
}

export default Order;
