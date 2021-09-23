import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SubscriptionList from '../../../Components/Subscription/SubscriptionList';
import { PAYMENT_SERVICE } from '../../../config/constants';
import useApi from '../../../Hooks/useApi';
import { RootStore } from '../../../redux/store';
import {
  GET_ALL_SUBSCRIPTION_PAGE_FAILED,
  GET_ALL_SUBSCRIPTION_PAGE_REQUEST,
  GET_ALL_SUBSCRIPTION_PAGE_SUCCESS,
} from '../../../redux/subscription/subscriptionTypes';

const SubscriptionContainer = () => {
  const [subscriptionRequestApi] = useApi();

  const [page, setPage] = useState<number>(1);

  const { subscriptions, subscriptionsSize, subscriptionsTotalRecord } =
    useSelector((state: RootStore) => state?.subscriptions);

  useEffect(() => {
    fetchAllSubscriptions(1);
  }, []);

  const fetchAllSubscriptions = (pNo: number) => {
    subscriptionRequestApi(
      `/subscriptions?page=${pNo}&size=${subscriptionsSize}`,
      GET_ALL_SUBSCRIPTION_PAGE_REQUEST,
      GET_ALL_SUBSCRIPTION_PAGE_SUCCESS,
      GET_ALL_SUBSCRIPTION_PAGE_FAILED,
      {},
      {},
      'GET',
      false,
      PAYMENT_SERVICE
    );
  };

  const onSearch = (value: string) => {};

  const onClickPage = (pageNumber: number) => {
    setPage(pageNumber);

    if (
      !subscriptions[pageNumber]?.length ||
      subscriptions[pageNumber]?.length < subscriptionsSize
    ) {
      fetchAllSubscriptions(pageNumber);
    }
  };

  return (
    <>
      <SubscriptionList
        subscriptions={subscriptions}
        page={page}
        size={subscriptionsSize}
        totalRecords={subscriptionsTotalRecord}
        onSearch={onSearch}
        onPageChange={onClickPage}
        fetchAllSubscriptions={fetchAllSubscriptions}
      />
    </>
  );
};
export default SubscriptionContainer;
