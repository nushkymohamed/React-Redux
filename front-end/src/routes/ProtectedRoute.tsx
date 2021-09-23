import React, { FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { userRoles } from '../config/constants';
import LoadingContainer from '../Containers/LoadingContainer/LoadingContainer';
import { RootStore } from '../redux/store';

interface ProtectedRouteProps {
  component: ReactNode;
  path: string;
  exact?: boolean;
  isAdmin?: boolean;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({
  component,
  isAdmin,
  ...rest
}) => {
  const { userData, user } = useSelector((state: RootStore) => state.auth);

  return (
    <Route
      {...rest}
      render={props => {
        if (userData?.email) {
          if (isAdmin && user?.roles && !user.roles.includes(userRoles.admin)) {
            return <Redirect to={'/'} />;
          }
          return <LoadingContainer Component={component} {...props} />;
        }
        return <Redirect to={'/login'} />;
      }}
    />
  );
};

export default ProtectedRoute;
