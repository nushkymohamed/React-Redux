import React, { lazy, Suspense } from 'react';
import OverlayLoader from '../../Components/Overlay/OverlayLoader';

const LoginContainer = lazy(
  () => import('../../Containers/LogInContainer/LoginContainer')
);

const Login = (props: any) => {
  return (
    <Suspense fallback={<OverlayLoader showLoader />}>
      <LoginContainer {...props} />
    </Suspense>
  );
};

export default Login;
