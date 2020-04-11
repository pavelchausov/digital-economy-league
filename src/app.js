import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { DetailPage, MainPage } from './pages';


const App = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <MainPage />
      </Route>
      <Route exact path="/film/:filmId">
        <DetailPage />
      </Route>
    </Switch>
  </Router>
);

export default App;
