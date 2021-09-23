import React, { FC, useEffect, useRef, useState } from 'react';
import UseViewFile from '../../Hooks/UseViewFile';
import defaultImage from '../../assets/images/default-profile-image.png';

interface TutorProps {
  tutor: any;
  tutorOnclick: any;
  index: any;
  subjectID: any;
  clickTutorIndex: any;
  highlightedTutorIndex: any;
}

const Tutor: FC<TutorProps> = ({
  tutor,
  tutorOnclick,
  index,
  subjectID,
  clickTutorIndex,
  highlightedTutorIndex,
}) => {
  const [getFromBucket, url] = UseViewFile();

  const [tutorImage, setTutorImage] = useState('');

  useEffect(() => {
    if (tutor) {
      const { bucketName, fileKey } = tutor?.profileImage || {};
      bucketName && fileKey && getFromBucket(bucketName, fileKey);
    }
  }, [tutor]);

  useEffect(() => {
    setTutorImage(url);
  }, [url]);

  return (
    <div
      className="tutorReel__video"
      onClick={() =>
        tutorOnclick({
          tutorId: tutor._id,
          subjectId: subjectID,
          index,
          isTutorClick: true,
        })
      }
    >
      <div className="tutorReel__video--wrapper">
        <div
          className={`tutorReel__tutor 
        ${
          clickTutorIndex === index || highlightedTutorIndex === index
            ? 'active'
            : ''
        }`}
        >
          <div className="tutorReel__leftcontent">
            <img
              src={tutorImage}
              alt="avatar-icon"
              className="dark-icon icon--avatar"
              onError={() => {
                setTutorImage(defaultImage);
              }}
            />
          </div>
          <div className="tutorReel__rightcontent">
            <p>{tutor?.firstName || ''}</p>
            <span>{tutor?.lastName || ''}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutor;
