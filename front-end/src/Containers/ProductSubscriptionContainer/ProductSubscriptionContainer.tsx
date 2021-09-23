import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import VisibilitySensor from 'react-visibility-sensor';
import NoContent from '../../Components/CreateProduct/NoContent/NoContent';
import LoadingScreen from '../../Components/LoadingScreen/LoadingScreen';
import Overlay from '../../Components/Overlay/Overlay';
import SubscriptionSlider from '../../Components/Trial/SubscriptionSlider';
import {
  CartAction,
  PAYMENT_SERVICE,
  PRODUCT_SERVICE,
} from '../../config/constants';
import { getArrayIndexUsingKey } from '../../Helper/index';
import useApi from '../../Hooks/useApi';
//redux
import {
  AllowedProductsSingleType,
  SubscriptionPlanSingleProductDataType,
} from '../../redux/productSubscription/productSubscriptionReducer';
import {
  GET_ALLOWED_PRODUCTS_FAIL,
  GET_ALLOWED_PRODUCTS_REQUEST,
  GET_ALLOWED_PRODUCTS_SUCCESS,
  GET_SUBSCRIBED_PLAN_PRODUCTS_FAILED,
  GET_SUBSCRIBED_PLAN_PRODUCTS_REQUEST,
  GET_SUBSCRIBED_PLAN_PRODUCTS_SUCCESS,
  RESET_PRODUCT_SUBSCRIPTION,
  SET_IN_CART_PRODUCTS,
  SET_SELECTED_SUBSCRIPTION,
  SET_TOGGLE_INCART_PRODUCT,
  SUBSCRIPTION_PRODUCT_FAILED,
  SUBSCRIPTION_PRODUCT_REQUEST,
  SUBSCRIPTION_PRODUCT_SUCCESS,
  USER_SELECTED_SUBSCRIPTION_FAILED,
  USER_SELECTED_SUBSCRIPTION_REQUEST,
  USER_SELECTED_SUBSCRIPTION_SUCCESS,
} from '../../redux/productSubscription/productSubscriptionTypes';
import { RootStore } from '../../redux/store';
import { RESET_TRIAL } from '../../redux/trial/TrialType';
import SelectedProducts from '../Trial/SelectedTrialProducts';
import ProductContainer from './Products';

const ProductSubscriptionContainer = (props: any) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    subscriptionLoading,
    subscriptionSize,
    subscriptionTotalRecords,
    subscriptions,
    selectedSubscriptionId,
    userSubscriptionId,
    userDetails,
    userLoading,
    subscriptionPlanProductList,
    subscriptionPlanProductListLoading,
    inCartProductIds,
    inCartProducts,
    allowedProductList,
  } = useSelector((state: RootStore) => state.productSubscription);
  const { trialSubmitSuccesses } = useSelector(
    (state: RootStore) => state?.trial
  );

  const { userData } = useSelector((state: RootStore) => state?.auth);

  const [subscriptionPlanRequest] = useApi();
  const [userDetailsRequest] = useApi();
  const [subscriptionPlanProductsRequest] = useApi();
  const [getAllowedProducts] = useApi();

  const [currentSubscriptionPage, setSubscriptionPage] = useState<number>(1);
  const [isSubscribedPlan, setIsSubscribedPlan] = useState<boolean>(false);
  const [tryNowClicked, setTryNowClicked] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  //fetch all subscription plan
  const fetchSubscriptionPlans = (selectedPage: number) => {
    subscriptionPlanRequest(
      `/subscriptions?page=${selectedPage}&size=${subscriptionSize}&subscriptionOrderPriority=${userSubscriptionId}`,
      SUBSCRIPTION_PRODUCT_REQUEST,
      SUBSCRIPTION_PRODUCT_SUCCESS,
      SUBSCRIPTION_PRODUCT_FAILED,
      {},
      {},
      'GET',
      false,
      PAYMENT_SERVICE,
      {}
    );
  };

  //fetch all user subscription details
  const fetchUserDetails = (size: number) => {
    userDetailsRequest(
      `/users/${userData?._id}/user-subscriptions?page=1&size=${size}`,
      USER_SELECTED_SUBSCRIPTION_REQUEST,
      USER_SELECTED_SUBSCRIPTION_SUCCESS,
      USER_SELECTED_SUBSCRIPTION_FAILED,
      {},
      {},
      'GET',
      false,
      PAYMENT_SERVICE,
      {}
    );
  };

  //fetch allowed products
  const fetchAllowedProducts = (subscriptionId: string, page: number) => {
    const index = getArrayIndexUsingKey(
      userDetails || [],
      'subscriptionId',
      selectedSubscriptionId
    );

    const subscribedProductIds = userDetails?.[index]?.productIds;

    getAllowedProducts(
      `/users/${
        userData?._id
      }/eligible-subscriptions/${subscriptionId}/allowedProducts?page=${page}&size=10&orderByProductIds=${
        subscribedProductIds || ''
      }`,
      GET_ALLOWED_PRODUCTS_REQUEST,
      GET_ALLOWED_PRODUCTS_SUCCESS,
      GET_ALLOWED_PRODUCTS_FAIL,
      {},
      {},
      'GET',
      false,
      PAYMENT_SERVICE,
      { subscriptionId }
    );
  };

  //fetch all products in a subsciption plan
  const fetchProductsForSubscription = (
    selectedSubscriptionId: string,
    productIds: any
  ) => {
    const index = getArrayIndexUsingKey(
      userDetails || [],
      'subscriptionId',
      selectedSubscriptionId
    );

    const subscribedProductIds = userDetails?.[index]?.productIds;

    productIds?.length &&
      subscriptionPlanProductsRequest(
        `/products?productIds=${productIds}&page=1&size=2&prioritiyProductOrder=${productIds}`,
        GET_SUBSCRIBED_PLAN_PRODUCTS_REQUEST,
        GET_SUBSCRIBED_PLAN_PRODUCTS_SUCCESS,
        GET_SUBSCRIBED_PLAN_PRODUCTS_FAILED,
        {},
        {},
        'GET',
        false,
        PRODUCT_SERVICE,
        {
          subScriptionId: selectedSubscriptionId,
          userProductIds: userSubscriptionId?.includes(selectedSubscriptionId)
            ? subscribedProductIds
            : '',
        }
      );
  };

  //set selected subscription id.
  const setSelectSubscription = (id: string) => {
    dispatch({
      type: SET_SELECTED_SUBSCRIPTION,
      payload: { customInput: { id } },
    });
  };

  //add products in scroll
  const addProductsScrollBack = (id: string, page: number) => {
    const productTotalRecords =
      subscriptionPlanProductList?.[id]?.productData?.length;

    const allowedProductsTotalRecords =
      allowedProductList?.[id]?.allowedProductsTotalRecords;

    const allowedProductsTotalRecordsCurrent =
      allowedProductList?.[id]?.allowedProductsData?.length;

    if (
      subscriptions &&
      allowedProductsTotalRecords &&
      productTotalRecords &&
      !(productTotalRecords === allowedProductsTotalRecords)
    ) {
      !(allowedProductsTotalRecords === allowedProductsTotalRecordsCurrent) &&
        fetchAllowedProducts(id, page);

      fetchProductsForSubscription(id, getProductIdsFromAllowedProductIds(id));
    }
  };

  const getProductIdsFromAllowedProductIds = (
    selectedSubscriptionId: string
  ) => {
    let productIds;
    if (
      !subscriptionPlanProductList?.[selectedSubscriptionId]?.productData
        ?.length
    ) {
      productIds = allowedProductList?.[
        selectedSubscriptionId
      ]?.allowedProductsData
        ?.slice(0, 2)
        .map((data: AllowedProductsSingleType) => {
          return data?.productId;
        });
    } else {
      const productData =
        subscriptionPlanProductList?.[selectedSubscriptionId]?.productData;

      const allowedProductData =
        allowedProductList?.[selectedSubscriptionId]?.allowedProductsData;

      const lastProductItemsId = productData?.[productData?.length - 1]?._id;

      const indexOfLastShownProductInAllowedProducts = getArrayIndexUsingKey(
        allowedProductData || [],
        'productId',
        lastProductItemsId
      );

      productIds = allowedProductData
        ?.slice(
          indexOfLastShownProductInAllowedProducts + 1,
          indexOfLastShownProductInAllowedProducts + 3
        )
        .map((data: AllowedProductsSingleType) => {
          return data?.productId;
        });
    }

    return productIds;
  };

  // initial render fetch user details total records.
  useEffect(() => {
    userData && fetchUserDetails(100000);
    //unmount remove data.
    return () => {
      dispatch({
        type: RESET_PRODUCT_SUBSCRIPTION,
      });
      dispatch({ type: RESET_TRIAL });
    };
  }, []);

  //retrive all subscription plans.
  useEffect(() => {
    userSubscriptionId?.length &&
      fetchSubscriptionPlans(currentSubscriptionPage);
  }, [userSubscriptionId]);

  //after selected a new subscription plan retrive products.
  useEffect(() => {
    if (
      selectedSubscriptionId &&
      !subscriptionPlanProductList?.[selectedSubscriptionId] &&
      subscriptions?.length &&
      allowedProductList?.[selectedSubscriptionId]
    ) {
      fetchProductsForSubscription(
        selectedSubscriptionId,
        getProductIdsFromAllowedProductIds(selectedSubscriptionId)
      );
    }
    //set subscribed product button show/hide
    setIsSubscribedPlan(
      userSubscriptionId?.includes(selectedSubscriptionId || '') || false
    );
  }, [selectedSubscriptionId, subscriptions, allowedProductList]);

  useEffect(() => {
    userData &&
      selectedSubscriptionId &&
      !allowedProductList?.[selectedSubscriptionId] &&
      fetchAllowedProducts(selectedSubscriptionId, 1);
  }, [selectedSubscriptionId]);

  useEffect(() => {
    trialSubmitSuccesses && setShowOverlay(true);
  }, [trialSubmitSuccesses]);

  const removeSelectedProduct = (productData: any, subscriptionId: string) => {
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
          userId: userData?._id,
          products: productData,
          action: CartAction.REMOVE_CART,
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
  const redirectAfterSuccess = () => {
    history.push(`/home`);
  };

  return (
    <>
      {showOverlay && (
        <Overlay showLoader onOverlayHide={redirectAfterSuccess} />
      )}
      {!tryNowClicked ? (
        <>
          {!userLoading ? (
            <>
              {subscriptions?.length ? (
                <div className="subscription--card__wrapper productsPage">
                  <SubscriptionSlider
                    subscriptions={subscriptions}
                    userSubscriptionId={userSubscriptionId}
                    selectedSubscription={
                      subscriptions?.[
                        getArrayIndexUsingKey(
                          subscriptions,
                          '_id',
                          selectedSubscriptionId
                        )
                      ]
                    }
                    page={currentSubscriptionPage}
                    size={subscriptionSize}
                    subscriptionTotalRecords={subscriptionTotalRecords}
                    onSelect={subscription =>
                      setSelectSubscription(subscription?._id)
                    }
                    isSlider={false}
                    addSubscription={(selectedPage: number) => {
                      setSubscriptionPage(selectedPage);
                      fetchSubscriptionPlans(selectedPage);
                    }}
                    isPlanChangeable={
                      allowedProductList?.[selectedSubscriptionId || ''] &&
                      !subscriptionPlanProductListLoading
                        ? true
                        : false
                    }
                  />
                  <div className="subscription--container__wrapper studentProducts">
                    <h2 className="page-title">{t('Available Products')}</h2>
                    <div>
                      {selectedSubscriptionId &&
                      Object.keys(
                        subscriptionPlanProductList?.[selectedSubscriptionId] ||
                          {}
                      )?.length ? (
                        subscriptionPlanProductList?.[
                          selectedSubscriptionId
                        ]?.productData?.map(
                          (data: SubscriptionPlanSingleProductDataType) => (
                            <ProductContainer
                              isSubscribedPlan={isSubscribedPlan}
                              productData={data}
                              index={data?._id + selectedSubscriptionId}
                            />
                          )
                        )
                      ) : !subscriptionPlanProductListLoading &&
                        allowedProductList?.[selectedSubscriptionId || ''] ? (
                        <div className="createContent__body--content empty">
                          <NoContent
                            message={t(
                              'No products in this subscription plan.'
                            )}
                          />
                        </div>
                      ) : (
                        <LoadingScreen />
                      )}
                    </div>

                    <VisibilitySensor
                      partialVisibility
                      onChange={isVisible => {
                        if (isVisible && selectedSubscriptionId) {
                          addProductsScrollBack(
                            selectedSubscriptionId,
                            allowedProductList?.[selectedSubscriptionId]
                              ?.allowedProductsPage + 1
                          );
                        }
                      }}
                    >
                      <div style={{ color: '#000' }}>.</div>
                    </VisibilitySensor>
                  </div>
                </div>
              ) : !userSubscriptionId?.length ? (
                <div className="createContent__body--content empty">
                  <NoContent message={t('You dont have a subscription plan')} />
                </div>
              ) : subscriptionLoading ? (
                <LoadingScreen />
              ) : (
                <div className="createContent__body--content empty">
                  <NoContent message={t('No Subscriptions Available')} />
                </div>
              )}
            </>
          ) : (
            <LoadingScreen />
          )}
          {inCartProductIds?.length && (
            <div className="subscription--card__footer">
              <div className="container">
                <div className="subscription--container__wrapper">
                  <p> {inCartProductIds?.length} Product Selected.</p>
                  <button
                    className="btn btn--white btn--curved"
                    onClick={() => setTryNowClicked(true)}
                  >
                    Try Now
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <SelectedProducts
          goToPrevious={() => {
            setTryNowClicked(false);
          }}
          selectedProductsAndSubscription={inCartProducts || []}
          removeSelectedProduct={removeSelectedProduct}
          isProductData={true}
        />
      )}
    </>
  );
};

export default ProductSubscriptionContainer;
