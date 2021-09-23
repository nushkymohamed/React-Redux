import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import useApi from '../../Hooks/useApi';

import {
  GET_COUNTRIES_FAILED,
  GET_COUNTRIES_REQUEST,
  GET_COUNTRIES_SUCCESS,
  GET_SYLLABUSES_FAILED,
  GET_SYLLABUSES_REQUEST,
  GET_SYLLABUSES_SUCCESS,
  GET_SUBJECTS_FAILED,
  GET_SUBJECTS_REQUEST,
  GET_SUBJECTS_SUCCESS,
  GET_USEREXIST_REQUEST,
  GET_USEREXIST_SUCCESS,
  GET_USEREXIST_FAILED,
  RESET_USEREXIST,
} from '../../redux/common/commonTypes';

import {
  TUTOR_REGISTER_REQUEST,
  TUTOR_REGISTER_SUCCESS,
  TUTOR_REGISTER_FAILED,
  RESET_SIGNUP_FETCH,
} from '../../redux/signup/signupTypes';

import 'react-datepicker/dist/react-datepicker.css';

import ImageUploadContainer from './ImageUploadContainer';
import BasicInformation from '../../Components/CreateTutor/BasicInformation/BasicInformation';
import SubjectTags from '../../Components/CreateTutor/SubjectTags/SubjectTags';
import { CONTENT_SERVICE, USER_SERVICE } from '../../config/constants';
import { RootStore } from '../../redux/store';
import ButtonWithAnimation from '../../Components/ButtonWithAnimation/ButtonWithAnimation';
import Overlay from '../../Components/Overlay/Overlay';

const CreateTutorContainer = () => {
  const { register, handleSubmit, errors, control, setValue } = useForm({
    shouldFocusError: true,
  });
  const [countryRequest] = useApi();
  const [getUserData] = useApi();
  const [syllabusesRequest] = useApi();
  const [formSubmit] = useApi();
  const [subjectRequest] = useApi();
  const history = useHistory();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { countries, syllabuses, subjects, isUserExist } = useSelector(
    (state: RootStore) => state.common
  );
  const { success: userCreateSuccess } = useSelector(
    (state: RootStore) => state.signup
  );

  const [formData, setFormData] = useState({});
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    if (isUserExist !== null) {
      !isUserExist &&
        formSubmit(
          `/users`,
          TUTOR_REGISTER_REQUEST,
          TUTOR_REGISTER_SUCCESS,
          TUTOR_REGISTER_FAILED,
          formData,
          {},
          'POST',
          false,
          USER_SERVICE
        );
    }
  }, [isUserExist, formData]);

  const redirectAfterSuccess = () => {
    history.push(`/admin/user-management`);
    dispatch({
      type: RESET_USEREXIST,
    });

    dispatch({ type: RESET_SIGNUP_FETCH });
  };

  useEffect(() => {
    if (userCreateSuccess) {
      setShowOverlay(true);
    }
  }, [userCreateSuccess]);

  const onFormSubmit = (data: {
    firstName: any;
    lastName: any;
    countryCode: any;
    phone: any;
    email: any;
    backgroundImage: any;
    profileImage: any;
    subjectIds: any;
    address: any;
  }) => {
    const {
      firstName,
      lastName,
      countryCode,
      phone,
      email,
      backgroundImage,
      profileImage,
      subjectIds,
      address,
    } = data;

    const formData = {
      firstName,
      lastName,
      email,
      phone,
      countryCode,
      subjectIds,
      type: 'TUTOR',
      address,
      profileImage: profileImage ? profileImage : null,
      backgroundImage: backgroundImage ? backgroundImage : null,
    };

    setFormData(formData);

    getUserData(
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

  useEffect(() => {
    countryRequest(
      `/countries?page=1&size=100`,
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

    syllabusesRequest(
      `/syllabuses?page=1&size=15`,
      GET_SYLLABUSES_REQUEST,
      GET_SYLLABUSES_SUCCESS,
      GET_SYLLABUSES_FAILED,
      {},
      {},
      'GET',
      false,
      CONTENT_SERVICE,
      {}
    );
  }, []);

  const setSyllabusID = (data: any) => {
    subjectRequest(
      `/syllabuses/${data}/subjects?page=1&size=100`,
      GET_SUBJECTS_REQUEST,
      GET_SUBJECTS_SUCCESS,
      GET_SUBJECTS_FAILED,
      {},
      {},
      'GET',
      false,
      CONTENT_SERVICE,
      {}
    );
  };

  const [animationClassName, setAnimationClassName] = useState('');
  const [loadingAnimation, setLoadingAnimation] = useState(false);
  const [isSubmitClick, setIsSubmitClick] = useState(false);
  useEffect(() => {
    if (!Object.keys(errors).length && isSubmitClick) {
      setLoadingAnimation(true);
      setAnimationClassName('btn btn--primary btn--loader active');
      setIsSubmitClick(false);
    }
  }, [errors]);

  useEffect(() => {
    if (isUserExist) {
      setLoadingAnimation(false);
      setAnimationClassName('');
    }
  }, [isUserExist]);

  return (
    <>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div className="createContent">
          {showOverlay && (
            <Overlay showLoader onOverlayHide={redirectAfterSuccess} />
          )}
          <div className="container">
            <div className="createContent__wrapper">
              <h2 className="page-title">{t('Create Tutor')}</h2>
              <BasicInformation
                Controller={Controller}
                control={control}
                errors={errors}
                register={register}
                setValue={setValue}
                countries={countries}
                isUserExist={isUserExist}
              />

              <div className="createContent__row video-preview image-preview">
                <ImageUploadContainer
                  Controller={Controller}
                  control={control}
                  errors={errors}
                  register={register}
                  setValue={setValue}
                />
              </div>

              <div className="createTutor__row subject-tags">
                <h3 className="createContent__rowtitle">
                  {t('Syllabus / Subject ')}
                </h3>
                <Controller
                  control={control}
                  name="subjectIds"
                  render={({ onChange }) => (
                    <SubjectTags
                      onChange={onChange}
                      syllabuses={syllabuses}
                      subjects={subjects}
                      setSyllabusID={setSyllabusID}
                    />
                  )}
                />
              </div>

              <div className="createTutor__row submit-button">
                <div className="form">
                  <div className="form__form--field buttons">
                    {!loadingAnimation ? (
                      <button
                        type="submit"
                        className="btn btn--secondary"
                        onClick={() => setIsSubmitClick(true)}
                      >
                        {t('Publish')}
                      </button>
                    ) : (
                      <ButtonWithAnimation
                        animationClassName={animationClassName}
                        onTransitionEnd={setAnimationClassName}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateTutorContainer;
