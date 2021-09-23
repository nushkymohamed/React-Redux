import React, { useState, memo, useEffect, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import Preview from '../../Components/Preview/Preview';
import {
  sendDataIntoUseFileUploadHook,
  uploadDataMangeOnUseEffect,
} from '../../Helper';
import useFileUpload from '../../Hooks/useFileUpload';
import { RootStore } from '../../redux/store';

interface PreviewProfileContainerProps {
  accept: string;
  backgroundImage: any;
  componentKey: string;
  error: { message: string };
  title: string;
  uploadType: string;
  action(S3Object: object, componentKey: string): void;
  customClass: string;
  uploadFileKey: string;
  hideLabelIcon?: boolean;
  hideLabelText?: boolean;
}

const PreviewProfileContainer: FC<PreviewProfileContainerProps> = ({
  accept,
  backgroundImage,
  componentKey,
  error,
  title,
  uploadType,
  action,
  customClass = '',
  uploadFileKey,
  hideLabelIcon,
  hideLabelText,
}) => {
  const { t } = useTranslation();
  const { s3BucketInfo } = useSelector((state: RootStore) => state.common);
  const [selectedFile, setSelectedFile] = useState<any>({});
  const [upload, uploadedContent, uploadProgress] = useFileUpload();
  const [isFileUploading, setIsFileUploading] = useState(false);
  const [uploadedFileData, setUploadedFileData] = useState<any>({});
  useEffect(() => {
    uploadDataMangeOnUseEffect(
      uploadProgress,
      setIsFileUploading,
      uploadedContent,
      s3BucketInfo,
      uploadFileKey,
      action,
      componentKey,
      setUploadedFileData
    );
  }, [uploadProgress, uploadedContent]);

  const getContent = (data: File) => {
    sendDataIntoUseFileUploadHook(s3BucketInfo, uploadFileKey, upload, data);
  };
  return (
    <>
      <div
        className={`createContent__column ${customClass ? customClass : ''}  ${
          error && 'upload-error'
        } `}
      >
        <h3 className="createContent__rowtitle">{title}</h3>
        <div className="form__form--field-wrapper upload-wrapper">
          <div className="form__form--field">
            {!uploadedFileData?.key ? (
              isFileUploading ? (
                <span>loading.....</span>
              ) : (
                <img
                  src={backgroundImage}
                  alt="video-preview-image-icon"
                  className="icon--video-preview-image"
                />
              )
            ) : (
              <Preview uploadType={uploadType} uploadData={selectedFile.file} />
            )}
          </div>

          <div className="form__form--field  image-upload radiobutton uploadbutton">
            <input
              type="file"
              name={`upload_file${componentKey}`}
              id={`upload_file${componentKey}`}
              className="input--upload"
              accept={accept}
              onChange={(e: any) => {
                getContent(e.target.files[0]);

                setSelectedFile({
                  file: URL.createObjectURL(e.target.files[0]),
                });
              }}
            />
            <label
              htmlFor={`upload_file${componentKey}`}
              className={`input-label ${!hideLabelIcon && 'file-input'}`}
            >
              {!hideLabelText && t('Select file')}
            </label>
          </div>
        </div>
        {error && <span className="error-message">{error.message}</span>}
      </div>
    </>
  );
};

export default memo(PreviewProfileContainer);
