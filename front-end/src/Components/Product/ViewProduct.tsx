import React, { FC, memo, useEffect, useState } from 'react';
import UseViewFile from '../../Hooks/UseViewFile';
import { product } from '../../redux/product/productReducer';
import { useTranslation } from 'react-i18next';
import { HiOutlineUpload } from 'react-icons/hi';
import { FiEdit } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import defaultProductImage from '../../assets/images/default-product.png';
import { onImageLoadError } from '../../Helper';

interface LoadingContainerProps {
  product: product;
  users: number;
  noOfUsers: number;
  onProductEdit?: (arg: any) => void;
  onProductDelete?: (arg: any) => void;
}

const ViewProduct: FC<LoadingContainerProps> = ({
  product,
  users,
  noOfUsers,
  onProductEdit,
  onProductDelete,
}) => {
  const [getFromBucket, url] = UseViewFile();
  const { t } = useTranslation();
  useEffect(() => {
    if (!product) return;
    const { bucketName, fileKey } = product?.previewImage || {};
    getFromBucket(bucketName, fileKey);
  }, [product]);

  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="productContent--content" key={product._id}>
      <div className="productContent--content__wrapper">
        <div className="productContent--content__image">
          <img
            src={defaultProductImage}
            alt="product-icon"
            style={{ display: imageLoaded ? 'none' : 'block' }}
          />
          <img
            src={url}
            alt="product-icon"
            onError={e => onImageLoadError(e, defaultProductImage)}
            style={{ display: imageLoaded ? 'block' : 'none' }}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
        <div className="productContent--content__title">
          <h3>{product?.name}</h3>
        </div>
        <div className="productContent--content__info">
          <div className="productContent--content__innerInfo">
            <p>
              {t('No. of Users')} : <span>{noOfUsers}</span>
            </p>
          </div>
        </div>
      </div>

      {onProductEdit && onProductDelete && (
        <div className="productContent--content__edit">
          <button type="button" onClick={onProductEdit}>
            <FiEdit className="icon" />
          </button>
          <button type="button" onClick={onProductDelete}>
            <AiOutlineDelete className="icon" />
          </button>
        </div>
      )}
    </div>
  );
};

export default memo(ViewProduct);
