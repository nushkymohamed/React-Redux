import React, { FC, useEffect } from 'react';
import { onImageLoadError, textToTitleCase } from '../../../Helper';
import UseViewFile from '../../../Hooks/UseViewFile';
import { UserType } from '../../../redux/userManagement/userManagementReducer';
import defaultProfileImage from '../../../assets/images/default-profile-image.png';
import { UserManagementTabTypes, userTypes } from '../../../config/constants';
import { useHistory } from 'react-router';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from '../../../redux/store';

interface userPropTypes {
  user: UserType;
  selectedTab: string;
}

const User: FC<userPropTypes> = ({ user, selectedTab }) => {
  const [bucketDetails, imageUrl] = UseViewFile();
  const history = useHistory();
  const [bottomText, setBottomText] = useState('');
  const [country, setCountry] = useState('');
  const { userGrades, userCountries } = useSelector(
    (state: RootStore) => state.userManagement
  );

  useEffect(() => {
    if (user.profileImage?.bucketName && user.profileImage?.fileKey) {
      bucketDetails(user.profileImage?.bucketName, user.profileImage?.fileKey);
    }
  }, [user]);

  const openProfilePage = () => {
    history.push(`/user-management/${user.type}/${user._id}`);
  };

  useEffect(() => {
    switch (selectedTab) {
      case UserManagementTabTypes.ALL:
        {
          if (user.type === userTypes.student && user.currentGradeId) {
            const grade = userGrades?.find(
              grade => grade._id === user.currentGradeId
            );
            grade && setBottomText(grade.name);
          }
        }
        break;

      case UserManagementTabTypes.STUDENTS:
        {
          // display number of products
        }
        break;
      default:
        setBottomText('');
        break;
    }
  }, [selectedTab, user, userGrades]);

  useEffect(() => {
    if (user.countryCode && userCountries?.length) {
      const countryDetails = userCountries.find(
        country => country.countryCode === user.countryCode
      );

      countryDetails && setCountry(countryDetails.name);
    }
  }, [user, userCountries]);

  return (
    <div className="individualUser--wrapper" onClick={openProfilePage}>
      <img
        src={imageUrl}
        alt="profile-image"
        onError={e => onImageLoadError(e, defaultProfileImage)}
      />
      <div className="individualUser--name">
        <p>
          {user.firstName} {user.lastName}
        </p>
      </div>
      <div className="individualUser--email">
        <p>{user.email}</p>
      </div>
      <div className="individualUser--country">
        <p>{country}</p>
      </div>
      <div className="individualUser--type">
        <p>{bottomText || textToTitleCase(user.type)}</p>
      </div>
    </div>
  );
};

export default User;
