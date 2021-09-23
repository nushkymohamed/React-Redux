import React, { FC, ReactNode } from 'react';
import { Route, Redirect } from 'react-router-dom';
import LoadingContainer from '../Containers/LoadingContainer/LoadingContainer';

interface DefaultRouteProps {
  component: ReactNode;
  path: string;
  exact?: boolean;
}

const DefaultRoute:FC<DefaultRouteProps> = ({ component, ...rest }) => {
 
  return (
    <Route
      {...rest}
      render={props => {
        return <LoadingContainer Component={component} {...props} />;
      }}
    />
  );
};

export default DefaultRoute;
