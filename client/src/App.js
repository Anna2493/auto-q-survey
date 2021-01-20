import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { MyProvider } from './Context';

import Home from './pages/HomePage';
import Registration from './pages/Registration';
import Profile from './pages/Profile';
import CreateSurvey_Step1 from './pages/CreateSurvey_Step1';

export default class App extends React.Component {
  render() {
    return (
      <MyProvider>
        <Router basename={window.location.pathname || ""}>
          <div>
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/register" component={Registration} />
              <Route path="/profile" component={Profile} />
              <Route path="/CreateSurvey_Step1" component={CreateSurvey_Step1} />
            </Switch>
          </div>
        </Router>
      </MyProvider>
    );
  }
}

const HomePage = () => (
  <div>
    <Home />
  </div>
);

