import React, { lazy, Suspense } from 'react';
import OverlayLoader from '../../Components/Overlay/OverlayLoader';

const StudentHomeContainer = lazy(
  () => import('../../Containers/StudentHomeContainer/StudentHomeContainer')
);

const StudentHomePage = (props: any) => {
  return (
    <Suspense fallback={<OverlayLoader showLoader />}>
      <StudentHomeContainer {...props} />
    </Suspense>
  );
};

export default StudentHomePage;
