import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
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
      <Route path="*">
        <Redirect to="/" />
      </Route>
    </Switch>
  </Router>
);

export default App;
