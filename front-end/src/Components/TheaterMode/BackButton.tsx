import React from 'react';
import { useTranslation } from 'react-i18next';
import { BiArrowBack } from 'react-icons/bi';
import { useHistory } from 'react-router';

const BackButton = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const backAction = () => {
    history.goBack();
  };

  return (
    <div className="theaterMode__navigation--backButton" onClick={backAction}>
      <BiArrowBack className="icon color-white verySmall-icon" />
      <h4>{t('Back')}</h4>
    </div>
  );
};

export default BackButton;
