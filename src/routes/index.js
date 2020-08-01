/** @format */

import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import Login from '../pages/Login';
const Routes = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Login} isLoginRoute />
      </Switch>
    </>
  );
};

export default Routes;
