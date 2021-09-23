import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SUBSCRIPTION_TYPE } from '../../config/constants';
import { textToTitleCase } from '../../Helper';
import UseViewFile from '../../Hooks/UseViewFile';
import { ProductTypes, SubscriptionType } from '../../redux/trial/TrialReducer';

interface ProductCartItemProps {
  product: ProductTypes;
  selectedSubscription: SubscriptionType | null;
  removeSelectedProduct: () => void;
}

const ProductCartItem: FC<ProductCartItemProps> = ({
  product,
  selectedSubscription,
  removeSelectedProduct,
}) => {
  const [getFromBucket, url] = UseViewFile();
  const { t } = useTranslation();
  useEffect(() => {
    const { previewImage } = product;
    if (previewImage?.bucketName && previewImage.fileKey) {
      getFromBucket(previewImage?.bucketName, previewImage?.fileKey);
    }
  }, [product]);

  return (
    <div className="tryout__list--item">
      <a className="btn-close" onClick={removeSelectedProduct}>
        &times;
      </a>
      <div className="tryout__list--item-left">
        <img src={url} alt="" className="tryout__list--item-img" />
      </div>
      <div className="tryout__list--item-right">
        <p className="tryout__list--item-title">{product?.name}</p>
        <p className="tryout__list--item-description desktop">
          {product?.description}
        </p>
        <div className="tryout__list--item-period">
          <p>
            {' '}
            {selectedSubscription?.subscriptionType ===
            SUBSCRIPTION_TYPE.TRIAL_BASED
              ? `${selectedSubscription?.duration || 0} ${t('days')}`
              : textToTitleCase(
                  selectedSubscription?.availablePaymentCycle?.replace(
                    /[^a-zA-Z0-9]/g,
                    ' '
                  ) || ''
                )}
          </p>
        </div>
      </div>
      <p className="tryout__list--item-description mobile">
        {product?.description}
      </p>
      <div className="tryout__list--item-period">
        <p>
          {' '}
          {selectedSubscription?.subscriptionType ===
          SUBSCRIPTION_TYPE.TRIAL_BASED
            ? `${selectedSubscription?.duration || 0} ${t('days')}`
            : textToTitleCase(
                selectedSubscription?.availablePaymentCycle?.replace(
                  /[^a-zA-Z0-9]/g,
                  ' '
                ) || ''
              )}
        </p>
      </div>
    </div>
  );
};

export default ProductCartItem;
