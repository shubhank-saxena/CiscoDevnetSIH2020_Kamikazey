/** @format */

import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

function RouteWrapper({
  component: Component,
  isPrivate,
  isLoginRoute,
  isSysAdmin,
  isAssistant,
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

  if (isLoginRoute && isAuthenticated && userType === 'Sys-Admin') {
    return <Redirect to="/dashboard" />;
  }

  if (isLoginRoute && isAuthenticated && userType === 'Assistant') {
    return <Redirect to="/dashboard-alt" />;
  }

  /**
   * If not included on both previous cases, redirect user to the desired route.
   */

  if (isSysAdmin && userType === 'Assistant') {
    return <Redirect to="/dashboard-alt" />;
  }
  if (isAssistant && userType === 'Sys-Admin') {
    return <Redirect to="/dashboard" />;
  }
  return <Route {...rest} component={Component} />;
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
  isLoginRoute: PropTypes.bool,
  isSysAdmin: PropTypes.bool,
  isAssistant: PropTypes.bool,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(RouteWrapper);
