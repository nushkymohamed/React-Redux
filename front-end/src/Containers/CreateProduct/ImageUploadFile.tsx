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

interface ImageUploadContainerProps {
  errors: any;
  setValue: any;
  Controller: any;
  control: any;
}

const ImageUploadContainer: FC<ImageUploadContainerProps> = ({
  errors,
  setValue,
  Controller,
  control,
}) => {
  const [uploadRequest] = useApi();
  const { t } = useTranslation();

  const addUploadedDataToForm = (data: any, key: string) => {
    setValue(key, data);
  };

  const uploadFileKey = 'previewImageUpload';
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
    <Controller
      control={control}
      name={'previewImage'}
      rules={{ required: t('Preview image cannot be empty') }}
      render={(props: any) => (
        <PreviewComponent
          required
          accept={'image/*'}
          backgroundImage={background_preview_image}
          componentKey={'previewImage'}
          error={errors['previewImage'] || ''}
          key={1}
          title={t('Preview image')}
          uploadType={'image'}
          action={addUploadedDataToForm}
          customClass={'profileImage'}
          uploadFileKey={uploadFileKey}
          isHideInputField={false}
          maximumFileSizeLimitInMB={2}
        />
      )}
    />
  );
};

export default memo(ImageUploadContainer);
