import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { DetailPage, MainPage } from './pages';


const App = () => (
  <Router>
    <Switch>
      <Route path="/:filmId">
        <span>123412</span>
        {/* <DetailPage /> */}
      </Route>
      <Route exact path="/">
        <span>123</span>
        {/* <MainPage /> */}
      </Route>
    </Switch>
  </Router>
);

export default App;
