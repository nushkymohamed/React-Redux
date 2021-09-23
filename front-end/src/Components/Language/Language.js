import React, { useState, useEffect, Fragment } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import languageApi from '../../Hooks/languageApi';

import { SET_CURRENT_LANGUAGE } from '../../redux/language/languageTypes';

function Language(props) {
  const [languageType, setLanguageType] = useState('en');

  const { t } = useTranslation();

  // update user
  const [updateUserLanguage] = languageApi();

  const language = useSelector(state => state.languageReducer);


  useEffect(() => {


    if (languageType !== '') {
      updateUserLanguage(
        '/api/update/language',
        '',
        SET_CURRENT_LANGUAGE,
        '',
        {
          currentLanguage: languageType,
        },
        '',
        'POST',
        'isEnCoded',
        'isUserService'
      );
    }
  }, [languageType]);

  return (
    <Fragment>
      <ul>
        <li
          onClick={() => {
            setLanguageType('en');
          }}
        >
          English
        </li>
        <li
          onClick={() => {
            setLanguageType('jap');
          }}
        >
          Japanese
        </li>
        <li
          onClick={() => {
            setLanguageType('hin');
          }}
        >
          Hindi
        </li>
        <li
          onClick={() => {
            setLanguageType('fre');
          }}
        >
          French
        </li>
        <li
          onClick={() => {
            setLanguageType('ger');
          }}
        >
          German
        </li>
      </ul>
      <h1> {t('Advantages')}</h1>
      {t(
        'is an internationalization-framework which offers a complete solution to localize your product from web to mobile and desktop'
      )}
      {t('Plugins to load translations')}
    </Fragment>
  );
}

export default Language;
