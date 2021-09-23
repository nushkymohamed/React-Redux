import React, { FC } from 'react';
import close from '../../../assets/images/svg-images/icon-close2.svg';
import document_selected from '../../../assets/images/svg-images/icon-document-selected.svg';
import documentIcon from '../../../assets/images/svg-images/icon-document2.svg';
import info_selected from '../../../assets/images/svg-images/icon-info-selected.svg';
import info from '../../../assets/images/svg-images/icon-info.svg';
import notes_selected from '../../../assets/images/svg-images/icon-notes-selected.svg';
import notes from '../../../assets/images/svg-images/icon-notes.svg';
import { TabType } from '../../../Containers/DocumentViewerModalContainer/DocumentViewerModalContainer';
import Modal from '../../Modal/Modal';

interface propsType {
  onClose: () => void;
  tabType: TabType;
  setTabType: (tab: TabType) => void;
}

const DocumentViewerModel: FC<propsType> = ({
  onClose,
  children,
  setTabType,
  tabType,
}) => {
  return (
    <Modal customClassName={'documentPopUp'}>
      <div className="documentPopUp__wrapper">
        {children}
        <div className="documentPopUp__buttons">
          <div onClick={onClose} className="documentPopUp__button">
            <img src={close} alt="close-icon" className="icon" />
          </div>
          <div
            onClick={() => setTabType(TabType.Document)}
            className={`documentPopUp__button ${
              tabType === TabType.Document ? 'selected' : ''
            }`}
          >
            <img src={documentIcon} alt="document-icon" className="icon" />
            <img src={document_selected} alt="document-icon" className="icon" />
          </div>
          <div
            onClick={() => setTabType(TabType.About)}
            className={`documentPopUp__button ${
              tabType === TabType.About ? 'selected' : ''
            }`}
          >
            <img src={info} alt="info-icon" className="icon" />
            <img src={info_selected} alt="info-icon" className="icon" />
          </div>
          <div
            onClick={() => setTabType(TabType.Notes)}
            className={`documentPopUp__button ${
              tabType === TabType.Notes ? 'selected' : ''
            }`}
          >
            <img src={notes} alt="notes-icon" className="icon" />
            <img src={notes_selected} alt="notes-icon" className="icon" />
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default DocumentViewerModel;
