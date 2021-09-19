import React from 'react';
import { ACCESS_TOKEN, ROUTES } from '../../constants';
import { history } from '../../utils';

export function Admin() {
  const handleLogout = () => {
    window.localStorage.removeItem(ACCESS_TOKEN);
    history.push(ROUTES.LOGIN);
  };

  return <button onClick={handleLogout}>Logout</button>;
}
