import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateSubscription from '../../../Components/Subscription/CreateSubscription/CreateSubscription';
import { PAYMENT_SERVICE, SUBSCRIPTION_TYPE } from '../../../config/constants';
import useApi from '../../../Hooks/useApi';
import {
  GET_ALL_SUBSCRIPTION_FEATURE_FAILED,
  GET_ALL_SUBSCRIPTION_FEATURE_REQUEST,
  GET_ALL_SUBSCRIPTION_FEATURE_SUCCESS,
} from '../../../redux/common/commonTypes';
import { RootStore } from '../../../redux/store';
import {
  RESET_SUBSCRIPTION_SUBMIT,
  SUBMIT_SUBSCRIPTION_PAGE_FAILED,
  SUBMIT_SUBSCRIPTION_PAGE_REQUEST,
  SUBMIT_SUBSCRIPTION_PAGE_SUCCESS,
} from '../../../redux/subscription/subscriptionTypes';

interface CreateSubscriptionContainerProps {
  setIsAddSubscriptionOpen: (arg: boolean) => void;
  fetchAllSubscriptions: (arg: number) => void;
  setShowOverlay: (arg: boolean) => void;
}

const CreateSubscriptionContainer: FC<CreateSubscriptionContainerProps> = ({
  setIsAddSubscriptionOpen,
  setShowOverlay,
  fetchAllSubscriptions,
}) => {
  const [getSubscriptionsFeatureRequestApi] = useApi();
  const [submitSubscriptionApi] = useApi();
  const dispatch = useDispatch();

  const { subscriptionsFeatures } = useSelector(
    (state: RootStore) => state.common
  );
  const { subscriptionSaveSuccessful } = useSelector(
    (state: RootStore) => state.subscriptions
  );

  const getSubscriptionFeature = (pageNumber: number) => {
    getSubscriptionsFeatureRequestApi(
      `/subscriptionFeatures?page=${pageNumber}&size=10`,
      GET_ALL_SUBSCRIPTION_FEATURE_REQUEST,
      GET_ALL_SUBSCRIPTION_FEATURE_SUCCESS,
      GET_ALL_SUBSCRIPTION_FEATURE_FAILED,
      {},
      {},
      'GET',
      false,
      PAYMENT_SERVICE
    );
  };

  useEffect(() => {
    getSubscriptionFeature(1);
  }, []);

  const [isTrial, setIsTrial] = useState(false);
  const onFormSubmit = (data: any) => {
    const {
      subscriptionName,
      subscriptionDescription,
      subscriptionFeatureIds,
      availablePaymentCycle,

      duration,
    } = data;

    const submitData = {
      subscriptionName,
      subscriptionDescription,
      subscriptionFeatureIds,
    };

    const durationBase = {
      ...submitData,
      availablePaymentCycle,
      subscriptionType: SUBSCRIPTION_TYPE.DURATION_BASED,
    };

    const trailBase = {
      ...submitData,
      duration,
      subscriptionType: SUBSCRIPTION_TYPE.TRIAL_BASED,
    };

    submitSubscriptionApi(
      `/subscriptions`,
      SUBMIT_SUBSCRIPTION_PAGE_REQUEST,
      SUBMIT_SUBSCRIPTION_PAGE_SUCCESS,
      SUBMIT_SUBSCRIPTION_PAGE_FAILED,
      isTrial ? trailBase : durationBase,
      {},
      'POST',
      false,
      PAYMENT_SERVICE
    );
  };

  const resetSubscriptionSubmit = () => {
    dispatch({ type: RESET_SUBSCRIPTION_SUBMIT });
    fetchAllSubscriptions(1);
  };

  return (
    <CreateSubscription
      isTrial={isTrial}
      setIsTrial={setIsTrial}
      onFormSubmit={onFormSubmit}
      setIsAddSubscriptionOpen={setIsAddSubscriptionOpen}
      subscriptionsFeatures={subscriptionsFeatures || []}
      subscriptionSaveSuccessful={subscriptionSaveSuccessful}
      resetSubscriptionSubmit={resetSubscriptionSubmit}
      setShowOverlay={setShowOverlay}
    />
  );
};

export default CreateSubscriptionContainer;
