import React, { FC, useState } from 'react';

import { useDispatch } from 'react-redux';
import { RESET_LAST_MESSAGE } from '../../../../../redux/websocket/websocketTypes';

import { userTypes } from '../../../../../config/constants';
import ProfileImage from '../../../../ProfileImage/ProfileImage';

import { useTranslation } from 'react-i18next';
import ChangePasswordPopupContainer from '../../../../../Containers/ChangePassword/ChangePasswordPopupContainer';
interface AdminViewPageProps {
  userData: any;
  toggleHandler: Function;
  userType?: string;
  isEdit: boolean;
}

const AdminViewPage: FC<AdminViewPageProps> = ({
  userData,
  toggleHandler,
  userType = userTypes.admin,
  isEdit,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [showChangePassword, setShowChangePassword] = useState(false);

  return (
    <div className="createContent user-details-page">
      {showChangePassword && (
        <ChangePasswordPopupContainer
          onClickAway={() => setShowChangePassword(false)}
        />
      )}
      <ProfileImage isEdit={false} userType={userType} userData={userData} />
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
                          {isEdit && (
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
                            {t('Email')} : <span>{userData?.email}</span>
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

export default AdminViewPage;
