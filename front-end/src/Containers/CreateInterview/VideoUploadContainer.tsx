import React, { useState, useEffect, memo, FC } from 'react';

import { useTranslation } from 'react-i18next';

import useApi from '../../Hooks/useApi';

import {
  FILE_UPLOAD_S3_INFO_SUCCESS,
  FILE_UPLOAD_S3_INFO_REQUEST,
  FILE_UPLOAD_S3_INFO_FAILED,
} from '../../redux/common/commonTypes';

import { CONTENT_SERVICE } from '../../config/constants';

import PreviewComponent from '../PreviewContainer/PreviewContainer';

import background_preview_image from '../../assets/images/background-image.png';

interface VideoUploadContainerProps {
  errors: any;
  setValue: any;
  register: any;
  Controller: any;
  control: any;
}

const VideoUploadContainer: FC<VideoUploadContainerProps> = ({
  errors,
  setValue,
  register,
  Controller,
  control,
}) => {
  const [uploadRequest] = useApi();
  const { t } = useTranslation();

  const addUploadedDataToForm = (data: any, key: string) => {
    setValue(key, data);
  };

  const uploadFileKey = 'theatreModeVideoUpload';
  useEffect(() => {
    uploadRequest(
      `/cloud-storage/path/learning-materials`,
      FILE_UPLOAD_S3_INFO_REQUEST,
      FILE_UPLOAD_S3_INFO_SUCCESS,
      FILE_UPLOAD_S3_INFO_FAILED,
      {},
      {},
      'GET',
      false,
      CONTENT_SERVICE,
      { key: uploadFileKey }
    );
  }, []);

  return (
    <>
      <Controller
        control={control}
        name={'theatreModeVideo'}
        rules={{ required: t('Background image cannot be empty') }}
        render={() => (
          <PreviewComponent
            accept={'video/*'}
            backgroundImage={background_preview_image}
            componentKey={'theatreModeVideo'}
            error={errors['theatreModeVideo'] || ''}
            key={1}
            title={t('Theatre Mode Video')}
            uploadType={'video'}
            action={addUploadedDataToForm}
            customClass={'profileImage'}
            uploadFileKey={uploadFileKey}
            isHideInputField={false}
          />
        )}
      />
    </>
  );
};

export default memo(VideoUploadContainer);
