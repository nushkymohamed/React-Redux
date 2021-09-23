import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import defaultImage from '../../assets/images/default-profile-image.png';
import { currencyCode, SUBSCRIPTION_TYPE } from '../../config/constants';
import { getSubscriptionType, getArrayIndexUsingKey } from '../../Helper';
import UseViewFile from '../../Hooks/UseViewFile';
import { RootStore } from '../../redux/store';
import { ProductTypes, SubscriptionType } from '../../redux/trial/TrialReducer';

interface ProductCardProps {
  productData?: ProductTypes;
  isFullView?: boolean;
  openFullView?: () => void;
  closeModel?: () => void;
  selectProduct: (id: string) => void;
}
const ProductCard: FC<ProductCardProps> = ({
  productData,
  isFullView = false,
  openFullView,
  closeModel,
  selectProduct,
}) => {
  const [productImage, setProductImage] = useState('');
  const [getFromBucket, url] = UseViewFile();
  const { t } = useTranslation();

  const {
    selectedSubscription,
    subscriptions,
    page,
    selectedProducts,
    productIds,
  } = useSelector((state: RootStore) => state?.trial);

  useEffect(() => {
    if (productData) {
      const { bucketName, fileKey } = productData?.previewImage || {};
      bucketName && fileKey && getFromBucket(bucketName, fileKey);
    }
  }, [productData]);

  const getIsSelectedProducts = () => {
    const index = getArrayIndexUsingKey(
      selectedProducts,
      '_id',
      productData?._id
    );
    return index >= 0;
  };

  useEffect(() => {
    setProductImage(url);
  }, [url]);

  const findSelectedSubscription = (id: string) => {
    if (!subscriptions?.length) {
      return;
    }
    let selectedSub = subscriptions?.find(
      (subs: SubscriptionType) => subs?._id === id
    );
    return selectedSub;
  };

  const getPrice = (allowProducts: any, id: string) => {
    const product = allowProducts?.find((pro: any) => pro?.productId === id);
    return product?.price?.value;
  };
  return (
    <div
      className={`product--card ${getIsSelectedProducts() ? 'selected' : ''}`}
    >
      {isFullView && (
        <a
          className="btn-close closemodale"
          aria-hidden="true"
          onClick={closeModel}
        >
          &times;
        </a>
      )}
      <img
        src={productImage}
        alt="avatar-icon"
        className="product--card__image"
        onError={() => {
          setProductImage(defaultImage);
        }}
      />

      <div className="product--card__title-row">
        <div className="product--card__title-area">
          <h2>{productData?.name}</h2>
          <p className="subscription--card__cycle">
            <span>
              {findSelectedSubscription(selectedSubscription?._id || '')
                ?.subscriptionType === SUBSCRIPTION_TYPE.TRIAL_BASED
                ? t('Trial')
                : t(
                    getSubscriptionType(
                      findSelectedSubscription(selectedSubscription?._id || '')
                        ?.availablePaymentCycle || ''
                    )
                  )}{' '}
              {t('subscription price')}
            </span>
          </p>
        </div>
        <div className="product--card__price">
          {getPrice(productIds, productData?._id || '') || '0'}{' '}
          {currencyCode[productData?.currency || ''] || '$'}
        </div>
      </div>

      {isFullView ? (
        <div className="product--card__description">
          <p>{productData?.description}</p>
        </div>
      ) : (
        <div
          className="product--card__description truncate"
          onClick={openFullView}
        >
          <p>{productData?.description}</p>
        </div>
      )}
      <div className="product--bottom-row">
        <div className="product--card__details-row">
          <div className="product--card__details-row--right">
            <div>
              <p>{t('No. Videos')}</p>
              <p>{productData?.numberOfVideos}</p>
            </div>

            <div>
              <p>{t('No. Documents')}</p>
              <p>{productData?.numberOfDocuments}</p>
            </div>

            <div>
              <p>{t('No. Assignment')}</p>
              <p>{productData?.numberOfAssessments}</p>
            </div>
          </div>
        </div>

        <div
          className={`product--card--button ${
            getIsSelectedProducts() ? 'selected' : ''
          }`}
          onClick={e => {
            e.preventDefault();
            selectProduct(productData?._id || '');
          }}
        >
          {t('Try this product for free')}
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
