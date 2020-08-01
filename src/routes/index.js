/** @format */

import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import School from '../pages/School';
import CisAdmin from '../pages/AssistantPages';
const Routes = () => {
  return (
    <>
      <Switch>
        <Route
          exact
          path="/dashboard"
          component={Dashboard}
          isPrivate
          isSysAdmin
        />
        <Route
          exact
          path="/school/:id"
          component={School}
          isPrivate
          isSysAdmin
        />
        <Route exact path="/home" component={Home} isPrivate isSysAdmin />
        <Route
          exact
          path="/dashboard-alt"
          component={CisAdmin}
          isPrivate
          isAssistant
        />
        <Route exact path="/" component={Login} isLoginRoute />
      </Switch>
    </>
  );
};

export default Routes;
