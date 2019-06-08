import React from 'react';
import PropTypes from 'prop-types';

const Header = props => (
  <header className="top">
    <h1>
      Catch
      <span className="ofThe">
        <span className="of">of</span>
        <span className="the">the</span>
      </span>
      day
    </h1>
    <h3 className="tagline">
      <span>{props.tagline}</span>
    </h3>
  </header>
);

Header.propTypes = {
  tagline: PropTypes.string.isRequired,
};

export default Header;

// NOTE
// 如果 Component 只有一個 render() method，不需要建立一個 class，可以改寫成 Stateless Component
// Stateless Component 的幾種寫法

/*
1. 傳統寫法
function Header(props) {
  return (
    <header className="top">
      <h1>
        Catch
        <span className="ofThe">
          <span className="of">of</span>
          <span className="the">the</span>
        </span>
        day
      </h1>
      <h3 className="tagline">
        <span>{props.tagline}</span>
      </h3>
    </header>
  );
}
*/

/*
2. 存成變數
const Header = (props) => {
  return (
    <header className="top">
      <h1>
        Catch
        <span className="ofThe">
          <span className="of">of</span>
          <span className="the">the</span>
        </span>
        day
      </h1>
      <h3 className="tagline">
        <span>{props.tagline}</span>
      </h3>
    </header>
  )
}
*/

/*
3. 簡潔寫法：省略 {} 和 return (Implicit Return)
const Header = props => (
  <header className="top">
    <h1>
      Catch
      <span className="ofThe">
        <span className="of">of</span>
        <span className="the">the</span>
      </span>
      day
    </h1>
    <h3 className="tagline">
      <span>{props.tagline}</span>
    </h3>
  </header>
);
*/

/*
4. Destructuring 寫法: Destruct the props into its own variables
const Header = ({ tagline }) => (
  <header className="top">
    <h1>
      Catch
      <span className="ofThe">
        <span className="of">of</span>
        <span className="the">the</span>
      </span>
      day
    </h1>
    <h3 className="tagline">
      <span>{tagline}</span>
    </h3>
  </header>
)
*/
