import React, { useState, useEffect, useMemo, FC } from 'react';

import { useTranslation } from 'react-i18next';

import PreviewContainer from '../PreviewContainer/PreviewContainer';

import video_preview_video from '../../assets/images/720p.png';
import video_preview_image from '../../assets/images/400x250.png';
import portrait_preview_image from '../../assets/images/150x250.png';

interface VideoAndImageUploadContainerProps {
  errors: any;
  setValue: any;
  register: any;
  Controller: any;
  control: any;
  uploadFileKey: string;
}

const VideoAndImageUploadContainer: FC<VideoAndImageUploadContainerProps> = ({
  errors,
  setValue,
  register,
  Controller,
  control,
  uploadFileKey,
}) => {
  const { t } = useTranslation();

  const [uploadComponents, setUploadComponents] = useState({
    mediaUploadFirstRow: [
      {
        accept: 'image/*',
        backgroundImage: video_preview_image,
        inputName: 'previewImageKey',
        title: 'Video Preview Image',
        uploadType: 'image',
        fileType: 'learning-materials',
        required: true,
        maximumFileSizeInMB: 2,
      },

      {
        accept: 'image/*',
        backgroundImage: portrait_preview_image,
        inputName: 'portraitPreviewImageKey',
        title: 'Portrait Preview Image',
        uploadType: 'image',
        fileType: 'learning--materials',
        required: true,
        maximumFileSizeInMB: 2,
      },
    ],

    mediaUploadSecondRow: [
      {
        accept: 'video/*',
        backgroundImage: video_preview_video,
        inputName: 'previewVideoKey',
        title: 'Video Preview',
        uploadType: 'video',
        fileType: 'learning-materials',
        required: true,
      },

      {
        accept: 'video/*',
        backgroundImage: video_preview_video,
        inputName: 'videoUploadKey',
        title: 'Theater Mode Video',
        uploadType: 'video',
        fileType: 'learning-materials',
        required: true,
      },
    ],
  });

  const addUploadedDataToForm = (data: any, key: any) => {
    setValue(key, data);
  };

  return (
    <>
      <div>
        {uploadComponents?.mediaUploadFirstRow.map((component, index) => {
          const {
            accept,
            backgroundImage,
            inputName,
            title,
            uploadType,
            required,
            maximumFileSizeInMB,
          } = component;

          return (
            <Controller
              key={index}
              control={control}
              name={inputName}
              rules={{ required: `${title} cannot be empty` }}
              render={() => (
                <PreviewContainer
                  accept={accept}
                  backgroundImage={backgroundImage}
                  componentKey={inputName}
                  error={errors[inputName] || ''}
                  title={t(title)}
                  uploadType={uploadType}
                  action={addUploadedDataToForm}
                  uploadFileKey={uploadFileKey}
                  inputStyle={'upload-label'}
                  customClass="preview-wrapper"
                  required={required}
                  maximumFileSizeLimitInMB={maximumFileSizeInMB}
                />
              )}
            />
          );
        })}
      </div>
      <div>
        {uploadComponents?.mediaUploadSecondRow.map((component, index) => {
          const {
            accept,
            backgroundImage,
            inputName,
            title,
            uploadType,
            required,
          } = component;

          return (
            <Controller
              key={index}
              control={control}
              name={inputName}
              rules={{ required: `${title} cannot be empty` }}
              render={() => (
                <PreviewContainer
                  accept={accept}
                  backgroundImage={backgroundImage}
                  componentKey={inputName}
                  error={errors[inputName] || ''}
                  title={t(title)}
                  uploadType={uploadType}
                  action={addUploadedDataToForm}
                  uploadFileKey={uploadFileKey}
                  inputStyle={'upload-label'}
                  customClass="preview-wrapper"
                  required={required}
                />
              )}
            />
          );
        })}
      </div>
    </>
  );
};

export default VideoAndImageUploadContainer;
