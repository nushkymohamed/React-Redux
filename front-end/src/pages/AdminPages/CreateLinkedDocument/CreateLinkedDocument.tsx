import React, { lazy, Suspense } from 'react';
import OverlayLoader from '../../../Components/Overlay/OverlayLoader';

const CreateLinkedDocumentContainer = lazy(
  () =>
    import(
      '../../../Containers/CreateLinkedDocument/CreateLinkedDocumentContainer'
    )
);

const CreateLinkedDocument = (props: any) => {
  return (
    <Suspense fallback={<OverlayLoader showLoader />}>
      <CreateLinkedDocumentContainer {...props} />
    </Suspense>
  );
};

export default CreateLinkedDocument;
