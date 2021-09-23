import React, { FC } from 'react';
import { SUBSCRIPTION_TYPE } from '../../config/constants';
import { subscriptionsTypes } from '../../redux/common/commonReducer';
import { useTranslation } from 'react-i18next';
import { textToTitleCase } from '../../Helper';

interface SingleProductContainerProps {
  subscription: subscriptionsTypes;
  clickOnSubscription: (arg: subscriptionsTypes) => void;
}

const SingleSubscriptionCard: FC<SingleProductContainerProps> = ({
  subscription,
  clickOnSubscription,
}) => {
  const { t } = useTranslation();
  return (
    <div
      className="subscription--wrapper"
      onClick={() => clickOnSubscription(subscription)}
    >
      <h3>{subscription?.subscriptionName}</h3>
      <p>{subscription?.subscriptionDescription}</p>
      <div className="subscription--innerRow">
        <div className="subscription--innerColumn">
          <h4>{t('Duration')}</h4>
          {subscription?.subscriptionType === SUBSCRIPTION_TYPE.TRIAL_BASED ? (
            <h4>{`${subscription?.duration || 0} ${t('days')}`}</h4>
          ) : (
            <h4>{t('Unlimited')}</h4>
          )}
        </div>

        <div className="subscription--innerColumn">
          <h4>{t('Payment Cycle')}</h4>
          <h4>
            {' '}
            {subscription?.subscriptionType === SUBSCRIPTION_TYPE.TRIAL_BASED
              ? t('-')
              : textToTitleCase(subscription.availablePaymentCycle)}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default SingleSubscriptionCard;
