import React, { lazy, Suspense } from 'react';
import OverlayLoader from '../../Components/Overlay/OverlayLoader';

const BulkViewContainer = lazy(
  () => import('../../Containers/BulkView/BulkViewContainer')
);

const BulkViewPage = (props: any) => {
  return (
    <Suspense fallback={<OverlayLoader showLoader />}>
      <BulkViewContainer {...props} />
    </Suspense>
  );
};

export default BulkViewPage;
