import {
  STUDENT_SIGNUP_REQUEST,
  STUDENT_SIGNUP_SUCCESS,
  STUDENT_SIGNUP_FAILED,
  PARENT_SIGNUP_REQUEST,
  PARENT_SIGNUP_SUCCESS,
  PARENT_SIGNUP_FAILED,
  TUTOR_REGISTER_FAILED,
  TUTOR_REGISTER_SUCCESS,
  TUTOR_REGISTER_REQUEST,
  RESET_SIGNUP_FETCH,
} from './signupTypes';

export interface SignupState {
  loading: boolean;
  error: any;
  success: boolean | null;
}

const INITIAL_STATE: SignupState = {
  loading: false,
  error: '',
  success: null,
};

type Action = { type: string; payload: any };

const signup = (state: SignupState = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case RESET_SIGNUP_FETCH:
      return {
        ...INITIAL_STATE,
      };

    case STUDENT_SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
        success: null,
      };
    case STUDENT_SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        success: true,
      };
    case STUDENT_SIGNUP_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
    case PARENT_SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
        success: null,
      };
    case PARENT_SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        success: true,
      };
    case PARENT_SIGNUP_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };

    case TUTOR_REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
        success: null,
      };
    case TUTOR_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        success: true,
      };
    case TUTOR_REGISTER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };

    default:
      return state;
  }
};

export default signup;
