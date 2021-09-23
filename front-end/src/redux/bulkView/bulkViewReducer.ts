import { singleSubjectType, tutorTypes } from '../common/commonReducer';
import {
  GET_ALL_PRODUCT_IDS_BULK_VIEW_FAILED,
  GET_ALL_PRODUCT_IDS_BULK_VIEW_REQUEST,
  GET_ALL_PRODUCT_IDS_BULK_VIEW_SUCCESS,
  GET_CONTENT_BY_COUNT_SUCCESS,
  GET_CONTENT_BY_TOPICS_FAILED,
  GET_CONTENT_BY_TOPICS_REQUEST,
  GET_CONTENT_BY_TOPICS_SUCCESS,
  GET_TOPICS_BULK_VIEW_FAILED,
  GET_TOPICS_BULK_VIEW_REQUEST,
  GET_TOPICS_BULK_VIEW_SUCCESS,
  GET_TUTORS_BULK_VIEW_FAILED,
  GET_TUTORS_BULK_VIEW_REQUEST,
  GET_TUTORS_BULK_VIEW_SUCCESS,
  LOAD_MORE_CONTENT_BULK_VIEW_SUCCESS,
  LOAD_MORE_TOPICS_BULK_VIEW_SUCCESS,
  LOAD_MORE_TUTORS_BULK_VIEW_SUCCESS,
  RESET_BULK_VIEW_REDUCER,
  SET_SELECTED_TUTOR_BULK,
  SET_TOGGLE_SELECT_ALL_BULK_TUTOR,
  SUBMIT_WATCH_LATER_BULK_VIEW_FAILED,
  SUBMIT_WATCH_LATER_BULK_VIEW_REQUEST,
  SUBMIT_WATCH_LATER_BULK_VIEW_SUCCESS,
} from './bulkViewType';

export interface singleVideoType {
  type: string;
  title: string;
  description: string;
  previewImageKey: {
    bucketName: string;
    fileKey: string;
  };
  tutorIds: string[];
}

export interface singleReelSubjectTypes extends singleSubjectType {
  subjectVideos: singleVideoType[];
  tutorVideos: singleVideoType[];
  clickedTutorIndex: any;
  videosTotalRecords: number;
  videosPage: number;
  videosSize: number;
}

export interface AllProductIdsType {
  _id: string;
  userId: string;
  startDate: string;
  lastRenewedDate: string;
  subscriptionId: string;
  subscriptionLastValidDate: string;
  name: string;
  age: string;
  isValid: boolean;
  productIds: string[] | null;
}
export interface s3FileObjectType {
  bucketName: string;
  fileKey: string;
}
export interface ContentType {
  _id: string;
  title: string;
  tutorIds: string[];
  previewImageKey: s3FileObjectType;
  isContentSelected?: boolean;
  tutor?: bulkViewTutorType;
  type: string;
}
export interface TopicType {
  _id: string;
  topic: string;
  contents: ContentType[] | null;
  contentPage: number;
  contentSize: number;
  contentTotalRecords: number;
}
export interface bulkViewTutorType extends tutorTypes {
  contentCount: number;
  isTutorSelected: boolean;
}
export interface bulkViewReducerType {
  allProductIds: string[] | null;
  tutors: bulkViewTutorType[] | null;
  tutorsPage: number;
  tutorsSize: number;
  tutorsTotalRecords: number;
  topics: TopicType[] | null;
  topicPage: number;
  topicSize: number;
  topicTotalRecords: number;
  isLoading: boolean;
  isLoadingReminderSubmit: boolean;
  isInitialLoading: boolean;
  isAllTutorsSelected: boolean;
  selectedTutorId: string | null;
}

const INITIAL_STATE: bulkViewReducerType = {
  allProductIds: null,
  tutors: null,
  tutorsPage: 1,
  tutorsSize: 10,
  tutorsTotalRecords: 0,
  topics: null,
  topicPage: 1,
  topicSize: 10,
  topicTotalRecords: 0,
  isLoading: false,
  isLoadingReminderSubmit: false,
  isInitialLoading: false,
  isAllTutorsSelected: true,
  selectedTutorId: null,
};

type Action = {
  type: string;
  payload: {
    dataWrapper: {
      data?: any;
      totalRecords?: number;
      id?: string;
      page?: number;
      size?: number;
    };
    customInput: any;
  };
  customInput?: any;
};

const bulView = (
  state: bulkViewReducerType = INITIAL_STATE,
  action: Action
): bulkViewReducerType => {
  const payload = action?.payload?.dataWrapper;
  const { data = '', totalRecords = 0, page = 0, size = 0 } = payload || {};
  const customInput = action?.payload?.customInput || action?.customInput;

  switch (action.type) {
    case GET_ALL_PRODUCT_IDS_BULK_VIEW_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_ALL_PRODUCT_IDS_BULK_VIEW_SUCCESS:
      return {
        ...state,
        allProductIds: mapAllProductIds(data),
        isLoading: false,
      };
    case GET_ALL_PRODUCT_IDS_BULK_VIEW_FAILED:
      return {
        ...state,
        isLoading: false,
      };

    case GET_TUTORS_BULK_VIEW_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_TUTORS_BULK_VIEW_SUCCESS:
      return {
        ...state,
        isLoading: false,
        tutors: [...tutorReelMap(data || [], state.isAllTutorsSelected)],
        tutorsPage: page || state.tutorsPage,
        tutorsSize: size || state.tutorsSize,
        tutorsTotalRecords: totalRecords || state.tutorsTotalRecords,
      };

    case LOAD_MORE_TOPICS_BULK_VIEW_SUCCESS:
      return {
        ...state,
        isLoading: false,
        tutors: [...(state.tutors || []), ...(data || [])],
        tutorsPage: page || state.tutorsPage,
        tutorsSize: size || state.tutorsSize,
        tutorsTotalRecords: totalRecords || state.tutorsTotalRecords,
      };
    case GET_TUTORS_BULK_VIEW_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case GET_TOPICS_BULK_VIEW_REQUEST:
      return {
        ...state,
        isInitialLoading: true,
      };
    case GET_TOPICS_BULK_VIEW_SUCCESS:
      return {
        ...state,
        isInitialLoading: false,
        topics: [...data],
        topicPage: page || state.topicPage,
        topicSize: size || state.topicSize,
        topicTotalRecords: totalRecords || state.topicTotalRecords,
      };
    case GET_TOPICS_BULK_VIEW_FAILED:
      return {
        ...state,
        isInitialLoading: false,
      };

    case GET_CONTENT_BY_TOPICS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_CONTENT_BY_TOPICS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        topics: updateContentTopic(
          state.topics || [],
          data,
          page,
          size,
          totalRecords,
          customInput,
          'add'
        ),
      };
    case GET_CONTENT_BY_TOPICS_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case LOAD_MORE_CONTENT_BULK_VIEW_SUCCESS:
      return {
        ...state,
        topics: updateContentTopic(
          state.topics || [],
          data,
          page,
          size,
          totalRecords,
          customInput,
          'update'
        ),
      };

    case GET_CONTENT_BY_COUNT_SUCCESS:
      return {
        ...state,
        tutors: addContentCount(state.tutors || [], customInput, totalRecords),
      };
    case LOAD_MORE_TUTORS_BULK_VIEW_SUCCESS:
      return {
        ...state,
        isLoading: false,
        tutors: [...(state?.tutors || []), ...(data || [])],
        tutorsPage: page || state.tutorsPage,
        tutorsSize: size || state.tutorsSize,
        tutorsTotalRecords: totalRecords || state.tutorsTotalRecords,
      };
    case SET_SELECTED_TUTOR_BULK: {
      return {
        ...state,
        tutors: selectedTutorReelMap(payload?.id, state.tutors || []),
        selectedTutorId: payload?.id || null,
        isAllTutorsSelected: false,
      };
    }
    case SET_TOGGLE_SELECT_ALL_BULK_TUTOR: {
      return {
        ...state,
        isAllTutorsSelected: !state.isAllTutorsSelected,
        tutors: tutorReelMap(state.tutors || [], !state.isAllTutorsSelected),
        selectedTutorId: null,
      };
    }
    case SUBMIT_WATCH_LATER_BULK_VIEW_REQUEST:
      return {
        ...state,
        isLoadingReminderSubmit: true,
      };
    case SUBMIT_WATCH_LATER_BULK_VIEW_SUCCESS:
      return {
        ...state,
        isLoadingReminderSubmit: false,
      };
    case SUBMIT_WATCH_LATER_BULK_VIEW_FAILED:
      return {
        ...state,
        isLoadingReminderSubmit: false,
      };
    case RESET_BULK_VIEW_REDUCER:
      return {
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};

const tutorReelMap = (
  tutors: bulkViewTutorType[],
  isAllTutorsSelected: boolean
) => {
  const tutorSelectData =
    tutors?.map((tutor: bulkViewTutorType, index: number) => ({
      ...tutor,
      isTutorSelected: isAllTutorsSelected || index === 0,
    })) || [];

  return tutorSelectData;
};
const selectedTutorReelMap = (id: any, tutors: bulkViewTutorType[]) => {
  const selectedTutorList = tutors?.map((data: bulkViewTutorType) => ({
    ...data,
    isTutorSelected: data?._id === id,
  }));
  return selectedTutorList;
};

const addContentCount = (
  tutors: bulkViewTutorType[],
  customInput: any,
  totalRecords: number
) => {
  const index = tutors.findIndex(tutor => tutor._id === customInput?.id);
  if (index > -1) {
    tutors[index].contentCount = totalRecords || 0;
  }
  return [...tutors];
};

const updateContentTopic = (
  topics: TopicType[],
  contents: ContentType[],
  page: number,
  size: number,
  totalRecords: number,
  customInput: any,
  type: string
) => {
  topics = topics || [];
  const index = topics?.findIndex(topic => topic._id === customInput.id);

  if (topics[index]) {
    let topicContent;
    if (type == 'update') {
      const previewsContent = topics[index].contents || [];
      topicContent = [...(previewsContent || []), ...(contents || [])];
    } else {
      topicContent = [...(contents || [])];
    }
    topics[index].contents = topicContent;
    topics[index].contentPage = page || topics[index].contentPage;
    topics[index].contentSize = size || topics[index].contentSize;
    topics[index].contentTotalRecords =
      totalRecords || topics[index].contentTotalRecords;
  }

  return [...topics];
};

const mapAllProductIds = (data: AllProductIdsType[]) => {
  let allIds: any[] = [];
  data?.forEach(subscription => {
    allIds.push(...(subscription?.productIds || []));
  });
  return [...allIds] || null;
};

export default bulView;
