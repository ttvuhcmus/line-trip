import React from 'react';
import { ROUTES } from './constants';
import { Switch, Route } from 'react-router-dom';
import { Admin, Auth } from './components/Layout';
import { Home, NotFound, PrivateRoute, PublicRoute } from './components/Common';

function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>

      <PublicRoute path={ROUTES.LOGIN}>
        <Auth />
      </PublicRoute>

      <PrivateRoute path={ROUTES.ADMIN}>
        <Admin />
      </PrivateRoute>

      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default App;
