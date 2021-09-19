import React from 'react';
import { ACCESS_TOKEN, ROUTES } from '../../constants';
import { history } from '../../utils';

export function Auth() {
  const handleLogin = () => {
    window.localStorage.setItem(ACCESS_TOKEN, 'is_user_logged');
    history.push(ROUTES.ADMIN);
  };

  return <button onClick={handleLogin}>Login</button>;
}
