import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { ACCESS_TOKEN, ROUTES } from '../../constants';

export function PublicRoute({ children, props }) {
  const isAuth = window.localStorage.getItem(ACCESS_TOKEN);

  if (!isAuth) {
    return <Route {...props}>{children}</Route>;
  }
  return <Redirect to={ROUTES.ADMIN} />;
}
