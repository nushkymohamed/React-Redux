import React from 'react';
import { useTranslation } from 'react-i18next';
import NoContent from '../../Components/CreateProduct/NoContent/NoContent';

function Error404() {
  const { t } = useTranslation();
  return <NoContent message={t('Page Not Found')} />;
}

export default Error404;
