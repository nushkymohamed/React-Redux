import React, { FC } from 'react';
import documentIcon from '../../../assets/images/svg-images/icon-document.svg';
import { DocumentsType } from '../../../redux/Theater/TheaterReducer';

interface PropsType {
  onClickDocument: Function;
  document: DocumentsType;
  type: 'document' | 'linkedDocument';
}
const ResourceCart: FC<PropsType> = ({ onClickDocument, document, type }) => {
  return (
    <div onClick={() => onClickDocument()} className="theaterMode__resource">
      <div className="theaterMode__resource--left">
        <img src={documentIcon} alt="document" />
      </div>
      {/* TODO need to add data from api */}
      <div className="theaterMode__resource--right">
        <p>{document?.title}</p>
        {type === 'linkedDocument' && (
          <span>Questions {document && document?.sections?.length}</span>
        )}
      </div>
    </div>
  );
};

export default ResourceCart;
