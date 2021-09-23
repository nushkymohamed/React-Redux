import React, { FC } from 'react';
import loadingOwl from '../../assets/images/loadingOwl.svg';

export interface OverlayLoader {
  showLoader?: boolean;
  message?: string;
}

const OverlayLoader: FC<OverlayLoader> = ({ showLoader, message }) => {
  return (
    <div className={'createContent-overlay'}>
      {showLoader ? (
        <div className="spinner--wrapper">
          <img src={loadingOwl} alt="Knodify Logo" className="knodifyOwl" />
          <div className="spinner"></div>
        </div>
      ) : (
        <label>{message || ''}</label>
      )}
    </div>
  );
};

export default OverlayLoader;
