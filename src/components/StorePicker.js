import React from 'react';

class StorePicker extends React.Component {
  render() {
    return (
      <React.Fragment>
        <p>Dummy p tag for demo purpose only</p>
        <form action="" className="store-selector">
          {/* this is a demo comment */}
          <h2>Please Enter A Store</h2>
          <input type="text" placeholder="Enter a store name" required />
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
