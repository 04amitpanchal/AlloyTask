import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../utils/Auth.context';

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const useAuthContext = React.useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        useAuthContext.authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
