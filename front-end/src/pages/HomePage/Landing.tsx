import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VisibilitySensor from 'react-visibility-sensor';
import { CONTENT_SERVICE, userRoles } from '../../config/constants';
import ContentSliderWrapper from '../../Containers/ContentSlider/ContentSliderWrapper';
import useApi from '../../Hooks/useApi';
import { RootStore } from '../../redux/store';
import {
  INITIALIZE_SUBJECTS_DATA_FAIL,
  INITIALIZE_SUBJECTS_DATA_REQUEST,
  INITIALIZE_SUBJECTS_DATA_SUCCESS,
  RESET_SUBJECTS_REDUCER_DATA,
  UPDATE_SUBJECTS_REEL_FAIL,
  UPDATE_SUBJECTS_REEL_REQUEST,
  UPDATE_SUBJECTS_REEL_SUCCESS,
} from '../../redux/subjects/subjectsTypes';

type paramsType = {
  syllabusId: string;
  gradeId: string;
};

const Landing = (props: any) => {
  const [subjectRequest] = useApi();
  const [subjectsNewReelRequest] = useApi();
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootStore) => state.auth);

  const { subjects, page, size } = useSelector(
    (state: RootStore) => state.subjects
  );

  const [urlParams, setUrlParams] = useState<paramsType | null>(null);

  const initialSubjectData = (
    syllabusId: paramsType['syllabusId'],
    gradeId: paramsType['gradeId']
  ) => {
    subjectRequest(
      `/syllabuses/${syllabusId}/grades/${gradeId}/subjects?page=${page}&size=${size}`,
      INITIALIZE_SUBJECTS_DATA_REQUEST,
      INITIALIZE_SUBJECTS_DATA_SUCCESS,
      INITIALIZE_SUBJECTS_DATA_FAIL,
      {},
      {},
      'GET',
      false,
      CONTENT_SERVICE
    );
  };

  const subjectsNewReelData = (
    syllabusId: paramsType['syllabusId'],
    gradeId: paramsType['gradeId'],
    page: number
  ) => {
    subjectsNewReelRequest(
      `/syllabuses/${syllabusId}/grades/${gradeId}/subjects?page=${page}&size=${size}`,
      UPDATE_SUBJECTS_REEL_REQUEST,
      UPDATE_SUBJECTS_REEL_SUCCESS,
      UPDATE_SUBJECTS_REEL_FAIL,
      {},
      {},
      'GET',
      false,
      CONTENT_SERVICE
    );
  };

  useEffect(() => {
    if (
      user?.roles.includes(userRoles.admin) &&
      !Object.keys(props.match.params).length
    ) {
      props?.history?.push('/admin');
    }

    if (user?.roles.includes(userRoles.student)) {
      props?.history?.push('/home');
    }

    setUrlParams({
      ...props?.match?.params,
      locationState: props?.location?.state,
    });
  }, []);

  useEffect(() => {
    const { syllabusId, gradeId } = urlParams || {};

    dispatch({
      type: RESET_SUBJECTS_REDUCER_DATA,
    });

    gradeId && syllabusId && initialSubjectData(syllabusId, gradeId);
  }, [urlParams]);

  const addNewReel = () => {
    const { gradeId, syllabusId } = urlParams || {};
    const newPageNumber = page + 1;

    gradeId &&
      syllabusId &&
      subjectsNewReelData(gradeId, syllabusId, newPageNumber);
  };

  return (
    <>
      <ContentSliderWrapper urlParams={urlParams} reels={subjects} />
      <VisibilitySensor
        partialVisibility
        onChange={isVisible => {
          isVisible && addNewReel();
        }}
      >
        <div style={{ color: '#000' }}>.</div>
      </VisibilitySensor>
    </>
  );
};

export default Landing;
