import React from 'react';
import PropTypes from 'prop-types';

class EditFishForm extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    details: PropTypes.shape({
      name: PropTypes.string,
      desc: PropTypes.string,
      image: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.number,
    }),
    updateFish: PropTypes.func,
    removeFish: PropTypes.func,
  };

  /**
   * How to handling multiple inputs (ES6 computed property name)
   * https://reactjs.org/docs/forms.html#handling-multiple-inputs
   */
  handleInputChange = e => {
    const updatedFish = {
      ...this.props.details, // Take a copy of current fish detail
      [e.currentTarget.name]:
        e.currentTarget.name === 'price'
          ? parseFloat(e.currentTarget.value)
          : e.currentTarget.value, // overwrite the one thing that changed
    };

    this.props.updateFish(this.props.id, updatedFish);
  };

  render() {
    const { name, price, status, desc, image } = this.props.details;

    return (
      <div className="fish-edit">
        <input
          name="name"
          type="text"
          value={name}
          onChange={this.handleInputChange}
        />
        <input
          name="price"
          type="text"
          value={price}
          onChange={this.handleInputChange}
        />
        <select
          name="status"
          type="text"
          value={status}
          onChange={this.handleInputChange}
        >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea name="desc" value={desc} onChange={this.handleInputChange} />
        <input
          name="image"
          type="text"
          value={image}
          onChange={this.handleInputChange}
        />
        <button onClick={() => this.props.removeFish(this.props.id)}>
          Remove Fish
        </button>
      </div>
    );
  }
}

export default EditFishForm;
