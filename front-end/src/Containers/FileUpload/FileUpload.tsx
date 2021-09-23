import React, { useState, memo, useEffect, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import Preview from '../../Components/Preview/Preview';
import {
  sendDataIntoUseFileUploadHook,
  truncateString,
  uploadDataMangeOnUseEffect,
} from '../../Helper';
import useFileUpload from '../../Hooks/useFileUpload';
import { RootStore } from '../../redux/store';

interface FileUploadProps {
  accept: string;

  componentKey: string;
  error?: { message: string };
  title: string;

  action(S3Object: object, componentKey: string): void;
  customClass?: string;
  customLabelClass?: string;
  uploadFileKey: string;

}

const FileUpload: FC<FileUploadProps> = ({
  accept,

  componentKey,
  error,
  title,

  action,
  customClass = '',
  uploadFileKey,
  customLabelClass,

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
      <div className={`form__form--field  ${customClass ? customClass : ''}`}>
        <>
          <div className="subtitle">
            {title}
            <input
              type="file"
              name={`upload_file_${componentKey}`}
              id={`upload_file_${componentKey}`}
              className="input--upload"
              accept={accept}
              onChange={(e: any) => {
                getContent(e.target.files[0]);

                setSelectedFile(e.target.files[0]);
              }}
            />
            <label
              htmlFor={`upload_file_${componentKey}`}
              className={`file-input input-label ${
                customLabelClass ? customLabelClass : ''
              }`}
            ></label>
          </div>

          <span className="file-name">{truncateString(selectedFile.name,50)}</span>
        </>

        {error && <span className="error-message">{error.message}</span>}
      </div>
    </>
  );
};

export default memo(FileUpload);
