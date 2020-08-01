/** @format */

import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

function RouteWrapper({
  component: Component,
  isPrivate,
  isLoginRoute,
  supervisor,
  principal,
  cisadmin,
  auth: { isAuthenticated, userType },
  ...rest
}) {
  /**
   * Redirect user to SignIn page if he tries to access a private route
   * without authentication.
   */
  if (isPrivate && !isAuthenticated) {
    return <Redirect to="/" />;
  }

  /**
   * Redirect user to Main page if he tries to access a non private route
   * (SignIn or SignUp) after being authenticated.
   */

  if (isLoginRoute && isAuthenticated && userType === 'Supervisor') {
    return <Redirect to="/dashboard-supervisor" />;
  }

  if (isLoginRoute && isAuthenticated && userType === 'Principal') {
    return <Redirect to="/dashboard-principal" />;
  }
  if (isLoginRoute && isAuthenticated && userType === 'Cis-Admin') {
    return <Redirect to="/dashboard-cisadmin" />;
  }

  /**
   * If not included on both previous cases, redirect user to the desired route.
   */

  if (supervisor && userType !== 'Supervisor') {
    if (cisadmin) return <Redirect to="/dashboard-cisadmin" />;
    else return <Redirect to="/dashboard-principal" />;
  }
  if (principal && userType !== 'Principal') {
    if (cisadmin) return <Redirect to="/dashboard-cisadmin" />;
    else return <Redirect to="/dashboard-supervisor" />;
  }
  if (cisadmin && userType !== 'Cis-Admin') {
    if (supervisor) return <Redirect to="/dashboard-supervisor" />;
    else return <Redirect to="/dashboard-principal" />;
  }
  return <Route {...rest} component={Component} />;
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
  isLoginRoute: PropTypes.bool,
  supervisor: PropTypes.bool,
  principal: PropTypes.bool,
  cisadmin: PropTypes.bool,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(RouteWrapper);
