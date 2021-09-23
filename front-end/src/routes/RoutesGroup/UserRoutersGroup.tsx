import React from 'react';
import { uuidv4 } from '../../Helper';
import UserDetails from '../../pages/AdminPages/UserDetails/UserDetails';
import BulkViewPage from '../../pages/BulkViewPage/BulkViewPage';
import Notifications from '../../pages/NotificationPage';
import ProductSubscription from '../../pages/ProductPage/ProductSubscription';
import StudentHomePage from '../../pages/StudentPage/StudentHomePage';
import TheaterPage from '../../pages/TheaterPage/TheaterPage';
import TrialSubjects from '../../pages/TrialPages/TrialSubjects';
import ProtectedRoute from '../ProtectedRoute';

export const UserRoutersGroup = () => [
  <ProtectedRoute
    path="/user-management/:userType/:userId"
    component={UserDetails}
    key={uuidv4()}
  />,
  <ProtectedRoute path="/home" component={StudentHomePage} key={uuidv4()} />,

  <ProtectedRoute
    path="/notifications"
    component={Notifications}
    key={uuidv4()}
  />,
  <ProtectedRoute
    path="/bulk-view/:subjectId"
    component={BulkViewPage}
    key={uuidv4()}
  />,
  <ProtectedRoute
    path="/products"
    component={ProductSubscription}
    key={uuidv4()}
  />,
  <ProtectedRoute
    path="/trial/select-subjects"
    component={TrialSubjects}
    key={uuidv4()}
  />,
  <ProtectedRoute
    path="/theater/:contentId"
    component={TheaterPage}
    key={uuidv4()}
  />,
];
