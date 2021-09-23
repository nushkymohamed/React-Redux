import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import defaultImage from '../../assets/images/default-profile-image.png';
import { truncateText } from '../../Helper';
import UseViewFile from '../../Hooks/UseViewFile';
import {
  singleLessonType,
  singleSubjectType,
  singleTopicType,
} from '../../redux/common/commonReducer';
import {
  TheaterContent,
  TutorDetailType,
} from '../../redux/Theater/TheaterReducer';
import ShareDownloadButtons from '../TheaterMode/ShareDownloadButtons';

interface TutorInfoProps {
  tutorDetail: TutorDetailType | null;
  isFullScreen: boolean;
  content: TheaterContent | null;
  downloadSummery: () => void;
  isDownloading:boolean
  lessons: singleLessonType[] | null;
  subject: singleSubjectType;
  topic: singleTopicType;
}

const TutorInfo: FC<TutorInfoProps> = ({
  tutorDetail,
  isFullScreen,
  content,
  downloadSummery,
  isDownloading,
  lessons,
  subject,
  topic,
}) => {
  const { t } = useTranslation();

  const [getTutorProfileImage, tutorProfileUrl] = UseViewFile();

  const [tutorImage, setTutorImage] = useState('');
  useEffect(() => {
    setTutorImage(tutorProfileUrl);
  }, [tutorProfileUrl]);

  useEffect(() => {
    if (tutorDetail) {
      const { bucketName, fileKey } = tutorDetail?.profileImage || {};
      bucketName && fileKey && getTutorProfileImage(bucketName, fileKey);
    }
  }, [tutorDetail]);
  const lessonList = [lessons?.map(({ name }) => name)].join(' | ');

  return (
    <div
      className="theaterMode__videoInfo"
      style={{ display: `${!isFullScreen ? 'block' : 'none'}` }}
    >
      <div className="theaterMode__videoInfo--wrapper">
        <div className="theaterMode__videoInfo--leftCol">
          <div className="theaterMode__videoInfo--avatar">
            <img src={tutorImage} onError={() => setTutorImage(defaultImage)} />
          </div>
        </div>
        <div className="theaterMode__videoInfo--rightCol">
          <div className="theaterMode__videoInfo--videoTitle">
            <p>{content?.title}</p>
            <p>
              {t('by')} {tutorDetail?.firstName}
            </p>
          </div>
          <div className="theaterMode__videoInfo--videoDetails">
            <p>
              {t('Subject')} <span>{subject.name}</span>
            </p>
            <p>
              {t('Topic')}{' '}
              <span>{truncateText(`${topic.topic || ''}`, 40)}</span>
            </p>
            <p>
              {t('Lesson')} <span>{truncateText(`${lessonList}`, 40)}</span>
            </p>
          </div>
        </div>
        <ShareDownloadButtons isDownloading={isDownloading} downloadSummery={downloadSummery} />
      </div>
    </div>
  );
};

export default TutorInfo;
