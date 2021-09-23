import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ContentSlider from '../../Components/ContentSlider/ContentSlider';
import {
  contentType,
  CONTENT_SERVICE,
  userRoles,
} from '../../config/constants';
import useApi from '../../Hooks/useApi';
import { RootStore } from '../../redux/store';
import { singleReelSubjectTypes } from '../../redux/subjects/subjectsReducer';
import {
  HOVER_ON_SUBJECT_REEL_CONTENT,
  INITIALIZE_SUBJECT_CONTENTS_FAIL,
  INITIALIZE_SUBJECT_CONTENTS_REQUEST,
  INITIALIZE_SUBJECT_CONTENTS_SUCCESS,
  UPDATE_SUBJECT_CONTENTS_FAIL,
  UPDATE_SUBJECT_CONTENTS_REQUEST,
  UPDATE_SUBJECT_CONTENTS_SUCCESS,
} from '../../redux/subjects/subjectsTypes';

interface ContentSliderContainerProps {
  reel: singleReelSubjectTypes;
  itemKey: number;
  urlParams: any;
}

const ContentSliderContainer: FC<ContentSliderContainerProps> = ({
  reel,
  itemKey,
  urlParams,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [subjectVideoRequest] = useApi();
  const subjectsSelector = useSelector((state: RootStore) => state?.subjects);
  const [isAdminView, setIsAdminView] = useState(false);

  const { user } = useSelector((state: RootStore) => state.auth);
  useEffect(() => {
    if (user?.roles) {
      if (user.roles.includes(userRoles.admin)) {
        setIsAdminView(true);
      } else {
        setIsAdminView(false);
      }
    }
  }, [user]);

  let { subjects } = subjectsSelector;

  subjects = subjects || [];

  const {
    subjectVideos = [],
    tutorVideos = [],
    clickedTutorIndex,
    videosTotalRecords = 0,
    videosPage = 0,
    videosSize = 0,
  } = subjects[itemKey];

  useEffect(() => {
    subjectVideoRequest(
      `/contents/learningMaterials?subjectId=${reel._id}&orderBy=subjectTopicTutorVideoOrder&types=LEARNING_VIDEO&page=1&size=10`,
      INITIALIZE_SUBJECT_CONTENTS_REQUEST,
      INITIALIZE_SUBJECT_CONTENTS_SUCCESS,
      INITIALIZE_SUBJECT_CONTENTS_FAIL,
      {},
      {},
      'GET',
      false,
      CONTENT_SERVICE,
      { subjectId: reel._id }
    );
  }, []);

  const getNewVideos = () => {
    const nextPage = videosPage + 1;

    subjectVideoRequest(
      `/contents/learningMaterials?subjectId=${reel._id}&orderBy=subjectTopicTutorVideoOrder&types=LEARNING_VIDEO&page=${nextPage}&size=${videosSize}`,
      UPDATE_SUBJECT_CONTENTS_REQUEST,
      UPDATE_SUBJECT_CONTENTS_SUCCESS,
      UPDATE_SUBJECT_CONTENTS_FAIL,
      {},
      {},
      'GET',
      false,
      CONTENT_SERVICE,
      { subjectId: reel._id }
    );
  };

  const hoverOnVideo = (data: any) => {
    dispatch({
      type: HOVER_ON_SUBJECT_REEL_CONTENT,
      payload: { dataWrapper: data },
    });
  };

  const addNewContentToSubject = (content: string, subjectID: string) => {
    const { syllabusId, gradeId, locationState } = urlParams || {};
    switch (content) {
      case contentType.video:
        history.push(
          `/admin/create-video/${syllabusId}/${gradeId}/${subjectID}`,
          { ...locationState }
        );
        break;

      case contentType.document:
        history.push(
          `/admin/create-document/${syllabusId}/${gradeId}/${subjectID}`,
          { ...locationState }
        );
        break;
      case contentType.linkedDocument:
        history.push(
          `/admin/create-linked-document/${syllabusId}/${gradeId}/${subjectID}`,
          { ...locationState }
        );
        break;

      case contentType.assignment:
        history.push(
          `/admin/create-assessment/${syllabusId}/${gradeId}/${subjectID}`,
          { ...locationState }
        );
        break;

      default:
        break;
    }
  };

  return (
    <>
      <ContentSlider
        title={reel.name}
        videos={
          !clickedTutorIndex || clickedTutorIndex === -1
            ? subjectVideos
            : tutorVideos
        }
        itemKey={reel._id}
        getNewVideos={getNewVideos}
        videosTotalRecords={videosTotalRecords}
        hoverOnVideo={hoverOnVideo}
        clickedTutorIndex={clickedTutorIndex}
        isAdminView={isAdminView}
        addNewContentToSubject={addNewContentToSubject}
        onSeeMoreClick={() => {
          history.push(`/admin/bulk-view/${reel._id}`);
        }}
      />
    </>
  );
};

export default ContentSliderContainer;
