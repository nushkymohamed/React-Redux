import React, { FC, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SubscriptionModel from '../../../Components/Modal/SubscriptionModel';
import { RootStore } from '../../../redux/store';
import {
  GET_ALL_SUBSCRIPTION_FAILED,
  GET_ALL_SUBSCRIPTION_REQUEST,
  GET_ALL_SUBSCRIPTION_SUCCESS,
} from '../../../redux/common/commonTypes';
import { PAYMENT_SERVICE } from '../../../config/constants';
import useApi from '../../../Hooks/useApi';
import { subjectDetailsTypes } from '../../../redux/userManagement/userIndividualManagementReducer';
import {
  ADD_SELECTED_SUBSCRIPTION,
  DELETE_SELECTED_SUBSCRIPTION,
  UPDATE_PRODUCT_SUBSCRIPTION_DEFAULT_PRICE_BULK,
} from '../../../redux/product/productTypes';
import SubscriptionsTable from './Table/SubscriptionsTable';
import SpecialPriceModal from '../../../Components/Modal/SpecialPriceModal';

interface onFormSubmit {
  onFormSubmit: Function;
  goToPrevious: Function;
}
export interface singleDefaultPrice {
  sid: string;
  defaultPrice: string;
}

const SubscriptionsSlideContainer: FC<onFormSubmit> = ({
  onFormSubmit,
  goToPrevious,
}) => {
  const dispatch = useDispatch();
  const [fetchSubscription] = useApi();
  const { subscriptions, subscriptionsPage, subscriptionsTotalRecord } =
    useSelector((state: RootStore) => state.common);

  const { productSubscription } = useSelector(
    (state: RootStore) => state.products
  );

  const fetchSubscriptionData = (page: number) => {
    fetchSubscription(
      `/subscriptions?page=${page}&size=100`,
      GET_ALL_SUBSCRIPTION_REQUEST,
      GET_ALL_SUBSCRIPTION_SUCCESS,
      GET_ALL_SUBSCRIPTION_FAILED,
      {},
      {},
      'GET',
      false,
      PAYMENT_SERVICE
    );
  };

  useEffect(() => {
    fetchSubscriptionData(1);
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'subscriptionName',
        sortType: 'basic',
      },
      {
        Header: 'Duration',
        accessor: 'subscriptionDuration',
        sortType: 'basic',
      },

      {
        Header: 'Payment Cycle',
        accessor: 'subscriptionCycle',
        sortType: 'basic',
      },
      {
        Header: 'Default Price',
        accessor: 'defaultPrice',
        sortType: 'basic',
      },
    ],
    []
  );

  const addSelectedSubscription = (subscriptionList: subjectDetailsTypes[]) => {
    dispatch({
      type: ADD_SELECTED_SUBSCRIPTION,
      payload: { dataWrapper: { data: subscriptionList } },
    });
  };

  const [isOpenAddSubscriptionModel, setIsOpenAddSubscriptionModel] =
    useState(false);

  const [selectedSubscriptionIds, setSelectedSubscriptionsIds] =
    useState<string[]>();

  const deleteSubscribe = () => {
    dispatch({
      type: DELETE_SELECTED_SUBSCRIPTION,
      payload: { dataWrapper: { data: selectedSubscriptionIds } },
    });
  };

  const handledefaultPrice = (sid: string, defaultPrice: string) => {
    updateDefaultPrice([{ sid, defaultPrice }]);
  };

  const updateDefaultPrice = (priceList: singleDefaultPrice[]) => {
    dispatch({
      type: UPDATE_PRODUCT_SUBSCRIPTION_DEFAULT_PRICE_BULK,
      payload: { dataWrapper: { data: priceList } },
    });
  };

  const setBulkSpecialPrice = (defaultPrice: string) => {
    if (selectedSubscriptionIds?.length) {
      const priceList = selectedSubscriptionIds.map(item => {
        return {
          sid: item,
          defaultPrice,
        };
      });
      updateDefaultPrice(priceList);
    }
  };

  const [showSpecialPricePopup, setShowSpecialPricePopup] = useState(false);
  return (
    <>
      <SubscriptionsTable
        data={productSubscription || []}
        columns={columns}
        onFormSubmit={onFormSubmit}
        goToPrevious={goToPrevious}
        setIsOpenAddSubscriptionModel={setIsOpenAddSubscriptionModel}
        deleteSubscribe={deleteSubscribe}
        handledefaultPrice={handledefaultPrice}
        setShowSpecialPricePopup={setShowSpecialPricePopup}
        setSelectedSubscriptionsIds={setSelectedSubscriptionsIds}
      />

      {showSpecialPricePopup && (
        <SpecialPriceModal
          popupTitle={'Set Default Price'}
          onClickAway={() => setShowSpecialPricePopup(false)}
          currentPrice={'0'}
          setBulkSpecialPrice={setBulkSpecialPrice}
        />
      )}

      {isOpenAddSubscriptionModel && (
        <>
          <SubscriptionModel
            onClickAway={() => setIsOpenAddSubscriptionModel(false)}
            subscriptionData={subscriptions || []}
            page={subscriptionsPage}
            totalRecords={subscriptionsTotalRecord}
            existingSubscription={productSubscription || []}
            addSelectedSubscription={addSelectedSubscription}
            //setSearchText={setSearchText}
          />
        </>
      )}
    </>
  );
};

export default SubscriptionsSlideContainer;
