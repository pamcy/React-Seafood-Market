import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../helpers';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

class Order extends React.Component {
  static propTypes = {
    fishes: PropTypes.object,
    order: PropTypes.object,
    removeFromOrder: PropTypes.func,
  };

  renderOrder = id => {
    const count = this.props.order[id];
    const fish = this.props.fishes[id];
    const isAvailable = fish && fish.status === 'available';
    const transitionOptions = {
      key: id,
      timeout: { enter: 500, exit: 500 },
      classNames: 'order',
    };

    if (!fish) return null; // If there's no fish, then null will return nothing (Make sure the fish is loaded)

    if (!isAvailable) {
      return (
        <CSSTransition {...transitionOptions}>
          <li key={id}>
            Sorry, {fish ? fish.name : 'fish'} is no longer available!
          </li>
        </CSSTransition>
      );
    }

    // Render should always "return" single element
    return (
      <CSSTransition {...transitionOptions}>
        <li key={id}>
          <span>
            <TransitionGroup component="span" className="count">
              {/* key={count}: Tell CSSTransition to make two span elements, ex. 2 -> out, 3 -> in */}
              <CSSTransition
                key={count}
                timeout={{ enter: 500, exit: 500 }}
                classNames="count"
              >
                <span>{count}</span>
              </CSSTransition>
            </TransitionGroup>
            lbs {fish.name}
            <button onClick={() => this.props.removeFromOrder(id)}>
              &times;
            </button>
          </span>
          <span className="price">{formatPrice(fish.price * count)}</span>
        </li>
      </CSSTransition>
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
        <TransitionGroup component="ul" className="order">
          {orderIDs.map(this.renderOrder)}
        </TransitionGroup>
        <div className="total">
          <strong>Total:</strong>
          {formatPrice(total)}
        </div>
      </div>
    );
  }
}

export default Order;
