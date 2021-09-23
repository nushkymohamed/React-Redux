import React, { FC, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoIosAdd } from 'react-icons/io';
import ReactPaginate from 'react-paginate';
import { useHistory } from 'react-router-dom';
import CreateSubscriptionContainer from '../../Containers/Subscription/CreateSubscription/CreateSubscriptionContainer';
import ViewSubscription from '../../Containers/Subscription/ViewSubscription/ViewSubscription';
import { subscriptionsTypes } from '../../redux/common/commonReducer';
import { SubscriptionPageTypes } from '../../redux/subscription/subscriptionReducer';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import Modal from '../Modal/Modal';
import Overlay from '../Overlay/Overlay';
import SingleSubscriptionCard from './SingleSubscriptionCard';

interface SubscriptionListProps {
  subscriptions: SubscriptionPageTypes['subscriptions'];
  size: number;
  page: number;
  totalRecords: number;
  subscriptionLoading?: number;
  onSearch(search: string): void;
  onPageChange(page: number): void;
  fetchAllSubscriptions: (arg: number) => void;
}

const SubscriptionList: FC<SubscriptionListProps> = ({
  subscriptions,
  size,
  page,
  totalRecords,
  onSearch,
  onPageChange,
  subscriptionLoading = false,
  fetchAllSubscriptions,
}) => {
  const { t } = useTranslation();
  const [search, setSearch] = useState<string>('');
  const history = useHistory();
  useEffect(() => {
    onSearch(search);
  }, [search]);

  const [isAddSubscriptionOpen, setIsAddSubscriptionOpen] = useState(false);

  const pageCount = useMemo(() => {
    return Math.ceil(totalRecords / size);
  }, [totalRecords]);

  const [selectedSubscription, setSelectedSubscription] =
    useState<subscriptionsTypes | null>(null);
  const [isViewSubscriptionModeOpen, setIsViewSubscriptionModeOpen] =
    useState(false);

  const clickOnSubscription = (data: subscriptionsTypes) => {
    setSelectedSubscription(data);
    setIsViewSubscriptionModeOpen(true);
  };

  const [showOverlay, setShowOverlay] = useState(false);

  const redirectAfterSuccess = () => {
    history.push(`/admin/subscription`);
  };

  return (
    <>
      <div className="createContent products-page">
        {showOverlay && (
          <Overlay showLoader onOverlayHide={redirectAfterSuccess} />
        )}
        <div className="container">
          <div className="createContent__wrapper">
            <div className="createContent__header">
              <h2 className="page-title">{t('Subscriptions')}</h2>
              <button
                onClick={() => setIsAddSubscriptionOpen(true)}
                className="btn btn--primary btn--green btn--roundEdges"
                type="button"
              >
                <IoIosAdd className="icon color-white verySmall-icon" />{' '}
                {t('Add Subscription')}
              </button>
            </div>
            <div className="createContent__body">
              <div className="createContent__body--header">
                <input
                  placeholder={t('Search')}
                  value={search}
                  onChange={e => setSearch(e?.target?.value)}
                  className="form-input--search"
                />
              </div>
            </div>
            {Object.keys(subscriptions)?.length ? (
              <div className="createContent__body--content">
                <div className="productContent--wrapper">
                  {subscriptions[page] ? (
                    subscriptions[page]?.map(subscription => (
                      <SingleSubscriptionCard
                        subscription={subscription}
                        key={subscription._id}
                        clickOnSubscription={clickOnSubscription}
                      />
                    ))
                  ) : (
                    <LoadingScreen />
                  )}
                </div>
                <ReactPaginate
                  previousLabel={'<'}
                  nextLabel={'>'}
                  breakLabel={'...'}
                  breakClassName={'break-me'}
                  pageCount={pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={({ selected }) => onPageChange(selected + 1)}
                  containerClassName={'react-paginate'}
                  activeClassName={'active'}
                />
              </div>
            ) : subscriptionLoading ? (
              <LoadingScreen />
            ) : (
              <div className="createContent__body--content empty">
                {t('No Subscriptions Available')}
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedSubscription && isViewSubscriptionModeOpen && (
        <Modal
          customClassName={
            'createSubscriptionModal individualSubscriptionModal'
          }
        >
          <ViewSubscription
            selectedSubscription={selectedSubscription}
            setIsViewSubscriptionModeOpen={setIsViewSubscriptionModeOpen}
          />
        </Modal>
      )}

      {isAddSubscriptionOpen && (
        <Modal customClassName={'createSubscriptionModal'}>
          <CreateSubscriptionContainer
            setIsAddSubscriptionOpen={setIsAddSubscriptionOpen}
            fetchAllSubscriptions={fetchAllSubscriptions}
            setShowOverlay={setShowOverlay}
          />
        </Modal>
      )}
    </>
  );
};

export default SubscriptionList;
