import { avoidedDuplicationData, getArrayIndexUsingKey } from '../../Helper';
import {
  GET_NOTIFICATION_FAILED,
  GET_NOTIFICATION_REQUEST,
  GET_NOTIFICATION_SUCCESS,
  HEADER_NOTIFICATION_RESET,
  HEADER_NOTIFICATION_SUCCESS,
  READ_NOTIFICATION_SUCCESS
} from './NotificationType';

export interface singleNotification {
  _id: string;
  userId: string;
  title: string;
  message: string;
  reminderDate: string;
  seen: boolean;
  userNotificationType: string;
}

export interface NotificationTypes {
  notifications: singleNotification[] | null;
  headerNotifications: singleNotification[] | null;
  notificationPageSize: number;
  notificationPage: number;
  notificationTotalRecords: number;
  notificationHeaderPageSize: number;
  notificationHeaderPage: number;
  notificationHeaderTotalRecords: number;
  isLoading: boolean;
}

const INITIAL_STATE: NotificationTypes = {
  notifications: [],
  headerNotifications: [],
  notificationPageSize: 10,
  notificationPage: 1,
  notificationTotalRecords: 0,
  notificationHeaderPageSize: 4,
  notificationHeaderPage: 1,
  notificationHeaderTotalRecords: 0,
  isLoading: false,
};

type Action = { type: string; payload: any };

const NotificationReducer = (
  state: NotificationTypes = INITIAL_STATE,
  action: Action
) => {
  const payload = action?.payload?.dataWrapper;

  const { data, totalRecords, page, size } = payload || {};

  const customInput = action?.payload?.customInput;

  switch (action.type) {
    case GET_NOTIFICATION_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_NOTIFICATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        notifications: avoidedDuplicationData(
          state?.notifications,
          data,
          '_id'
        ),
        notificationPageSize: size ? size : state.notificationPageSize,
        notificationPage: page ? page : state.notificationPage,
        notificationTotalRecords: totalRecords
          ? totalRecords
          : state.notificationTotalRecords,
      };
    case GET_NOTIFICATION_FAILED:
      return {
        ...state,
        isLoading: false,
      };

    case HEADER_NOTIFICATION_SUCCESS:
      return {
        ...state,
        headerNotifications: [...(data || [])],
        notificationHeaderPageSize: size ? size : state.notificationHeaderPage,
        notificationHeaderPage: page ? page : state.notificationHeaderPage,
        notificationHeaderTotalRecords: totalRecords
          ? totalRecords
          : state.notificationHeaderTotalRecords,
      };
    

    case READ_NOTIFICATION_SUCCESS:
      return {
        ...state,
        notifications: notificationRead(state?.notifications, customInput),
      };
    case HEADER_NOTIFICATION_RESET:
      return {
        ...state,
        headerNotifications: [],
        notificationHeaderPageSize: 5,
        notificationHeaderPage: 1,
        notificationHeaderTotalRecords: 0,
      };
    default:
      return state;
  }
};

const notificationRead = (
  notifications: NotificationTypes[] | any,
  customInput: any
) => {
  const index = getArrayIndexUsingKey(notifications, '_id', customInput?.id);
  notifications[index].seen = true;
  return [...notifications];
};
export default NotificationReducer;
