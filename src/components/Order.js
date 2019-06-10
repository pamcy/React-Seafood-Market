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
          <li className="total">
            <strong>Total:</strong>
            {formatPrice(total)}
          </li>
        </TransitionGroup>
      </div>
    );
  }
}

export default Order;

// NOTE
/*
1. 如何使用 transition package？

it only tracks "enter" and "exit" states for the
components.

原本：
<ul className="order">
  {orderIDs.map(this.renderOrder)}
</ul>

<ul> 改成用 <TransitionGroup> 包起來
<TransitionGroup component="ul" className="order">
  {orderIDs.map(this.renderOrder)}
</TransitionGroup>

<li> 外層再用 <CSSTransition> 包起來，這層主要是寫 css transition 的關鍵
<CSSTransition {...transitionOptions}>
  <li key={id}></li>
</CSSTransition>

*/

/*
2. <CSSTransition> 裡的 prop

<CSSTransition
  key={id}
  timeout={{ enter: 500, exit: 500 }}
  classNames="order">
    <li key={id}>Sorry, {fish ? fish.name : 'fish'} is no longer available!</li>
</CSSTransition>;


如果一模一樣的 prop 會重複在不同地方使用時，可以改寫成這樣
↓↓↓
const transitionOptions = {
  key: id,
  timeout: { enter: 500, exit: 500 },
  classNames: 'order',
};

 <CSSTransition {...transitionOptions}></CSSTransition>
*/
