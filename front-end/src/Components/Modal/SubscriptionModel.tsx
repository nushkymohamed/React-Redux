import React, { useMemo, useState } from 'react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { paymentCycleName, uuidv4 } from '../../Helper';

import { productSubscriptionTypes } from '../../redux/product/productReducer';

import sortIcon from '../../assets/images/svg-images/sort-arrow.svg';
import Modal from './Modal';
import { subscriptionsTypes } from '../../redux/common/commonReducer';
import { SUBSCRIPTION_TYPE } from '../../config/constants';
import NoContent from '../CreateProduct/NoContent/NoContent';

type SubscriptionModelProps = {
  onClickAway: Function;
  subscriptionData: subscriptionsTypes[];
  page: number;
  totalRecords: number;
  existingSubscription: productSubscriptionTypes[];
  addSelectedSubscription: Function;
  // setSearchText: (searchQuery: string) => void;
};

const SubscriptionModel: FC<SubscriptionModelProps> = ({
  onClickAway,
  subscriptionData,
  totalRecords,
  existingSubscription,
  addSelectedSubscription,
  // setSearchText,
}) => {
  const { t } = useTranslation();
  const [selectedSubscription, setSelectedSubscription] = useState<
    productSubscriptionTypes[]
  >([]);
  const [selectedSubscriptionIds, setSelectedSubscriptionIds] = useState<
    string[]
  >([]);
  const [allSelected, setAllSelected] = useState(false);

  const columns = useMemo(() => {
    const titles = [
      {
        name: 'Name',
        id: uuidv4(),
      },
      {
        name: 'Payment Cycle',
        id: uuidv4(),
      },
      {
        name: 'Duration',
        id: uuidv4(),
      },
    ];

    return titles;
  }, []);

  const addOrRemoveUser = (userId: string, selected: boolean) => {
    if (selected) {
      setSelectedSubscriptionIds(currentIds => [...currentIds, userId]);
      const newUser = eligibleSubscription?.find(u => u._id === userId);
      newUser &&
        setSelectedSubscription(currentUsers => [...currentUsers, newUser]);
    } else {
      setSelectedSubscriptionIds(currentIds =>
        currentIds.filter(id => id !== userId)
      );
      setSelectedSubscription(currentUsers =>
        currentUsers.filter(u => u._id !== userId)
      );
      if (allSelected) commonSelect(false, false);
    }
  };

  const selectAll = () => {
    setSelectedSubscriptionIds(eligibleSubscription.map(u => u._id));
    setSelectedSubscription(eligibleSubscription);
  };

  const selectNone = () => {
    setSelectedSubscriptionIds([]);
    setSelectedSubscription([]);
  };

  const commonSelect = (select: boolean, update = true) => {
    if (select) {
      setAllSelected(true);
      update && selectAll();
    } else {
      setAllSelected(false);
      update && selectNone();
    }
  };

  const eligibleSubscription = useMemo(() => {
    const existingSubscriptionIds = existingSubscription.map(u => u._id);

    const filteredSubscription = subscriptionData?.filter(
      u => !existingSubscriptionIds.includes(u._id)
    );

    return filteredSubscription.map(
      ({
        _id,
        duration,
        subscriptionName,
        subscriptionType,
        availablePaymentCycle,
      }) => {
        const subscriptionDuration =
          subscriptionType === SUBSCRIPTION_TYPE.TRIAL_BASED
            ? `${duration || 0} ${t('days')}`
            : t('Unlimited');
        const subscriptionCycle =
          subscriptionType === SUBSCRIPTION_TYPE.DURATION_BASED
            ? t(`${paymentCycleName(availablePaymentCycle) || '-'}`)
            : '-';

        return {
          _id,
          subscriptionName,
          subscriptionDuration,
          subscriptionCycle,
        };
      }
    );
  }, [subscriptionData, existingSubscription]);

  const SubscriptionRow = ({
    subscription,
  }: {
    subscription: productSubscriptionTypes;
  }) => {
    return (
      <div className="createTable-table__table--row">
        <div className="createTable-table__table--column">
          <input
            className="form-input--checkbox"
            type="checkbox"
            id={`tutorSelect_${subscription?._id}`}
            name="selectTutor"
            value="selectTutor"
            checked={selectedSubscriptionIds.includes(subscription._id)}
            onChange={e => {
              addOrRemoveUser(subscription._id, e.target.checked);
            }}
          />
          <label htmlFor={`tutorSelect_${subscription?._id}`}></label>
        </div>

        <div className="createTable-table__table--column">
          {subscription?.subscriptionName || '-'}
        </div>
        <div className="createTable-table__table--column">
          {subscription?.subscriptionDuration}
        </div>
        <div className="createTable-table__table--column">
          {subscription?.subscriptionCycle}
        </div>
      </div>
    );
  };

  return (
    <Modal onClickAway={onClickAway} customClassName={'addTutorPopUp'}>
      <div className="popup--content table--addTutor table--addSubscription">
        <div>
          <h3>{t('Add Subscription')}</h3>
          <div className="createTable-table__table--searchBar-filters form">
            <input
              type="text"
              id="search"
              name="search"
              className="form-input form-input--search"
              placeholder={t('Search Subscription')}
              // onChange={e => setSearchText(e.target.value)}
            />
          </div>
        </div>
        {eligibleSubscription.length ? (
          <>
            <div className="createTable-table__table--header">
              <div className="createTable-table__table--row">
                <div className="createTable-table__table--column">
                  <input
                    className="form-input--checkbox"
                    type="checkbox"
                    id="selector"
                    name="selectAll"
                    value="selectAll"
                    checked={allSelected}
                    onChange={e => commonSelect(e.target.checked)}
                  />
                  <label htmlFor="selector"></label>
                </div>
                {columns?.map(col => {
                  return (
                    <div
                      key={col.id}
                      className="createTable-table__table--column"
                    >
                      <span>
                        <img
                          src={sortIcon}
                          className="icon extra-small-icon marginRight"
                        />
                      </span>
                      {t(col.name)}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="createTable-table__table--body">
              {eligibleSubscription?.map(subscription => (
                <SubscriptionRow
                  subscription={subscription}
                  key={subscription._id}
                />
              ))}
            </div>
            <div className="createTable-table__table--footer">
              <div className="createTable-table__table--footer-left"></div>
              <div className="createTable-table__table--footer-right">
                <button
                  type="button"
                  onClick={() => {
                    addSelectedSubscription(selectedSubscription);
                    onClickAway();
                  }}
                  className="btn btn--primary"
                >
                  {selectedSubscriptionIds.length ? t('Add') : t('Close')}
                </button>
              </div>
            </div>
          </>
        ) : (
          <NoContent message={t('No eligible Subscription')} />
        )}
      </div>
    </Modal>
  );
};

export default SubscriptionModel;
