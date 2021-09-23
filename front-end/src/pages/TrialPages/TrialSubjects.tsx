import React, { lazy, Suspense } from 'react';
import OverlayLoader from '../../Components/Overlay/OverlayLoader';

const TrialSubjectsContainer = lazy(
  () => import('../../Containers/Trial/TrialSubjectsContainer')
);

const TrialSubjects = (props: any) => {
  return (
    <Suspense fallback={<OverlayLoader showLoader />}>
      <TrialSubjectsContainer {...props} />
    </Suspense>
  );
};

export default TrialSubjects;
