import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { PAYMENT_SERVICE, SUBSCRIPTION_TYPE } from '../../../config/constants';
import { textToTitleCase } from '../../../Helper';
import useApi from '../../../Hooks/useApi';
import { subscriptionsTypes } from '../../../redux/common/commonReducer';
import {
  GET_ALL_SUBSCRIPTION_FEATURE_FAILED,
  GET_ALL_SUBSCRIPTION_FEATURE_REQUEST,
  GET_ALL_SUBSCRIPTION_FEATURE_SUCCESS,
  RESET_SUBSCRIPTION_FEATURE,
} from '../../../redux/common/commonTypes';
import { RESET_PRODUCTS } from '../../../redux/product/productTypes';
import { RootStore } from '../../../redux/store';
import ViewSubscriptionProducts from '../ViewSubscriptionProducts/ViewSubscriptionProducts';

interface ViewSubscriptionProps {
  selectedSubscription: subscriptionsTypes | null;
  setIsViewSubscriptionModeOpen: (arg: boolean) => void;
}

const ViewSubscription: FC<ViewSubscriptionProps> = ({
  selectedSubscription,
  setIsViewSubscriptionModeOpen,
}) => {
  const {
    subscriptionFeatureIds,
    subscriptionDescription,
    subscriptionName,
    subscriptionType,
    availablePaymentCycle,
    duration,
  } = selectedSubscription || {};

  const { t } = useTranslation();
  const [getSubscriptionsFeatureRequestApi] = useApi();
  const dispatch = useDispatch();
  const [isViewSubscriptionInfoShow, setIsViewSubscriptionInfoShow] =
    useState(true);
  const { subscriptionsFeatures } = useSelector(
    (state: RootStore) => state.common
  );

  const getSubscriptionFeaturesIdsData = (ids: string[]) => {
    getSubscriptionsFeatureRequestApi(
      `/subscriptionFeatures?subscriptionFeatureIds=${ids}&size=${ids.length}`,
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
    subscriptionFeatureIds?.length &&
      getSubscriptionFeaturesIdsData(subscriptionFeatureIds);

    return () => {
      dispatch({ type: RESET_SUBSCRIPTION_FEATURE });
      dispatch({ type: RESET_PRODUCTS });
    };
  }, []);

  return (
    <>
      <div className="createContent">
        <div className="container">
          {' '}
          <h2>{subscriptionName}</h2>
          <div className="createContent__wrapper">
            <a
              className="btn-close closemodale"
              onClick={() => setIsViewSubscriptionModeOpen(false)}
              aria-hidden="true"
            >
              &times;
            </a>

            {isViewSubscriptionInfoShow ? (
              <div className="createContent__row basic-info">
                <form>
                  <div className="createContent__column">
                    <div className="form">
                      <div className="createContent__field-wrapper">
                        <p className="gray">{t('Name')}</p>
                        <p className="bigText">{subscriptionName}</p>
                      </div>

                      <div className="createContent__innerColumn">
                        <div className="createContent__field-wrapper short">
                          <p className="gray">
                            {subscriptionType === SUBSCRIPTION_TYPE.TRIAL_BASED
                              ? t('Duration')
                              : t('Payment Cycle')}
                          </p>
                          <p className="bigText">
                            {subscriptionType === SUBSCRIPTION_TYPE.TRIAL_BASED
                              ? `${duration || 0} ${t('days')}`
                              : textToTitleCase(
                                  availablePaymentCycle?.replace(
                                    /[^a-zA-Z0-9]/g,
                                    ' '
                                  ) || ''
                                )}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="form">
                      <div className="createContent__field-wrapper long">
                        <p className="white bigText">{t('Description')}</p>
                        <p className="gray">{subscriptionDescription}</p>
                      </div>
                    </div>
                    {subscriptionsFeatures?.length && (
                      <div className="form">
                        <div className="createContent__field-wrapper long">
                          <p className="white bigText">
                            {t('Subscription Features')}
                          </p>

                          {subscriptionsFeatures?.map(({ featureTitle }) => (
                            <p className="feature">{featureTitle}</p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            ) : (
              <ViewSubscriptionProducts
                selectedSubscription={selectedSubscription}
              />
            )}
          </div>
        </div>
      </div>
      {isViewSubscriptionInfoShow ? (
        <div className="form form-footer">
          <div className="form__form--field buttons">
            <button
              type={'submit'}
              className="btn btn--green btn--roundEdges"
              onClick={() => setIsViewSubscriptionInfoShow(false)}
            >
              {t('Next')}
            </button>
          </div>
        </div>
      ) : (
        <div className="form form-footer">
          <div className="form__form--field buttons">
            <button
              type={'submit'}
              className="btn btn--green btn--roundEdges"
              onClick={() => setIsViewSubscriptionInfoShow(true)}
            >
              {t('Back')}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewSubscription;
