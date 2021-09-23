import React, { lazy, Suspense } from 'react';
import OverlayLoader from '../../../Components/Overlay/OverlayLoader';

const SubscriptionContainer = lazy(
  () =>
    import(
      '../../../Containers/Subscription/SubscriptionContainer/SubscriptionContainer'
    )
);

const Subscription = (props: any) => {
  return (
    <Suspense fallback={<OverlayLoader showLoader />}>
      <SubscriptionContainer {...props} />
    </Suspense>
  );
};

export default Subscription;
