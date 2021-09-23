import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import full_screen from '../../../assets/images/svg-images/icon-expand.svg';
import zoom_out from '../../../assets/images/svg-images/icon-zoom-out2.svg';
import zoom_in from '../../../assets/images/svg-images/icon-zoom2.svg';
import PDFViewer from '../../ThearterModeCompo/PDFViewer';

interface propsType {
  pdfURL: string;
  title: string;
}
const DocumentComponent: FC<propsType> = ({ pdfURL, title }) => {
  const { t } = useTranslation();
  const [scale, setScale] = useState<number>(1.0);
  const [maxScale, setMaxScale] = useState<number>(3);
  const [minScale, setMinScale] = useState<number>(0.5);
  const [totalPage, setTotalPage] = useState<number>(1);

  // TODO have to add disabled class
  return (
    <div className="documentPopUp__container">
      <h4>{title}</h4>
      <div className="documentPopUp__section document">
        <div className="documentPopUp__content">
          <div className="documentPopUp__section--buttons">
            <img
              onClick={() =>
                setScale(value => (value < maxScale ? value + 0.1 : value))
              }
              src={zoom_in}
              alt="zoom_in-icon"
              className="icon"
              style={
                scale >= maxScale ? { pointerEvents: 'none', opacity: 0.5 } : {}
              }
            />
            <img
              onClick={() =>
                setScale(value => (value > minScale ? value - 0.1 : value))
              }
              src={zoom_out}
              alt="zoom_out-icon"
              className="icon"
              style={
                scale <= minScale ? { pointerEvents: 'none', opacity: 0.5 } : {}
              }
            />
            <img
              src={full_screen}
              alt="full_screen-icon"
              className="icon"
              onClick={() => window.open(pdfURL, '_blank')}
            />
          </div>
          <div className="documentPopUp__section--title">
            <h3>{title}</h3>
          </div>
          <div className="documentPopUp__section--body">
            <PDFViewer
              maxScale={maxScale}
              minScale={minScale}
              scale={scale}
              pdfURL={pdfURL}
              getTotalPageNumber={totalPage => setTotalPage(totalPage)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default DocumentComponent;
