/** @format */

import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import School from '../pages/School';
import CisAdmin from '../pages/AssistantPages';
import Principal from '../pages/Principal';
import Student from '../components/Principal/Student';
const Routes = () => {
  return (
    <>
      <Switch>
        <Route
          exact
          path="/school/:id"
          component={School}
          isPrivate
          supervisor
        />
        <Route
          exact
          path="/dashboard-supervisor"
          component={Dashboard}
          isPrivate
          supervisor
        />
        <Route
          exact
          path="/dashboard-cisadmin"
          component={CisAdmin}
          isPrivate
          cisadmin
        />
        <Route
          exact
          path="/dashboard-principal"
          component={Principal}
          isPrivate
          principal
        />
        <Route exact path="/student" component={Student} isPrivate principal />
        <Route exact path="/" component={Login} isLoginRoute />
      </Switch>
    </>
  );
};

export default Routes;
