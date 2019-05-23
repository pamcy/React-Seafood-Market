import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  // Create empty ref. storeInput is as a property
  storeInput = React.createRef();

  // If you want to access 'this' inside the custom method:
  // Instead of declaring a method, we shold declare a property which is going to set the arrow function, then property will bound to the instance.
  handleSubmit = e => {
    // 1. Prevent the form from submitting
    e.preventDefault();

    // 2. Get input value
    // console.log(this); // StorePicker component
    const storeName = this.storeInput.current.value;

    // 3. change URL to whatever user entered
    // Pushstate: Change URL without refreshing the page
    // Get history props value from mama Router component
    // console.log(this.props.history);
    this.props.history.push(`/store/${storeName}`);
  };

  render() {
    return (
      <React.Fragment>
        <p>Dummy p tag for demo purpose only</p>
        <form action="" className="store-selector" onClick={this.handleSubmit}>
          {/* this is a demo comment */}
          <h2>Please Enter A Store</h2>
          <input
            type="text"
            placeholder="Enter a store name"
            ref={this.storeInput}
            defaultValue={getFunName()}
            required
          />
          <button type="submit">Visit store 👉</button>
        </form>
      </React.Fragment>
    );
  }
}

export default StorePicker;



// NOTE
/*
1. render() return 只能回傳一個 parent，如果要多個 children 必須用 <React.Fragment> 或 <></ >包起來

via: React v16.2.0: Improved Support for Fragments
https://reactjs.org/blog/2017/11/28/react-v16.2.0-fragment-support.html
*/

/*
2. comment 也不能馬上放在 return 之後，會出現 error，因為 return之後只能回傳一個 parent
*/

/*
3. <input type="text" value={getFunName()} />
"value" 專門用在和 state 綁定資料的時候。
input 的預設顯示值要用 "deaultValue"，當 component mounts to the page，會執行 getFunName() 回傳商店名字；
*/

/*
4. 如何取得 input value？

React 的準則是希望你不要用 selector 接觸到 DOM

(1) ref：下面和樓上示範用 ref 取得 dom element
(2) state：sync data between input value and state

用 ref 要注意 this 會變成 undefined，只要是在 component 底下自己另外新建的 method，預設 this 都不會和 React.component 綁定。

解法有以下幾種：
(1) 如樓上原始碼 (比較推，設成 arrow function)
(2) 建立 constructor，如下面的範例：
裡頭使用 bind，讓 handleSubmit 裡的 this (原本顯示 undefined) 指向 StorePicker component。但萬一有很多 method 都要綁定，就要寫好幾個 bind 在 constructor 裡，較不建議使用。

class StorePicker extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Create empty ref
  storeInput = React.createRef();

  handleSubmit(e) {
    e.preventDefault();

    // Get input value
    console.log(this); // StorePicker component
    console.log(this.storeInput);

  }

  render() {
    return (
      <React.Fragment>
        <p>Dummy p tag for demo purpose only</p>
        <form action="" className="store-selector" onClick={this.handleSubmit}>
          <input
            type="text"
            placeholder="Enter a store name"
            ref={this.storeInput}
            defaultValue={getFunName()}
            required
          />
          <button type="submit">Visit store 👉</button>
        </form>
      </React.Fragment>
    );
  }
}
*/
