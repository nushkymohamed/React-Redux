import { Interface } from 'readline';
import {
  gradeConstant,
  productConstant,
  subjectsConstant,
  subscriptionConstant,
  syllabusesConstant,
} from '../../config/constants';
import { avoidedDuplicationData, getArrayIndexUsingKey } from '../../Helper';
import {
  GET_ALL_SYLLABUSES_REQUEST,
  RESET_PRODUCTS,
  RESET_TRIAL,
  SELECT_TOGGLE_SUBJECT,
  SELECT_TOGGLE_SUBJECT_FILTER,
  SUBSCRIPTION_FAILED,
  SUBSCRIPTION_REQUEST,
  SUBSCRIPTION_SUCCESS,
  TRIAL_CURRENCY_FAILED,
  TRIAL_CURRENCY_REQUEST,
  TRIAL_CURRENCY_SUCCESS,
  TRIAL_GRADES_FAILED,
  TRIAL_GRADES_REQUEST,
  TRIAL_GRADES_RESET,
  TRIAL_GRADES_SUCCESS,
  TRIAL_GRADE_BY_ID_FAILED,
  TRIAL_GRADE_BY_ID_REQUEST,
  TRIAL_GRADE_BY_ID_SUCCESS,
  TRIAL_GRADE_FAILED,
  TRIAL_GRADE_REQUEST,
  TRIAL_GRADE_SUCCESS,
  TRIAL_PRODUCTS_FAILED,
  TRIAL_PRODUCTS_REQUEST,
  TRIAL_PRODUCTS_SUCCESS,
  TRIAL_PRODUCT_CONTENT_FAILED,
  TRIAL_PRODUCT_CONTENT_REQUEST,
  TRIAL_PRODUCT_CONTENT_SUCCESS,
  TRIAL_PRODUCT_IDS_FAILED,
  TRIAL_PRODUCT_IDS_REQUEST,
  TRIAL_PRODUCT_IDS_SUCCESS,
  TRIAL_SELECT_PRODUCT,
  TRIAL_SELECT_SUBSCRIPTION,
  TRIAL_SUBJECT_FAILED,
  TRIAL_SUBJECT_REQUEST,
  TRIAL_SUBJECT_RESET,
  TRIAL_SUBJECT_SUCCESS,
  TRIAL_SUBMIT_FAILED,
  TRIAL_SUBMIT_REQUEST,
  TRIAL_SUBMIT_SUCCESS,
  TRIAL_SYLLABUSES_FAILED,
  TRIAL_SYLLABUSES_SUCCESS,
  TRIAL_SYLLABUS_FAILED,
  TRIAL_SYLLABUS_REQUEST,
  TRIAL_SYLLABUS_SUCCESS,
  TRIAL_USER_FAILED,
  TRIAL_USER_REQUEST,
  TRIAL_USER_SUCCESS,
} from './TrialType';

export interface TrialSubjectDataType {
  _id: string;
  name: string;
  isSelect?: boolean;
}

export interface GradeDataType {
  _id: string;
  name: string;
}

export interface UserDetailsType {
  currentGradeId: string;
}
export interface AllowedProductsType {
  productId: string;
  defaultPrice: any;
}

export interface SubscriptionType {
  _id: string;
  subscriptionName: string;
  subscriptionDescription: string;
  subscriptionFeatures?: any[] | null;
  allowedProducts?: AllowedProductsType[] | null;
  subscriptionType: string;
  duration: string | number;
  availablePaymentCycle?: string;
}

export interface UserDetailsType {
  _id: string;
  countryCode: string;
  currentGradeId: string;
  currentSchoolId: string;
  currentSyllabusId: string;
}
export interface gradeDetailsTypes {
  _id: string;
  name: string;
  syllabusId: string;
  subjects?: TrialSubjectDataType[];
}

export interface syllabusDetailsTypes {
  _id: string;
  countryCode: string;
  name: string;
  grades?: gradeDetailsTypes[];
}
export interface ProductTypes {
  _id: string;
  name: string;
  description: string;
  defaultPrice: string;
  currencyId: string;
  currency?: string;
  availableCountryCodes: string[] | null;
  contentAccess: null;
  trialPeriod: null;
  reels: null;
  tutors: null;
  accessControl: null;
  previewImage?: {
    bucketName: string;
    fileKey: string;
  };
  subscriptionPrices?: string | number;
  reelTitles?: string[];
  numberOfVideos?: number;
  numberOfDocuments?: number;
  numberOfAssessments?: number;
}

export interface ProductContentType {
  productId: string;
  reelTitles?: string[];
  numberOfVideos?: number;
  numberOfDocuments?: number;
  numberOfAssessments?: number;
}

interface productIDsType {
  price: { currencyId: string; value: number };
  productId: string;
}

export interface TrialDataType {
  subjects: TrialSubjectDataType[];
  isLoadingSubjects: boolean;
  grade?: GradeDataType | {};
  isLoadingGrade: boolean;
  userDetails?: UserDetailsType | {};
  isLoadingUserDetails: boolean;
  totalRecords: number;
  page: number;
  size: number;
  error: any;
  success: boolean | null;
  subscriptions: SubscriptionType[] | null;
  isLoadingSubscriptions: boolean;
  selectedSubscription: SubscriptionType | null;
  subscriptionSize: number;
  subscriptionPage: number;
  subscriptionTotalRecords: number;
  subscriptionError: any;

  syllabuses: syllabusDetailsTypes[];
  isLoadingSyllabuses: boolean;

  syllabusTotalRecords: number;
  syllabusPage: number;
  syllabusSize: number;
  grades?: gradeDetailsTypes[];
  isLoadingGrades: boolean;
  gradeTotalRecords: number;
  gradePage: number;
  gradeSize: number;
  productIds: productIDsType[] | null;
  isLoadingProductIds: boolean;
  products?: ProductTypes[];
  isLoadingProducts: boolean;
  productTotalRecords: number;
  productPage: number;
  productSize: number;
  trialSubmitSuccesses: boolean;
  isInitLoading: boolean;
  selectedProducts: ProductTypes[];
}

const { subjectsTotalRecords, subjectsPage, subjectsPerPage } =
  subjectsConstant;
const { productPage, productSize, productTotalRecords } = productConstant;
const { syllabusTotalRecords, syllabusPage, syllabusPerPage } =
  syllabusesConstant;

const { gradePerPage, gradeTotalRecords, gradePage } = gradeConstant;

const INITIAL_STATE: TrialDataType = {
  subjects: [],
  grade: {},
  userDetails: {},
  totalRecords: subjectsTotalRecords,
  page: subjectsPage,
  size: subjectsPerPage,
  error: '',
  success: null,
  subscriptions: [],
  selectedSubscription: null,
  subscriptionSize: subscriptionConstant.subscriptionSize,
  subscriptionPage: subscriptionConstant.subscriptionPage,
  subscriptionTotalRecords: subscriptionConstant.subscriptionTotalRecords,
  subscriptionError: '',

  syllabuses: [],
  syllabusTotalRecords: syllabusTotalRecords,
  syllabusPage: syllabusPage,
  syllabusSize: syllabusPerPage,
  grades: [],
  gradeTotalRecords: gradeTotalRecords,
  gradePage: gradePage,
  gradeSize: gradePerPage,
  productIds: [],
  products: [],
  productPage: productPage,
  productSize: productSize,
  productTotalRecords: productTotalRecords,
  trialSubmitSuccesses: false,
  isLoadingSubjects: false,
  isLoadingGrade: false,
  isLoadingUserDetails: false,
  isLoadingSubscriptions: false,
  isLoadingSyllabuses: false,
  isLoadingGrades: false,
  isLoadingProductIds: false,
  isLoadingProducts: false,
  isInitLoading: true,
  selectedProducts: [],
};

type Action = { type: string; payload: any };

const TrialReducer = (state: TrialDataType = INITIAL_STATE, action: Action) => {
  const payload = action?.payload?.dataWrapper;

  const { data, totalRecords, page, size } = payload || {};

  const customInput = action?.payload?.customInput;

  switch (action.type) {
    case TRIAL_SUBMIT_FAILED:
    case TRIAL_SUBMIT_REQUEST:
      return {
        ...state,
        trialSubmitSuccesses: false,
      };

    case TRIAL_SUBMIT_SUCCESS:
      return {
        ...state,
        trialSubmitSuccesses: true,
      };

    case RESET_TRIAL:
      return {
        ...INITIAL_STATE,
      };

    case TRIAL_SUBJECT_RESET:
      return {
        ...state,
        subjects: [],
      };
    case TRIAL_SUBJECT_REQUEST:
      return {
        ...state,
        isLoadingSubjects: true,
        error: '',
        success: false,
      };
    case TRIAL_SUBJECT_SUCCESS:
      return {
        ...state,
        subjects: [...data],
        isLoadingSubjects: false,
        isInitLoading: false,
        error: '',
        success: true,
      };
    case TRIAL_SUBJECT_FAILED:
      return {
        ...state,
        isLoadingSubjects: false,
        isInitLoading: false,
        error: action.payload,
        success: false,
      };
    case SELECT_TOGGLE_SUBJECT:
      return {
        ...state,
        subjects: [...selectSubjectToggle(state?.subjects || [], customInput)],
        products: [],
        selectedProducts: [],
        productTotalRecords,
        productPage,
        productSize,
        selectedSubscription: null,
        productIds: [],
      };
    case SELECT_TOGGLE_SUBJECT_FILTER:
      return {
        ...state,
        subjects: [...selectSubjectToggle(state?.subjects || [], customInput)],
      };

    case TRIAL_GRADE_REQUEST:
      return {
        ...state,
        isLoadingGrade: true,
        error: '',
        success: false,
      };

    case TRIAL_GRADE_SUCCESS:
      return {
        ...state,
        grade: { ...(data[0] || {}) },
        isLoadingGrade: false,
        error: '',
        success: true,
      };
    case TRIAL_GRADE_FAILED:
      return {
        ...state,
        isLoadingGrade: false,
        error: action.payload,
        success: false,
      };

    case TRIAL_USER_REQUEST:
      return {
        ...state,
        isLoadingUserDetails: true,
        error: '',
        success: false,
      };

    case TRIAL_USER_SUCCESS:
      return {
        ...state,
        userDetails: { ...(data?.[0] || {}) },
        isLoadingUserDetails: false,
        error: '',
        success: true,
      };
    case TRIAL_USER_FAILED:
      return {
        ...state,
        isLoadingUserDetails: false,
        error: action.payload,
        success: false,
      };

    case SUBSCRIPTION_REQUEST:
      return {
        ...state,
        isLoadingSubscriptions: true,
        subscriptionError: '',
      };
    case SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        subscriptionTotalRecords:
          totalRecords || customInput?.page === 1
            ? totalRecords
            : state.subscriptionTotalRecords,
        subscriptions: state?.subscriptions
          ? avoidedDuplicationData(state?.subscriptions, data || null, '_id')
          : data || [],
        subscriptionSize: size || state.subscriptionSize,
        subscriptionPage: page || state.subscriptionPage,
        isLoadingSubscriptions: false,
      };
    case SUBSCRIPTION_FAILED:
      return {
        ...state,
        isLoadingSubscriptions: false,
        subscriptionError: action.payload,
      };
    case TRIAL_SELECT_SUBSCRIPTION:
      return {
        ...state,
        products: [],
        selectedProducts: [],
        productTotalRecords,
        productPage,
        productSize,
        productIds: [],
        selectedSubscription:
          state.selectedSubscription?._id === customInput?.subscription?._id
            ? null
            : (customInput?.subscription as SubscriptionType),
      };

    case GET_ALL_SYLLABUSES_REQUEST:
      return {
        ...state,
        isLoadingSyllabuses: true,
      };
    case TRIAL_SYLLABUSES_SUCCESS:
      return {
        ...state,
        syllabuses: [...data],
        syllabusTotalRecords: totalRecords,
        syllabusPage: page,
        syllabusSize: size,
        isLoadingSyllabuses: false,
      };
    case TRIAL_SYLLABUSES_FAILED:
      return {
        ...state,
        isLoadingSyllabuses: false,
      };

    case TRIAL_GRADES_REQUEST:
      return {
        ...state,
        isLoadingGrades: true,
      };
    case TRIAL_GRADES_RESET:
      return {
        ...state,
        grades: [],
      };
    case TRIAL_GRADES_SUCCESS:
      return {
        ...state,
        grades: [...data],
        gradeTotalRecords: totalRecords || state?.gradeTotalRecords,
        gradePage: page || state?.gradePage,
        gradeSize: size || state?.gradeSize,
        isLoadingGrades: false,
      };
    case TRIAL_GRADES_FAILED:
      return {
        ...state,
        isLoadingGrades: false,
      };
    case TRIAL_PRODUCTS_REQUEST:
      return {
        ...state,
        isLoadingProducts: true,
      };
    case TRIAL_PRODUCTS_SUCCESS: {
      const isFirstPage = customInput.page === 1;
      return {
        ...state,
        products: [
          ...updateProduct(isFirstPage ? [] : state.products || [], data || []),
        ],
        productTotalRecords:
          totalRecords || (isFirstPage ? 0 : state.productTotalRecords),
        productPage: page || (isFirstPage ? 1 : state.productPage),
        productSize: size || state.productSize,
        isLoadingProducts: false,
      };
    }
    case TRIAL_PRODUCTS_FAILED:
      return {
        ...state,
        isLoadingProducts: false,
      };
    case TRIAL_SELECT_PRODUCT:
      return {
        ...state,
        selectedProducts: selectAndRemoveProduct(
          state.selectedProducts,
          data,
          state.products || []
        ),
      };

    case TRIAL_PRODUCT_IDS_REQUEST:
      return {
        ...state,
        isLoadingProductIds: true,
      };
    case TRIAL_PRODUCT_IDS_SUCCESS:
      return {
        ...state,
        isLoadingProductIds: false,
        productIds: [...data],
      };
    case TRIAL_PRODUCT_IDS_FAILED:
      return {
        ...state,
        isLoadingProductIds: false,
      };

    case TRIAL_PRODUCT_CONTENT_REQUEST:
      return {
        ...state,
        isLoadingProducts: false,
      };
    case TRIAL_PRODUCT_CONTENT_SUCCESS:
      return {
        ...state,
        isLoadingProducts: false,
        products: addContentToProduct(state?.products || [], data),
      };
    case TRIAL_PRODUCT_CONTENT_FAILED:
      return {
        ...state,
        isLoadingProducts: false,
      };

    case TRIAL_SYLLABUS_REQUEST:
      return {
        ...state,
        isLoadingSyllabuses: true,
      };
    case TRIAL_SYLLABUS_SUCCESS:
      return {
        ...state,
        isLoadingSyllabuses: false,
        syllabuses: [...data, ...state?.syllabuses],
      };
    case TRIAL_SYLLABUS_FAILED:
      return {
        ...state,
        isLoadingSyllabuses: false,
      };

    case TRIAL_GRADE_BY_ID_REQUEST:
      return {
        ...state,
        isLoadingGrades: true,
      };
    case TRIAL_GRADE_BY_ID_SUCCESS:
      return {
        ...state,
        isLoadingGrades: false,
        grades: [...(state?.grades || []), ...data],
      };

    case TRIAL_GRADE_BY_ID_FAILED:
      return {
        ...state,
        isLoadingGrades: false,
      };

    case TRIAL_CURRENCY_REQUEST:
      return {
        ...state,
      };
    case TRIAL_CURRENCY_SUCCESS:
      return {
        ...state,
        products: [...addCurrency(state?.products || [], data)],
      };
    case TRIAL_CURRENCY_FAILED:
      return {
        ...state,
      };
    case RESET_PRODUCTS:
      return {
        ...state,
        products: [],
        productTotalRecords,
        productPage,
        productSize,
      };

    default:
      return state;
  }
};

const updateProduct = (products: ProductTypes[], data: ProductTypes[]) => {
  return [...(products || []), ...(data || [])];
};

const addCurrency = (
  products: ProductTypes[],
  currencyData: {
    _id: string;
    currency: string;
  }[]
) => {
  products.map(product => {
    const { currency } =
      currencyData.find(({ _id }) => _id === product.currencyId) || {};
    product.currency = currency || '-';
    return product;
  });

  return [...(products || [])];
};

const addContentToProduct = (
  products: ProductTypes[],
  data: ProductContentType[]
) => {
  const updatedNewProduct = products?.filter(pro => !pro?.numberOfVideos);
  const updatedOldProduct = products?.filter(pro => pro?.numberOfVideos);

  const addedData = updatedNewProduct?.map(product => {
    const productObj = data.find(content => content.productId === product?._id);
    return {
      ...product,
      reelTitles: productObj?.reelTitles,
      numberOfVideos: productObj?.numberOfVideos,
      numberOfDocuments: productObj?.numberOfDocuments,
      numberOfAssessments: productObj?.numberOfAssessments,
    };
  });

  return [...updatedOldProduct, ...addedData];
};

const selectAndRemoveProduct = (
  currentData: ProductTypes[],
  { id }: { id: string },
  productData: ProductTypes[]
) => {
  const selectedProductIndex = getArrayIndexUsingKey(
    currentData || [],
    '_id',
    id
  );
  const productDataIndex = getArrayIndexUsingKey(productData || [], '_id', id);
  if (currentData?.[selectedProductIndex]) {
    currentData.splice(selectedProductIndex, 1);
  } else {
    currentData?.push(productData?.[productDataIndex]);
  }
  return currentData || [];
};

const selectSubjectToggle = (subjects: TrialSubjectDataType[], id: string) => {
  const index = getArrayIndexUsingKey(subjects, '_id', id);

  subjects[index].isSelect = !subjects[index].isSelect;

  return [...subjects];
};
export default TrialReducer;
