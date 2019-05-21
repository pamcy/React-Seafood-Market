import React from 'react';
// import { Component } from 'react'; // 也可以這樣寫
import { render } from 'react-dom'; // {} means Cheery pick only the render method from 'react-dom' package
import StorePicker from './components/StorePicker';
import App from './components/App';
import './css/style.css';

render(<App />, document.querySelector('#main'));
