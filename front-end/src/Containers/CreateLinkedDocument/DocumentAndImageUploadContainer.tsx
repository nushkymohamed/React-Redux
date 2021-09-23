import React, { FC, useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import useApi from '../../Hooks/useApi';

import {
  FILE_UPLOAD_S3_INFO_FAILED,
  FILE_UPLOAD_S3_INFO_REQUEST,
  FILE_UPLOAD_S3_INFO_SUCCESS,
} from '../../redux/common/commonTypes';

import { CONTENT_SERVICE } from '../../config/constants';

import PreviewComponent from '../PreviewContainer/PreviewContainer';
import video_preview_image from '../../assets/images/400x250.png';
import portrait_preview_image from '../../assets/images/150x250.png';
import Tags from '../../Components/FormInput/Tags/Tags';
import { tagsCreateWithoutDuplication } from '../../Helper';

interface DocumentAndImageUploadContainerProps {
  errors: any;
  setValue: any;
  register: any;
  Controller: any;
  control: any;
}
const DocumentAndImageUploadContainer: FC<DocumentAndImageUploadContainerProps> =
  ({ errors, setValue, Controller, control, register }) => {
    const [uploadRequest] = useApi();
    const { t } = useTranslation();
    const [tagInput, setTagInput] = useState('');
    const [tagList, setTagList] = useState<any[]>([]);

    const uploadComponents = {
      mediaUpload: [
        {
          accept: 'image/*',
          backgroundImage: video_preview_image,
          inputName: 'previewImageKey',
          title: 'Preview Image',
          uploadType: 'image',
          fileType: 'learning-materials',
          required: true,
          maximumFileSizeInMB: 2,
        },
      ],
      portraitUpload: [
        {
          accept: 'image/*',
          backgroundImage: portrait_preview_image,
          inputName: 'portraitPreviewImageKey',
          title: 'Portrait Preview Image',
          uploadType: 'image',
          fileType: 'learning-materials',
          required: true,
          maximumFileSizeInMB: 2,
        },
      ],
    };

    const addUploadedDataToForm = (data: any, key: any) => {
      setValue(key, data);
    };

    const uploadFileKey = 'documentAndImageUpload';
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

    const addTags = (e: any) => {
      tagsCreateWithoutDuplication(e, tagList, setTagList, setTagInput);
    };

    useEffect(() => {
      let list = tagList.map(({ label }: { label: string }) => label);
      setValue('tags', list);
    }, [tagList]);

    return (
      <>
        <div className="createContent__row basic-info">
          {uploadComponents?.mediaUpload.map((component, index) => {
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
              <div
                className="createContent__column"
                key={'mediaUpload ' + index}
              >
                <Controller
                  key={index}
                  control={control}
                  name={inputName}
                  rules={{ required: t(`${title} cannot be empty`) }}
                  render={() => (
                    <PreviewComponent
                      accept={accept}
                      backgroundImage={backgroundImage}
                      componentKey={inputName}
                      error={errors[inputName] || ''}
                      key={index}
                      title={t(title)}
                      uploadType={uploadType}
                      action={addUploadedDataToForm}
                      uploadFileKey={uploadFileKey}
                      required={required}
                      maximumFileSizeLimitInMB={maximumFileSizeInMB}
                    />
                  )}
                />
              </div>
            );
          })}

          {uploadComponents?.portraitUpload.map((component, index) => {
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
              <div
                className="createContent__column"
                key={'portraitUpload ' + index}
              >
                <Controller
                  key={index}
                  control={control}
                  name={inputName}
                  rules={{ required: t(`${title} cannot be empty`) }}
                  render={() => (
                    <PreviewComponent
                      accept={accept}
                      backgroundImage={backgroundImage}
                      componentKey={inputName}
                      error={errors[inputName] || ''}
                      key={index}
                      title={t(title)}
                      uploadType={uploadType}
                      action={addUploadedDataToForm}
                      uploadFileKey={uploadFileKey}
                      required={required}
                      maximumFileSizeLimitInMB={maximumFileSizeInMB}
                    />
                  )}
                />
              </div>
            );
          })}

          <div className="createContent__column">
            <h3 className="createContent__rowtitle">Tags</h3>
            <div className="form__form--field tags-wrapper">
              <Controller
                control={control}
                name={'tags'}
                render={() => (
                  <input
                    className="form-input input-no-title input"
                    type="text"
                    autoComplete={'off'}
                    placeholder={t('Separate your tags with a comma')}
                    maxLength={35}
                    onKeyPress={addTags}
                    value={tagInput}
                    onChange={e => setTagInput(e.target.value)}
                  />
                )}
              />
            </div>

            <Tags
              list={tagList}
              tagLabel={'label'}
              listReturnMethod={(list: any) => setTagList(list)}
            />
          </div>
        </div>
      </>
    );
  };

export default DocumentAndImageUploadContainer;
