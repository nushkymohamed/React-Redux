import React, { FC, useState } from 'react';

import { useDispatch } from 'react-redux';
import { RESET_LAST_MESSAGE } from '../../../../../redux/websocket/websocketTypes';

import { useTranslation } from 'react-i18next';

import { userTypes } from '../../../../../config/constants';
import ChangePasswordPopupContainer from '../../../../../Containers/ChangePassword/ChangePasswordPopupContainer';
import ProfileImage from '../../../../ProfileImage/ProfileImage';

interface StudentViewPageProps {
  userData: any;
  countryData?: any;
  gradeData?: any;
  syllabusData?: any;
  schoolData?: any;
  isEdit?: boolean;
  userOrigin?: boolean;
  toggleHandler: Function;
  userType?: string;
}

const StudentViewPage: FC<StudentViewPageProps> = ({
  userData,
  countryData,
  gradeData,
  syllabusData,
  schoolData,
  isEdit,
  userOrigin,
  toggleHandler,
  userType = userTypes.student,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [showChangePassword, setShowChangePassword] = useState(false);

  const getData = (text: any) => {
    return text || t('No Data Available');
  };
  return (
    <div className="createContent user-details-page">
      {showChangePassword && (
        <ChangePasswordPopupContainer
          onClickAway={() => setShowChangePassword(false)}
        />
      )}
      <ProfileImage
        isEdit={false}
        userData={userData}
        gradeData={gradeData}
        userType={userType}
      />
      <div className="container">
        <div className="createContent__wrapper">
          <div className="createContent__body">
            <div className="createContent__body--content">
              <div className="user--details__wrapper">
                <h3 className="user--details__title">{t('Overview')}</h3>
                <div className="user--details__content">
                  <div className="user--details__content-row--wrapper">
                    <div className="user--details__content-row personalInfo">
                      <div className="user--details__content-header">
                        <div className="user--details__content-title">
                          {t('Personal Information')}
                        </div>
                        <div className="user--details__content-buttons">
                          {isEdit && (
                            <button
                              className="btn usermanagement-wrapper-body-userlist-wrapper-requests"
                              onClick={() => {
                                toggleHandler(userType);
                                dispatch({
                                  type: RESET_LAST_MESSAGE,
                                });
                              }}
                            >
                              {t('Edit Profile')}
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="user--details__content-body">
                        <div className="user--details__content-column">
                          <div className="user--details__content-innerRow">
                            {t('First Name')} :{' '}
                            <span>{userData?.firstName}</span>
                          </div>
                          <div className="user--details__content-innerRow">
                            {t('Last Name')} : <span>{userData?.lastName}</span>
                          </div>
                          {userOrigin && (
                            <div className="user--details__content-innerRow">
                              {t('Password')} :{' '}
                              <span
                                className="password"
                                onClick={() => setShowChangePassword(true)}
                              >
                                {t('Change Password')}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="user--details__content-column">
                          <div className="user--details__content-innerRow">
                            {t('Date of Birth')} :{' '}
                            <span>{getData(userData?.dob)}</span>
                          </div>
                          <div className="user--details__content-innerRow">
                            {t('Phone Number')} :{' '}
                            <span>{getData(userData?.phone)}</span>
                          </div>
                        </div>
                        <div className="user--details__content-column">
                          <div className="user--details__content-innerRow">
                            {t('Country')} :{' '}
                            <span>{getData(countryData?.name)}</span>
                          </div>
                          <div className="user--details__content-innerRow">
                            {t('Email')} : <span>{userData?.email}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="user--details__content-row--divider"></div>
                      <div className="user--details__content-row educationalInfo">
                        <div className="user--details__content-header">
                          <div className="user--details__content-title">
                            {t('Educational Information')}
                          </div>
                          <div className="user--details__content-buttons"></div>
                        </div>
                        <div className="user--details__content-body">
                          <div className="user--details__content-column">
                            <div className="user--details__content-innerRow">
                              {t('Syllabus')} :{' '}
                              <span>{getData(syllabusData?.name)}</span>
                            </div>
                          </div>
                          <div className="user--details__content-column">
                            <div className="user--details__content-innerRow">
                              {t('Grade')} :{' '}
                              <span>{getData(gradeData?.name)}</span>
                            </div>
                          </div>
                          <div className="user--details__content-column">
                            <div className="user--details__content-innerRow">
                              {t('School')} :{' '}
                              <span>{getData(schoolData?.name)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentViewPage;
