import React, { lazy, Suspense } from 'react';
import OverlayLoader from '../../../Components/Overlay/OverlayLoader';

const CreateDocumentContainer = lazy(
  () => import('../../../Containers/CreateDocument/CreateDocumentContainer')
);

const CreateDocument = (props: any) => {
  return (
    <Suspense fallback={<OverlayLoader showLoader />}>
      <CreateDocumentContainer {...props} />
    </Suspense>
  );
};

export default CreateDocument;
