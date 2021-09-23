import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductList from '../../Components/ProductSubscription/ProductsList';
import { contentType, PRODUCT_CONTENT_SERVICE } from '../../config/constants';
import { getArrayIndexUsingKey } from '../../Helper/index';
import useApi from '../../Hooks/useApi';
import {
  PRODUCT_CONTENT_ASSESMENTS_FAILED,
  PRODUCT_CONTENT_ASSESMENTS_REQUEST,
  PRODUCT_CONTENT_ASSESMENTS_SUCCESS,
  PRODUCT_CONTENT_DOCUMENTS_FAILED,
  PRODUCT_CONTENT_DOCUMENTS_REQUEST,
  PRODUCT_CONTENT_DOCUMENTS_SUCCESS,
  PRODUCT_CONTENT_VIDEO_FAILED,
  PRODUCT_CONTENT_VIDEO_REQUEST,
  PRODUCT_CONTENT_VIDEO_SUCCESS,
  SET_IN_CART_PRODUCTS,
  SET_TOGGLE_INCART_PRODUCT,
} from '../../redux/productSubscription/productSubscriptionTypes';
import { RootStore } from '../../redux/store';

interface ProductProps {
  productData: any;
  index: string;
  isSubscribedPlan: boolean;
}

const Products: FC<ProductProps> = ({
  productData,
  index,
  isSubscribedPlan,
}) => {
  const dispatch = useDispatch();
  const [productContentVideoRequest] = useApi();
  const [productContentDocumentsRequest] = useApi();
  const [productContentAssesmentsRequest] = useApi();

  const {
    productContentVideo,
    productContentDocument,
    productContentAssesment,
    selectedSubscriptionId,
    subscriptions,
    inCartProductIds,
    allSubscribedProductDetails,
  } = useSelector((state: RootStore) => state.productSubscription);

  useEffect(() => {
    !productContentVideo?.[productData?._id] &&
      fetchProductVideoContent(productData?._id, 1);
    !productContentDocument?.[productData?._id] &&
      fetchProductDocumentsContent(productData?._id, 1);
    !productContentAssesment?.[productData?._id] &&
      fetchProductAssesmentsContent(productData?._id, 1);
  }, [productData]);

  //fetch all product content video details
  const fetchProductVideoContent = (productID: string, page: number) => {
    productContentVideoRequest(
      `/products/${productID}/contents?contentTypes=${contentType.video}&reelTypes=STANDARD&page=${page}&size=10`,
      PRODUCT_CONTENT_VIDEO_REQUEST,
      PRODUCT_CONTENT_VIDEO_SUCCESS,
      PRODUCT_CONTENT_VIDEO_FAILED,
      {},
      {},
      'GET',
      false,
      PRODUCT_CONTENT_SERVICE,
      { productId: productID }
    );
  };
  //fetch all product content documents details
  const fetchProductDocumentsContent = (productID: string, page: number) => {
    productContentDocumentsRequest(
      `/products/${productID}/contents?contentTypes=${contentType.document}&reelTypes=STANDARD&page=${page}&size=10`,
      PRODUCT_CONTENT_DOCUMENTS_REQUEST,
      PRODUCT_CONTENT_DOCUMENTS_SUCCESS,
      PRODUCT_CONTENT_DOCUMENTS_FAILED,
      {},
      {},
      'GET',
      false,
      PRODUCT_CONTENT_SERVICE,
      { productId: productID }
    );
  };

  //fetch all product content assesments details
  const fetchProductAssesmentsContent = (productID: string, page: number) => {
    productContentAssesmentsRequest(
      `/products/${productID}/contents?contentTypes=${contentType.assignment}&reelTypes=STANDARD&page=${page}&size=10`,
      PRODUCT_CONTENT_ASSESMENTS_REQUEST,
      PRODUCT_CONTENT_ASSESMENTS_SUCCESS,
      PRODUCT_CONTENT_ASSESMENTS_FAILED,
      {},
      {},
      'GET',
      false,
      PRODUCT_CONTENT_SERVICE,
      { productId: productID }
    );
  };

  const getMoreVideos = (productId: string) => {
    const currentDataLength =
      productContentVideo?.[productData?._id]?.videoContentData?.length || 0;
    const totalRecords =
      productContentVideo?.[productData?._id]?.videoContentTotalRecords || 0;
    const currentPage =
      productContentVideo?.[productData?._id]?.videoContentPage;

    currentDataLength < totalRecords &&
      currentPage &&
      fetchProductVideoContent(productId, currentPage + 1);
  };

  const getMoreDocuments = (productId: string) => {
    const currentDataLength =
      productContentDocument?.[productData?._id]?.documentContentData?.length ||
      0;
    const totalRecords =
      productContentDocument?.[productData?._id]?.documentContentTotalRecords ||
      0;
    const currentPage =
      productContentDocument?.[productData?._id]?.documentContentPage;

    currentDataLength < totalRecords &&
      currentPage &&
      fetchProductDocumentsContent(productId, currentPage + 1);
  };
  const getMoreAssessment = (productId: string) => {
    const currentDataLength =
      productContentAssesment?.[productData?._id]?.assesmentContentData
        ?.length || 0;
    const totalRecords =
      productContentAssesment?.[productData?._id]
        ?.assesmentContentTotalRecords || 0;
    const currentPage =
      productContentAssesment?.[productData?._id]?.assesmentContentPage;

    currentDataLength < totalRecords &&
      currentPage &&
      fetchProductAssesmentsContent(productId, currentPage + 1);
  };
  const setCartValues = (
    productData: any,
    subscriptionId: string,
    action: string
  ) => {
    const index = getArrayIndexUsingKey(
      subscriptions || [],
      '_id',
      subscriptionId
    );
    dispatch({
      type: SET_IN_CART_PRODUCTS,
      payload: {
        customInput: {
          subscription: subscriptions?.[index],
          products: productData,
          action,
        },
      },
    });
    dispatch({
      type: SET_TOGGLE_INCART_PRODUCT,
      payload: {
        customInput: {
          subscriptionId: subscriptionId,
          productId: productData?._id,
        },
      },
    });
  };

  return (
    <>
      <ProductList
        productData={productData}
        index={index}
        isSubscribedPlan={isSubscribedPlan}
        videoContentData={productContentVideo?.[productData?._id]}
        documentContentData={productContentDocument?.[productData?._id]}
        assesmentContentData={productContentAssesment?.[productData?._id]}
        subscriptionId={selectedSubscriptionId || ''}
        addMoreVideoContent={(productId: string) => getMoreVideos(productId)}
        cartProductIds={inCartProductIds}
        addMoreDocumentContent={(productId: string) =>
          getMoreDocuments(productId)
        }
        addMoreAssesmentContent={(productId: string) =>
          getMoreAssessment(productId)
        }
        allSubscribedProducts={allSubscribedProductDetails}
        setCartValues={setCartValues}
      />
    </>
  );
};

export default Products;
