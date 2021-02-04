import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import ChatPage from './ChatPage';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={ChatPage} />
    </Switch>
  </BrowserRouter>
);

export default App;
