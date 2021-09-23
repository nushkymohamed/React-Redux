import React, { FC, useEffect } from 'react';
import Tutor from '../../../../Components/CreateProduct/Tutor/Tutor';
import { useDispatch } from 'react-redux';
import { reelTutors } from '../../../../redux/product/productReducer';
import {
  GET_REEL_TUTOR_VIDEO_COUNT_FAILED,
  GET_REEL_TUTOR_VIDEO_COUNT_REQUEST,
  GET_REEL_TUTOR_VIDEO_COUNT_SUCCESS,
  SELECT_REEL_TUTOR,
} from '../../../../redux/product/productTypes';
import { contentType, CONTENT_SERVICE } from '../../../../config/constants';
import useApi from '../../../../Hooks/useApi';

interface TutorContainerProps {
  tutor: reelTutors;
  reelIndex: number;
  subjectID: string;
}

const TutorContainer: FC<TutorContainerProps> = ({
  tutor,
  reelIndex,
  subjectID,
}) => {
  const { _id } = tutor;
  const tutorListToStringArray = [_id];
  const [contentVideosRequest] = useApi();

  useEffect(() => {
    contentVideosRequest(
      `/contents/learningMaterials?types=${
        contentType.video
      }&subjectId=${subjectID}&tutorIds=${tutorListToStringArray.toString()}`,
      GET_REEL_TUTOR_VIDEO_COUNT_REQUEST,
      GET_REEL_TUTOR_VIDEO_COUNT_SUCCESS,
      GET_REEL_TUTOR_VIDEO_COUNT_FAILED,
      {},
      {},
      'GET',
      false,
      CONTENT_SERVICE,
      { reelIndex, _id }
    );
  }, []);
  
  const dispatch = useDispatch();
  const selectTutorAction = (id: string) => {
    dispatch({
      type: SELECT_REEL_TUTOR,
      payload: { dataWrapper: { data: { id } }, customInput: { reelIndex } },
    });
  };

  return <Tutor tutor={tutor} selectTutorAction={selectTutorAction} />;
};

export default TutorContainer;
