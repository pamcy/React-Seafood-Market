import React from 'react';
import { formatPrice } from '../helpers';

class Fish extends React.Component {
  render() {
    const { image, desc, name, price, status } = this.props.details;
    return (
      <li className="menu-fish">
        <img src={image} alt={name} />
        <h3 className="fish-name">
          {name}
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        <button>Add to order</button>
      </li>
    );
  }
}

export default Fish;

// NOTE
/*
1. 和樓上用 Destructuring 寫法對照，底下用一般寫法取 props 的值 (較攏長麻煩)

class Fish extends React.Component {
  render() {
    return (
      <li className="menu-fish">
        <img src={this.props.details.image} alt={this.props.details.name} />
        <h3 className="fish-name">{this.props.details.name}</h3>
      </li>
    );
  }
}
*/
