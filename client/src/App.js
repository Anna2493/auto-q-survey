import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { MyProvider } from './Context';

import Home from './pages/HomePage';
import Registration from './pages/Registration';
import Profile from './pages/Profile';
import CreateSurvey_Step1 from './pages/CreateSurvey_Step1';
import CreateSurvey_Step2 from './pages/CreateSurvey_Step2';
import CreateSurvey_Step3 from './pages/CreateSurvey_Step3';
import ManuallStatements from './pages/ManuallStatements';
import UploadStatements from './pages/UploadStatements';
import CreateSurvey_Step4 from './pages/CreateSurvey_Step4';

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
              <Route path="/CreateSurvey_Step2" component={CreateSurvey_Step2} />
              <Route path="/CreateSurvey_Step3" component={CreateSurvey_Step3} />
              <Route path="/ManuallStatements" component={ManuallStatements} />
              <Route path="/UploadStatements" component={UploadStatements} />
              <Route path="/CreateSurvey_Step4" component={CreateSurvey_Step4} />
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

