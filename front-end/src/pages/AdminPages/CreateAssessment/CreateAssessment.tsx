import React, { lazy, Suspense } from 'react';
import OverlayLoader from '../../../Components/Overlay/OverlayLoader';

const AssessmentContainer = lazy(
  () => import('../../../Containers/Assessment/AssessmentContainer')
);

const CreateAssessment = (props: any) => {
  return (
    <Suspense fallback={<OverlayLoader showLoader />}>
      <AssessmentContainer {...props} />
    </Suspense>
  );
};

export default CreateAssessment;
