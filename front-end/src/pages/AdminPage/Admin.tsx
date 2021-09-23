import React, { lazy, Suspense } from 'react';
import OverlayLoader from '../../Components/Overlay/OverlayLoader';

const AdminHomeContainer = lazy(
  () => import('../../Containers/AdminHomeContainer/AdminHomeContainer')
);

const Admin = (props: any) => {
  return (
    <Suspense fallback={<OverlayLoader showLoader />}>
      <AdminHomeContainer {...props} />
    </Suspense>
  );
};

export default Admin;
