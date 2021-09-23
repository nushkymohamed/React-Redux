import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { RootStore } from '../../../redux/store';

import useApi from '../../../Hooks/useApi';
import {
  PARENT_SIGNUP_FAILED,
  PARENT_SIGNUP_REQUEST,
  PARENT_SIGNUP_SUCCESS,
  RESET_SIGNUP_FETCH,
} from '../../../redux/signup/signupTypes';
import {
  GET_COUNTRIES_FAILED,
  GET_COUNTRIES_REQUEST,
  GET_COUNTRIES_SUCCESS,
  GET_USEREXIST_FAILED,
  GET_USEREXIST_REQUEST,
  GET_USEREXIST_SUCCESS,
  RESET_USEREXIST_FETCH,
} from '../../../redux/common/commonTypes';
import {
  CONTENT_SERVICE,
  USER_SERVICE,
  userTypes,
} from '../../../config/constants';
import ParentSignUpComponent from '../../../Components/SignUp/Parent/ParentSignUpComponent';
import EmailResendModal from '../../../Components/Modal/EmailResendModal';

interface FormTypes {
  type?: string;
  email?: string;
  phone?: string;
  country?: string;
  lastName?: string;
  password?: string;
  firstName?: string;
  address?: string;
}

const ParentSignUpContainer = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const [getData] = useApi(); //get grades,syllabuses,countries,schools from API
  const [registerParent] = useApi(); //register parent
  const [formData, setFormData] = useState<FormTypes>({
    type: userTypes.parent,
  });
  const [isEmailModelOpen, setIsEmailModelOpen] = useState(false);
  const { success, error: signUpError } = useSelector(
    (state: RootStore) => state.signup
  );
  const { countries, isUserExist } = useSelector(
    (state: RootStore) => state.common
  );

  useEffect((): any => {
    return () => {
      dispatch({
        type: RESET_SIGNUP_FETCH,
      });

      dispatch({
        type: RESET_USEREXIST_FETCH,
      });
    };
  }, []);

  useEffect(() => {
    getData(
      '/countries',
      GET_COUNTRIES_REQUEST,
      GET_COUNTRIES_SUCCESS,
      GET_COUNTRIES_FAILED,
      {},
      {},
      'GET',
      false,
      CONTENT_SERVICE,
      {}
    );
  }, []);

  const getIsUserExist = (email: string) => {
    getData(
      `/users/${email}/id`,
      GET_USEREXIST_REQUEST,
      GET_USEREXIST_SUCCESS,
      GET_USEREXIST_FAILED,
      {},
      {},
      'GET',
      false,
      USER_SERVICE,
    );
  };

  const submitAllData = () => {
    const {
      type,
      email,
      phone,
      country,
      lastName,
      password,
      firstName,
      address,
    } = formData;

    let signUpData = {
      type,
      email,
      phone: phone?.slice(1),
      lastName,
      password,
      firstName,
      countryCode: country,
      address,
    };

    registerParent(
      `/users`,
      PARENT_SIGNUP_REQUEST,
      PARENT_SIGNUP_SUCCESS,
      PARENT_SIGNUP_FAILED,
      signUpData,
      {},
      'POST',
      false,
      USER_SERVICE,
      {}
    );
  };

  const updateFormData = (data: object) => {
    setFormData(prevState => ({ ...prevState, ...data }));
  };

  const goToNext = (email: string) => {
    getIsUserExist(email);
  };

  useEffect(() => {
    if (isUserExist === null || isUserExist) return;
    submitAllData();
    setIsEmailModelOpen(true);
  }, [isUserExist]);

  const goBack = () => {
    history.push('/signup');
  };

  return (
    <>
      <div className="signup-page signup-page--form">
        <div className="container">
          <div className="signup-page__wrapper">
            <div className="signup-page__title">
              <h2>{t('Parent Signup')}</h2>
              <p>{t('Please enter your basic details')}</p>
            </div>
            <div className="signup-page__form">
              <div>
                <ParentSignUpComponent
                  goToNext={(email: string) => goToNext(email)}
                  countries={countries}
                  goToPrevious={goBack}
                  onSubmit={updateFormData}
                  isUserExist={isUserExist}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {isEmailModelOpen && <EmailResendModal email={formData.email} />}
    </>
  );
};

export default ParentSignUpContainer;
