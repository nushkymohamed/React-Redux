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
import PreviewProfileContainer from '../PreviewContainer/PreviewProfileContainer';

import background_preview_image from '../../assets/images/imageUpload_1600x900.png';
import profile_preview_image from '../../assets/images/profile-pic.png';

interface ImageUploadContainerProps {
  errors: any;
  setValue: any;
  register: any;
  Controller: any;
  control: any;
}

const ImageUploadContainer: FC<ImageUploadContainerProps> = ({
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

  const uploadFileKey = 'profileImageUpload';
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
        name={'profileImage'}
        render={() => (
          <PreviewProfileContainer
            accept={'image/*'}
            backgroundImage={profile_preview_image}
            componentKey={'profileImage'}
            error={errors['profileImage'] || ''}
            key={0}
            title={t('Profile Customization')}
            uploadType={'image'}
            action={addUploadedDataToForm}
            customClass={'pro-pic'}
            uploadFileKey={uploadFileKey}
            hideLabelIcon
            hideLabelText
          />
        )}
      />

      <Controller
        control={control}
        name={'backgroundImage'}
        render={() => (
          <PreviewComponent
            accept={'image/*'}
            backgroundImage={background_preview_image}
            componentKey={'backgroundImage'}
            error={errors['backgroundImage'] || ''}
            key={1}
            title={t('Background image')}
            uploadType={'image'}
            action={addUploadedDataToForm}
            customClass={'backgroundImage-upload'}
            uploadFileKey={uploadFileKey}
            isHideInputField
            hideLabelIcon
            hideLabelText
          />
        )}
      />
    </>
  );
};

export default memo(ImageUploadContainer);
