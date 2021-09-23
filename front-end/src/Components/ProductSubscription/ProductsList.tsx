import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { CartAction, contentType } from '../../config/constants';
import ContentSlider from '../ContentSlider/ContentSlider';
import NoContent from '../CreateProduct/NoContent/NoContent';

interface ProductListProps {
  productData: any;
  index: string;
  isSubscribedPlan: boolean;
  videoContentData: any;
  documentContentData: any;
  assesmentContentData: any;
  addMoreVideoContent: Function;
  addMoreDocumentContent: Function;
  addMoreAssesmentContent: Function;
  subscriptionId: string;
  setCartValues: Function;
  cartProductIds: string[] | null;
  allSubscribedProducts: string[] | null;
}

const ProductsList: FC<ProductListProps> = ({
  productData,
  index,
  isSubscribedPlan,
  videoContentData,
  documentContentData,
  assesmentContentData,
  addMoreVideoContent,
  addMoreDocumentContent,
  addMoreAssesmentContent,
  subscriptionId,
  setCartValues,
  cartProductIds,
  allSubscribedProducts,
}) => {
  const { t } = useTranslation();

  const productClicked = () => {
    if (!productData?.isSubscribed) {
      setCartValues(
        productData,
        subscriptionId,
        !productData?.isInCart ? CartAction.ADD_CART : CartAction.REMOVE_CART
      );
    }
  };

  //difrent button types for products
  const buttonType = useMemo(() => {
    let buttonText: any = '';
    let isDisable: boolean = false;
    let isButtonPrimary: boolean = false;
    let isGreenButton: boolean = false;

    if (productData?.isSubscribed) {
      //green subscribe button
      buttonText = t('Subscribed');
      isDisable = false;
      isButtonPrimary = true;
      isGreenButton = true;
    } else if (allSubscribedProducts?.includes(productData?._id)) {
      //disabled subscribed button
      buttonText = t('Subscribed');
      isDisable = true;
      isButtonPrimary = true;
      isGreenButton = true;
    } else if (
      cartProductIds?.includes(productData?._id) &&
      !productData?.isInCart
    ) {
      //disabled in cart button
      buttonText = t('In cart');
      isDisable = true;
      isButtonPrimary = true;
      isGreenButton = false;
    } else if (productData?.isInCart) {
      //in cart button
      buttonText = t('In cart');
      isDisable = false;
      isButtonPrimary = true;
      isGreenButton = false;
    } else {
      //try this product button
      buttonText = t('Try this product');
      isDisable = false;
      isButtonPrimary = false;
      isGreenButton = false;
    }
    return (
      <button
        className={`btn btn--${isButtonPrimary ? 'primary' : 'secondary'} ${
          isGreenButton && 'btn--green'
        } btn--curved ${isDisable && 'disable'}`}
        onClick={productClicked}
        disabled={isDisable}
      >
        {buttonText}
      </button>
    );
  }, [cartProductIds, productData]);

  return (
    <>
      <div key={index + 'main_div'} className="product__withVideos">
        <div className="container">
          <div className="product__withVideos--title">
            <p>{productData?.name}</p>
            {isSubscribedPlan && <>{buttonType}</>}
          </div>
          <div className="product__withVideos--description">
            <p>{productData?.description}</p>
          </div>

          {videoContentData?.videoContentData?.length && (
            <ContentSlider
              videos={videoContentData?.videoContentData}
              videosTotalRecords={videoContentData?.videoContentTotalRecords}
              getNewVideos={() => addMoreVideoContent(productData?._id)}
              title={t('Videos')}
              itemKey={productData?._id + subscriptionId + contentType.video}
            />
          )}
          {documentContentData?.documentContentData?.length && (
            <ContentSlider
              videos={documentContentData?.documentContentData}
              videosTotalRecords={
                documentContentData?.documentContentTotalRecords
              }
              getNewVideos={() => addMoreDocumentContent(productData?._id)}
              title={t('Documents')}
              itemKey={productData?._id + subscriptionId + contentType.document}
            />
          )}
          {assesmentContentData?.assesmentContentData?.length && (
            <ContentSlider
              videos={assesmentContentData?.assesmentContentData}
              videosTotalRecords={
                assesmentContentData?.assesmentContentTotalRecords
              }
              getNewVideos={() => addMoreAssesmentContent(productData?._id)}
              title={t('Assessments')}
              itemKey={
                productData?._id + subscriptionId + contentType.assignment
              }
            />
          )}
          {!videoContentData?.videoContentData?.length &&
            !documentContentData?.documentContentData?.length &&
            !assesmentContentData?.assesmentContentData?.length &&
            (videoContentData && documentContentData && assesmentContentData ? (
              <NoContent message={t('No Content Available')} />
            ) : (
              <NoContent message={t('Loading...')} />
            ))}
        </div>
      </div>
    </>
  );
};

export default ProductsList;
