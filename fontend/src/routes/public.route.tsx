import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../utils/Auth.context';

const PublicRoute = ({ component: Component, restricted, ...rest }: any) => {
  const useAuthContext = React.useContext(AuthContext);
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route
      {...rest}
      render={(props) =>
        useAuthContext.authenticated && restricted ? (
          <Redirect to="/dashboard" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
