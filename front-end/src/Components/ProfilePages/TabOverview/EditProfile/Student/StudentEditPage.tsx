import React, { FC, useState, useEffect } from 'react';
import moment from 'moment';

import { Controller, useForm } from 'react-hook-form';
import Input from 'react-phone-number-input/input';

import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../../../../../redux/store';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import {
  userTypes,
  SocketRedirect,
  nameRegex,
} from '../../../../../config/constants';
import { RESET_INDIVIDUAL_USER_MANAGEMENT } from '../../../../../redux/userManagement/userManagementTypes';

import Overlay from '../../../../../Components/Overlay/Overlay';
import ProfileImage from '../../../../ProfileImage/ProfileImage';

import { checkUserUpdateSocket } from '../../../../../Helper/index';

import ChangePasswordPopupContainer from '../../../../../Containers/ChangePassword/ChangePasswordPopupContainer';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

type BasicDetails = {
  firstName: string;
  lastName: string;
  dob: Date | string;
  phone: string;
};
interface StudentEditPageProps {
  userData: any;
  countryData?: any;
  gradeData?: any;
  syllabusData?: any;
  schoolData?: any;
  userOrigin?: boolean;
  toggleHandler: Function;
  userUpdateDetails: Function;
  userType?: string;
}

const StudentEditPage: FC<StudentEditPageProps> = ({
  userData,
  countryData,
  gradeData,
  syllabusData,
  schoolData,
  userOrigin,
  toggleHandler,
  userUpdateDetails,
  userType = userTypes.student,
}) => {
  const { t } = useTranslation();
  const history = useHistory();
  const [showOverlay, setShowOverlay] = useState(false);
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState(userData?.phone || '');
  const { lastMessage } = useSelector((state: RootStore) => state.websocket);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const preLoadedVales = {
    firstName: userData?.firstName || '',
    lastName: userData?.lastName || '',
    dob: userData?.dob ? moment(userData?.dob, 'DD/MM/YYYY').toDate() : '',
    phone: '+' + userData?.phone || '',
  };

  const { register, handleSubmit, errors, control, getValues } =
    useForm<BasicDetails>({
      shouldFocusError: true,
      defaultValues: preLoadedVales,
    });

  //here have to ensure the socket message belong to this particular task (have to implement)
  useEffect(() => {
    lastMessage && redirectAfterSuccess(lastMessage);
  }, [lastMessage]);

  const onSubmit = handleSubmit(data => {
    setShowOverlay(true);
    data.phone = data?.phone.slice(1);
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
      <ProfileImage
        isEdit={true}
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
                      <form onSubmit={onSubmit}>
                        <div className="user--details__content-header">
                          <div className="user--details__content-title">
                            {t('Personal Information')}
                          </div>
                          <div className="user--details__content-buttons">
                            <button
                              className="btn btn--primary btn--curved"
                              type="submit"
                            >
                              {t('Save')}
                            </button>
                          </div>
                        </div>
                        <div className="user--details__content-body">
                          <div className="user--details__content-column">
                            <div className="user--details__content-innerRow">
                              {t('First Name')} :
                              <div className="form">
                                <div className="form__form--field">
                                  <input
                                    type="text"
                                    className="form-input"
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
                                    type="text"
                                    className="form-input"
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
                              {t('Date of Birth')} :
                              <div className="form">
                                <div className="form__form--field">
                                  <Controller
                                    control={control}
                                    name="dob"
                                    rules={{
                                      required: 'Birthday cannot be empty',
                                    }}
                                    render={props => (
                                      <DatePicker
                                        className="form-input"
                                        placeholderText="dd/mm/yy"
                                        onChange={(e: any) => {
                                          props.onChange(e);
                                        }}
                                        selected={props.value}
                                        dateFormat="dd/MM/yy"
                                        showMonthDropdown
                                        showYearDropdown
                                        dropdownMode="select"
                                      />
                                    )}
                                  />
                                  <span className="error">
                                    {errors.dob?.message}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="user--details__content-innerRow">
                              {t('Phone Number')} :
                              <div className="form">
                                <div className="form__form--field">
                                  <Controller
                                    control={control}
                                    name="phone"
                                    rules={{
                                      required: true,
                                      minLength: 7,
                                    }}
                                    render={props => (
                                      <Input
                                        id="phoneInput"
                                        className="form-input"
                                        value={phoneNumber}
                                        country={
                                          phoneNumber
                                            ? ''
                                            : countryData?.countryCode.toUpperCase()
                                        }
                                        international
                                        withCountryCallingCode={
                                          phoneNumber ? false : true
                                        }
                                        placeholder={t('Your phone number')}
                                        onChange={(val: any) => {
                                          props.onChange(val);
                                          setPhoneNumber(val);
                                        }}
                                      />
                                    )}
                                  />
                                  <span className="error">
                                    {errors.phone &&
                                      t('Enter a valid phone number')}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="user--details__content-column">
                            <div className="user--details__content-innerRow">
                              {t('Country')} : <span>{countryData?.name}</span>
                            </div>
                            <div className="user--details__content-innerRow">
                              {t('Email')} : <span>{userData?.email}</span>
                            </div>
                          </div>
                        </div>
                      </form>
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
                              <span>{syllabusData?.name}</span>
                            </div>
                          </div>
                          <div className="user--details__content-column">
                            <div className="user--details__content-innerRow">
                              {t('Grade')} : <span>{gradeData?.name}</span>
                            </div>
                          </div>
                          <div className="user--details__content-column">
                            <div className="user--details__content-innerRow">
                              {t('School')} :
                              <div className="form">
                                <div className="form__form--field">
                                  <span>{schoolData?.name}</span>
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
      </div>
    </div>
  );
};

export default StudentEditPage;
