import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import Loading from '../../Components/Loading/Loading';
import { RootStore } from '../../redux/store';

interface LoadingContainerProps {
  Component: any;
}

const LoadingContainer: FC<LoadingContainerProps> = props => {
  const { Component, ...rest } = props;

  const { loading: userLoading } = useSelector(
    (state: RootStore) => state.signup
  );

  const showLoader = () => {
    if (userLoading) {
      return true;
    }

    return false;
  };

  return (
    <>
      {showLoader() ? <Loading /> : null}

      <Component {...rest} />
    </>
  );
};

export default LoadingContainer;
