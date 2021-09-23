import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import VisibilitySensor from 'react-visibility-sensor';
import LoadingScreen from '../../Components/LoadingScreen/LoadingScreen';
import NotificationCard from '../../Components/Notification/NotificationsCard';
import { USER_NOTIFICATION_SERVICE } from '../../config/constants';
import useApi from '../../Hooks/useApi';
import { singleNotification } from '../../redux/notifications/NotificationReducer';
import {
  GET_NOTIFICATION_FAILED,
  GET_NOTIFICATION_REQUEST,
  GET_NOTIFICATION_SUCCESS,
  READ_NOTIFICATION_FAILED,
  READ_NOTIFICATION_REQUEST,
  READ_NOTIFICATION_SUCCESS,
} from '../../redux/notifications/NotificationType';
import { RootStore } from '../../redux/store';

const NotificationContainer = (props: any) => {
  const {
    notifications,
    notificationPage,
    notificationPageSize,
    notificationTotalRecords,
    isLoading,
  } = useSelector((state: RootStore) => state.notification);
  const { userData } = useSelector((state: RootStore) => state.auth);
  const [fetchNotificationsApi] = useApi();
  const [updateNotificationApi] = useApi();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchNotifications(1, notificationPageSize);
  }, []);

  const fetchNotifications = (page: number, size: number) => {
    fetchNotificationsApi(
      `/users/${userData?._id}/user-notifications?page=${page}&size=${size}`,
      GET_NOTIFICATION_REQUEST,
      GET_NOTIFICATION_SUCCESS,
      GET_NOTIFICATION_FAILED,
      {},
      {},
      'GET',
      false,
      USER_NOTIFICATION_SERVICE
    );
  };

  const readNotification = (notification: singleNotification) => {
    if (notification?.seen) {
      return;
    }
    const merged = { ...notification, userId: userData?._id, seen: true };
    updateNotificationApi(
      `/user-notifications`,
      READ_NOTIFICATION_REQUEST,
      READ_NOTIFICATION_SUCCESS,
      READ_NOTIFICATION_FAILED,
      merged,
      {},
      'PUT',
      false,
      USER_NOTIFICATION_SERVICE,
      { id: notification._id }
    );
  };

  return (
    <div className="notifications">
      <div className="container">
        <div className="notifications__wrapper">
          <h2 className="page-title">{t('Notifications')}</h2>
          {notifications?.length ? (
            <>
              {notifications?.map((notification: singleNotification) => {
                return (
                  <NotificationCard
                    notification={notification}
                    onClickCard={() => readNotification(notification)}
                  />
                );
              })}
              <VisibilitySensor
                partialVisibility
                onChange={isVisible => {
                  isVisible &&
                    fetchNotifications(
                      notificationPage + 1,
                      notificationPageSize
                    );
                }}
              >
                <div style={{ color: '#000' }}>.</div>
              </VisibilitySensor>
            </>
          ) : isLoading ? (
            <LoadingScreen />
          ) : (
            <div>
              <div className="createContent__body--content empty">
                {t('No Notification Available')}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default NotificationContainer;
