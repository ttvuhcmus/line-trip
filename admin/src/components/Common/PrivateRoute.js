import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { ACCESS_TOKEN, ROUTES } from '../../constants';

export function PrivateRoute({ children, props }) {
  const isAuth = window.localStorage.getItem(ACCESS_TOKEN);

  if (isAuth) {
    return <Route {...props}>{children}</Route>;
  }
  return <Redirect to={ROUTES.LOGIN} />;
}
