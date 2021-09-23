import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LoginView from '../../Components/Pages/LoginView/LoginView';
import {
  AccountStatus,
  CONTENT_SERVICE,
  userRoles,
  USER_SERVICE,
} from '../../config/constants';
import useApi from '../../Hooks/useApi';
import useAuth from '../../Hooks/useAuth';
import useValidateSubscription from '../../Hooks/useValidateSubscription';
import {
  LOGIN_INITIALIZE,
  USER_LOGIN_FINALIZED,
  USER_TYPE_FAILED,
  USER_TYPE_REQUEST,
  USER_TYPE_SUCCESS,
} from '../../redux/auth/authTypes';
import {
  GET_DIVISION_HIERARCHY_FAILED,
  GET_DIVISION_HIERARCHY_REQUEST,
  GET_DIVISION_HIERARCHY_SUCCESS,
} from '../../redux/dataBase/dataBaseTypes';
import { RootStore } from '../../redux/store';

const LoginContainer = () => {
  const history = useHistory();
  const [fetchDataApi] = useApi();
  const [fetchHierarchyApi] = useApi();
  const dispatch = useDispatch();
  const signIn = useAuth();
  const { t } = useTranslation();
  const [validSubscriptionData, validateSubscription] =
    useValidateSubscription();

  const { errorCode, user, loading, userData } = useSelector(
    (state: RootStore) => state.auth
  );

  const { hierarchy } = useSelector((state: RootStore) => state.dataBase);

  const [isAccountConfirmationModalOpen, setIsAccountConfirmationModalOpen] =
    useState(false);

  const [loginErrorMessage, setLoginErrorMessage] = useState('');
  const handleSignIn = (data: { username: string; password: string }) => {
    signIn(data.username, data.password, new Date().getTime());
  };

  useEffect(() => {
    if (user?.roles && !userData?._id) {
      const email = user?.email;
      fetchDataApi(
        `/users/${email}`,
        USER_TYPE_REQUEST,
        USER_TYPE_SUCCESS,
        USER_TYPE_FAILED,
        {},
        {},
        'GET',
        false,
        USER_SERVICE
      );
    }
  }, [user]);

  const setUserLogin = () => {
    dispatch({ type: USER_LOGIN_FINALIZED });

    localStorage.setItem('is_login', 'true');
  };

  useEffect(() => {
    if (user?.roles && userData?.email) {
      const { roles } = user;
      if (roles.includes(userRoles.admin)) {
        setUserLogin();
        history.replace('/admin');
      } else if (roles.includes(userRoles.student)) {
        if (userData.accountStatus === AccountStatus.ACCEPTED) {
          validateSubscription();
        } else {
          //This happens when email verified on Cognito but not in our database
          setLoginErrorMessage(
            t('Your email is not yet verified. Please contact an administrator')
          );
        }
      }
    }
  }, [user, userData]);

  useEffect(() => {
    !hierarchy?.countryCode &&
      userData?.countryCode &&
      fetchHierarchyApi(
        `/countries/${userData?.countryCode}`,
        GET_DIVISION_HIERARCHY_REQUEST,
        GET_DIVISION_HIERARCHY_SUCCESS,
        GET_DIVISION_HIERARCHY_FAILED,
        {},
        {},
        'GET',
        false,
        CONTENT_SERVICE
      );
  }, [userData, hierarchy]);

  useEffect(() => {
    if (validSubscriptionData) {
      setUserLogin();
      if (validSubscriptionData.isSubscriptionAvailable) {
        history.replace('/home');
      } else {
        history.replace('/trial/select-subjects');
      }
    }
  }, [validSubscriptionData]);

  useEffect(() => {
    if (errorCode) {
      switch (errorCode) {
        case 'UserNotConfirmedException':
          setIsAccountConfirmationModalOpen(true);
          setLoginErrorMessage(t('Account is not verified'));
          break;
        case 'NotAuthorizedException':
          setLoginErrorMessage(t('Incorrect username or password'));
          break;
        default:
          setLoginErrorMessage('');
          break;
      }
    } else {
      setLoginErrorMessage('');
    }
  }, [errorCode]);

  useEffect(() => {
    dispatch({
      type: LOGIN_INITIALIZE,
    });
  }, []);

  return (
    <LoginView
      handleSignIn={handleSignIn}
      isAccountConfirmationModalOpen={isAccountConfirmationModalOpen}
      loading={loading}
      loginErrorMessage={loginErrorMessage}
      setIsAccountConfirmationModalOpen={setIsAccountConfirmationModalOpen}
    />
  );
};

export default LoginContainer;
