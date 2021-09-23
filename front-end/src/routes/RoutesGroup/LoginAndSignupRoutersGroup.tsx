import React from 'react';
import { uuidv4 } from '../../Helper';
import Login from '../../pages/LogInPage/Login';
import Confirmation from '../../pages/SignUpPage/Confirmation';
import Signup from '../../pages/SignUpPage/SignUp';
import StudentSignUp from '../../pages/SignUpPage/StudentSignUp';
import DefaultRoute from '../DefaultRoute';
//!TODO  commented for reduce bundle size
// import ParentSignUp from '../../pages/SignUpPage/ParentSignUp';
// import TeacherSignUp from '../../pages/SignUpPage/TeacherSignUp';
export const LoginAndSignupRoutersGroup = () => [
  <DefaultRoute path="/login" component={Login} key={uuidv4()} />,
  <DefaultRoute exact path="/signup" component={Signup} key={uuidv4()} />,
  <DefaultRoute
    path="/signup/student"
    component={StudentSignUp}
    key={uuidv4()}
  />,
  //!TODO  commented for reduce bundle size
  // <DefaultRoute
  //   path="/signup/parent"
  //   component={ParentSignUp}
  //   key={uuidv4()}
  // />,
  // <DefaultRoute
  //   path="/signup/teacher"
  //   component={TeacherSignUp}
  //   key={uuidv4()}
  // />,
  <DefaultRoute
    path="/signup/confirmation"
    component={Confirmation}
    key={uuidv4()}
  />,
];
