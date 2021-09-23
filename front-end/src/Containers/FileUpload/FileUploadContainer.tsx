import React, { useState, memo, useEffect, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import {
  sendDataIntoUseFileUploadHook,
  truncateFileName,
  uploadDataMangeOnUseEffect,
} from '../../Helper';
import useFileUpload from '../../Hooks/useFileUpload';
import { RootStore } from '../../redux/store';

interface PFileUploadContainerProps {
  accept: string;
  backgroundImage: any;
  componentKey: string;
  error: { message: string };
  title: string;
  uploadType: string;
  action(S3Object: object, componentKey: string): void;
  customClass?: string;
  uploadFileKey: string;
  isHideInputField?: boolean;
  inputStyle?: string;
  required?: boolean;
  maximumFileSizeLimitInMB?: number;
}

const FileUploadContainer: FC<PFileUploadContainerProps> = ({
  accept,
  backgroundImage,
  componentKey,
  error,
  title,
  uploadType,
  action,
  customClass = '',
  uploadFileKey,
  isHideInputField,
  inputStyle,
  required,
  maximumFileSizeLimitInMB,
}) => {
  const { t } = useTranslation();
  const { s3BucketInfo } = useSelector((state: RootStore) => state.common);
  const [selectedFile, setSelectedFile] = useState<any>({});
  const [upload, uploadedContent, uploadProgress] = useFileUpload();
  const [isFileUploading, setIsFileUploading] = useState(false);
  const [uploadedFileData, setUploadedFileData] = useState<any>({});
  const [selectedFileName, setSelectedFileName] = useState('');
  const [downloadableLink, setDownloadableLink] = useState('#');
  const [fileSizeError, setFileSizeError] = useState('');

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
    if (!validateFileSize(data?.size)) {
      setFileSizeError(`Maximum file size is ${maximumFileSizeLimitInMB}mb`);
      return;
    } else {
      setFileSizeError('');
    }
    sendDataIntoUseFileUploadHook(s3BucketInfo, uploadFileKey, upload, data);
    setSelectedFileName(truncateFileName(data?.name, 45));
  };

  const validateFileSize = (fileSizeInBytes: number) => {
    if (!maximumFileSizeLimitInMB) {
      return true;
    }

    const fileSizeInMB = fileSizeInBytes / 1024 / 1024;
    return fileSizeInMB <= maximumFileSizeLimitInMB;
  };

  useEffect(() => {
    if (selectedFile.file) {
      let objectURL = URL.createObjectURL(selectedFile.file);
      setDownloadableLink(objectURL);
    }
  }, [selectedFile]);
  return (
    <>
      <div
        className={`createContent__column ${customClass ? customClass : ''}  ${
          error && 'upload-error'
        } `}
      >
        <h3 className="createContent__rowtitle">
          {title} {required && <span>*</span>}
        </h3>
        <div
          className={`form__form--field-wrapper ${
            isHideInputField && 'background-image-uploader'
          }`}
        >
          <div className="form__form--field">
            <a href={downloadableLink} download={selectedFile.name}>
              {isFileUploading ? (
                <span className="loading-text">Uploading.....</span>
              ) : (
                <img
                  src={backgroundImage}
                  alt="video-preview-image-icon"
                  className="icon--video-preview-image"
                />
              )}
            </a>
            <span className="createContent__uploaded-file-name">
              {selectedFileName}
            </span>
          </div>

          <div
            className={`form__form--field radiobutton ${
              isHideInputField && 'uploadbutton image-upload'
            }`}
          >
            <input
              type="file"
              name={`upload_file${componentKey}`}
              id={`upload_file${componentKey}`}
              className="input--upload"
              accept={accept}
              onChange={(e: any) => {
                if (e?.target?.files?.length) {
                  getContent(e.target.files[0]);

                  setSelectedFile({
                    file: e.target.files[0],
                    name: e.target.files[0].name,
                  });
                }
              }}
            />
            <label
              htmlFor={`upload_file${componentKey}`}
              className={`file-input ${
                isHideInputField && 'input-label'
              } ${inputStyle}`}
            >
              {t('Select file')}
            </label>
          </div>
        </div>
        <span className="error-message">{fileSizeError}</span>
        {error && !uploadedFileData?.key && !fileSizeError && (
          <span className="error-message">{error.message}</span>
        )}
      </div>
    </>
  );
};

export default memo(FileUploadContainer);
