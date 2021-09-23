import { contentType, productConstant } from '../../config/constants';
import { getArrayIndexUsingKey, uuidv4 } from '../../Helper';
import { s3FileObjectType, tutorTypes } from '../common/commonReducer';
import { userIndividualManagementTypes } from '../userManagement/userIndividualManagementReducer';
import {
  ADD_NEW_FEATURE_REEL,
  ADD_NEW_REEL,
  ADD_SELECTED_SUBSCRIPTION,
  CHANGE_CONTENT_ORDER,
  DELETE_REEL,
  DELETE_SELECTED_SUBSCRIPTION,
  EDIT_FEATURE_REEL,
  EDIT_REEL,
  GET_FEATURE_REEL_INITIAL_CONTENT_REQUEST,
  GET_FEATURE_REEL_INITIAL_CONTENT_SUCCESS,
  GET_FEATURE_REEL_INITIAL_TUTORS_REQUEST,
  GET_FEATURE_REEL_INITIAL_TUTORS_SUCCESS,
  GET_FEATURE_REEL_MORE_TUTORS_SUCCESS,
  GET_FEATURE_REEL_SELECTED_CONTENT_SUCCESS,
  GET_FEATURE_REEL_SELECTED_CONTENT_TUTOR_SUCCESS,
  GET_FEATURE_REEL_TUTOR_VIDEO_COUNT_SUCCESS,
  GET_PRODUCT_FAILED,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUBSCRIPTION_STATS_SUCCESS,
  GET_PRODUCT_SUCCESS,
  GET_REEL_ALL_TUTORS_SUCCESS,
  GET_REEL_INITIAL_CONTENT_REQUEST,
  GET_REEL_INITIAL_CONTENT_SUCCESS,
  GET_REEL_INITIAL_TUTORS_REQUEST,
  GET_REEL_INITIAL_TUTORS_SUCCESS,
  GET_REEL_MORE_TUTORS_SUCCESS,
  GET_REEL_TUTOR_VIDEO_COUNT_SUCCESS,
  GET_USER_SUBSCRIPTIONS_SUCCESS,
  GET_USER_SUBSCRIPTION_DETAILS_SUCCESS,
  REEL_MOVE_DOWN,
  REEL_MOVE_UP,
  RESET_CONTENT,
  RESET_CREATE_PRODUCT,
  RESET_FEATURE_CONTENT,
  RESET_FEATURE_REEL_SELECTED_CONTENTS,
  RESET_FEATURE_TUTOR,
  RESET_PRODUCTS,
  RESET_TUTOR,
  SAVE_FEATURE_REEL,
  SAVE_PRODUCT_FAILED,
  SAVE_PRODUCT_REQUEST,
  SAVE_PRODUCT_SUCCESS,
  SAVE_REEL,
  SELECT_ALL_CONTENT_BY_CONTENT_TYPE,
  SELECT_ALL_FEATURE_REEL_CONTENT_BY_CONTENT_TYPE_SUCCESS,
  SELECT_FEATURE_REEL_ALL_CONTENTS_SUCCESS,
  SELECT_FEATURE_REEL_TUTOR,
  SELECT_REEL_ALL_CONTENTS,
  SELECT_REEL_TUTOR,
  SET_BASIC_INFORMATION,
  SET_SELECTED_CONTENT,
  SET_SELECTED_COUNTRIES,
  SET_SELECTED_FEATURE_REEL_CONTENT,
  UPDATE_ACCESS_CONTROL_USERS_LIST,
  UPDATE_DEFAULT_PRODUCT_ACCESS,
  UPDATE_FORMATTED_PRODUCT_DATA,
  UPDATE_PRODUCT_SUBSCRIPTION_DEFAULT_PRICE_BULK,
  UPDATE_PRODUCT_USER_ACCESS_BULK,
  UPDATE_PRODUCT_USER_SPECIAL_PRICE_BULK,
  UPDATE_TUTOR_BULK,
} from './productTypes';

const { productTotalRecords, productPage, productSize } = productConstant;

export interface singleContentType {
  _id: string;
  title: string;
  tutorIds: string[];
  previewImageKey: s3FileObjectType;
  isContentSelected?: boolean;
  tutor?: tutorTypes;
  type: string;
}

export interface reelProduct {
  contents?: singleContentType[] | null;
  totalRecords?: number;
  page?: number;
  size?: number;
}

export interface reelTutors extends tutorTypes {
  isTutorSelected?: boolean;
  contentCount?: number | null;
  isNotActiveContent?: boolean;
}

export interface productTutors extends tutorTypes {
  isTutorSelected?: boolean;
  contentCount?: number | null;
}

export interface contentIdsProps {
  [contentType: string]: {
    isAllSelected: boolean;
    ids: string[];
    contentTypeIgnoredContentsIds?: string[];
  };
}

export interface tutorAndSelectedContent {
  tutorId: string;
  contentIds: contentIdsProps;
}

export interface singleDataTypeWithValueAndLabel {
  value: string;
  label: string;
}

export interface tutorAndSelectedFeatureContent {
  grade?: singleDataTypeWithValueAndLabel;
  id?: string;
  isAllContentsSelected?: boolean;
  subject?: singleDataTypeWithValueAndLabel;
  syllabus?: singleDataTypeWithValueAndLabel;
  tutorsTotalRecords?: number;
  constantReelIds?: tutorAndSelectedContent[];
  ignoredContentsIds?: string[];
}

interface userSubscription {
  _id: string;
  userId: string;
  subscriptionId: string;
}

export interface initialReelType {
  grade?: singleDataTypeWithValueAndLabel;
  contents?: {
    videos?: reelProduct | null;
    documents?: reelProduct | null;
    assessments?: reelProduct | null;
  } | null;
  subject?: singleDataTypeWithValueAndLabel;
  syllabus?: singleDataTypeWithValueAndLabel;
  tutors?: reelTutors[] | null;
  tutorsPage?: number;
  tutorsSize?: number;
  tutorsTotalRecords?: number;
}

export interface reelTypes extends initialReelType {
  id: string;
  isAllContentsSelected?: boolean;
  isReelSaved?: boolean;
  selectedContentIds?: tutorAndSelectedContent[] | null;
  selectedTutorId?: string;
  ignoredContentsIds?: string[];
}

export interface featureReelTypes extends initialReelType {
  isReelEdited?: boolean;
  selectedFeatureContentList?: tutorAndSelectedFeatureContent[] | null;
  selectedTutorId?: string;
}
export interface product {
  _id: string;
  name: string;
  description: string;
  defaultPrice: number;
  previewImage: s3FileObjectType;
  currencyId: string;
  availableCountryCodes: string[];
}

export interface productSubscription {
  productId: string;
  userCount: number;
}

export interface SubscriptionDetails {
  _id: string;
  subscriptionName: string;
  subscriptionDescription: string;
  subscriptionFeatures: SubscriptionFeature[];
  allowedProducts: AllowedProduct[];
  subscriptionType: string;
  duration: number;
}

export interface AllowedProduct {
  productId: string;
  defaultPrice: DefaultPrice;
}

export interface DefaultPrice {
  currencyId: string;
  value: string;
}

export interface SubscriptionFeature {
  featureCode: string;
  featureTitle: string;
  featureDescription: string;
}

export interface basicInformationTypes {
  productName: string;
  description: string;
  currencyId: string;
  defaultPrice: string;
  countryIds: string[];
  previewImage: s3FileObjectType;
  contentAccess: string;
  trialPeriod?: number;
  period?: string;
}

export interface productSubscriptionTypes {
  _id: string;
  subscriptionName: string;
  subscriptionCycle: string;
  subscriptionDuration: string;
  defaultPrice?: number | null;
}

export interface productTypes {
  reels: reelTypes[] | null;
  featureReel: featureReelTypes | null;
  featureReelAllSelectedContentIds: string[] | null;
  productTutorIdList: reelTutors[] | null;
  products: { [page: number]: product[] };
  productTotalRecords: number;
  productPage: number;
  productSize: number;
  productsLoading: boolean;
  productSubscriptionDetails: productSubscription[];
  featureReelContents: reelProduct | null;
  accessControl: accessControlType;
  countryCodeList: string[] | null;
  userSubscriptions: userSubscription[];
  subscriptionDetails: SubscriptionDetails[];
  basicInformation: basicInformationTypes | null;
  productSubscription: productSubscriptionTypes[] | null;
  formattedProductData: any;
  productSaveLoading: boolean;
  productSaveError: boolean;
  productSaveSuccess: boolean;
  productSaveErrorMessage: any;
}

export interface accessControlUser extends userIndividualManagementTypes {
  subscription: string;
  access: boolean;
  specialPrice: string;
}

export interface accessControlType {
  defaultAccess: boolean;
  users: accessControlUser[];
}

export interface singleUserAccess {
  uid: string;
  access: boolean;
}
export interface singleUserSpecialPrice {
  uid: string;
  specialPrice: string;
}

const INITIAL_STATE: productTypes = {
  reels: null,
  featureReel: null,
  featureReelAllSelectedContentIds: null,
  featureReelContents: null,
  productTutorIdList: null,
  products: {},
  productTotalRecords: productTotalRecords,
  productPage: productPage,
  productSize: productSize,
  productsLoading: false,
  productSubscriptionDetails: [],
  accessControl: { defaultAccess: true, users: [] },
  countryCodeList: null,
  userSubscriptions: [],
  subscriptionDetails: [],
  basicInformation: null,
  productSubscription: null,
  formattedProductData: null,
  productSaveError: false,
  productSaveLoading: false,
  productSaveSuccess: false,
  productSaveErrorMessage: '',
};

type Action = {
  type: string;
  payload: {
    dataWrapper:
      | {
          data?: any;
          totalRecords?: number;
          page?: number;
          size?: number;
        }
      | string[]
      | any;
    customInput: any;
  };
};

const productReducer = (
  state: productTypes = INITIAL_STATE,
  action: Action
): productTypes => {
  let payload = action?.payload?.dataWrapper;
  if (payload?.length) {
    payload = { data: payload };
  }

  const { data, totalRecords, page, size } = payload || {};

  const customInput = action?.payload?.customInput;
  switch (action.type) {
    case RESET_PRODUCTS:
      return {
        ...state,
        products: {},
        productTotalRecords: productTotalRecords,
        productPage: productPage,
        productSize: productSize,
      };

    case RESET_CREATE_PRODUCT: {
      return INITIAL_STATE;
    }
    case ADD_NEW_REEL:
      return {
        ...state,
        reels: [...addNewReel(state.reels, data)],
      };

    case GET_REEL_TUTOR_VIDEO_COUNT_SUCCESS:
      return {
        ...state,

        reels: [
          ...addTutorsVideoCountToReel(
            state.reels,
            totalRecords || 0,
            customInput
          ),
        ],
      };

    case GET_FEATURE_REEL_TUTOR_VIDEO_COUNT_SUCCESS:
      return {
        ...state,

        featureReel: {
          ...addTutorsVideoCountToFeatureReel(
            state.featureReel,
            totalRecords || 0,
            customInput
          ),
        },
      };

    case GET_REEL_INITIAL_TUTORS_REQUEST:
      return {
        ...state,

        reels: [...resetTutorsToReel(state.reels, 0, 1, customInput)],
      };

    case GET_REEL_INITIAL_TUTORS_SUCCESS:
      return {
        ...state,

        reels: [
          ...addTutorsToReel(
            state.reels,
            data,
            totalRecords,
            page,
            size,
            customInput,
            true
          ),
        ],
      };

    case GET_FEATURE_REEL_INITIAL_TUTORS_REQUEST:
      return {
        ...state,
        featureReel: { ...resetTutorsToFeatureReel(state.featureReel) },
      };

    case GET_FEATURE_REEL_INITIAL_TUTORS_SUCCESS:
      return {
        ...state,

        featureReel: {
          ...addTutorsToFeatureReel(
            state.featureReel,
            data,
            totalRecords,
            page,
            size,
            true
          ),
        },
      };

    case GET_FEATURE_REEL_MORE_TUTORS_SUCCESS:
      return {
        ...state,

        featureReel: {
          ...addTutorsToFeatureReel(
            state.featureReel,
            data,
            totalRecords,
            page,
            size,
            false
          ),
        },
      };

    case GET_REEL_MORE_TUTORS_SUCCESS:
      return {
        ...state,

        reels: [
          ...addTutorsToReel(
            state.reels,
            data,
            totalRecords,
            page,
            size,
            customInput,
            false
          ),
        ],
      };

    case SELECT_REEL_TUTOR:
      return {
        ...state,
        reels: [...selectTutorInReel(state.reels, data, customInput)],
      };

    case SELECT_FEATURE_REEL_TUTOR:
      return {
        ...state,
        featureReel: {
          ...selectTutorInFeatureReel(state.featureReel, data, customInput),
        },
      };

    case RESET_TUTOR:
      return {
        ...state,
        reels: [...resetTutorsToReel(state.reels, 0, 1, customInput)],
      };

    case RESET_FEATURE_TUTOR:
      return {
        ...state,
        featureReel: { ...resetTutorsToFeatureReel(state.featureReel) },
      };

    case GET_REEL_INITIAL_CONTENT_REQUEST:
      return {
        ...state,
        reels: [...resetContentsInReel(state.reels, 0, 1, 0, customInput)],
      };

    case GET_REEL_INITIAL_CONTENT_SUCCESS:
      return {
        ...state,
        reels: [
          ...addContentsToReel(
            state.reels,
            data,
            totalRecords,
            page,
            size,
            customInput
          ),
        ],
      };

    case GET_FEATURE_REEL_INITIAL_CONTENT_REQUEST:
      return {
        ...state,
        featureReel: {
          ...resetContentsInFeatureReel(
            state.featureReel,
            0,
            1,
            0,
            customInput
          ),
        },
      };

    case GET_FEATURE_REEL_INITIAL_CONTENT_SUCCESS:
      return {
        ...state,
        featureReel: {
          ...addContentsToFeatureReel(
            state.featureReel,
            data,
            totalRecords,
            page,
            size,
            customInput
          ),
        },
      };

    case SET_SELECTED_CONTENT:
      return {
        ...state,
        reels: [...setSelectedContentInReel(state.reels, data)],
      };

    case RESET_FEATURE_REEL_SELECTED_CONTENTS:
      return {
        ...state,
        featureReelContents: null,
      };

    case SET_SELECTED_FEATURE_REEL_CONTENT:
      return {
        ...state,
        featureReelAllSelectedContentIds: [
          ...addIdsToContentIdList(
            state.featureReelAllSelectedContentIds || [],
            [data.id],
            data.isContentSelected
          ),
        ],

        featureReel: {
          ...setSelectedContentInFeatureReel(state.featureReel, data),
        },
      };

    case GET_PRODUCT_REQUEST:
      return {
        ...state,
        productsLoading: true,
      };
    case GET_PRODUCT_SUCCESS:
      return {
        ...state,
        products:
          data && page
            ? { ...state.products, [page]: [...data] }
            : state.products,
        productTotalRecords: totalRecords || state.productTotalRecords,
        productPage: page || state.productPage,
        productSize: size || state.productSize,
        productsLoading: false,
      };

    case GET_PRODUCT_FAILED:
      return {
        ...state,
        productsLoading: false,
      };

    case RESET_CONTENT:
      return {
        ...state,
        reels: [
          ...addContentsToReel(
            state.reels,
            null,
            totalRecords,
            page,
            size,
            customInput
          ),
        ],
      };

    case RESET_FEATURE_CONTENT:
      return {
        ...state,
        featureReel: {
          ...addContentsToFeatureReel(
            state.featureReel,
            null,
            totalRecords,
            page,
            size,
            customInput
          ),
        },
      };

    case GET_PRODUCT_SUBSCRIPTION_STATS_SUCCESS:
      return {
        ...state,
        productSubscriptionDetails: [
          ...state.productSubscriptionDetails,
          ...data,
        ],
      };

    case DELETE_REEL:
      return {
        ...state,
        reels: [...deleteReel(state.reels, data)],
      };

    case SELECT_REEL_ALL_CONTENTS:
      return {
        ...state,
        reels: [...selectAllContent(state.reels, data)],
      };

    case SELECT_FEATURE_REEL_ALL_CONTENTS_SUCCESS:
      return {
        ...state,
        featureReelAllSelectedContentIds: [
          ...addIdsToContentIdList(
            state.featureReelAllSelectedContentIds || [],
            data,
            customInput.isAllContentsSelected
          ),
        ],
        featureReel: {
          ...selectAllContentInFeatureReel(state.featureReel, data),
        },
      };

    case SELECT_ALL_FEATURE_REEL_CONTENT_BY_CONTENT_TYPE_SUCCESS:
      return {
        ...state,
        featureReelAllSelectedContentIds: [
          ...addIdsToContentIdList(
            state.featureReelAllSelectedContentIds || [],
            data,
            customInput.currentSelectedTutorTabContentData
          ),
        ],

        featureReel: {
          ...selectAllFeatureContentByContentType(
            state.featureReel,
            customInput
          ),
        },
      };

    case SELECT_ALL_CONTENT_BY_CONTENT_TYPE:
      return {
        ...state,
        reels: [...selectAllContentByContentType(state.reels, customInput)],
      };

    case SAVE_FEATURE_REEL:
      return {
        ...state,
        featureReel: { ...featureReelSaveAndEdit(state.featureReel, false) },
      };

    case SAVE_REEL:
      return {
        ...state,
        reels: [...reelSaveAndEdit(state.reels, data, true)],
      };

    case EDIT_REEL:
      return {
        ...state,
        reels: [...reelSaveAndEdit(state.reels, data, false)],
      };

    case REEL_MOVE_DOWN:
      return {
        ...state,
        reels: [...reelMoveDown(state.reels, data)],
      };

    case REEL_MOVE_UP:
      return {
        ...state,
        reels: [...reelMoveUp(state.reels, data)],
      };

    case EDIT_FEATURE_REEL:
      return {
        ...state,
        featureReel: { ...featureReelSaveAndEdit(state.featureReel, true) },
      };

    case ADD_NEW_FEATURE_REEL:
      return {
        ...state,
        featureReel: { ...addNewFeatureReel(state.featureReel, data) },
      };

    case GET_FEATURE_REEL_SELECTED_CONTENT_SUCCESS:
      return {
        ...state,
        featureReelContents: {
          ...changeContentListOrder(
            state.featureReelAllSelectedContentIds || [],
            payload
          ),
        },
      };

    case GET_FEATURE_REEL_SELECTED_CONTENT_TUTOR_SUCCESS:
      return {
        ...state,
        featureReelContents: {
          ...addTutorInformationIntoConstData(
            state.featureReelContents || {},
            data,
            customInput.contentId
          ),
        },
      };

    case CHANGE_CONTENT_ORDER:
      return {
        ...state,
        featureReelAllSelectedContentIds: [
          ...changeContentOrder(
            state.featureReelAllSelectedContentIds || [],
            customInput
          ),
        ],
      };

    case SET_SELECTED_COUNTRIES:
      return {
        ...state,
        countryCodeList: data || [],
      };

    case SET_BASIC_INFORMATION:
      return {
        ...state,
        basicInformation: data || {},
      };

    case UPDATE_DEFAULT_PRODUCT_ACCESS:
      return {
        ...state,
        accessControl: { ...state.accessControl, defaultAccess: data },
      };
    case UPDATE_ACCESS_CONTROL_USERS_LIST:
      return {
        ...state,
        accessControl: { ...state.accessControl, users: data },
      };

    case UPDATE_PRODUCT_USER_ACCESS_BULK:
      return {
        ...state,
        accessControl: updateUserAccess(state.accessControl, data),
      };
    case UPDATE_PRODUCT_USER_SPECIAL_PRICE_BULK:
      return {
        ...state,
        accessControl: updateUserSpecialPrice(state.accessControl, data),
      };
    case SET_BASIC_INFORMATION:
      return {
        ...state,
        basicInformation: data || {},
      };

    case GET_REEL_ALL_TUTORS_SUCCESS:
    case UPDATE_TUTOR_BULK:
      return {
        ...state,
        productTutorIdList: [
          ...addIdsToTutorList(state.productTutorIdList || [], payload.data),
        ],
      };

    case GET_USER_SUBSCRIPTIONS_SUCCESS:
      return {
        ...state,
        userSubscriptions: [...state.userSubscriptions, ...data],
      };

    case GET_USER_SUBSCRIPTION_DETAILS_SUCCESS:
      return {
        ...state,
        subscriptionDetails: [...state.subscriptionDetails, ...data],
      };

    case ADD_SELECTED_SUBSCRIPTION:
      return {
        ...state,
        productSubscription: [
          ...productSubscriptionUpdate(state.productSubscription || [], data),
        ],
      };

    case DELETE_SELECTED_SUBSCRIPTION:
      return {
        ...state,
        productSubscription: [
          ...productSubscriptionDelete(state.productSubscription || [], data),
        ],
      };

    case UPDATE_PRODUCT_SUBSCRIPTION_DEFAULT_PRICE_BULK:
      return {
        ...state,
        productSubscription: [
          ...updateSubscriptionDefaultPrice(
            state.productSubscription || [],
            data
          ),
        ],
      };

    case UPDATE_FORMATTED_PRODUCT_DATA:
      return {
        ...state,
        formattedProductData: action.payload,
      };

    case SAVE_PRODUCT_REQUEST:
      return {
        ...state,
        productSaveLoading: true,
        productSaveSuccess: false,
        productSaveError: false,
        productSaveErrorMessage: '',
      };
    case SAVE_PRODUCT_SUCCESS:
      return {
        ...state,
        productSaveLoading: false,
        productSaveSuccess: true,
      };
    case SAVE_PRODUCT_FAILED:
      return {
        ...state,
        productSaveLoading: false,
        productSaveSuccess: false,
        productSaveError: true,
        productSaveErrorMessage: action.payload,
      };
    default:
      return state;
  }
};

const productSubscriptionDelete = (
  productSubscription: productSubscriptionTypes[],
  data: string[]
) => {
  const updatedSubscriptionList = productSubscription.filter(
    ({ _id }) => !data?.includes(_id)
  );
  return updatedSubscriptionList;
};

const productSubscriptionUpdate = (
  productSubscription: productSubscriptionTypes[],
  data: productSubscriptionTypes[]
) => {
  const mappedSubscriptionList = data.map(item => ({
    ...item,
    defaultPrice: 0,
  }));

  const updatedSubscriptionList = [
    ...productSubscription,
    ...mappedSubscriptionList,
  ];

  return updatedSubscriptionList;
};

const addIdsToTutorList = (tutors: reelTutors[], data: reelTutors[]) => {
  let generatedList: reelTutors[] = [];
  const tutorIds = tutors.map(({ _id }) => _id);
  const modifiedTutorRequest = data.map(tutor => {
    tutor.isTutorSelected = true;
    return tutor;
  });

  if (tutors.length) {
    generatedList = modifiedTutorRequest;
  } else {
    modifiedTutorRequest.forEach(tutor => {
      !tutorIds?.includes(tutor._id) && generatedList.push(tutor);
    });
  }

  return generatedList;
};
const updateUserAccess = (
  currentData: accessControlType,
  updateList: singleUserAccess[]
): accessControlType => {
  let updateObj: { [key: string]: boolean } = {};

  updateList.forEach(userAccess => {
    updateObj[userAccess.uid] = userAccess.access;
  });

  const updatedUsers = currentData.users.map(u => {
    if (Object.keys(updateObj).includes(u._id)) {
      return {
        ...u,
        access: updateObj[u._id],
      };
    } else {
      return u;
    }
  });

  return {
    defaultAccess: currentData.defaultAccess,
    users: updatedUsers,
  };
};

const updateSubscriptionDefaultPrice = (
  currentData: productSubscriptionTypes[],
  data: { sid: string; defaultPrice: number }[]
) => {
  data.forEach(({ defaultPrice, sid }) => {
    const subscriptionIndex = currentData.findIndex(({ _id }) => _id === sid);

    currentData[subscriptionIndex].defaultPrice = defaultPrice || 0;
  });

  return currentData;
};

const updateUserSpecialPrice = (
  currentData: accessControlType,
  updateList: singleUserSpecialPrice[]
): accessControlType => {
  let updateObj: { [key: string]: string } = {};

  updateList.forEach(userPrice => {
    updateObj[userPrice.uid] = userPrice.specialPrice;
  });

  const updatedUsers = currentData.users.map(u => {
    if (Object.keys(updateObj).includes(u._id)) {
      return {
        ...u,
        specialPrice: updateObj[u._id],
      };
    } else {
      return u;
    }
  });

  return {
    defaultAccess: currentData.defaultAccess,
    users: updatedUsers,
  };
};
const changeContentListOrder = (
  featureReelAllSelectedContentIds: string[],
  {
    data,
    totalRecords,
    page,
    size,
  }: { data: any[]; totalRecords: number; page: number; size: number }
) => {
  const generatedContentList: singleContentType[] = [];

  featureReelAllSelectedContentIds.forEach(id => {
    const filteredContend = data.find(({ _id }) => _id === id);
    generatedContentList.push(filteredContend);
  });

  return { contents: generatedContentList, totalRecords, page, size };
};

const changeContentOrder = (
  featureReelAllSelectedContentIds: string[],
  { order, contentId }: { order: number; contentId: string }
) => {
  const currentIndex = featureReelAllSelectedContentIds.findIndex(
    id => id === contentId
  );

  featureReelAllSelectedContentIds = move(
    [...featureReelAllSelectedContentIds],
    currentIndex,
    Number(order - 1)
  );

  return featureReelAllSelectedContentIds;
};

const addTutorInformationIntoConstData = (
  featureReelContents: reelProduct,
  data: any[],
  contentId: string
) => {
  const { contents } = featureReelContents;

  const mappedContentData = contents?.map(content => {
    if (content._id === contentId) {
      content.tutor = data[0];
    }

    return content;
  });

  return { ...featureReelContents, contents: mappedContentData };
};

const addIdsToContentIdList = (
  state: string[],
  data: string[],
  isIdsAddToList: boolean
) => {
  let generatedList: string[] = [];
  if (isIdsAddToList) {
    generatedList = state?.length ? [...state, ...data] : data;
  } else {
    generatedList = state.filter(item => !data?.includes(item));
  }
  return Array.from(new Set(generatedList));
};

const move = (input: any[], from: number, to: number) => {
  let numberOfDeletedElm = 1;

  const elm = input.splice(from, numberOfDeletedElm)[0];

  numberOfDeletedElm = 0;

  input.splice(to, numberOfDeletedElm, elm);

  return input;
};

const reelMoveDown = (
  reels: productTypes['reels'],
  { reelOrder }: { reelIndex: string; reelOrder: number }
) => {
  reels = reels || [];
  reels = move([...reels], reelOrder, reelOrder + 1);

  return reels;
};

const reelMoveUp = (
  reels: productTypes['reels'],
  { reelOrder }: { reelIndex: string; reelOrder: number }
) => {
  reels = reels || [];
  reels = move([...reels], reelOrder, reelOrder - 1);

  return reels;
};

const resetTutorsToFeatureReel = (reels: productTypes['featureReel']) => {
  reels = reels || {};

  reels.tutors = null;
  reels.tutorsPage = 1;
  reels.tutorsSize = 0;
  return reels;
};

const resetTutorsToReel = (
  reels: productTypes['reels'],
  size: number,
  page: number,
  { reelIndex }: { reelIndex: string }
) => {
  reels = reels || [];
  const index = getArrayIndexUsingKey(reels, 'id', reelIndex);
  reels[index].tutors = null;
  reels[index].tutorsPage = 1;
  reels[index].tutorsSize = 0;
  return reels;
};

const featureReelSaveAndEdit = (
  reels: productTypes['featureReel'],
  status: boolean
) => {
  reels = reels || {};
  reels.isReelEdited = status;

  return reels;
};

const reelSaveAndEdit = (
  reels: productTypes['reels'],
  { reelIndex }: { reelIndex: string },
  status: boolean
) => {
  reels = reels || [];
  const index = getArrayIndexUsingKey(reels, 'id', reelIndex);
  reels[index].isReelSaved = status;
  reels[index].tutorsPage = 1;
  return reels;
};

const getCustomDateOutFromFeatureReel = (reel: productTypes['featureReel']) => {
  const {
    grade: mainGrade,
    subject: mainSubject,
    syllabus: mainSyllabus,
  } = reel || {};

  const selectedFeatureContentListGenerated = reel?.selectedFeatureContentList
    ? [...reel?.selectedFeatureContentList]
    : [];

  const selectedReel = selectedFeatureContentListGenerated?.find(
    ({ grade, syllabus, subject }) =>
      mainGrade?.value === grade?.value &&
      mainSubject?.value === subject?.value &&
      mainSyllabus?.value === syllabus?.value
  );

  const reelIndex =
    selectedFeatureContentListGenerated?.findIndex(
      ({ grade, syllabus, subject }) =>
        mainGrade?.value === grade?.value &&
        mainSubject?.value === subject?.value &&
        mainSyllabus?.value === syllabus?.value
    ) || 0;

  return {
    reelIndex,
    selectedReel,
    selectedFeatureContentListGenerated,
    mainGrade,
    mainSubject,
    mainSyllabus,
  };
};

const selectAllFeatureContentByContentType = (
  reel: productTypes['featureReel'],
  {
    contentTab,
    selectedTutorId,
  }: { reelIndex: string; contentTab: string; selectedTutorId: string }
) => {
  reel = reel || {};

  const {
    selectedReel,
    mainGrade,
    mainSubject,
    mainSyllabus,
    reelIndex,
    selectedFeatureContentListGenerated,
  } = getCustomDateOutFromFeatureReel(reel);

  let selectedContentIds: tutorAndSelectedFeatureContent;
  if (selectedReel) {
    selectedContentIds = selectedReel || {};
  } else {
    selectedContentIds = {
      id: uuidv4(),
      grade: mainGrade || <singleDataTypeWithValueAndLabel>{},
      subject: mainSubject || <singleDataTypeWithValueAndLabel>{},
      syllabus: mainSyllabus || <singleDataTypeWithValueAndLabel>{},
    };
  }

  selectedContentIds = {
    ...selectedContentIds,
    tutorsTotalRecords: reel.tutorsTotalRecords || 0,
  };

  let generatedContentArray = selectedContentIds?.constantReelIds || [];

  const filterTutorContents = generatedContentArray.find(
    ({ tutorId }) => tutorId === selectedTutorId
  );

  if (!filterTutorContents?.tutorId) {
    generatedContentArray = [
      ...generatedContentArray,
      {
        tutorId: selectedTutorId,
        contentIds: {
          [contentTab]: { isAllSelected: true, ids: [] },
        },
      },
    ];
  } else {
    const currentSelectAllStates =
      filterTutorContents.contentIds?.[contentTab]?.isAllSelected;

    const contentIdsOnType = {
      [contentTab]: {
        isAllSelected: !currentSelectAllStates,
        ids: [],
      },
    };

    filterTutorContents.contentIds = {
      ...filterTutorContents.contentIds,
      ...contentIdsOnType,
    };

    const contentIndex = generatedContentArray.findIndex(
      ({ tutorId }) => tutorId === selectedTutorId
    );
    generatedContentArray[contentIndex] = filterTutorContents;
  }

  selectedContentIds.constantReelIds = generatedContentArray;

  selectedFeatureContentListGenerated[reelIndex] = selectedContentIds;
  reel.selectedFeatureContentList = selectedFeatureContentListGenerated;

  return reel;
};

const selectAllContentByContentType = (
  reels: productTypes['reels'],
  {
    reelIndex,
    contentTab,
    selectedTutorId,
  }: { reelIndex: string; contentTab: string; selectedTutorId: string }
) => {
  reels = reels || [];
  const index = getArrayIndexUsingKey(reels, 'id', reelIndex);

  const isAllContentsSelected = reels[index].isAllContentsSelected;
  reels[index].isAllContentsSelected = false;
  const contents = reels[index].selectedContentIds || [];

  const filterTutorContents = contents.find(
    ({ tutorId }) => tutorId === selectedTutorId
  );

  let generatedContentArray = contents;

  if (!filterTutorContents?.tutorId) {
    generatedContentArray = [
      ...generatedContentArray,
      {
        tutorId: selectedTutorId,
        contentIds: {
          [contentTab]: { isAllSelected: !isAllContentsSelected, ids: [] },
        },
      },
    ];
  } else {
    const currentSelectAllStates =
      filterTutorContents.contentIds?.[contentTab]?.isAllSelected;

    const contentIdsOnType = {
      [contentTab]: {
        isAllSelected: !currentSelectAllStates,
        ids: [],
      },
    };

    filterTutorContents.contentIds = {
      ...filterTutorContents.contentIds,
      ...contentIdsOnType,
    };

    const contentIndex = contents.findIndex(
      ({ tutorId }) => tutorId === selectedTutorId
    );
    generatedContentArray[contentIndex] = filterTutorContents;
  }

  reels[index].selectedContentIds = [...generatedContentArray];

  return reels;
};

const selectAllContentInFeatureReel = (
  reel: productTypes['featureReel'],
  data: any
) => {
  const {
    selectedReel,
    selectedFeatureContentListGenerated,
    reelIndex,
    mainSyllabus,
    mainSubject,
    mainGrade,
  } = getCustomDateOutFromFeatureReel(reel);

  let selectedContentIds: tutorAndSelectedFeatureContent;
  if (selectedReel) {
    selectedContentIds = selectedReel || {};
  } else {
    selectedContentIds = {
      id: uuidv4(),
      grade: mainGrade || <singleDataTypeWithValueAndLabel>{},
      subject: mainSubject || <singleDataTypeWithValueAndLabel>{},
      syllabus: mainSyllabus || <singleDataTypeWithValueAndLabel>{},
    };
  }

  selectedContentIds = {
    ...selectedContentIds,
    tutorsTotalRecords: reel?.tutorsTotalRecords || 0,
  };

  const isAllContentsSelected =
    !selectedContentIds?.isAllContentsSelected || false;

  selectedContentIds.isAllContentsSelected = isAllContentsSelected;
  selectedContentIds.ignoredContentsIds = [];

  selectedFeatureContentListGenerated[reelIndex] = selectedContentIds;

  let tutorsList = reel?.tutors || [];

  tutorsList = tutorsList.map(tutor => {
    tutor.isTutorSelected = isAllContentsSelected;
    return tutor;
  });
  if (reel) {
    reel.tutors = [...tutorsList];
    reel.selectedFeatureContentList = selectedFeatureContentListGenerated;
  }
  return reel;
};

const selectedAllTutors = (
  tutorsList: reelTutors[],
  selectedTutorId: string | null,
  isAllContentsSelected: boolean
) => {
  tutorsList = tutorsList.map(tutor => {
    tutor.isTutorSelected = isAllContentsSelected;
    if (selectedTutorId === tutor._id) {
      tutor.isTutorSelected = true;
    }
    return tutor;
  });

  return tutorsList;
};

const selectAllContent = (
  reels: productTypes['reels'],
  {
    reelIndex,
    isAllContentsSelected,
  }: { reelIndex: string; isAllContentsSelected: boolean }
) => {
  reels = reels || [];
  const index = getArrayIndexUsingKey(reels, 'id', reelIndex);
  reels[index].isAllContentsSelected = isAllContentsSelected;

  if (!isAllContentsSelected) {
    reels[index].ignoredContentsIds = [];
  }

  if (reels[index].selectedContentIds?.length && isAllContentsSelected) {
    const selectedContentIds = reels[index].selectedContentIds;

    const mappedContent = selectedContentIds?.map(content => {
      if (content?.contentIds) {
        if (content?.contentIds[contentType.video]) {
          content.contentIds[contentType.video].isAllSelected =
            isAllContentsSelected;
        }

        if (content?.contentIds[contentType.document]) {
          content.contentIds[contentType.document].isAllSelected =
            isAllContentsSelected;
        }

        if (content?.contentIds[contentType.assignment]) {
          content.contentIds[contentType.assignment].isAllSelected =
            isAllContentsSelected;
        }
      }

      return content;
    });

    reels[index].selectedContentIds = mappedContent;
  }

  const tutorsList = reels[index].tutors || [];

  reels[index].tutors = [
    ...selectedAllTutors(tutorsList, null, isAllContentsSelected),
  ];

  reels[index].selectedContentIds = null;

  return reels;
};

const deleteReel = (
  reels: productTypes['reels'],
  { reelIndex }: { reelIndex: string }
) => {
  reels = reels || [];
  return reels?.filter(({ id }) => id !== reelIndex);
};

const addTutorsVideoCountToFeatureReel = (
  reels: productTypes['featureReel'],
  totalRecords: number | null,
  { reelIndex, _id }: { reelIndex: number; _id: string }
) => {
  reels = reels || {};

  const tutors = reels.tutors || [];

  const tutorIndex = getArrayIndexUsingKey(tutors, '_id', _id);

  tutors[tutorIndex].contentCount = totalRecords;
  reels.tutors = [...tutors];

  return reels;
};

const addTutorsVideoCountToReel = (
  reels: productTypes['reels'],
  totalRecords: number | null,
  { reelIndex, _id }: { reelIndex: number; _id: string }
) => {
  reels = reels || [];

  const index = getArrayIndexUsingKey(reels, 'id', reelIndex);
  const tutors = reels[index].tutors || [];

  const tutorIndex = getArrayIndexUsingKey(tutors, '_id', _id);

  tutors[tutorIndex].contentCount = totalRecords;
  reels[index].tutors = [...tutors];

  return reels;
};

const updatedSelectedContent = (content: reelProduct, id: string) => {
  const { contents, ...rest } = content;

  if (contents?.length) {
    const index = getArrayIndexUsingKey(contents, '_id', id);
    const { isContentSelected } = contents[index];
    contents[index].isContentSelected = !isContentSelected;
  }

  return { contents, ...rest };
};

const setSelectedContentInFeatureReel = (
  reels: productTypes['featureReel'],

  {
    id,
    contentType: selectedContentType,
    selectedTutorId,
  }: {
    id: string;
    reelIndex: string;
    contentType: string;
    selectedTutorId: string;
  }
) => {
  reels = reels || {};
  reels.selectedFeatureContentList = addOrRemoveSelectedFeatureReelContentIds(
    reels,
    id,
    selectedTutorId,
    selectedContentType
  );
  return reels;
};

const setSelectedContentInReel = (
  reels: productTypes['reels'],
  {
    id,
    reelIndex,
    contentType: selectedContentType,
    selectedTutorId,
  }: {
    id: string;
    reelIndex: string;
    contentType: string;
    selectedTutorId: string;
  }
) => {
  reels = reels || [];
  const index = getArrayIndexUsingKey(reels, 'id', reelIndex);
  const contents = reels[index].contents || {};

  const { assessments, documents, videos } = contents;

  let updatedVideoContent = videos;
  let updatedDocumentContent = documents;
  let updatedAssessmentContent = assessments;
  switch (selectedContentType) {
    case contentType.video:
      if (videos?.contents?.length) {
        updatedVideoContent = updatedSelectedContent(videos, id);
      }
      break;
    case contentType.document:
      if (documents?.contents?.length) {
        updatedDocumentContent = updatedSelectedContent(documents, id);
      }
      break;
    case contentType.assignment:
      if (assessments?.contents?.length) {
        updatedAssessmentContent = updatedSelectedContent(assessments, id);
      }
      break;

    default:
      break;
  }

  reels[index].contents = {
    videos: updatedVideoContent || null,
    documents: updatedDocumentContent || null,
    assessments: updatedAssessmentContent || null,
  };

  if (reels[index].isAllContentsSelected) {
    const unselectedContentsIds = reels[index].ignoredContentsIds || [];

    reels[index].ignoredContentsIds = addOrRemoveIdsInList(
      id,
      unselectedContentsIds
    );
  } else {
    reels[index].selectedContentIds = addOrRemoveSelectedContentIds(
      reels[index].selectedContentIds || [],
      id,
      selectedTutorId,
      selectedContentType
    );
  }

  return reels;
};

const addOrRemoveIdsInList = (id: string, list: string[]) => {
  const isIdExist = list?.find(productID => productID === id);

  return isIdExist
    ? list?.filter(productId => productId !== id)
    : [...list, id];
};

const addOrRemoveSelectedFeatureReelContentIds = (
  reel: productTypes['featureReel'],
  contentId: string,
  selectedTutorId: string,
  selectedContentType: string
) => {
  const {
    selectedReel,
    reelIndex,
    mainSyllabus,
    mainSubject,
    mainGrade,
    selectedFeatureContentListGenerated,
  } = getCustomDateOutFromFeatureReel(reel);

  const initialTutorObject = {
    tutorId: selectedTutorId,

    contentIds: {
      [selectedContentType]: {
        isAllSelected: false,
        ids: [],
      },
    },
  };

  let selectedContentIds: tutorAndSelectedFeatureContent;
  if (selectedReel) {
    const { isAllContentsSelected, ignoredContentsIds } = selectedReel;

    if (isAllContentsSelected) {
      selectedFeatureContentListGenerated[reelIndex].ignoredContentsIds =
        addOrRemoveIdsInList(contentId, ignoredContentsIds || []);

      return selectedFeatureContentListGenerated;
    }

    const selectedTutorData = selectedReel?.constantReelIds?.find(
      ({ tutorId }) => tutorId === selectedTutorId
    );

    selectedContentIds = selectedReel || {};

    if (!selectedTutorData) {
      selectedContentIds.constantReelIds = selectedContentIds.constantReelIds
        ? [...selectedContentIds.constantReelIds, { ...initialTutorObject }]
        : [{ ...initialTutorObject }];
    }
  } else {
    selectedContentIds = {
      id: uuidv4(),
      grade: mainGrade || <singleDataTypeWithValueAndLabel>{},
      subject: mainSubject || <singleDataTypeWithValueAndLabel>{},
      syllabus: mainSyllabus || <singleDataTypeWithValueAndLabel>{},
      constantReelIds: [{ ...initialTutorObject }],
    };
  }

  selectedContentIds = {
    ...selectedContentIds,
    tutorsTotalRecords: reel?.tutorsTotalRecords || 0,
  };

  const filterTutorContents = selectedContentIds?.constantReelIds?.find(
    ({ tutorId }) => tutorId === selectedTutorId
  );

  const filteredTutorContentsByContentType =
    filterTutorContents?.contentIds?.[selectedContentType]?.ids || [];

  const filteredTutorContentsByContentTypeSelectAll =
    filterTutorContents?.contentIds?.[selectedContentType]?.isAllSelected;

  if (filteredTutorContentsByContentTypeSelectAll) {
    console.log(filteredTutorContentsByContentTypeSelectAll);

    const unselectedContentsIds =
      filterTutorContents?.contentIds?.[selectedContentType]
        ?.contentTypeIgnoredContentsIds || [];

    if (filterTutorContents?.contentIds?.[selectedContentType]) {
      filterTutorContents.contentIds[
        selectedContentType
      ].contentTypeIgnoredContentsIds = addOrRemoveIdsInList(
        contentId,
        unselectedContentsIds || []
      );

      if (selectedFeatureContentListGenerated.length && reelIndex) {
        selectedFeatureContentListGenerated[reelIndex].constantReelIds = [
          { ...filterTutorContents },
        ];
      }

      return [...selectedFeatureContentListGenerated];
    }
  }

  const filterContentId = filteredTutorContentsByContentType.filter(
    id => id === contentId
  );

  if (filterContentId.length) {
    const filteredContentIdsWithoutSelectedId =
      filterTutorContents?.contentIds?.[selectedContentType]?.ids?.filter(
        id => id !== contentId
      );

    const contentIdsOnType = {
      ...filterTutorContents?.contentIds,
      [selectedContentType]: {
        isAllSelected: false,
        ids: filteredContentIdsWithoutSelectedId || [],
      },
    };
    if (filterTutorContents) {
      filterTutorContents.contentIds = {
        ...contentIdsOnType,
      };
    }
  } else {
    if (filterTutorContents) {
      filterTutorContents.contentIds = {
        ...filterTutorContents?.contentIds,
        ...{
          [selectedContentType]: {
            isAllSelected: false,
            ids: filterTutorContents?.contentIds?.[selectedContentType]?.ids
              .length
              ? [
                  ...filterTutorContents?.contentIds?.[selectedContentType]
                    ?.ids,
                  contentId,
                ]
              : [contentId],
          },
        },
      };
    }
  }

  const contentIndex =
    selectedContentIds?.constantReelIds?.findIndex(
      ({ tutorId }) => tutorId === selectedTutorId
    ) || 0;

  selectedContentIds.constantReelIds = selectedContentIds.constantReelIds || [];

  if (filterTutorContents) {
    selectedContentIds.constantReelIds[contentIndex] = {
      ...filterTutorContents,
    };
  }
  if (selectedContentIds.isAllContentsSelected) {
    selectedContentIds.isAllContentsSelected = false;
  }

  if (selectedReel) {
    selectedFeatureContentListGenerated[reelIndex] = selectedContentIds;
  } else {
    selectedFeatureContentListGenerated.push(selectedContentIds);
  }

  return selectedFeatureContentListGenerated;
};

const addOrRemoveSelectedContentIds = (
  selectedContentIds: tutorAndSelectedContent[],
  contentId: string,
  selectedTutorId: string,
  selectedContentType: string
) => {
  const filterTutorContents = selectedContentIds.find(
    ({ tutorId }) => tutorId === selectedTutorId
  );

  const contentIndex = selectedContentIds.findIndex(
    ({ tutorId }) => tutorId === selectedTutorId
  );

  let generatedContentArray = selectedContentIds;
  const isAllSelected =
    filterTutorContents?.contentIds?.[selectedContentType]?.isAllSelected;

  if (isAllSelected) {
    const unselectedContentsIds =
      filterTutorContents?.contentIds?.[selectedContentType]
        ?.contentTypeIgnoredContentsIds || [];

    if (filterTutorContents?.contentIds?.[selectedContentType]) {
      filterTutorContents.contentIds[
        selectedContentType
      ].contentTypeIgnoredContentsIds = addOrRemoveIdsInList(
        contentId,
        unselectedContentsIds || []
      );

      generatedContentArray[contentIndex] = filterTutorContents;
      return [...generatedContentArray];
    }
  }

  if (!filterTutorContents?.tutorId) {
    generatedContentArray = [
      ...generatedContentArray,
      {
        tutorId: selectedTutorId,
        contentIds: {
          [selectedContentType]: { isAllSelected: false, ids: [contentId] },
        },
      },
    ];
  } else {
    const filteredTutorContentsByContentType =
      filterTutorContents.contentIds?.[selectedContentType]?.ids || [];

    const filterContentId = filteredTutorContentsByContentType.filter(
      id => id === contentId
    );

    if (filterContentId.length) {
      const filteredContentIdsWithoutSelectedId =
        filterTutorContents.contentIds?.[selectedContentType].ids.filter(
          id => id !== contentId
        );

      const contentIdsOnType = {
        ...filterTutorContents.contentIds,
        [selectedContentType]: {
          isAllSelected: false,
          ids: filteredContentIdsWithoutSelectedId,
        },
      };
      if (filterTutorContents) {
        filterTutorContents.contentIds = {
          ...contentIdsOnType,
        };
      }
    } else {
      if (!filterTutorContents.contentIds?.[selectedContentType]?.ids) {
        filterTutorContents.contentIds = {
          ...filterTutorContents.contentIds,
          ...{ [selectedContentType]: { isAllSelected: false, ids: [] } },
        };
      }

      filterTutorContents.contentIds?.[selectedContentType].ids.push(contentId);
    }

    generatedContentArray[contentIndex] = filterTutorContents;
  }
  return [...generatedContentArray];
};

const selectTutorInFeatureReel = (
  reel: productTypes['featureReel'],
  data: { id: string },
  { reelIndex }: { reelIndex: number }
) => {
  reel = reel || {};

  const { selectedReel } = getCustomDateOutFromFeatureReel(reel);

  const tutors = reel.tutors || [];
  const { id } = data;

  const isAllContentsSelected = selectedReel?.isAllContentsSelected;

  const resetTutorSelect = tutors.map(tutor => {
    if (!isAllContentsSelected) {
      tutor.isTutorSelected = false;
    }
    return tutor;
  });

  const tutorIndex = getArrayIndexUsingKey(tutors, '_id', id);
  resetTutorSelect[tutorIndex].isTutorSelected = true;
  reel.tutors = [...resetTutorSelect];
  reel.selectedTutorId = id;

  return reel;
};

const selectTutorInReel = (
  reels: productTypes['reels'],
  data: { id: string },
  { reelIndex }: { reelIndex: number }
) => {
  reels = reels || [];
  const index = getArrayIndexUsingKey(reels, 'id', reelIndex);
  const tutors = reels[index].tutors || [];
  const { id } = data;

  const isAllContentsSelected = reels[index].isAllContentsSelected;

  const resetTutorSelect = tutors.map(tutor => {
    if (!isAllContentsSelected) {
      tutor.isTutorSelected = false;
    }
    return tutor;
  });

  const tutorIndex = getArrayIndexUsingKey(tutors, '_id', id);
  resetTutorSelect[tutorIndex].isTutorSelected = true;
  reels[index].tutors = [...resetTutorSelect];
  reels[index].selectedTutorId = id;

  return reels;
};

const resetContentsInFeatureReel = (
  reels: productTypes['featureReel'],
  totalRecords: number | undefined,
  page: number | undefined,
  size: number | undefined,
  { reelIndex, contentType }: { reelIndex: any; contentType: string }
) => {
  reels = reels || {};

  let contents = {
    contents: null,
    totalRecords: totalRecords || 0,
    page: page || 0,
    size: size || 0,
  };
  const contentTypes = {
    ...reels.contents,
    [contentType]: contents,
  };
  reels.contents = { ...contentTypes };

  return reels;
};
const resetContentsInReel = (
  reels: productTypes['reels'],
  totalRecords: number | undefined,
  page: number | undefined,
  size: number | undefined,
  { reelIndex, contentType }: { reelIndex: any; contentType: string }
) => {
  reels = reels || [];

  const index = getArrayIndexUsingKey(reels, 'id', reelIndex);

  let contents = {
    contents: null,
    totalRecords: totalRecords || 0,
    page: page || 0,
    size: size || 0,
  };

  const contentTypes = {
    ...reels[index].contents,
    [contentType]: contents,
  };
  reels[index].contents = { ...contentTypes };

  return reels;
};

const addContentsToFeatureReel = (
  reels: productTypes['featureReel'],
  data: any[] | null,
  totalRecords: number | undefined,
  page: number | undefined,
  size: number | undefined,
  { reelIndex, contentType }: { reelIndex: any; contentType: string }
) => {
  reels = reels || {};
  data = data || [];

  let contents = {
    contents: data,
    totalRecords: totalRecords || 0,
    page: page || 0,
    size: size || 0,
  };

  const contentTypes = {
    ...reels.contents,
    [contentType]: contents,
  };
  reels.contents = { ...contentTypes };

  return reels;
};

const addContentsToReel = (
  reels: productTypes['reels'],
  data: any[] | null,
  totalRecords: number | undefined,
  page: number | undefined,
  size: number | undefined,
  { reelIndex, contentType }: { reelIndex: any; contentType: string }
) => {
  reels = reels || [];
  data = data || [];
  const index = getArrayIndexUsingKey(reels, 'id', reelIndex);

  let contents = {
    contents: data,
    totalRecords: totalRecords || 0,
    page: page || 0,
    size: size || 0,
  };

  const contentTypes = {
    ...reels[index].contents,
    [contentType]: contents,
  };
  reels[index].contents = { ...contentTypes };

  return reels;
};

const addTutorsToFeatureReel = (
  reels: productTypes['featureReel'],
  data: any[],
  totalRecords: number | undefined,
  page: number | undefined,
  size: number | undefined,
  initialRequest: boolean
) => {
  reels = reels || {};

  const existingTutors = reels.tutors;
  let tutorList: reelTutors[] = existingTutors?.length
    ? [...existingTutors, ...data]
    : [...data];
  if (initialRequest) {
    tutorList[0].isTutorSelected = true;
    reels.selectedTutorId = tutorList[0]._id;
  }

  reels.tutors = tutorList;
  reels.tutorsTotalRecords = totalRecords || 0;
  reels.tutorsPage = page || 0;
  reels.tutorsSize = size || 0;

  return reels;
};

const addTutorsToReel = (
  reels: productTypes['reels'],
  data: any[],
  totalRecords: number | undefined,
  page: number | undefined,
  size: number | undefined,
  { reelIndex }: { reelIndex: any },
  initialRequest: boolean
) => {
  reels = reels || [];

  const index = getArrayIndexUsingKey(reels, 'id', reelIndex);

  const existingTutors = reels[index].tutors;
  let tutorList: reelTutors[] = existingTutors?.length
    ? [...existingTutors, ...data]
    : [...data];
  if (initialRequest) {
    tutorList[0].isTutorSelected = true;
    reels[index].selectedTutorId = tutorList[0]._id;
  } else {
    const isAllContentsSelected = reels[index].isAllContentsSelected;

    tutorList = tutorList.map(tutor => {
      tutor.isTutorSelected = isAllContentsSelected || true;
      return tutor;
    });
  }

  reels[index].tutors = tutorList;
  reels[index].tutorsTotalRecords = totalRecords || 0;
  reels[index].tutorsPage = page || 0;
  reels[index].tutorsSize = size || 0;

  return reels;
};

const addNewReel = (
  reels: productTypes['reels'],
  data: {
    syllabus: { value: string; label: string };
    grade: { value: string; label: string };
    subject: { value: string; label: string };
  }
) => {
  reels = reels || [];
  reels = reels.concat([{ ...data, id: uuidv4() }]);

  return reels;
};

const filterExitingDataInFeatureSelectedReel = (
  selectedFeatureContentList: tutorAndSelectedFeatureContent[],
  data: {
    syllabus: { value: string; label: string };
    grade: { value: string; label: string };
    subject: { value: string; label: string };
  }
) => {
  return selectedFeatureContentList.filter(({ grade, subject, syllabus }) => {
    if (
      grade?.value === data.grade.value &&
      subject?.value === data.subject.value &&
      syllabus?.value === data.syllabus.value
    )
      return true;
  });
};

const addNewFeatureReel = (
  reels: productTypes['featureReel'],
  data: {
    syllabus: { value: string; label: string };
    grade: { value: string; label: string };
    subject: { value: string; label: string };
  }
) => {
  reels = reels || {};
  const filteredSelectedData = filterExitingDataInFeatureSelectedReel(
    reels.selectedFeatureContentList || [],
    data
  );

  reels = { ...reels, ...data };

  if (!filteredSelectedData.length) {
    const initialReel = reels.selectedFeatureContentList || [];

    reels.selectedFeatureContentList = [
      ...initialReel,
      { ...data, id: uuidv4() },
    ];
  }

  return reels;
};

export default productReducer;
