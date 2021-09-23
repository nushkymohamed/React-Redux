import React, { lazy, Suspense } from 'react';
import OverlayLoader from '../../Components/Overlay/OverlayLoader';

const StudentSignUpContainer = lazy(
  () => import('../../Containers/SignUp/Student/StudentSignUpContainer')
);

const StudentSignUp = () => {
  return (
    <Suspense fallback={<OverlayLoader showLoader />}>
      <StudentSignUpContainer />
    </Suspense>
  );
};

export default StudentSignUp;
