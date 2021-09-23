import { CartAction, subscriptionConstant } from '../../config/constants';
import { productAndSubscriptionTypes } from '../../Containers/Trial/TrialSubjectsContainer';
import {
  avoidedDuplicationData,
  getArrayIndexUsingKey,
} from '../../Helper/index';
import { VideoContent as ContentType } from '../student/reelVideoReducer';
import { SubscriptionType } from '../trial/TrialReducer';
import {
  GET_ALLOWED_PRODUCTS_SUCCESS,
  GET_SUBSCRIBED_PLAN_PRODUCTS_FAILED,
  GET_SUBSCRIBED_PLAN_PRODUCTS_REQUEST,
  GET_SUBSCRIBED_PLAN_PRODUCTS_SUCCESS,
  PRODUCT_CONTENT_ASSESMENTS_SUCCESS,
  PRODUCT_CONTENT_DOCUMENTS_SUCCESS,
  PRODUCT_CONTENT_VIDEO_SUCCESS,
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
} from './productSubscriptionTypes';

export interface UserDetailsType {
  _id: string;
  userId: string;
  subscriptionId: string;
  productIds: string[];
  startDate: string;
  lastRenewedDate: string;
  subscriptionLastValidDate: string;
}
export interface SubscriptionPlanSingleProductDataType {
  _id: string;
  name: string;
  description: string;
  isSubscribed?: boolean;
  isInCart?: boolean;
}

export interface SubscriptionPlanProductsType {
  productData: SubscriptionPlanSingleProductDataType[] | null;
}
export interface ProductContentVideoType {
  videoContentData: ContentType[] | null;
  videoContentTotalRecords: number;
  videoContentPage: number;
  videoContentSize: number;
}
export interface ProductContentDocumentType {
  documentContentData: ContentType[] | null;
  documentContentTotalRecords: number;
  documentContentPage: number;
  documentContentSize: number;
}

export interface ProductContentAssesmentType {
  assesmentContentData: ContentType[] | null;
  assesmentContentTotalRecords: number;
  assesmentContentPage: number;
  assesmentContentSize: number;
}
export interface inCartProductType extends productAndSubscriptionTypes {
  _id?: string;
  subscriptionId?: string;
  startDate?: string;
  lastRenewedDate?: string;
  subscriptionLastValidDate?: string;
}

export interface SubscriptionPlanProductListType {
  [subscriptionId: string]: SubscriptionPlanProductsType;
}
export interface ProductContentVideoListType {
  [productId: string]: ProductContentVideoType;
}
export interface ProductContentDocumentListType {
  [productId: string]: ProductContentDocumentType;
}
export interface ProductContentAssesmentListType {
  [productId: string]: ProductContentAssesmentType;
}
export interface AllowedProductsSingleType {
  productId: string;
  price: { currencyId: string; value: number };
}
export interface AllowedProductsType {
  allowedProductsData: AllowedProductsSingleType[] | null;
  allowedProductsTotalRecords: number;
  allowedProductsPage: number;
  allowedProductsSize: number;
}
export interface AllowedProductsListType {
  [subscriptionId: string]: AllowedProductsType;
}
export interface ProductSubscriptionState {
  subscriptions: SubscriptionType[] | null;
  selectedSubscriptionId: string | null;
  userSubscriptionId: string[] | null;
  subscriptionSize: number;
  subscriptionPage: number;
  subscriptionLoading: boolean;
  subscriptionTotalRecords: number;
  userDetails: UserDetailsType[] | null;
  userLoading: boolean;
  subscriptionPlanProductList: SubscriptionPlanProductListType;
  subscriptionPlanProductListLoading: boolean;
  productContentVideo: ProductContentVideoListType;
  productContentDocument: ProductContentDocumentListType;
  productContentAssesment: ProductContentAssesmentListType;
  inCartProducts: inCartProductType[] | null;
  inCartProductIds: string[] | null;
  allSubscribedProductDetails: string[] | null;
  allowedProductList: AllowedProductsListType;
}

const { subscriptionSize, subscriptionPage, subscriptionTotalRecords } =
  subscriptionConstant;

const INITIAL_STATE: ProductSubscriptionState = {
  subscriptions: null,
  selectedSubscriptionId: null,
  userSubscriptionId: null,
  subscriptionSize: subscriptionSize,
  subscriptionPage: subscriptionPage,
  subscriptionLoading: true,
  subscriptionTotalRecords: subscriptionTotalRecords,
  userDetails: null,
  userLoading: true,
  subscriptionPlanProductList: <SubscriptionPlanProductListType>{},
  subscriptionPlanProductListLoading: true,
  productContentVideo: <ProductContentVideoListType>{},
  productContentDocument: <ProductContentDocumentListType>{},
  productContentAssesment: <ProductContentAssesmentListType>{},
  inCartProducts: null,
  inCartProductIds: null,
  allSubscribedProductDetails: null,
  allowedProductList: <AllowedProductsListType>{},
};

type Action = { type: string; payload: any };

const productSubscriptionReducer = (
  state: ProductSubscriptionState = INITIAL_STATE,
  action: Action
): ProductSubscriptionState => {
  const payload = action?.payload?.dataWrapper;
  const { data, totalRecords, page, size } = payload || {};
  const customInput = action?.payload?.customInput;

  switch (action.type) {
    case SUBSCRIPTION_PRODUCT_REQUEST:
      return {
        ...state,
        subscriptionLoading: true,
      };

    case SUBSCRIPTION_PRODUCT_SUCCESS:
      return {
        ...state,
        subscriptionTotalRecords:
          totalRecords || state.subscriptionTotalRecords,
        subscriptions: state?.subscriptions
          ? avoidedDuplicationData(state?.subscriptions, data || null, '_id')
          : data || null,
        subscriptionSize: size || state.subscriptionSize,
        subscriptionPage: page || state.subscriptionPage,
        subscriptionLoading: false,
      };
    case SUBSCRIPTION_PRODUCT_FAILED:
      return {
        ...state,
        subscriptionLoading: false,
      };
    case USER_SELECTED_SUBSCRIPTION_REQUEST:
      return {
        ...state,
        userLoading: true,
      };

    case USER_SELECTED_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        userDetails: data || null,
        userLoading: false,
        selectedSubscriptionId: data?.[0]?.subscriptionId || null,
        userSubscriptionId: getUserSubscriptionIds(data),
        allSubscribedProductDetails: getAllsubscribedproductDetails(data),
      };
    case USER_SELECTED_SUBSCRIPTION_FAILED:
      return {
        ...state,
        userLoading: false,
      };
    case GET_SUBSCRIBED_PLAN_PRODUCTS_REQUEST:
      return {
        ...state,
        subscriptionPlanProductListLoading: true,
      };

    case GET_SUBSCRIBED_PLAN_PRODUCTS_SUCCESS:
      return {
        ...state,
        subscriptionPlanProductList: formatToPaginatedDataProducts(
          state.subscriptionPlanProductList,
          data,
          customInput,
          totalRecords,
          page,
          size
        ),
        subscriptionPlanProductListLoading: false,
      };
    case GET_SUBSCRIBED_PLAN_PRODUCTS_FAILED:
      return {
        ...state,
        subscriptionPlanProductListLoading: false,
      };
    case SET_SELECTED_SUBSCRIPTION:
      return {
        ...state,
        selectedSubscriptionId: customInput?.id || null,
      };
    case PRODUCT_CONTENT_VIDEO_SUCCESS:
      return {
        ...state,
        productContentVideo: formatToPaginatedDataProductContentVideo(
          state.productContentVideo,
          data,
          customInput,
          totalRecords,
          page,
          size
        ),
      };
    case PRODUCT_CONTENT_DOCUMENTS_SUCCESS:
      return {
        ...state,
        productContentDocument: formatToPaginatedDataProductContentDocument(
          state.productContentDocument,
          data,
          customInput,
          totalRecords,
          page,
          size
        ),
      };

    case PRODUCT_CONTENT_ASSESMENTS_SUCCESS:
      return {
        ...state,
        productContentAssesment: formatToPaginatedDataProductContentAssesment(
          state.productContentAssesment,
          data,
          customInput,
          totalRecords,
          page,
          size
        ),
      };
    case SET_IN_CART_PRODUCTS:
      return {
        ...state,
        inCartProducts: formatInCartData(
          state.inCartProducts,
          customInput,
          state.userDetails || []
        ),
        inCartProductIds: formatInCartDataIds(
          state.inCartProductIds,
          customInput
        ),
      };
    case SET_TOGGLE_INCART_PRODUCT:
      return {
        ...state,
        subscriptionPlanProductList: {
          ...toggleButtonIncart(state.subscriptionPlanProductList, customInput),
        },
      };

    case GET_ALLOWED_PRODUCTS_SUCCESS:
      return {
        ...state,
        allowedProductList: formatAllowedProductList(
          state.allowedProductList,
          data,
          customInput,
          totalRecords,
          page,
          size
        ),
      };

    case RESET_PRODUCT_SUBSCRIPTION:
      return {
        ...INITIAL_STATE,
      };

    default:
      return state;
  }
};

const toggleButtonIncart = (currentData: any, customInput: any) => {
  const index = getArrayIndexUsingKey(
    currentData?.[customInput?.subscriptionId]?.productData || [],
    '_id',
    customInput?.productId
  );

  if (index >= 0) {
    currentData[customInput?.subscriptionId].productData[index].isInCart =
      !currentData[customInput?.subscriptionId].productData[index].isInCart;
  }

  return { ...currentData };
};

const formatAllowedProductList = (
  currentData: AllowedProductsListType,
  newData: any,
  customInput: any,
  totalRecords: number | undefined,
  page: number | undefined,
  size: number | undefined
) => {
  if (newData && page) {
    const data = currentData?.[customInput?.subscriptionId]?.allowedProductsData
      ? avoidedDuplicationData(
          currentData?.[customInput?.subscriptionId]?.allowedProductsData,
          newData,
          'productId'
        )
      : [...newData];

    const arrangedData: AllowedProductsType = {
      allowedProductsData: data || null,
      allowedProductsTotalRecords: totalRecords || 0,
      allowedProductsPage: page || 0,
      allowedProductsSize: size || 0,
    };

    return {
      ...currentData,
      [customInput?.subscriptionId]: arrangedData,
    };
  } else {
    if (currentData?.[customInput?.subscriptionId]?.allowedProductsData) {
      return {
        ...currentData,
      };
    } else {
      return {
        ...currentData,
        [customInput?.subscriptionId]: {},
      };
    }
  }
};

const formatToPaginatedDataProducts = (
  currentData: SubscriptionPlanProductListType,
  newData: any,
  customInput: any,
  totalRecords: number | undefined,
  page: number | undefined,
  size: number | undefined
) => {
  if (newData && page) {
    const data = currentData?.[customInput?.subScriptionId]?.productData
      ? avoidedDuplicationData(
          currentData?.[customInput?.subScriptionId]?.productData,
          newData,
          '_id'
        )
      : [...newData];

    if (customInput?.userProductIds) {
      data?.map((product: any) => {
        product.isSubscribed = customInput?.userProductIds.includes(
          product._id
        );
        return product;
      });
    }

    const arrangedData: SubscriptionPlanProductsType = {
      productData: data || null,
    };

    return {
      ...currentData,
      [customInput?.subScriptionId]: arrangedData,
    };
  } else {
    if (currentData?.[customInput?.subScriptionId]?.productData) {
      return {
        ...currentData,
      };
    } else {
      return {
        ...currentData,
        [customInput?.subScriptionId]: {},
      };
    }
  }
};
const formatToPaginatedDataProductContentDocument = (
  currentData: ProductContentDocumentListType,
  newData: any,
  customInput: any,
  totalRecords: number | undefined,
  page: number | undefined,
  size: number | undefined
) => {
  if (newData && page) {
    const data = currentData?.[customInput?.productId]?.documentContentData
      ? avoidedDuplicationData(
          currentData?.[customInput?.productId]?.documentContentData,
          newData,
          '_id'
        )
      : [...newData];

    const arrangedData: ProductContentDocumentType = {
      documentContentData: data || null,
      documentContentTotalRecords: totalRecords || 0,
      documentContentPage: page || 0,
      documentContentSize: size || 0,
    };

    return {
      ...currentData,
      [customInput?.productId]: arrangedData,
    };
  } else {
    if (currentData?.[customInput?.productId]?.documentContentData) {
      return {
        ...currentData,
      };
    } else {
      return {
        ...currentData,
        [customInput?.productId]: {},
      };
    }
  }
};

const formatToPaginatedDataProductContentAssesment = (
  currentData: ProductContentAssesmentListType,
  newData: any,
  customInput: any,
  totalRecords: number | undefined,
  page: number | undefined,
  size: number | undefined
) => {
  if (newData && page) {
    const data = currentData?.[customInput?.productId]?.assesmentContentData
      ? avoidedDuplicationData(
          currentData?.[customInput?.productId]?.assesmentContentData,
          newData,
          '_id'
        )
      : [...newData];

    const arrangedData: ProductContentAssesmentType = {
      assesmentContentData: data || null,
      assesmentContentTotalRecords: totalRecords || 0,
      assesmentContentPage: page || 0,
      assesmentContentSize: size || 0,
    };

    return {
      ...currentData,
      [customInput?.productId]: arrangedData,
    };
  } else {
    if (currentData?.[customInput?.productId]?.assesmentContentData) {
      return {
        ...currentData,
      };
    } else {
      return {
        ...currentData,
        [customInput?.productId]: {},
      };
    }
  }
};
const formatToPaginatedDataProductContentVideo = (
  currentData: ProductContentVideoListType,
  newData: any,
  customInput: any,
  totalRecords: number | undefined,
  page: number | undefined,
  size: number | undefined
) => {
  if (newData && page) {
    const data = currentData?.[customInput?.productId]?.videoContentData
      ? avoidedDuplicationData(
          currentData?.[customInput?.productId]?.videoContentData,
          newData,
          '_id'
        )
      : [...newData];

    const arrangedData: ProductContentVideoType = {
      videoContentData: data || null,
      videoContentTotalRecords: totalRecords || 0,
      videoContentPage: page || 0,
      videoContentSize: size || 0,
    };

    return {
      ...currentData,
      [customInput?.productId]: arrangedData,
    };
  } else {
    if (currentData?.[customInput?.productId]?.videoContentData) {
      return {
        ...currentData,
      };
    } else {
      return {
        ...currentData,
        [customInput?.productId]: {},
      };
    }
  }
};

const formatInCartDataIds = (currentData: string[] | null, newData: any) => {
  if (currentData?.length) {
    if (newData?.action === CartAction.ADD_CART) {
      !currentData.includes(newData?.products?._id) &&
        currentData.push(newData?.products?._id);
    } else {
      currentData.splice(currentData.indexOf(newData?.products?._id), 1);
    }
    return currentData?.length ? [...currentData] : null;
  } else {
    return [newData?.products?._id];
  }
};
const formatInCartData = (
  currentData: inCartProductType[] | null,
  newData: any,
  userSubscriptionDetails: UserDetailsType[]
) => {
  const index = getArrayIndexUsingKey(
    currentData || [],
    'subscriptionId',
    newData?.subscription?._id
  );

  if (currentData?.[index]) {
    if (newData?.action === CartAction.ADD_CART) {
      currentData[index].products.push(newData?.products);
    } else {
      const removeIndex = getArrayIndexUsingKey(
        currentData[index].products || [],
        '_id',
        newData?.products?._id
      );
      currentData[index].products?.length === 1
        ? currentData.splice(index, 1)
        : currentData[index].products.splice(removeIndex, 1);
    }

    return currentData?.length ? [...currentData] : null;
  } else {
    const index = getArrayIndexUsingKey(
      userSubscriptionDetails || [],
      'subscriptionId',
      newData?.subscription?._id || ''
    );
    const data: inCartProductType = {
      _id: userSubscriptionDetails?.[index]?._id,
      startDate: userSubscriptionDetails?.[index]?.startDate,
      lastRenewedDate: userSubscriptionDetails?.[index]?.lastRenewedDate,
      subscriptionLastValidDate:
        userSubscriptionDetails?.[index]?.subscriptionLastValidDate,
      subscriptionId: newData?.subscription?._id,
      subscription: newData?.subscription,
      userId: userSubscriptionDetails?.[index]?.userId,
      products: [newData?.products],
    };
    return currentData ? [...currentData, data] : [data];
  }
};

const getAllsubscribedproductDetails = (data: UserDetailsType[]) => {
  let allSubscribedDetails: string[] = [];
  data?.map((data: any) => {
    data?.productIds?.map((productId: any) => {
      allSubscribedDetails.push(productId);
    });
  });

  return allSubscribedDetails?.length ? allSubscribedDetails : null;
};

const getUserSubscriptionIds = (data: UserDetailsType[]) => {
  const userSubscribedIds = data?.map((data: any) => data?.subscriptionId);
  return userSubscribedIds?.length ? userSubscribedIds : null;
};

export default productSubscriptionReducer;
