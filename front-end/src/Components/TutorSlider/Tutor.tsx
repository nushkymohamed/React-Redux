import React, { FC, useEffect, useState } from 'react';
import defaultImage from '../../assets/images/default-profile-image.png';
import UseViewFile from '../../Hooks/UseViewFile';
import { tutorType } from '../../redux/student/reelTutorReducer';

interface TutorProps {
  tutor: tutorType;
  onTutorClick: any;
  highlightedTutorId: string | null;
}

const Tutor: FC<TutorProps> = ({ tutor, onTutorClick, highlightedTutorId }) => {
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
    <div className="tutorReel__video" onClick={() => onTutorClick(tutor._id)}>
      <div className="tutorReel__video--wrapper">
        <div
          className={`tutorReel__tutor 
        ${tutor._id === highlightedTutorId ? 'active' : ''}`}
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
