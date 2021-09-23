import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import BasicInformation from '../../Components/CreateInterview/BasicInformation/BasicInformation';
import ImageUploadContainer from './ImageUploadContainer';
import VideoUploadContainer from './VideoUploadContainer';
import {
  GET_ORDER_FAILED,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  INTERVIEW_UPLOAD_FAILED,
  INTERVIEW_UPLOAD_REQUEST,
  INTERVIEW_UPLOAD_SUCCESS,
} from '../../redux/common/commonTypes';
import { CONTENT_SERVICE, contentType } from '../../config/constants';
import useApi from '../../Hooks/useApi';
import { useSelector } from 'react-redux';
import { RootStore } from '../../redux/store';

const CreateInterviewContainer = () => {
  const { t } = useTranslation();
  const [orderRequest] = useApi();
  const [createInterview] = useApi();
  const {
    register,
    handleSubmit,
    errors,
    control,
    setError,
    setValue,
    clearErrors,
    getValues,
  } = useForm({
    shouldFocusError: true,
  });

  const { order } = useSelector((state: RootStore) => state.common);

  useEffect(() => {
    orderRequest(
      `/contents/commonMaterials?type=${contentType.interviewVideo}`,
      GET_ORDER_REQUEST,
      GET_ORDER_SUCCESS,
      GET_ORDER_FAILED,
      {},
      {},
      'GET',
      false,
      CONTENT_SERVICE,
      {}
    );
  }, []);

  const onFormSubmit = (data: any) => {
    data.type = contentType.interviewVideo;
    createInterview(
      `/contents`,
      INTERVIEW_UPLOAD_REQUEST,
      INTERVIEW_UPLOAD_SUCCESS,
      INTERVIEW_UPLOAD_FAILED,
      data,
      {},
      'POST',
      false,
      CONTENT_SERVICE,
      {}
    );
  };

  return (
    <div>
      <div>
        <BasicInformation
          control={control}
          Controller={Controller}
          errors={errors}
          register={register}
          setValue={setValue}
          order={order}
        />
        <ImageUploadContainer
          control={control}
          Controller={Controller}
          errors={errors}
          register={register}
          setValue={setValue}
        />
      </div>
      <div>
        <VideoUploadContainer
          control={control}
          Controller={Controller}
          errors={errors}
          register={register}
          setValue={setValue}
        />
      </div>
      <div className="createContent__row submit-button">
        <div className="form">
          <div className="form__form--field buttons">
            <button
              onClick={handleSubmit(onFormSubmit)}
              type="submit"
              className="btn btn--secondary"
            >
              {t('Save')}
            </button>
            <button type="submit" className="btn btn--primary">
              {t('Submit')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateInterviewContainer;
