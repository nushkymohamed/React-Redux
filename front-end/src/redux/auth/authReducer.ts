import { s3FileObjectType } from '../common/commonReducer';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  UPDATE_ACCESS_TOKEN,
  LOGOUT_SUCCESS,
  SET_CURRENT_USER,
  LOGIN_INITIALIZE,
  USER_TYPE_REQUEST,
  USER_TYPE_SUCCESS,
  USER_TYPE_FAILED,
  AUTH_SUBSCRIPTION_FAILED,
  AUTH_SUBSCRIPTION_REQUEST,
  AUTH_SUBSCRIPTION_SUCCESS,
  USER_BY_TYPE_SUCCESS,
  STUDENT_GRADE_SUCCESS,
  USER_LOGIN_FINALIZED,
  STUDENT_WELCOME_VIDEO_SUCCESS,
} from './authTypes';

export interface InitialUserDataTypes {
  _id: string;
  accountStatus?: string;
  countryCode: string;
  email: string;
  firstName: string;
  joinDate: string;
  lastName: string;
  phone: string;
  type: string;
  profileImage?: s3FileObjectType;
  backgroundImage?: s3FileObjectType;
}

export interface UserDataTypes extends InitialUserDataTypes {
  dob: string;
  currentGradeId?: string;
  currentSchoolId?: string;
  currentSyllabusId?: string;
  currentGradeName?: string | null;
  lastLoggedInDate?: string | null;
}

export interface userSubscriptionsType {
  _id: string;
  userId: string;
}

export interface userTypes {
  username: string;
  email: string;
  roles: string[];
}

export interface AuthTypes {
  tokens: object;
  loading: boolean;
  error: boolean;
  errorMessage: any;
  errorCode: any;
  user: userTypes | null;
  userData: UserDataTypes | null;
  subscription: userSubscriptionsType[] | null;
  isUserDataUpdateUsingType: boolean;
  isUserLoginFinalized: boolean;
  isUserLoginFirstTime: boolean;
  userWelcomeVideo: {
    _id: string;
    type: string;
    title: string;
    description: string;
    previewImageKey: s3FileObjectType;
    commonVideo: s3FileObjectType;
  } | null;
}

const INITIAL_STATE: AuthTypes = {
  tokens: {},
  loading: false,
  error: false,
  errorMessage: null,
  errorCode: null,
  user: null,
  userData: null,
  subscription: null,
  isUserDataUpdateUsingType: false,
  isUserLoginFinalized: false,
  isUserLoginFirstTime: true,
  userWelcomeVideo: null,
};

type Action = { type: string; payload: any };

const auth = (state: AuthTypes = INITIAL_STATE, action: Action): AuthTypes => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: null,
        errorCode: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        tokens: action.payload,
        loading: false,
        error: false,
        errorMessage: null,
        errorCode: null,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.payload.message,
        errorCode: action.payload.code,
      };
    case UPDATE_ACCESS_TOKEN:
      return {
        ...state,
        tokens: {
          ...state.tokens,
          accessToken: action.payload,
        },
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        ...INITIAL_STATE,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload,
      };
    case LOGIN_INITIALIZE:
      return {
        ...state,
        loading: false,
        error: false,
        errorMessage: null,
        errorCode: null,
      };

    case USER_TYPE_REQUEST:
      return {
        ...state,
        userData: null,
        isUserDataUpdateUsingType: false,
      };

    case USER_TYPE_SUCCESS:
      return {
        ...state,
        userData: action?.payload?.dataWrapper,
      };

    case USER_BY_TYPE_SUCCESS:
      return {
        ...state,
        userData: action?.payload?.dataWrapper?.data[0],
        isUserDataUpdateUsingType: true,
        isUserLoginFirstTime: handleUserFirstTimeLogin(
          action?.payload?.dataWrapper?.data[0]
        ),
      };

    case STUDENT_WELCOME_VIDEO_SUCCESS:
      return {
        ...state,
        userWelcomeVideo: action?.payload?.dataWrapper?.data[0],
      };

    case STUDENT_GRADE_SUCCESS:
      return {
        ...state,
        userData: updateUserGrade(
          state.userData,
          action?.payload?.dataWrapper?.data[0]?.name
        ),
      };
    case USER_TYPE_FAILED:
      return {
        ...state,
      };

    case AUTH_SUBSCRIPTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case AUTH_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        loading: false,
        subscription: [...(action?.payload?.dataWrapper?.data || [])],
      };
    case AUTH_SUBSCRIPTION_FAILED:
      return {
        ...state,
        loading: false,
      };

    case USER_LOGIN_FINALIZED:
      return {
        ...state,
        isUserLoginFinalized: true,
      };

    default:
      return state;
  }
};

const handleUserFirstTimeLogin = (userData: UserDataTypes) => {
  let isUserLoginFirstTime = true;

  if (userData?.lastLoggedInDate) {
    isUserLoginFirstTime = false;
  }

  return isUserLoginFirstTime;
};

const updateUserGrade = (
  userData: UserDataTypes | null,
  currentGradeName: string
) => {
  userData = userData || <UserDataTypes>{};
  userData.currentGradeName = currentGradeName;

  return userData;
};

export default auth;
