import { avoidedDuplicationData } from '../../Helper';
import { InitialUserDataTypes } from '../auth/authReducer';
import {
  FILE_UPLOAD_REQUEST,
  FILE_UPLOAD_S3_INFO_SUCCESS,
  FILE_UPLOAD_SUCCESS,
  GET_ALL_LIKE_VIDEO_DATA_SUCCESS,
  GET_ALL_SUBSCRIPTION_FEATURE_SUCCESS,
  GET_ALL_SUBSCRIPTION_SUCCESS,
  GET_ALL_WATCH_LATER_IDS_SUCCESS,
  GET_ASSESSMENTS_SUCCESS,
  GET_COUNTRIES_SUCCESS,
  GET_CURRENCY_SUCCESS,
  GET_GRADES_SUCCESS,
  GET_LEARNING_DOCUMENTS_SUCCESS,
  GET_LEARNING_LINKED_DOCUMENTS_SUCCESS,
  GET_LESSONS_SUCCESS,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_RELATED_ASSIGNMENT_CONTENTS_SUCCESS,
  GET_RELATED_DOCUMENT_CONTENTS_SUCCESS,
  GET_RELATED_VIDEO_CONTENTS_SUCCESS,
  GET_SCHOOLS_SUCCESS,
  GET_SUBJECTS_SUCCESS,
  GET_SYLLABUSES_SUCCESS,
  GET_TOPICS_SUCCESS,
  GET_TOTAL_RECORDS_SUCCESS,
  GET_TUTORS_SUCCESS,
  GET_USEREXIST_FAILED,
  GET_USEREXIST_REQUEST,
  GET_USEREXIST_SUCCESS,
  INITIAL_DATA_LIST_SETUP,
  INTERVIEW_UPLOAD_FAILED,
  INTERVIEW_UPLOAD_REQUEST,
  INTERVIEW_UPLOAD_SUCCESS,
  LIST_DATA_FAILED,
  LIST_DATA_REQUEST,
  LIST_DATA_SUCCESS,
  RESET_ASSESMENTS,
  RESET_COUNTRIES,
  RESET_CURRENCY,
  RESET_GRADES,
  RESET_LEARNING_DOCUMENTS,
  RESET_LESSONS,
  RESET_RELATED_ASSIGNMENT_CONTENTS,
  RESET_RELATED_DOCUMENT_CONTENTS,
  RESET_RELATED_VIDEO_CONTENTS,
  RESET_SCHOOLS,
  RESET_SUBJECTS,
  RESET_SUBSCRIPTION_FEATURE,
  RESET_SYLLABUSES,
  RESET_TOPICS,
  RESET_TUTORS,
  RESET_USEREXIST,
  RESET_USEREXIST_FETCH,
  SET_EMPTY_ALL_LIKED_CONTENT,
  SET_SELECTED_COUNTRY,
  SET_SELECTED_GRADE,
  SET_SELECTED_SCHOOL,
  SET_SELECTED_SUBJECT,
  SET_SELECTED_SYLLABUS,
  SET_SELECTED_TOPIC,
  SET_SELECTED_TUTOR,
  USER_LAST_WATCHED_VIDEO_CONTENT_SUCCESS,
  USER_LAST_WATCH_VIDEO_TIMESTAMP_SUCCESS,
} from './commonTypes';

export interface s3FileObjectType {
  bucketName: string;
  fileKey: string;
}

export interface tutorTypes extends InitialUserDataTypes {
  address: string;
}

export interface singleLessonType {
  _id: string;
  name: string;
}
export interface singleSubjectType {
  _id: string;
  name: string;
}

export interface singleContentType {
  _id: string;
  title: string;
}

export interface singleTopicType {
  _id: string;
  topic: string;
}

export interface singleSyllabusType {
  _id: string;
  name: string;
}

export interface singleGradeType {
  _id: string;
  name: string;
}

export interface singleCountryType {
  _id: string;
  countryCode: string;
  name: string;
}

export interface singleSchoolType {
  _id: string;
  name: string;
}

export interface subscriptionAllowedSingleProducts {
  productId: string;
  defaultPrice: {
    currencyId: string;
    value: string;
  };
}

export interface subscriptionsTypes {
  _id: string;
  subscriptionName: string;
  subscriptionDescription: string;
  subscriptionType: string;
  duration: number;
  availablePaymentCycle: string;
  allowedProducts: subscriptionAllowedSingleProducts[] | null;
  subscriptionFeatureIds: string[];
}

export interface subscriptionsFeaturesTypes {
  featureCode: string;
  featureTitle: string;
  featureDescription: string;
  _id: string;
}

export interface apiRequestListSingleItem {
  index: number;
  data?: any;
  request?: boolean;
  success?: boolean;
  failed?: boolean;
}

export interface apiRequestListType {
  [id: string]: apiRequestListSingleItem[];
}

export interface watchLaterContentIdsType {
  _id: string;
  userId: string;
  contentId: string;
}
export interface likeVideoContentType {
  userId: string;
  contentId: string;
  reaction: string;
}

export interface userLastWatchedVideoType extends singleContentType {
  userWatchedLength: number;
  videoLength: number;
}

export interface lastWatchedContentInfoType {
  _id?: string;
  userId: string;
  contentId: string;
  videoLength: number;
  userWatchedLength: number;
  relatedReelIds: string[];
  tutorId: string;
}
export interface learningDocumentsType {
  _id: string;
  type: string;
  title: string;
}

export interface learningLinkedDocumentsType {
  _id: string;
  type: string;
  title: string;
}
export interface CommonTypes {
  assessments: { _id: string; title: string }[] | null;
  assessmentsPage: number;
  countries: singleCountryType[] | null;
  grades: singleGradeType[] | null;
  lessons: singleLessonType[] | null;
  order: any;
  orders: any;
  schools: singleSchoolType[] | null;
  selectedCountry: string | null;
  selectedGrade: string | null;
  selectedSchool: string | null;
  selectedSubject: string | null;
  selectedSyllabus: string | null;
  selectedTopic: string | null;
  selectedTutor: string | null;
  subjects: singleSubjectType[] | null;
  syllabuses: singleSyllabusType[] | null;
  topics: singleTopicType[] | null;
  tutors: tutorTypes[] | null;

  uploads: object;
  s3BucketInfo: {
    [name: string]: s3FileObjectType;
  } | null;
  isUserExist: boolean | null;
  isUserExistLoading: boolean;
  isInterviewUploaded: boolean | null;
  relatedDocumentContent: singleContentType[] | null;
  relatedVideoContent: singleContentType[] | null;
  relatedAssignmentContent: singleContentType[] | null;
  currency: { _id: string; currency: string }[] | null;
  isViewDocumentIsUploaded: any;
  countriesPage: number;
  countriesSize: number;
  gradesPage: number;
  gradesSize: number;
  lessonsPage: number;
  lessonsSize: number;
  schoolsPage: number;
  schoolsSize: number;
  subjectsPage: number;
  subjectsSize: number;
  syllabusesPage: number;
  syllabusesSize: number;
  topicsPage: number;
  topicsSize: number;
  currencyPage: number;
  currencySize: number;
  tutorsPage: number;
  tutorsSize: number;
  relatedDocumentContentPage: number;
  relatedDocumentContentSize: number;
  relatedVideoContentPage: number;
  relatedVideoContentSize: number;
  relatedAssignmentContentPage: number;
  relatedAssignmentContentSize: number;
  subscriptions: subscriptionsTypes[] | null;
  subscriptionsPage: number;
  subscriptionsSize: number;
  subscriptionsTotalRecord: number;
  commonTotalRecords: { [uniqueID: string]: number } | null;
  subscriptionsFeatures: subscriptionsFeaturesTypes[] | null;
  subscriptionsFeaturesPage: number;
  subscriptionsFeaturesSize: number;
  subscriptionsFeaturesTotalRecord: number;
  apiRequestList: apiRequestListType | null;
  allWatchLaterContentIds: watchLaterContentIdsType[] | null;
  allLikedVideoesContent: likeVideoContentType[] | null;
  lastWatchedVideoContent: userLastWatchedVideoType | null;
  lastWatchedContentInfo: lastWatchedContentInfoType | null;
  learningDocuments: learningDocumentsType[] | null;
  learningDocumentsPage: number;
  learningDocumentsTotalRecords: number;
  learningLinkedDocuments: learningLinkedDocumentsType[] | null;
  learningLinkedDocumentsPage: number;
  learningLinkedDocumentsTotalRecords: number;
}

const INITIAL_STATE: CommonTypes = {
  assessments: null,
  assessmentsPage: 1,
  countries: null,
  countriesPage: 1,
  countriesSize: 20,
  grades: null,
  gradesPage: 1,
  gradesSize: 20,
  lessons: null,
  lessonsPage: 1,
  lessonsSize: 20,
  order: null,
  schools: null,
  schoolsPage: 1,
  schoolsSize: 20,
  orders: null,
  selectedCountry: null,
  selectedGrade: null,
  selectedSchool: null,
  selectedSubject: null,
  selectedSyllabus: null,
  selectedTopic: null,
  selectedTutor: null,
  subjects: null,
  subjectsPage: 1,
  subjectsSize: 20,
  syllabuses: null,
  syllabusesPage: 1,
  syllabusesSize: 20,
  topics: null,
  topicsPage: 1,
  topicsSize: 20,
  uploads: {},
  s3BucketInfo: null,
  isUserExist: null,
  isUserExistLoading: false,
  isViewDocumentIsUploaded: false,
  relatedDocumentContent: [],
  relatedVideoContent: [],
  relatedAssignmentContent: [],
  relatedDocumentContentPage: 1,
  relatedDocumentContentSize: 20,
  relatedVideoContentPage: 1,
  relatedVideoContentSize: 20,
  relatedAssignmentContentPage: 1,
  relatedAssignmentContentSize: 20,
  currency: null,
  currencyPage: 1,
  currencySize: 10,
  tutors: null,
  tutorsPage: 1,
  tutorsSize: 20,
  isInterviewUploaded: null,
  subscriptions: null,
  subscriptionsPage: 1,
  subscriptionsSize: 10,
  subscriptionsTotalRecord: 0,
  commonTotalRecords: null,
  subscriptionsFeatures: null,
  subscriptionsFeaturesPage: 1,
  subscriptionsFeaturesSize: 10,
  subscriptionsFeaturesTotalRecord: 0,
  apiRequestList: null,
  allWatchLaterContentIds: null,
  allLikedVideoesContent: null,
  lastWatchedVideoContent: null,
  lastWatchedContentInfo: null,
  learningDocuments: null,
  learningDocumentsPage: 1,
  learningDocumentsTotalRecords: 0,
  learningLinkedDocuments: null,
  learningLinkedDocumentsPage: 1,
  learningLinkedDocumentsTotalRecords: 0,
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

const common = (
  state: CommonTypes = INITIAL_STATE,
  action: Action
): CommonTypes => {
  const payload = action?.payload?.dataWrapper;
  const { data = '', totalRecords = 0, page = 0, size = 0 } = payload || {};
  const customInput = action?.payload?.customInput || action?.customInput;

  switch (action.type) {
    case GET_SUBJECTS_SUCCESS:
      return {
        ...state,
        subjects: avoidedDuplicationData(state.subjects, data, '_id'),
        subjectsPage: page || state.subjectsPage,
        subjectsSize: size || state.subjectsSize,
      };

    case RESET_SUBJECTS:
      return {
        ...state,
        subjects: null,
        subjectsPage: 1,
        subjectsSize: 20,
      };

    case GET_TUTORS_SUCCESS:
      return {
        ...state,
        tutors: data || null,
        tutorsPage: page || state.tutorsPage,
        tutorsSize: size || state.tutorsSize,
      };

    case RESET_TUTORS:
      return {
        ...state,
        tutors: null,
        tutorsPage: 1,
        tutorsSize: 20,
        selectedTutor: null,
      };
    case RESET_ASSESMENTS:
      return {
        ...state,
        assessments: null,
        assessmentsPage: 1,
      };

    case GET_ORDER_SUCCESS:
      return {
        ...state,
        order: totalRecords,
      };
    case GET_ORDER_REQUEST:
      return {
        ...state,
        order: null,
      };

    case GET_CURRENCY_SUCCESS:
      return {
        ...state,
        currency: avoidedDuplicationData(state.currency, data, '_id'),
        currencyPage: page || state.currencyPage,
        currencySize: size || state.currencySize,
      };

    case RESET_CURRENCY:
      return {
        ...state,
        currency: null,
        currencyPage: 1,
        currencySize: 20,
      };

    case GET_TOPICS_SUCCESS:
      return {
        ...state,
        topics: avoidedDuplicationData(state.topics, data, '_id'),
        topicsPage: page || state.topicsPage,
        topicsSize: size || state.topicsSize,
      };

    case RESET_TOPICS:
      return {
        ...state,
        topics: null,
        topicsPage: 1,
        topicsSize: 20,
        selectedTopic: null,
      };

    case GET_LESSONS_SUCCESS:
      return {
        ...state,
        lessons: avoidedDuplicationData(state.lessons, data, '_id'),
        lessonsPage: page || state.lessonsPage,
        lessonsSize: size || state.lessonsSize,
      };

    case RESET_LESSONS:
      return {
        ...state,
        lessons: null,
        lessonsPage: 1,
        lessonsSize: 20,
      };

    case GET_RELATED_DOCUMENT_CONTENTS_SUCCESS:
      return {
        ...state,
        relatedDocumentContent: avoidedDuplicationData(
          state.relatedDocumentContent,
          data,
          '_id'
        ),
        relatedDocumentContentPage: page || state.relatedDocumentContentPage,
        relatedDocumentContentSize: size || state.relatedDocumentContentSize,
      };

    case RESET_RELATED_DOCUMENT_CONTENTS:
      return {
        ...state,
        relatedDocumentContent: null,
        relatedDocumentContentPage: 1,
        relatedDocumentContentSize: 20,
      };

    case GET_RELATED_ASSIGNMENT_CONTENTS_SUCCESS:
      return {
        ...state,
        relatedAssignmentContent: avoidedDuplicationData(
          state.relatedAssignmentContent,
          data,
          '_id'
        ),
        relatedAssignmentContentPage:
          page || state.relatedAssignmentContentPage,
        relatedAssignmentContentSize:
          size || state.relatedAssignmentContentSize,
      };

    case RESET_RELATED_ASSIGNMENT_CONTENTS:
      return {
        ...state,
        relatedAssignmentContent: null,
        relatedAssignmentContentPage: 1,
        relatedAssignmentContentSize: 20,
      };

    case GET_RELATED_VIDEO_CONTENTS_SUCCESS:
      return {
        ...state,
        relatedVideoContent: avoidedDuplicationData(
          state.relatedVideoContent,
          data,
          '_id'
        ),
        relatedVideoContentPage: page || state.relatedVideoContentPage,
        relatedVideoContentSize: size || state.relatedVideoContentSize,
      };

    case RESET_RELATED_VIDEO_CONTENTS:
      return {
        ...state,
        relatedVideoContent: null,
        relatedVideoContentPage: 1,
        relatedVideoContentSize: 20,
      };

    case RESET_USEREXIST_FETCH:
      return {
        ...state,
        isUserExist: null,
      };

    case GET_USEREXIST_REQUEST:
      return {
        ...state,
        isUserExistLoading: true,
      };

    case GET_USEREXIST_SUCCESS:
      return {
        ...state,
        isUserExist: !!payload?.id,
        isUserExistLoading: false,
      };
    case GET_USEREXIST_FAILED:
      return {
        ...state,
        isUserExistLoading: false,
      };

    case FILE_UPLOAD_REQUEST:
      return {
        ...state,
        uploads: uploadFile(state.uploads, { isUploading: true }, customInput),
      };

    case FILE_UPLOAD_SUCCESS:
      return {
        ...state,
        uploads: uploadFile(
          state.uploads,
          { file: payload, isUploading: false },
          customInput
        ),
      };

    case FILE_UPLOAD_S3_INFO_SUCCESS:
      return {
        ...state,
        s3BucketInfo: setS3BucketInfo(state.s3BucketInfo, customInput, payload),
      };
    case SET_SELECTED_TUTOR:
      return {
        ...state,
        selectedTutor: data,
      };

    case SET_SELECTED_TOPIC:
      return {
        ...state,
        selectedTopic: data,
      };

    case SET_SELECTED_SUBJECT:
      return {
        ...state,
        selectedSubject: data,
      };

    case SET_SELECTED_COUNTRY:
      return {
        ...state,
        selectedCountry: data,
      };

    case SET_SELECTED_SYLLABUS:
      return {
        ...state,
        selectedSyllabus: data,
      };

    case SET_SELECTED_GRADE:
      return {
        ...state,
        selectedGrade: data,
      };

    case SET_SELECTED_SCHOOL:
      return {
        ...state,
        selectedSchool: data,
      };

    case GET_COUNTRIES_SUCCESS:
      return {
        ...state,
        countries: avoidedDuplicationData(state.countries, data, 'countryCode'),
        countriesPage: page || state.countriesPage,
        countriesSize: size || state.countriesSize,
      };

    case RESET_SUBSCRIPTION_FEATURE:
      return {
        ...state,
        subscriptionsFeatures: null,
        subscriptionsFeaturesPage: 0,
        subscriptionsFeaturesSize: 0,
        subscriptionsFeaturesTotalRecord: 0,
      };

    case GET_ALL_SUBSCRIPTION_FEATURE_SUCCESS:
      return {
        ...state,
        subscriptionsFeatures: avoidedDuplicationData(
          state.subscriptionsFeatures,
          data,
          'featureCode'
        ),
        subscriptionsFeaturesPage: page || state.subscriptionsFeaturesPage,
        subscriptionsFeaturesSize: size || state.subscriptionsFeaturesSize,
        subscriptionsFeaturesTotalRecord:
          totalRecords || state.subscriptionsFeaturesTotalRecord,
      };

    case GET_ALL_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        subscriptions: avoidedDuplicationData(state.subscriptions, data, '_id'),
        subscriptionsPage: page || state.subscriptionsPage,
        subscriptionsSize: size || state.subscriptionsSize,
        subscriptionsTotalRecord:
          totalRecords || state.subscriptionsTotalRecord,
      };

    case RESET_COUNTRIES:
      return {
        ...state,
        countries: null,
        countriesPage: 1,
        countriesSize: 20,
      };

    case GET_SYLLABUSES_SUCCESS:
      return {
        ...state,
        syllabuses: avoidedDuplicationData(state.syllabuses, data, '_id'),
        syllabusesPage: page || state.syllabusesPage,
        syllabusesSize: size || state.syllabusesSize,
      };

    case RESET_SYLLABUSES:
      return {
        ...state,
        syllabuses: null,
        syllabusesPage: 1,
        syllabusesSize: 20,
      };

    case GET_GRADES_SUCCESS:
      return {
        ...state,
        grades: avoidedDuplicationData(state.grades, data, '_id'),
        gradesPage: page || state.gradesPage,
        gradesSize: size || state.gradesSize,
      };

    case RESET_GRADES:
      return {
        ...state,
        grades: null,
        gradesPage: 1,
        gradesSize: 20,
      };

    case GET_SCHOOLS_SUCCESS:
      return {
        ...state,
        schools: avoidedDuplicationData(state.schools, data, '_id'),
        schoolsPage: page || state.schoolsPage,
        schoolsSize: size || state.schoolsSize,
      };

    case RESET_SCHOOLS:
      return {
        ...state,
        schools: null,
        schoolsPage: 1,
        schoolsSize: 20,
      };

    case INTERVIEW_UPLOAD_REQUEST:
      return {
        ...state,
        isInterviewUploaded: null,
      };

    case INTERVIEW_UPLOAD_SUCCESS:
      return {
        ...state,
        isInterviewUploaded: true,
      };
    case INTERVIEW_UPLOAD_FAILED:
      return {
        ...state,
        isInterviewUploaded: false,
      };

    case RESET_USEREXIST:
      return { ...state, isUserExist: null };
    case GET_ASSESSMENTS_SUCCESS:
      return {
        ...state,
        assessments: data || null,
        assessmentsPage: page || state.assessmentsPage,
      };
    case GET_TOTAL_RECORDS_SUCCESS:
      return {
        ...state,
        commonTotalRecords: {
          ...state.commonTotalRecords,
          [customInput.uniqueID]: totalRecords,
        },
      };
    case LIST_DATA_REQUEST:
      return {
        ...state,
        apiRequestList: updateApiRequestStatus(
          state.apiRequestList || {},
          true,
          false,
          false,
          customInput
        ),
      };
    case LIST_DATA_SUCCESS:
      return {
        ...state,
        apiRequestList: updateApiRequestStatus(
          state.apiRequestList || {},
          true,
          true,
          false,
          customInput
        ),
      };
    case LIST_DATA_FAILED:
      return {
        ...state,
        apiRequestList: updateApiRequestStatus(
          state.apiRequestList || {},
          true,
          false,
          true,
          customInput
        ),
      };

    case INITIAL_DATA_LIST_SETUP:
      return {
        ...state,
        apiRequestList: validateUniqueKey(state.apiRequestList || {}, data),
      };
    case GET_ALL_WATCH_LATER_IDS_SUCCESS:
      return {
        ...state,
        allWatchLaterContentIds: [...data],
      };
    case GET_ALL_LIKE_VIDEO_DATA_SUCCESS:
      return {
        ...state,
        allLikedVideoesContent: data,
      };
    case SET_EMPTY_ALL_LIKED_CONTENT:
      return {
        ...state,
        allLikedVideoesContent: null,
      };

    case USER_LAST_WATCHED_VIDEO_CONTENT_SUCCESS:
      return {
        ...state,
        lastWatchedVideoContent: { ...data[0], ...customInput },
      };

    case USER_LAST_WATCH_VIDEO_TIMESTAMP_SUCCESS:
      return {
        ...state,
        lastWatchedContentInfo: payload as lastWatchedContentInfoType,
      };
    case GET_LEARNING_DOCUMENTS_SUCCESS: {
      return {
        ...state,
        learningDocumentsTotalRecords:
          totalRecords || state.learningDocumentsTotalRecords,
        learningDocuments: state?.learningDocuments
          ? avoidedDuplicationData(
              state?.learningDocuments,
              data || null,
              '_id'
            )
          : data || null,
        learningDocumentsPage: page || state.learningDocumentsPage,
      };
    }

    case GET_LEARNING_LINKED_DOCUMENTS_SUCCESS: {
      return {
        ...state,
        learningLinkedDocumentsTotalRecords:
          totalRecords || state.learningLinkedDocumentsTotalRecords,
        learningLinkedDocuments: state?.learningLinkedDocuments
          ? avoidedDuplicationData(
              state?.learningLinkedDocuments,
              data || null,
              '_id'
            )
          : data || null,
        learningLinkedDocumentsPage: page || state.learningLinkedDocumentsPage,
      };
    }
    case RESET_LEARNING_DOCUMENTS: {
      return {
        ...state,
        learningDocuments: null,
        learningDocumentsPage: 1,
        learningDocumentsTotalRecords: 0,
        learningLinkedDocuments: null,
        learningLinkedDocumentsPage: 1,
        learningLinkedDocumentsTotalRecords: 0,
      };
    }

    default:
      return state;
  }
};

const uploadFile = (
  state: any,
  payload: object,
  customInput: { contentId: string }
) => {
  state[customInput?.contentId] = payload;
  return state;
};

const setS3BucketInfo = (
  state: any,
  customInput: { key: string },
  payload: any
) => {
  state = state || {};
  state[customInput?.key] = payload;
  return state;
};

const validateUniqueKey = (
  list: apiRequestListType,
  { uniqueID, length }: any
) => {
  list = list || {};

  if (!list[uniqueID]) {
    list[uniqueID] = [];

    let index = 0;
    while (index <= length - 1) {
      list[uniqueID].push({
        index,
        request: false,
        success: false,
        failed: false,
      });
      index++;
    }
  }
  return list;
};

const updateApiRequestStatus = (
  list: apiRequestListType,
  request: boolean,
  success: boolean,
  failed: boolean,
  { uniqueID, index }: { uniqueID: string; index: number }
) => {
  list = list || {};

  const apiRequestList = list[uniqueID];
  apiRequestList[index] = { index, request, success, failed };
  list[uniqueID] = apiRequestList;

  return list;
};

export default common;
