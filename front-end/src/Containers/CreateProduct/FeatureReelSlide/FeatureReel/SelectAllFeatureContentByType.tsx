import React, { FC } from 'react';
import { BiSelectMultiple } from 'react-icons/bi';
import { CONTENT_SERVICE } from '../../../../config/constants';
import useApi from '../../../../Hooks/useApi';
import {
  SELECT_ALL_FEATURE_REEL_CONTENT_BY_CONTENT_TYPE_FAILED,
  SELECT_ALL_FEATURE_REEL_CONTENT_BY_CONTENT_TYPE_REQUEST,
  SELECT_ALL_FEATURE_REEL_CONTENT_BY_CONTENT_TYPE_SUCCESS,
} from '../../../../redux/product/productTypes';

interface SelectAllFeatureContentByType {
  contentTab: string;
  reelIndex: number;
  selectedTutorId: string;
  currentSelectedTutorTabContentData: boolean;
  subjectID: string;
}

const SelectAllFeatureContentByType: FC<SelectAllFeatureContentByType> = ({
  contentTab,
  reelIndex,
  selectedTutorId,
  currentSelectedTutorTabContentData,
  subjectID,
}) => {
  const [contentIDRequest] = useApi();

  const selectAllContentByType = () => {
    contentIDRequest(
      `/subjects/${subjectID}/contents/ids?contentTypes=${contentTab}&tutorIds=${selectedTutorId}`,
      SELECT_ALL_FEATURE_REEL_CONTENT_BY_CONTENT_TYPE_REQUEST,
      SELECT_ALL_FEATURE_REEL_CONTENT_BY_CONTENT_TYPE_SUCCESS,
      SELECT_ALL_FEATURE_REEL_CONTENT_BY_CONTENT_TYPE_FAILED,
      {},
      {},
      'GET',
      false,
      CONTENT_SERVICE,
      {
        reelIndex,
        contentTab,
        selectedTutorId,
        currentSelectedTutorTabContentData: !currentSelectedTutorTabContentData,
      }
    );
  };
  return (
    <div className="btn--selectAll">
      <p onClick={() => selectAllContentByType()}>
        {currentSelectedTutorTabContentData ? 'Select None' : 'Select All'}
        <span>
          <BiSelectMultiple />
        </span>
      </p>
    </div>
  );
};

export default SelectAllFeatureContentByType;
