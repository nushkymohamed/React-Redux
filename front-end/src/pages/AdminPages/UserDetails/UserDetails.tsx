import React, { lazy, Suspense } from 'react';
import OverlayLoader from '../../../Components/Overlay/OverlayLoader';

const UserDetailsContainer = lazy(
  () => import('../../../Containers/UserDetails/UserDetailsContainer')
);

const UserDetails = (props: any) => {
  return (
    <Suspense fallback={<OverlayLoader showLoader />}>
      <UserDetailsContainer {...props} />
    </Suspense>
  );
};

export default UserDetails;
