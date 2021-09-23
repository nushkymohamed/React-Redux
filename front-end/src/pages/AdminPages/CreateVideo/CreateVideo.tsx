import React, { lazy, Suspense } from 'react';
import OverlayLoader from '../../../Components/Overlay/OverlayLoader';

const CreateVideoContainer = lazy(
  () => import('../../../Containers/CreateVideo/CreateVideoContainer')
);

const CreateVideo = (props: any) => {
  return (
    <Suspense fallback={<OverlayLoader showLoader />}>
      <CreateVideoContainer {...props} />
    </Suspense>
  );
};

export default CreateVideo;
