import React, { lazy, Suspense } from 'react';
import OverlayLoader from '../../../Components/Overlay/OverlayLoader';

const UserManagementContainer = lazy(
  () =>
    import(
      '../../../Containers/UserManagementContainer/UserManagementContainer'
    )
);

const UserManagement = (props: any) => {
  return (
    <Suspense fallback={<OverlayLoader showLoader />}>
      <UserManagementContainer {...props} />
    </Suspense>
  );
};

export default UserManagement;
