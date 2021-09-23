import React, { lazy, Suspense } from 'react';
import OverlayLoader from '../../Components/Overlay/OverlayLoader';

const TheaterMode = lazy(
  () => import('../../Containers/TheaterMode/TheaterModeContainer')
);
const TheaterPage = (props: any) => {
  return (
    <Suspense fallback={<OverlayLoader showLoader />}>
      <TheaterMode {...props} />
    </Suspense>
  );
};

export default TheaterPage;
