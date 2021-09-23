import React, { lazy, Suspense } from 'react';
import OverlayLoader from '../../../Components/Overlay/OverlayLoader';

const CreateTutorContainer = lazy(
  () => import('../../../Containers/CreateTutor/CreateTutorContainer')
);

const CreateTutor = (props: any) => {
  return (
    <Suspense fallback={<OverlayLoader showLoader />}>
      <CreateTutorContainer {...props} />
    </Suspense>
  );
};

export default CreateTutor;
