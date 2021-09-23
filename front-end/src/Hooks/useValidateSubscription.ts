import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { PAYMENT_SERVICE } from '../config/constants';
import {
  AUTH_SUBSCRIPTION_FAILED,
  AUTH_SUBSCRIPTION_REQUEST,
  AUTH_SUBSCRIPTION_SUCCESS,
} from '../redux/auth/authTypes';
import { RootStore } from '../redux/store';
import useApi from './useApi';

interface returnDataType {
  isSubscriptionAvailable: boolean;
}
const useValidateSubscription = () => {
  const [subscriptionRequest] = useApi();
  const [validSubscriptionData, setValidSubscriptionData] =
    useState<returnDataType>();

  const { userData, subscription } = useSelector(
    (state: RootStore) => state?.auth
  );

  const validateSubscription = () => {
    userData &&
      subscriptionRequest(
        `/users/${userData?._id}/user-subscriptions`,
        AUTH_SUBSCRIPTION_REQUEST,
        AUTH_SUBSCRIPTION_SUCCESS,
        AUTH_SUBSCRIPTION_FAILED,
        {},
        {},
        'GET',
        false,
        PAYMENT_SERVICE
      );
  };

  useEffect(() => {
    if (Array.isArray(subscription)) {
      const updatedData = {
        isSubscriptionAvailable: !!subscription.length,
      };
      setValidSubscriptionData(updatedData);
    }
  }, [subscription]);

  return [validSubscriptionData, validateSubscription] as const;
};

export default useValidateSubscription;
