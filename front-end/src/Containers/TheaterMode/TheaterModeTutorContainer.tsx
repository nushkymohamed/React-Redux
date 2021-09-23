import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import TutorInfo from '../../Components/TheaterMode/TutorInfo';
import { USER_SERVICE } from '../../config/constants';
import useApi from '../../Hooks/useApi';
import useDataBase from '../../Hooks/useDataBase';
import {
  singleLessonType,
  singleSubjectType,
  singleTopicType,
} from '../../redux/common/commonReducer';
import { RootStore } from '../../redux/store';
import {
  FETCH_TUTOR_INFO_FAILED,
  FETCH_TUTOR_INFO_REQUEST,
  FETCH_TUTOR_INFO_SUCCESS,
} from '../../redux/Theater/TheaterTypes';

interface propsType {
  userId: string;
  downloadSummery: () => void;
}
const TheaterModeTutorContainer: FC<propsType> = ({
  userId,
  downloadSummery,
}) => {
  const [fetchUserDetails] = useApi();
  const [getListOfLessons, lessonsList] = useDataBase();
  const [getSubject, subject] = useDataBase();
  const [getTopic, topic] = useDataBase();

  const { isFullScreen, tutorDetail, content ,isDownloading} = useSelector(
    (state: RootStore) => state.theater
  );

  useEffect(() => {
    if (content) {
      getListOfLessons('lesson', { ids: content?.lessonIds });
      getSubject('subject', { ids: [content?.subjectId || ''] });
      getTopic('topic', { ids: [content?.topicId || ''] });
    }
  }, [content]);

  const fetchUserInfo = () => {
    fetchUserDetails(
      `/users?userIds=${userId}`,
      FETCH_TUTOR_INFO_REQUEST,
      FETCH_TUTOR_INFO_SUCCESS,
      FETCH_TUTOR_INFO_FAILED,
      {},
      {},
      'GET',
      false,
      USER_SERVICE
    );
  };

  useEffect(() => {
    userId && fetchUserInfo();
  }, [userId]);

  return (
    <TutorInfo
      downloadSummery={downloadSummery}
      topic={(topic?.length ? topic[0] : {}) as singleTopicType}
      subject={(subject?.length ? subject[0] : {}) as singleSubjectType}
      lessons={lessonsList as singleLessonType[]}
      content={content}
      isFullScreen={isFullScreen}
      tutorDetail={tutorDetail}
      isDownloading={isDownloading}
    />
  );
};
export default TheaterModeTutorContainer;
