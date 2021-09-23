import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ImRadioChecked, ImRadioUnchecked } from 'react-icons/im';
import { useDispatch } from 'react-redux';
import { contentType, USER_SERVICE } from '../../../../config/constants';
import useApi from '../../../../Hooks/useApi';
import defaultImage from '../../../../assets/images/default-profile-image.png';

import UseViewFile from '../../../../Hooks/UseViewFile';

import { singleContentType } from '../../../../redux/product/productReducer';
import {
  CHANGE_CONTENT_ORDER,
  GET_FEATURE_REEL_SELECTED_CONTENT_TUTOR_FAILED,
  GET_FEATURE_REEL_SELECTED_CONTENT_TUTOR_REQUEST,
  GET_FEATURE_REEL_SELECTED_CONTENT_TUTOR_SUCCESS,
} from '../../../../redux/product/productTypes';

interface ProductFeatureOrderReel {
  content: singleContentType;
  setSelectedContent?: Function;
  isSelected: boolean;
  isReelSaved: boolean;
  featureReelAllSelectedContentIds: string[];
}

const ProductFeatureOrderReel: FC<ProductFeatureOrderReel> = ({
  content,
  setSelectedContent,
  isSelected,
  isReelSaved,
  featureReelAllSelectedContentIds,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { previewImageKey, _id, tutor } = content || {};

  const [getContentImage, contentImageUrl] = UseViewFile();
  const [getTutorProfileImage, profileImageUrl] = UseViewFile();

  const [tutorRequest] = useApi();

  useEffect(() => {
    const { bucketName, fileKey } = previewImageKey || {};

    bucketName && fileKey && getContentImage(bucketName, fileKey);
  }, [previewImageKey]);

  useEffect(() => {
    const { bucketName, fileKey } = tutor?.profileImage || {};

    bucketName && fileKey && getTutorProfileImage(bucketName, fileKey);
  }, [tutor]);

  const [contentOrder, setContentOrder] = useState<number>(0);

  useEffect(() => {
    const order = featureReelAllSelectedContentIds.findIndex(id => id === _id);

    setContentOrder(Number(order + 1));
  }, [featureReelAllSelectedContentIds]);
  useEffect(() => {
    if (content) {
      const { tutorIds, _id } = content;

      const tutorId = tutorIds[0];
      tutorRequest(
        `/users?userIds=${tutorId}`,
        GET_FEATURE_REEL_SELECTED_CONTENT_TUTOR_REQUEST,
        GET_FEATURE_REEL_SELECTED_CONTENT_TUTOR_SUCCESS,
        GET_FEATURE_REEL_SELECTED_CONTENT_TUTOR_FAILED,
        {},
        {},
        'GET',
        false,
        USER_SERVICE,
        { contentId: _id }
      );
    }
  }, []);

  const orderChange = (value: number) => {
    setContentOrder(value);
    dispatch({
      type: CHANGE_CONTENT_ORDER,
      payload: {
        dataWrapper: {},
        customInput: { contentId: _id, order: value },
      },
    });
  };

  const [contentTypeString, setContentTypeString] = useState('');

  useEffect(() => {
    switch (content.type) {
      case contentType.video:
        setContentTypeString(t('Video'));
        break;
      case contentType.assignment:
        setContentTypeString(t('Assessment'));
        break;
      case contentType.document:
        setContentTypeString(t('Document'));
        break;
    }
  }, [content]);
  const re = /^[0-9\b]+$/;
  return (
    <>
      <div className="addContentScreen--content-wrapper__body-content-item">
        <div className="individualContent">
          <div
            className="individualContent--wrapper"
            style={{
              backgroundImage: `url(${contentImageUrl})`,
            }}
          >
            <div className="individualContent--typeLabel">
              {contentTypeString}
            </div>
            <div className="individualContent--options">
              <input
                className="individualContent--order"
                value={contentOrder}
                onChange={e => {
                  if (e.target.value === '' || re.test(e.target.value)) {
                    orderChange(Number(e.target.value));
                  }
                }}
              />

              <div
                className="individualContent--tutor"
                style={{
                  backgroundImage: `url(${profileImageUrl || defaultImage})`,
                }}
              ></div>
            </div>
            {!isReelSaved && (
              <div
                className="individualContent--selection"
                onClick={() =>
                  setSelectedContent && setSelectedContent(_id, contentType)
                }
              >
                {isSelected ? (
                  <ImRadioChecked className="icon" />
                ) : (
                  <ImRadioUnchecked className="icon" />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductFeatureOrderReel;
