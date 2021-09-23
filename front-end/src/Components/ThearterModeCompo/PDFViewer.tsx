import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface propsType {
  pdfURL: string;
  scale?: number;
  maxScale: number;
  minScale: number;
  getTotalPageNumber?: (numPages: number) => void;
}
const PDFViewer: FC<propsType> = ({
  pdfURL,
  scale = 1.0,
  maxScale,
  minScale,
  getTotalPageNumber,
}) => {
  const { t } = useTranslation();
  const [numPages, setNumPages] = useState<any>(null);
  const onDocumentLoadSuccess = ({ numPages }: { numPages: any }) => {
    setNumPages(numPages);
    getTotalPageNumber && getTotalPageNumber(numPages);
  };
  return (
    <>
      <Document file={pdfURL} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (el, index) => (
          <>
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              scale={scale}
            />
            <div className="documentPopUp__section--pagination">
              {t('Page')} {index + 1}/{numPages}
            </div>
          </>
        ))}
      </Document>
    </>
  );
};

export default PDFViewer;
