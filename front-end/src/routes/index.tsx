import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FooterContainer from '../Containers/FooterContainer/FooterContainer';
import HeaderContainers from '../Containers/HeaderContainers/HeaderContainers';
import Websocket from '../Containers/websocket/Websocket';
import Error404 from '../pages/ErrorPage/Error404';
import Landing from '../pages/HomePage/Landing';
import ProtectedRoute from './ProtectedRoute';
import { AdminRoutersGroup } from './RoutesGroup/AdminRoutersGroup';
import { LoginAndSignupRoutersGroup } from './RoutesGroup/LoginAndSignupRoutersGroup';
import { UserRoutersGroup } from './RoutesGroup/UserRoutersGroup';

const Routes = () => (
  <Router>
    <Websocket />
    <HeaderContainers />
    <Switch>
      <ProtectedRoute exact path="/" component={Landing} />
      {AdminRoutersGroup()}
      {LoginAndSignupRoutersGroup()}
      {UserRoutersGroup()}
      <Route component={Error404} />
    </Switch>
    <FooterContainer />
  </Router>
);

export default Routes;
