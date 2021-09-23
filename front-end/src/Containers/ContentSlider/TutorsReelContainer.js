import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TutorsReel from '../../Components/TutorsReel/TutorsReel';
import { CONTENT_SERVICE, USER_SERVICE } from '../../config/constants';
import useApi from '../../Hooks/useApi';
import {
  INITIALIZE_SUBJECT_TUTORS_FAIL,
  INITIALIZE_SUBJECT_TUTORS_REQUEST,
  INITIALIZE_SUBJECT_TUTORS_SUCCESS,
  INITIALIZE_SUBJECT_TUTOR_CONTENTS_FAIL,
  INITIALIZE_SUBJECT_TUTOR_CONTENTS_REQUEST,
  INITIALIZE_SUBJECT_TUTOR_CONTENTS_SUCCESS,
  UPDATE_TUTORS_SUCCESS,
} from '../../redux/subjects/subjectsTypes';

const TutorsReelContainer = ({ reel, itemKey }) => {
  const [subjectTutorsRequest] = useApi();

  const [subjectTutorsVideosRequest] = useApi();
  const [sliderRef, setSliderRef] = useState(null);
  const [highlightedTutorIndex, setHighlightedTutorIndex] = useState(-1);

  const tutors =
    useSelector(state => state.subjects?.subjects[itemKey]?.subjectTutors) ??
    [];

  const { tutorPage, tutorSize, clickedTutorIndex } = useSelector(
    state => state.subjects?.subjects[itemKey]
  );

  const { hoverTutorId, hoverSubjectId } = useSelector(state => state.subjects);

  useEffect(() => {
    subjectTutorsRequest(
      `/users?type=TUTOR&subjectIds=${reel._id}&page=1&size=10`,
      INITIALIZE_SUBJECT_TUTORS_REQUEST,
      INITIALIZE_SUBJECT_TUTORS_SUCCESS,
      INITIALIZE_SUBJECT_TUTORS_FAIL,
      null,
      '',
      'GET',
      null,
      USER_SERVICE,
      { subjectId: reel._id }
    );
  }, []);

  const loadMoreTutors = () => {
    subjectTutorsRequest(
      `/users?type=TUTOR&subjectIds=${reel._id}&page=${
        tutorPage + 1
      }&size=${tutorSize}`,
      '',
      UPDATE_TUTORS_SUCCESS,
      '',
      null,
      '',
      'GET',
      null,
      USER_SERVICE,
      { subjectId: reel._id }
    );
  };
  const showHoveredVideoTutor = () => {
    const hoveredTutorIndex =
      Array.isArray(tutors) &&
      tutors.findIndex(tutor => tutor._id === hoverTutorId);
    console.log('hoveredTutor', hoveredTutorIndex);
    if (hoveredTutorIndex === -1) {
      loadMoreTutors();
    } else {
      //scroll to hovered tutor
      sliderRef?.current && sliderRef.current.slickGoTo(hoveredTutorIndex);
      setHighlightedTutorIndex(hoveredTutorIndex);
    }
  };

  useEffect(() => {
    tutors &&
      hoverTutorId &&
      hoverSubjectId &&
      hoverSubjectId === reel._id &&
      showHoveredVideoTutor();

    !hoverTutorId && setHighlightedTutorIndex(-1);
  }, [tutors.length, hoverTutorId, hoverSubjectId]);

  const tutorOnClick = data => {
    data.index =
      clickedTutorIndex !== data.index ? data.index : (data.index = -1);

    console.log(data);

    subjectTutorsVideosRequest(
      `/subjects/${data.subjectId}/tutors/${data.tutorId}/contents?type="video,assessment"&page=1&size=10`,
      INITIALIZE_SUBJECT_TUTOR_CONTENTS_REQUEST,
      INITIALIZE_SUBJECT_TUTOR_CONTENTS_SUCCESS,
      INITIALIZE_SUBJECT_TUTOR_CONTENTS_FAIL,
      null,
      '',
      'GET',
      null,
      CONTENT_SERVICE,
      data
    );
  };

  return (
    <>
      <TutorsReel
        tutors={tutors}
        subjectID={reel._id}
        tutorOnclick={tutorOnClick}
        loadMoreTutors={loadMoreTutors}
        setSliderRef={setSliderRef}
        highlightedTutorIndex={highlightedTutorIndex}
        clickTutorIndex={clickedTutorIndex}
      />
    </>
  );
};

export default TutorsReelContainer;
