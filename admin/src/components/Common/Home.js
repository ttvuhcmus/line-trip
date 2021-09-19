import React from 'react';
import { Redirect } from 'react-router-dom';
import { ACCESS_TOKEN, ROUTES } from '../../constants';

export function Home() {
  const isAuth = window.localStorage.getItem(ACCESS_TOKEN);

  if (isAuth) {
    return <Redirect to={ROUTES.ADMIN} />;
  }
  return <Redirect to={ROUTES.LOGIN} />;
}
