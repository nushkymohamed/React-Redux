import React from 'react';
import CreateInterviewContainer from '../../Containers/CreateInterview/CreateInterviewContainer';
import ViewProductContainer from '../../Containers/ProductContainter/ViewProductContainer';
import { uuidv4 } from '../../Helper';
import Admin from '../../pages/AdminPage/Admin';
import CreateAssessment from '../../pages/AdminPages/CreateAssessment/CreateAssessment';
import CreateDocument from '../../pages/AdminPages/CreateDocument/CreateDocument';
import CreateLinkedDocument from '../../pages/AdminPages/CreateLinkedDocument/CreateLinkedDocument';
import CreateProduct from '../../pages/AdminPages/CreateProduct/CreateProduct';
import CreateTutor from '../../pages/AdminPages/CreateTutor/CreateTutor';
import CreateVideo from '../../pages/AdminPages/CreateVideo/CreateVideo';
import AdminHomePage from '../../pages/AdminPages/Home';
import Product from '../../pages/AdminPages/Product/Product';
import Subscription from '../../pages/AdminPages/Subscription/Subscription';
import UserManagement from '../../pages/AdminPages/UserManagement/UserManagement';
import Landing from '../../pages/HomePage/Landing';
import DefaultRoute from '../DefaultRoute';
import ProtectedRoute from '../ProtectedRoute';

export const AdminRoutersGroup = () => [
  <ProtectedRoute
    exact
    isAdmin
    path="/admin"
    component={Admin}
    key={uuidv4()}
  />,
  <ProtectedRoute
    isAdmin
    path="/admin/home/:syllabusId/:gradeId"
    component={Landing}
    key={uuidv4()}
  />,
  <ProtectedRoute
    isAdmin
    path="/admin/create-video/:syllabusId/:gradeId/:subjectId"
    component={CreateVideo}
    key={uuidv4()}
  />,
  <ProtectedRoute
    isAdmin
    path="/admin/create-document/:syllabusId/:gradeId/:subjectId"
    component={CreateDocument}
    key={uuidv4()}
  />,
  <ProtectedRoute
    path="/admin/create-assessment/:syllabusId/:gradeId/:subjectId"
    component={CreateAssessment}
    key={uuidv4()}
  />,
  <ProtectedRoute
    isAdmin
    path="/admin/products"
    component={Product}
    key={uuidv4()}
  />,
  <ProtectedRoute
    isAdmin
    path="/admin/create-product"
    component={CreateProduct}
    key={uuidv4()}
  />,

  <ProtectedRoute
    path="/admin/view-products"
    component={ViewProductContainer}
    key={uuidv4()}
  />,
  <ProtectedRoute
    path="/admin/user-management/create-tutor"
    component={CreateTutor}
    key={uuidv4()}
  />,

  <ProtectedRoute
    exact
    path="/admin/user-management/:type?"
    component={UserManagement}
    key={uuidv4()}
  />,

  <DefaultRoute
    path="/admin/create-linked-document/:syllabusId/:gradeId/:subjectId"
    component={CreateLinkedDocument}
    key={uuidv4()}
  />,

  <DefaultRoute
    path="/create-interview"
    component={CreateInterviewContainer}
    key={uuidv4()}
  />,

  <ProtectedRoute
    isAdmin
    path="/admin/subscription"
    component={Subscription}
    key={uuidv4()}
  />,

  <ProtectedRoute
    isAdmin
    path="/admin/bulk-view/:subjectId"
    component={AdminHomePage}
  />,
];
