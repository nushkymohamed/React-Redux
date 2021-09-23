import {
  CREATE_ASSESSMENT_FAILED,
  CREATE_ASSESSMENT_REQUEST,
  CREATE_ASSESSMENT_SUCCESS,
  CREATE_CONTENT_RESET,
  CREATE_LINKED_DOCUMENT_FAILED,
  CREATE_LINKED_DOCUMENT_REQUEST,
  CREATE_LINKED_DOCUMENT_SUCCESS,
  CREATE_VIDEO_FAILED,
  CREATE_VIDEO_REQUEST,
  CREATE_VIDEO_SUCCESS,
  DOCUMENT_UPLOAD_FAILED,
  DOCUMENT_UPLOAD_REQUEST,
  DOCUMENT_UPLOAD_SUCCESS,
} from './contentTypes';

export interface ContentState {
  loading: boolean;
  error: any;
  success: boolean | null;
}

const INITIAL_STATE: ContentState = {
  loading: false,
  error: '',
  success: null,
};

type Action = { type: string; payload: any };

const content = (state: ContentState = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case CREATE_VIDEO_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
        success: null,
      };
    case CREATE_VIDEO_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        success: true,
      };
    case CREATE_VIDEO_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };

    case DOCUMENT_UPLOAD_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
        success: false,
      };
    case DOCUMENT_UPLOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        success: true,
      };
    case DOCUMENT_UPLOAD_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };

    case CREATE_LINKED_DOCUMENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
        success: null,
      };
    case CREATE_LINKED_DOCUMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        success: true,
      };
    case CREATE_LINKED_DOCUMENT_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };

    case CREATE_ASSESSMENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
        success: null,
      };
    case CREATE_ASSESSMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        success: true,
      };
    case CREATE_ASSESSMENT_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
    case CREATE_CONTENT_RESET:
      return {
        ...state,
        ...INITIAL_STATE,
      };

    default:
      return state;
  }
};

export default content;
