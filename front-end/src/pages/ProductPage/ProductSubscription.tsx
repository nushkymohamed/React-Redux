import React, { lazy, Suspense } from 'react';
import OverlayLoader from '../../Components/Overlay/OverlayLoader';

const ProductSubscriptionContainer = lazy(
  () =>
    import(
      '../../Containers/ProductSubscriptionContainer/ProductSubscriptionContainer'
    )
);

const ProductSubscription = (props: any) => {
  return (
    <Suspense fallback={<OverlayLoader showLoader />}>
      <ProductSubscriptionContainer {...props} />
    </Suspense>
  );
};

export default ProductSubscription;
