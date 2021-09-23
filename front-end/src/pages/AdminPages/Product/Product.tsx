import React, { lazy, Suspense } from 'react';
import OverlayLoader from '../../../Components/Overlay/OverlayLoader';

const ViewProductContainer = lazy(
  () => import('../../../Containers/ProductContainter/ViewProductContainer')
);

const Product = (props: any) => {
  return (
    <Suspense fallback={<OverlayLoader showLoader />}>
      <ViewProductContainer {...props} />
    </Suspense>
  );
};

export default Product;
