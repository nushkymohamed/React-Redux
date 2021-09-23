import React, { lazy, Suspense } from 'react';
import OverlayLoader from '../../../Components/Overlay/OverlayLoader';

const CreateProductContainer = lazy(
  () => import('../../../Containers/CreateProduct/CreateProductContainer')
);

const CreateProduct = (props: any) => {
  return (
    <Suspense fallback={<OverlayLoader showLoader />}>
      <CreateProductContainer {...props} />
    </Suspense>
  );
};

export default CreateProduct;
