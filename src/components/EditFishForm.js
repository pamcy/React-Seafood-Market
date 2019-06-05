import React from 'react';

class EditFishForm extends React.Component {
  /**
   * How to handling multiple inputs (ES6 computed property name)
   * https://reactjs.org/docs/forms.html#handling-multiple-inputs
   */
  handleInputChange = e => {
    const updatedFish = {
      ...this.props.details, // Take a copy of current fish detail
      [e.currentTarget.name]: e.currentTarget.value, // overwrite the one thing that changed
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

// NOTE
/*
1. 想要將使用者輸入的值寫入 state，必須加上 "onChange" method，只有在 input 欄位加上 value 會無法寫入，log 會警告只能讀取無法修改，React 希望統一把 changing value 寫入 state 管理。

2. 解析 handleInputChange
const fish = {
  ...this.props.details,
  [e.currentTarget.name]: e.currentTarget.value,
}

為了讓 "updateFish" method (in App.js) 可以直接將每隻魚的全部資訊直接寫入 state，樓上的 "fish" object 不只含有使用者更新的 input name 和 input value，另外也 copy details 所有欄位，讓最後 fish 會包含所有 input 欄位送給 state（如下）。

{desc: "These tender, mouth-watering beauties are a fantastic hit at any dinner party.", image: "/images/lobster.jpg", name: "Lobster YEAHs", price: "6400", status: "unavailable"}

fish = all input field and values + updated inputs

*/
