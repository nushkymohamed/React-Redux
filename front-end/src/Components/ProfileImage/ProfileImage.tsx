import React, { FC, useState, useEffect } from 'react';

//image imports
import profilePicture from '../../assets/images/new-avatar.png';
import backgroundPicture from '../../assets/images/user-headerImage.png';

import { useTranslation } from 'react-i18next';
import { userTypes } from '../../config/constants';

import moment from 'moment';

import UseViewFile from '../../Hooks/UseViewFile';

interface ProfileImageProps {
  isEdit: boolean;
  userData?: any;
  gradeData?: any;
  userType: string;
}

const ProfileImage: FC<ProfileImageProps> = ({
  isEdit,
  userData,
  gradeData,
  userType,
}) => {
  const { t } = useTranslation();
  const [getProfilePicture, urlProfilePic] = UseViewFile();
  const [getBackGroundPicture, urlBackGroundPicture] = UseViewFile();

  const getData = (text: any) => {
    return text || t('No Data Available');
  };

  useEffect(() => {
    if (userData?.profileImage) {
      const { bucketName, fileKey } = userData?.profileImage;
      getProfilePicture(bucketName, fileKey);
    }
    if (userData?.backgroundImage) {
      const { bucketName, fileKey } = userData?.backgroundImage;
      getBackGroundPicture(bucketName, fileKey);
    }
  }, [userData]);

  return (
    <div>
      <div
        className="createContent__header"
        style={{
          backgroundImage: `url(${urlBackGroundPicture || backgroundPicture})`,
        }}
      >
        <div className="container">
          <div className="createContent__wrapper">
            <div className="createContent__header--left">
              <div
                className="user--img"
                style={{
                  backgroundImage: `url(${urlProfilePic || profilePicture})`,
                }}
              ></div>
              <div className="user--details">
                <div className="user--details__name">
                  {userData?.firstName} {userData?.lastName}
                </div>
                {(userType === userTypes.student ||
                  userType === userTypes.tutor) && (
                  <div>
                    {' '}
                    <div className="user--details__memberDate">
                      {t('Member Since')}{' '}
                      <span>
                        {moment(userData?.joinedDate).format('DD/MM/YYYY')}
                      </span>
                    </div>
                    {userType === userTypes.tutor ? (
                      <div className="user--details__grade">{t('Tutor')}</div>
                    ) : (
                      <div className="user--details__grade">
                        {t('Grade')} {getData(gradeData?.name)}
                      </div>
                    )}
                  </div>
                )}
                {userType === userTypes.admin && (
                  <div className="user--details">{t('Super Admin')}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileImage;
