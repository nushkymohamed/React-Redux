import { avoidedDuplicationData } from '../../Helper';
import { subscriptionsTypes } from '../common/commonReducer';
import {
  GET_ALL_SUBSCRIPTION_PAGE_REQUEST,
  GET_ALL_SUBSCRIPTION_PAGE_SUCCESS,
  RESET_SUBSCRIPTION_SUBMIT,
  SUBMIT_SUBSCRIPTION_PAGE_FAILED,
  SUBMIT_SUBSCRIPTION_PAGE_REQUEST,
  SUBMIT_SUBSCRIPTION_PAGE_SUCCESS,
} from './subscriptionTypes';

export interface SubscriptionPageTypes {
  subscriptions: { [page: number]: subscriptionsTypes[] };
  subscriptionsPage: number;
  subscriptionsSize: number;
  subscriptionsTotalRecord: number;
  subscriptionLoading: boolean;
  subscriptionSaveSuccessful: boolean;
}

const INITIAL_STATE: SubscriptionPageTypes = {
  subscriptions: {},
  subscriptionsPage: 1,
  subscriptionsSize: 10,
  subscriptionsTotalRecord: 0,
  subscriptionLoading: false,
  subscriptionSaveSuccessful: false,
};

type Action = {
  type: string;
  payload: {
    dataWrapper: {
      data?: any;
      totalRecords?: number;
      id?: string;
      page?: number;
      size?: number;
    };
    customInput: any;
  };
};

const Subscription = (
  state: SubscriptionPageTypes = INITIAL_STATE,
  action: Action
): SubscriptionPageTypes => {
  const payload = action?.payload?.dataWrapper;
  const { data = '', totalRecords = 0, page = 0, size = 0 } = payload || {};
  const customInput = action?.payload?.customInput;

  switch (action.type) {
    case GET_ALL_SUBSCRIPTION_PAGE_REQUEST:
      return {
        ...state,
        subscriptionLoading: true,
      };
    case GET_ALL_SUBSCRIPTION_PAGE_SUCCESS:
      return {
        ...state,
        subscriptions:
          data && page
            ? { ...state.subscriptions, [page]: [...data] }
            : state.subscriptions,
        subscriptionsTotalRecord:
          totalRecords || state.subscriptionsTotalRecord,
        subscriptionsPage: page || state.subscriptionsPage,
        subscriptionsSize: size || state.subscriptionsSize,
        subscriptionLoading: false,
      };

    case SUBMIT_SUBSCRIPTION_PAGE_REQUEST:
      return {
        ...state,
        subscriptionSaveSuccessful: false,
      };
    case SUBMIT_SUBSCRIPTION_PAGE_SUCCESS:
      return {
        ...state,
        subscriptionSaveSuccessful: true,
      };
    case SUBMIT_SUBSCRIPTION_PAGE_FAILED:
      return {
        ...state,
        subscriptionSaveSuccessful: false,
      };

    case RESET_SUBSCRIPTION_SUBMIT:
      return {
        ...state,
        subscriptions: {},
        subscriptionsTotalRecord: 0,
        subscriptionsPage: 0,
        subscriptionsSize: 0,
        subscriptionSaveSuccessful: false,
      };
    default:
      return state;
  }
};

export default Subscription;
