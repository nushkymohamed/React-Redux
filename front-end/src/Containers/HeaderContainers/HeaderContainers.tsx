import { Auth } from 'aws-amplify';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import {
  CONTENT_SERVICE,
  notificationType,
  UserManagementURLTabTypes,
  userTypes,
  USER_CONTENT_SERVICE,
  USER_NOTIFICATION_SERVICE,
  USER_SERVICE,
} from '../../config/constants';
import { isAdmin } from '../../Helper';
import useApi from '../../Hooks/useApi';
import UseViewFile from '../../Hooks/UseViewFile';
import {
  LOGOUT_SUCCESS,
  STUDENT_GRADE_FAILED,
  STUDENT_GRADE_REQUEST,
  STUDENT_GRADE_SUCCESS,
  STUDENT_WELCOME_VIDEO_FAILED,
  STUDENT_WELCOME_VIDEO_REQUEST,
  STUDENT_WELCOME_VIDEO_SUCCESS,
  UPDATE_USER_INFORMATION_FAILED,
  UPDATE_USER_INFORMATION_REQUEST,
  UPDATE_USER_INFORMATION_SUCCESS,
  USER_BY_TYPE_FAILED,
  USER_BY_TYPE_REQUEST,
  USER_BY_TYPE_SUCCESS,
} from '../../redux/auth/authTypes';
import {
  USER_LAST_WATCH_VIDEO_TIMESTAMP_FAILED,
  USER_LAST_WATCH_VIDEO_TIMESTAMP_REQUEST,
  USER_LAST_WATCH_VIDEO_TIMESTAMP_SUCCESS,
} from '../../redux/common/commonTypes';
import {
  HEADER_NOTIFICATION_FAILED,
  HEADER_NOTIFICATION_REQUEST,
  HEADER_NOTIFICATION_SUCCESS,
} from '../../redux/notifications/NotificationType';
import { RootStore } from '../../redux/store';

const HeaderContainers = () => {
  const { user, userData, isUserDataUpdateUsingType, isUserLoginFinalized } =
    useSelector((state: RootStore) => state?.auth);

  const { lastMessage } = useSelector((state: RootStore) => state?.websocket);

  const { headerNotifications, notificationHeaderTotalRecords } = useSelector(
    (state: RootStore) => state.notification
  );
  const { lastWatchedContentInfo } = useSelector(
    (state: RootStore) => state.common
  );
  const { isFullScreen } = useSelector((state: RootStore) => state.theater);

  const [isAdminView, setIsAdminView] = useState(false);

  const { profileImage } = userData || {};
  const [getUserProfileImage, userProfileImageUrl] = UseViewFile();

  const [fetchDataApi] = useApi();
  const [fetchStudentGradeDataApi] = useApi();
  const [fetchNotificationsApi] = useApi();
  const [updateUserLatestLoginApi] = useApi();
  const [getWelcomeVideoApi] = useApi();
  const [getLastWatchVideoApi] = useApi();

  useEffect(() => {
    switch (lastMessage?.task) {
      case notificationType.REMAINDER:
        fetchNotifications();
        break;

      case notificationType.USER_UPDATE:
        getUserData();
        break;

      default:
        break;
    }
  }, [JSON.stringify(lastMessage)]);

  const fetchNotifications = () => {
    !isAdmin(user) &&
      fetchNotificationsApi(
        `/users/${userData?._id}/user-notifications?seen=false&page=1&size=5`,
        HEADER_NOTIFICATION_REQUEST,
        HEADER_NOTIFICATION_SUCCESS,
        HEADER_NOTIFICATION_FAILED,
        {},
        {},
        'GET',
        false,
        USER_NOTIFICATION_SERVICE
      );
  };

  const getUserData = () => {
    fetchDataApi(
      `/users?userIds=${userData?._id}&type=${userData?.type}`,
      USER_BY_TYPE_REQUEST,
      USER_BY_TYPE_SUCCESS,
      USER_BY_TYPE_FAILED,
      {},
      {},
      'GET',
      false,
      USER_SERVICE
    );
  };

  useEffect(() => {
    userData?.type === userTypes.student &&
      !userData?.currentGradeId &&
      !isUserDataUpdateUsingType &&
      getUserData();

    userData?.currentGradeId &&
      fetchStudentGradeDataApi(
        `/grades?gradeIds=${userData?.currentGradeId}`,
        STUDENT_GRADE_REQUEST,
        STUDENT_GRADE_SUCCESS,
        STUDENT_GRADE_FAILED,
        {},
        {},
        'GET',
        false,
        CONTENT_SERVICE
      );

    !isUserDataUpdateUsingType &&
      userData?._id &&
      !isAdmin(user) &&
      updateUserLatestLoginApi(
        `/users/${userData?._id}/lastLoggedInDate`,
        UPDATE_USER_INFORMATION_REQUEST,
        UPDATE_USER_INFORMATION_SUCCESS,
        UPDATE_USER_INFORMATION_FAILED,
        {},
        {},
        'PUT',
        false,
        USER_SERVICE
      );
  }, [userData, user]);

  useEffect(() => {
    profileImage &&
      getUserProfileImage(profileImage.bucketName, profileImage.fileKey);
  }, [profileImage]);

  useEffect(() => {
    isAdmin(user) ? setIsAdminView(true) : setIsAdminView(false);
  }, [user]);

  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    const path = location.pathname;
    const body = document.getElementsByTagName('body')[0];
    if (path.match(/login/g) || path.match(/signup/g)) {
      if (!body.className.match(/header--transparent/g))
        body.className = body.className.concat(' header--transparent');
    } else {
      body.className = body.className.replaceAll(/header--transparent/g, '');
    }
  }, [location.pathname]);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      await Auth.signOut();
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    } catch (error) {
      console.log('logout error', error);
    }
    localStorage.removeItem('is_login');
  };
  useEffect(() => {
    userData?._id && fetchNotifications();
  }, [userData]);

  // handel multiple tab logout method

  useEffect(() => {
    const handleInvalidToken = (e: any) => {
      if (e.key === 'is_login' && e.oldValue && !e.newValue) {
        handleLogout();
      }
    };
    userData?._id && fetchNotifications();
    window.addEventListener('storage', handleInvalidToken);
    return () => {
      window.removeEventListener('storage', handleInvalidToken);
    };
  }, []);

  const userWelcomeVideoData = () => {
    getWelcomeVideoApi(
      `/contents/commonMaterials?type=WELCOME_VIDEO&page=1&size=1`,
      STUDENT_WELCOME_VIDEO_REQUEST,
      STUDENT_WELCOME_VIDEO_SUCCESS,
      STUDENT_WELCOME_VIDEO_FAILED,
      {},
      {},
      'GET',
      false,
      CONTENT_SERVICE
    );
  };

  const userLastWatchVideoData = (userId: string) => {
    getLastWatchVideoApi(
      `/users/${userId}/lastWatchedVideo`,
      USER_LAST_WATCH_VIDEO_TIMESTAMP_REQUEST,
      USER_LAST_WATCH_VIDEO_TIMESTAMP_SUCCESS,
      USER_LAST_WATCH_VIDEO_TIMESTAMP_FAILED,
      {},
      {},
      'GET',
      false,
      USER_CONTENT_SERVICE
    );
  };

  useEffect(() => {
    userData?.lastLoggedInDate &&
      !isAdmin(user) &&
      userLastWatchVideoData(userData._id);
  }, [userData, user]);

  useEffect(() => {
    !lastWatchedContentInfo && !isAdmin(user) && userWelcomeVideoData();
  }, [lastWatchedContentInfo]);

  const headerItemList = [
    {
      label: 'Home',
      path: isAdmin(user) ? '/admin' : '/home',
    },
    {
      label: 'Tutors',
      path: isAdmin(user)
        ? `/admin/user-management/${UserManagementURLTabTypes.TUTORS}`
        : '/tutors',
    },
    {
      label: 'Products',
      path: isAdmin(user) ? '/admin/products' : '/products',
    },
    {
      label: 'Requests',
      path: '/requests',
    },
  ];

  const manageOptionsList = useMemo(() => {
    if (isUserLoginFinalized) {
      let manageOptionLists = [
        {
          label: 'Profile',
          className: `${
            userData &&
            [userTypes.tutor, userTypes.parent].includes(userData?.type)
              ? 'hideElement'
              : ''
          }`,
          tooltip: `${
            userData &&
            [userTypes.tutor, userTypes.parent].includes(userData?.type)
              ? 'Disabled'
              : ''
          } `,
          isAdminView: false,
          path: `${
            userData &&
            [userTypes.tutor, userTypes.parent].includes(userData?.type)
              ? ``
              : `/user-management/${userData?.type}/${userData?._id}`
          }  `,
        },
        {
          label: 'Settings',
          className: 'tooltip-disabled',
          tooltip: 'Disabled',
          path: '',
          isAdminView: false,
        },
        {
          label: 'Change Background Image',
          className: '',
          tooltip: 'Disabled',
          path: '',
          isAdminView: false,
        },
        {
          label: 'Request to Mark',
          className: '',
          tooltip: 'Disabled',
          path: '',
          isAdminView: false,
        },
        {
          label: 'Admin Panel',
          className: '',
          tooltip: '',
          path: '/admin',
          isAdminView: true,
        },
      ];
      return manageOptionLists;
    }
  }, [isUserLoginFinalized]);

  const gotoHomePage = () => {
    isAdminView ? history.push('/admin') : history.push('/');
  };
  const gotoPage = (path: string) => {
    history.push(path);
  };

  const isSelectedPage = (path: string): boolean => {
    return history.location.pathname === path;
  };

  return (
    <Header
      notificationCount={notificationHeaderTotalRecords}
      gotoHomePage={gotoHomePage}
      gotoPage={gotoPage}
      handleLogout={handleLogout}
      headerItemList={headerItemList}
      isAdminView={isAdminView}
      isUserLoginFinalized={isUserLoginFinalized}
      manageOptionsList={manageOptionsList || []}
      userData={userData}
      userProfileImageUrl={userProfileImageUrl}
      isSelectedPage={isSelectedPage}
      notifications={headerNotifications || []}
      isFullScreen={isFullScreen}
    />
  );
};

export default HeaderContainers;
