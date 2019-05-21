import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import StorePicker from './StorePicker';
import App from './App';
import NotFound from './NotFound';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={StorePicker} />
      <Route path="/store/:storeId" component={App} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;


// NOTE

// React 是由一堆 Component 組成，包括 router 也是，所以要另外建一支 Router Component

// <Switch> 裡會由上而下試所有的 <Route>，如果第一個不成功，就試第二個，一旦完全沒有符合的就會跳到 NotFound 404 頁面

// exact：path exactly match ./ (首頁), we want to render out the 'StorePicker' component

// /store/:storeId ：任何接在 /store/ 後面的字眼網址 ex. http://localhost:3000/store/test123，都會 render 'App' component
