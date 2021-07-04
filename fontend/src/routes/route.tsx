import React, { useContext } from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard/Dashboard';
import Login from '../pages/Login/login';
import RegisterUser from '../pages/Register/register';
import { AuthContext } from '../utils/Auth.context';

const MainRoute = () => {
  const useAuthContext = useContext(AuthContext);
  return (
    <Router basename="">
      <Switch>
        <Route exact path="/" component={Login} />
        <Route component={RegisterUser} path="/register" exact />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  );
};

export default MainRoute;
