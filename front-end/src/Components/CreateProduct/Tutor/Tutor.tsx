import React, { FC, useEffect, useState } from 'react';
import UseViewFile from '../../../Hooks/UseViewFile';
import { reelTutors } from '../../../redux/product/productReducer';
import defaultImage from '../../../assets/images/default-profile-image.png';
interface TutorProps {
  tutor: reelTutors;
  selectTutorAction: Function;
}

const Tutor: FC<TutorProps> = ({ tutor, selectTutorAction }) => {
  const {
    firstName,
    lastName,
    profileImage,
    _id,
    isTutorSelected,
    contentCount,
  } = tutor;

  const [s3BucketMethod, url] = UseViewFile();

  useEffect(() => {
    const { bucketName, fileKey } = profileImage || {};

    bucketName && fileKey && s3BucketMethod(bucketName, fileKey);
  }, [profileImage]);

  const [tutorImage, setTutorImage] = useState('');
  useEffect(() => {
    setTutorImage(url);
  }, [url]);

  return (
    <div
      className={`addContentScreen--tutors-content-item ${
        isTutorSelected ? 'selected' : ''
      }`}
      onClick={() => selectTutorAction(_id)}
    >
      <div className="addContentScreen--tutors-content-item__image">
        <img
          src={tutorImage}
          onError={() => {
            setTutorImage(defaultImage);
          }}
        />
      </div>
      <div className="addContentScreen--tutors-content-item__name">
        {firstName} {lastName}
      </div>
      <div className="addContentScreen--tutors-content-item__count">
        {!contentCount || contentCount === 0
          ? 'No Videos'
          : `${contentCount} Videos`}
      </div>
    </div>
  );
};

export default Tutor;
