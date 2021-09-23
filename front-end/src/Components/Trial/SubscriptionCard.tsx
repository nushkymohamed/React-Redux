import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { SUBSCRIPTION_TYPE } from '../../config/constants';
import { textToTitleCase } from '../../Helper';
import { SubscriptionType } from '../../redux/trial/TrialReducer';

interface CardProps {
  selectedSubscription: SubscriptionType | null;
  subscription: SubscriptionType;
  userSubscriptionId?: string[] | null;
  isPlanChangeable?: boolean;
  onSelect?: (arg: SubscriptionType) => void;
}
const SubscriptionCard: FC<CardProps> = ({
  subscription,
  selectedSubscription,
  onSelect,
  userSubscriptionId,
  isPlanChangeable,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <div
        className={`subscription--card__item ${
          subscription?._id === selectedSubscription?._id && 'selected'
        }`}
      >
        <div className="subscription--card__row">
          <h4>{subscription?.subscriptionName}</h4>
          {userSubscriptionId?.includes(subscription?._id) && (
            <p className="subscription--card__action">{t('Subscribed')}</p>
          )}
          <p className="subscription--card__cycle">
            <span>
              {' '}
              {subscription?.subscriptionType === SUBSCRIPTION_TYPE.TRIAL_BASED
                ? t('Duration')
                : t('Payment Cycle')}{' '}
              :
            </span>{' '}
            <span className="subscription--card__period">
              {subscription?.subscriptionType === SUBSCRIPTION_TYPE.TRIAL_BASED
                ? `${subscription?.duration || 0} ${t('days')}`
                : textToTitleCase(
                    subscription?.availablePaymentCycle?.replace(
                      /[^a-zA-Z0-9]/g,
                      ' '
                    ) || ''
                  )}
            </span>
          </p>
          <p className="subscription--card__description">
            {subscription?.subscriptionDescription}
          </p>
        </div>

        <div className="subscription--card__row">
          <button
            type="submit"
            className={`btn btn--primary ${!isPlanChangeable ? 'disable' : ''}`}
            disabled={!isPlanChangeable}
            onClick={() => onSelect && onSelect(subscription)}
          >
            {subscription?._id === selectedSubscription?._id
              ? t('Selected')
              : t('Select')}
          </button>
        </div>
      </div>
    </>
  );
};
export default SubscriptionCard;
