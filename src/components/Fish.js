import React from 'react';
import { formatPrice } from '../helpers';

class Fish extends React.Component {
  render() {
    const { image, desc, name, price, status } = this.props.details;
    const isAvailable = status === 'available';

    return (
      <li className="menu-fish">
        <img src={image} alt={name} />
        <h3 className="fish-name">
          {name}
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        {/* The button will be disabled when the value is true --> the fish is unavailable */}
        <button
          disabled={!isAvailable}
          onClick={() => this.props.addToOrder(this.props.id)}
        >
          {isAvailable ? 'Add to order' : 'Sold out!'}
        </button>
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

/*
2. addToOrder onClick button 可以另外拆出來寫成 method，或者如上頭原始碼寫成 inline （如果只有短短一行，寫成 inline 即可)

class Fish extends React.Component {
  handleClick = () => {
    this.props.addToOrder(this.props.no);
  };

  render() {
    const { image, desc, name, price, status } = this.props.details;
    const isAvailable = status === 'available';

    return (
      <li className="menu-fish">
        <button
          disabled={!isAvailable}
          onClick={this.handleClick}
        >
          {isAvailable ? 'Add to order' : 'Sold out'}
        </button>
      </li>
    );
  }
}
*/
