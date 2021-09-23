import React, { lazy, Suspense } from 'react';
import OverlayLoader from '../../Components/Overlay/OverlayLoader';

const NotificationContainer = lazy(
  () => import('../../Containers/Notification/NotificationContainer')
);

const Notifications = (props: any) => {
  return (
    <Suspense fallback={<OverlayLoader showLoader />}>
      <NotificationContainer {...props} />
    </Suspense>
  );
};
export default Notifications;
