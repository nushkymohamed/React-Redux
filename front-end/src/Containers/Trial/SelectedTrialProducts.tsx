import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import ButtonWithAnimation from '../../Components/ButtonWithAnimation/ButtonWithAnimation';
import InformationalModal from '../../Components/CreateProduct/InformationalModal/InformationalModal';
import NoContent from '../../Components/CreateProduct/NoContent/NoContent';
import ProductCartItem from '../../Components/Trial/ProductCartItem';
import { PAYMENT_SERVICE } from '../../config/constants';
import { getArrayIndexUsingKey } from '../../Helper/index';
import useApiRequestInLoop from '../../Hooks/useApiRequestInLoop';
import { inCartProductType } from '../../redux/productSubscription/productSubscriptionReducer';
import { RootStore } from '../../redux/store';
import { ProductTypes } from '../../redux/trial/TrialReducer';
import {
  TRIAL_SUBMIT_FAILED,
  TRIAL_SUBMIT_SUCCESS,
} from '../../redux/trial/TrialType';

interface SelectedTrialProductsProps {
  goToPrevious: () => void;
  selectedProductsAndSubscription: inCartProductType[];
  removeSelectedProduct: (productID: any, subscriptionId: string) => void;
  isProductData?: boolean;
}
const SelectedTrialProducts: FC<SelectedTrialProductsProps> = ({
  goToPrevious,
  selectedProductsAndSubscription,
  removeSelectedProduct,
  isProductData = false,
}) => {
  const { userDetails } = useSelector(
    (state: RootStore) => state.productSubscription
  );

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const [submitMethod, requestStatus] = useApiRequestInLoop();

  const [isEmptyTryProductModalOpen, setIsEmptyTryProductModalOpen] = useState(
    false
  );

  const [animationClassName, setAnimationClassName] = useState('');
  const [loadingAnimation, setLoadingAnimation] = useState(false);
  const [isSubmitClick, setIsSubmitClick] = useState(false);

  const [selectedProducts, setSelectedProducts] = useState<
    ProductTypes[] | null
  >(null);

  useEffect(() => {
    let productList: ProductTypes[] = [];

    selectedProductsAndSubscription.forEach(
      ({ products }) => (productList = [...productList, ...products])
    );

    setSelectedProducts(productList || []);
  }, [selectedProductsAndSubscription]);

  useEffect(() => {
    if (selectedProducts?.length && isSubmitClick) {
      setLoadingAnimation(true);
      setAnimationClassName('btn btn--primary btn--loader active');
      setIsSubmitClick(false);
    }
  }, [isSubmitClick]);

  const submitTryProduct = () => {
    setIsSubmitClick(true);

    if (!selectedProducts?.length) {
      setIsEmptyTryProductModalOpen(true);
    } else {
      if (!isProductData) {
        const mappedProductData = selectedProductsAndSubscription.map(
          ({ products, subscription, userId }) => {
            return {
              userId,
              productIds: products.map(({ _id }) => _id),
              subscriptionId: subscription?._id,
              startDate: new Date().toISOString(),
              specialPrice: products[0].defaultPrice,
            };
          }
        );
        submitMethod(
          `/user-subscriptions`,
          PAYMENT_SERVICE,
          'POST',
          mappedProductData
        );
      } else {
        const mappedProductData = selectedProductsAndSubscription.map(
          ({
            products,
            subscription,
            userId,
            _id,
            lastRenewedDate,
            subscriptionLastValidDate,
            startDate,
          }) => {
            const index = getArrayIndexUsingKey(
              userDetails || [],
              'subscriptionId',
              subscription?._id
            );

            const subscribedProductIds = userDetails?.[index]?.productIds || [];

            return {
              _id,
              userId,
              productIds: [
                ...subscribedProductIds,
                ...products.map(({ _id }) => _id),
              ],
              subscriptionId: subscription?._id,
              startDate,
              lastRenewedDate,
              subscriptionLastValidDate,
            };
          }
        );
        submitMethod(
          `/user-subscriptions`,
          PAYMENT_SERVICE,
          'PUT',
          mappedProductData
        );
      }
    }
  };

  useEffect(() => {
    if (requestStatus?.status.length) {
      if (requestStatus.isAllRequestSuccess) {
        dispatch({ type: TRIAL_SUBMIT_SUCCESS });
      } else {
        dispatch({ type: TRIAL_SUBMIT_FAILED });
        setLoadingAnimation(false);
        setAnimationClassName('');
      }
    }
  }, [requestStatus]);

  return (
    <>
      <div className="tryout">
        <h1 className="tryout__title">{t('Tryout')}</h1>
        <p className="tryout__subtitle">{t('Your Cart')}</p>
        <p className="tryout__subtitle--bottom">
          {t('You have')} {selectedProducts?.length || 0}{' '}
          {t('items in your list')}
        </p>
        <div className="tryout__list">
          {selectedProductsAndSubscription?.length ? (
            selectedProductsAndSubscription?.map(({ products, subscription }) =>
              products.map(product => (
                <ProductCartItem
                  removeSelectedProduct={() =>
                    removeSelectedProduct(
                      isProductData ? product : product._id,
                      subscription?._id || ''
                    )
                  }
                  selectedSubscription={subscription}
                  key={product._id}
                  product={product}
                />
              ))
            )
          ) : (
            <NoContent message={t('No Trial Products Available')} />
          )}
        </div>
        <div className="form__form--field buttons">
          <button
            className="btn btn--secondary btn--roundEdges"
            onClick={goToPrevious}
          >
            {t('Back')}
          </button>

          {!loadingAnimation ? (
            <button
              className="btn btn--primary btn--roundEdges"
              onClick={submitTryProduct}
            >
              {t('Try Products')}
            </button>
          ) : (
            <ButtonWithAnimation
              animationClassName={animationClassName}
              onTransitionEnd={setAnimationClassName}
            />
          )}
        </div>
      </div>
      {isEmptyTryProductModalOpen && (
        <InformationalModal
          modelCloseAction={() => setIsEmptyTryProductModalOpen(false)}
          message={t('Please select the product')}
          closeActionText={t('Back')}
        />
      )}
    </>
  );
};
export default SelectedTrialProducts;
