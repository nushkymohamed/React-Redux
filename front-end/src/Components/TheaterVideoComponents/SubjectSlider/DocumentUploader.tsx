import React from 'react';
import { useTranslation } from 'react-i18next';
import upload from '../../../assets/images/svg-images/icon-upload2.svg';

const DocumentUploader = () => {
  const { t } = useTranslation();
  return (
    <div className="theaterMode__resource upload">
      <div className="theaterMode__resource--left">
        <img src={upload} alt="Upload" />
      </div>
      <div className="theaterMode__resource--right">
        <p>{t('Upload')}</p>
      </div>
    </div>
  );
};

export default DocumentUploader;
