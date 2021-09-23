import React, { FC, useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../../../../../redux/store';

import { useForm } from 'react-hook-form';
import {
  nameRegex,
  SocketRedirect,
  userTypes,
} from '../../../../../config/constants';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

import Overlay from '../../../../../Components/Overlay/Overlay';

import { checkUserUpdateSocket } from '../../../../../Helper/index';

import { RESET_INDIVIDUAL_USER_MANAGEMENT } from '../../../../../redux/userManagement/userManagementTypes';
import ChangePasswordPopupContainer from '../../../../../Containers/ChangePassword/ChangePasswordPopupContainer';
import ProfileImage from '../../../../ProfileImage/ProfileImage';

type BasicDetails = {
  firstName: string;
  lastName: string;
};
interface AdminEditPageProps {
  userData: any;
  toggleHandler: Function;
  userUpdateDetails: Function;
  userType?: string;
  isEdit: boolean;
}

const AdminEditPage: FC<AdminEditPageProps> = ({
  userData,
  toggleHandler,
  userUpdateDetails,
  userType = userTypes.admin,
  isEdit,
}) => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const [showOverlay, setShowOverlay] = useState(false);
  const { lastMessage } = useSelector((state: RootStore) => state.websocket);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const preLoadedVales = {
    firstName: userData?.firstName,
    lastName: userData?.lastName,
  };
  const { register, handleSubmit, errors } = useForm<BasicDetails>({
    shouldFocusError: true,
    defaultValues: preLoadedVales,
  });

  //here have to ensure the socket message belong to this particular task (have to implement)
  useEffect(() => {
    lastMessage && redirectAfterSuccess(lastMessage);
  }, [lastMessage]);

  const onSubmit = handleSubmit(data => {
    setShowOverlay(true);
    userUpdateDetails(data, userType);
  });

  const redirectAfterSuccess = (socket: any) => {
    if (socket) {
      const message = checkUserUpdateSocket(socket, userData?._id);
      if (message) {
        dispatch({
          type: RESET_INDIVIDUAL_USER_MANAGEMENT,
        });
        if (message === SocketRedirect.USER_VIEW) {
          setShowOverlay(false);
          toggleHandler(userType);
        } else {
          history.push('/');
        }
      }
    } else {
      history.push('/');
    }
  };

  return (
    <div className="createContent user-details-page editScreen">
      {showChangePassword && (
        <ChangePasswordPopupContainer
          onClickAway={() => setShowChangePassword(false)}
        />
      )}
      {showOverlay && (
        <Overlay
          showLoader
          onOverlayHide={() => redirectAfterSuccess('')}
          duration={10000}
        />
      )}
      <ProfileImage isEdit={true} userType={userType} userData={userData} />
      <div className="container">
        <div className="createContent__wrapper">
          <div className="createContent__body">
            <div className="createContent__body--content">
              <div className="user--details__wrapper">
                <h3 className="user--details__title">{t('Overview')}</h3>
                <div className="user--details__content">
                  <div className="user--details__content-row--wrapper">
                    <div className="user--details__content-row personalInfo">
                      <form onSubmit={onSubmit}>
                        <div className="user--details__content-header">
                          <div className="user--details__content-title">
                            {t('Personal Information')}
                          </div>
                          <div className="user--details__content-buttons">
                            <button
                              className="btn usermanagement-wrapper-body-userlist-wrapper-requests"
                              type="submit"
                            >
                              {t('Save')}
                            </button>
                          </div>
                        </div>
                        <div className="user--details__content-body">
                          <div className="user--details__content-column">
                            <div className="user--details__content-innerRow">
                              {t('First Name')} :{' '}
                              <div className="form">
                                <div className="form__form--field">
                                  <input
                                    className="form-input"
                                    type="text"
                                    placeholder={t('First Name')}
                                    ref={register({
                                      required: 'First name cannot be empty',
                                      validate: value =>
                                        value.match(nameRegex) ||
                                        t('Enter a valid name'),
                                    })}
                                    id="firstName"
                                    name="firstName"
                                    maxLength={100}
                                  ></input>
                                  <span className="error">
                                    {errors.firstName?.message}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="user--details__content-innerRow">
                              {t('Last Name')} :
                              <div className="form">
                                <div className="form__form--field">
                                  <input
                                    className="form-input"
                                    type="text"
                                    placeholder={t('Last Name')}
                                    ref={register({
                                      required: 'Last name cannot be empty',
                                      validate: value =>
                                        value.match(nameRegex) ||
                                        t('Enter a valid name'),
                                    })}
                                    name="lastName"
                                    maxLength={100}
                                  ></input>
                                  <span className="error">
                                    {errors.lastName?.message}
                                  </span>
                                </div>
                              </div>
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
                      </form>
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

export default AdminEditPage;
