import {
  singleLessonType,
  singleSubjectType,
  singleTopicType,
} from '../common/commonReducer';
import { convertTimeToSeconds } from '../../Helper/index';
import {
  VideoContent,
  watchLaterContentIdsType,
} from '../student/reelVideoReducer';
import {
  DOWNLOAD_SUMMARY_FAILED,
  DOWNLOAD_SUMMARY_REQUEST,
  DOWNLOAD_SUMMARY_SUCCESS,
  FETCH_TUTOR_INFO_FAILED,
  FETCH_TUTOR_INFO_REQUEST,
  FETCH_TUTOR_INFO_SUCCESS,
  GET_MID_AND_END_DETAILS_SUCCESS,
  GET_THEATER_SUMMARY_SUCCESS,
  ATTEMPT_CREATION_LOADING_SUCCESS,
  CREATE_END_VIDEO_ASSESSMENT_ATTEMPT_FAILED,
  CREATE_END_VIDEO_ASSESSMENT_ATTEMPT_REQUEST,
  CREATE_END_VIDEO_ASSESSMENT_ATTEMPT_SUCCESS,
  GET_ASSESSMENT_ATTEMPTS_FAILED,
  GET_ASSESSMENT_ATTEMPTS_REQUEST,
  GET_ASSESSMENT_ATTEMPTS_SUCCESS,
  GET_DOCUMENTS_SUCCESS,
  GET_END_VIDEO_ASSESSMENT_ATTEMPTS_FAILED,
  GET_END_VIDEO_ASSESSMENT_ATTEMPTS_REQUEST,
  GET_END_VIDEO_ASSESSMENT_ATTEMPTS_SUCCESS,
  GET_END_VIDEO_ASSESSMENT_SUCCESS,
  GET_LINKED_DOCUMENTS_SUCCESS,
  GET_MID_VIDEO_ASSESSMENT_CONTENT_SUCCESS,
  GET_QUESTION_RESULTS_SUCCESS,
  GET_THEATER_CONTENT_SUCCESS,
  GET_THEATRE_TUTOR_REEL_DATA_RESET,
  GET_THEATRE_TUTOR_REEL_DATA_SUCCESS,
  GET_THEATRE_WATCH_LATER_DATA_SUCCESS,
  POST_ASSESSMENT_ATTEMPTS_FAILED,
  POST_ASSESSMENT_ATTEMPTS_REQUEST,
  POST_ASSESSMENT_ATTEMPTS_SUCCESS,
  RESET_ASSESSMENT_ATTEMPT,
  RESET_END_VIDEO_ASSESSMENT_ATTEMPT_DATA,
  RESET_THEATER,
  SET_THEATRE_SELECTED_CONTENT,
  THEATER_FULLSCREEN,
  UPDATE_THEATRE_PLAYER_STATS,
} from './TheaterTypes';

export interface s3FileObjectType {
  bucketName: string;
  fileKey: string;
}

export interface Summary {
  _id: string;
  startTime: string;
  endTime: string;
  text: string;
}
export interface TutorDetailType {
  _id: string;
  countryCode: string;
  email: string;
  firstName: string;
  joinDate: string;
  lastName: string;
  phone: string;
  type: string;
  profileImage?: {
    bucketName: string;
    fileKey: string;
  };
  backgroundImage?: {
    bucketName: string;
    fileKey: string;
  };
}

export interface TheaterContent extends VideoContent {
  lessonIds: string[];
}

export interface PlayerStatsType {
  playedSeconds?: number;
  progressPercentage?: number;
  videoDuration?: number;
  playingEnded?: boolean;
}

export interface AssessmentContentType {
  _id: string;
  type: string;
  title: string;
  description: string;
  author: string;
  syllabusId: string;
  gradeId: string;
  subjectId: string;
  topicId: string;
  lessonIds: string[];
  tutorIds: string[];
  previewImageKey: s3FileObjectType;
  portraitPreviewImageKey: s3FileObjectType;
  tags: string[];
  countryCode: string;
  duration: string;
  relatedVideoIds: any[];
  relatedDocumentIds: any[];
  relatedAssessmentIds: any[];
  subjectTopicTutorAssessmentOrder: number;
  questions: { [key: string]: Question };
}
export interface Question {
  questionType: string;
  _id: string;
  question: string;
  answers: { [key: string]: Answer };
  questionImage?: s3FileObjectType;
}

export interface Answer {
  _id: string;
  answer: string;
  isCorrect: boolean;
}
export interface SingleAnswerType {
  _id: string;
  answer: string;
  correct: boolean;
  isCorrect: boolean;
}
export interface AnswerWrapperType {
  [answerNumber: string]: SingleAnswerType;
}
export interface SingleQuestion {
  _id: string;
  questionType: string;
  question: string;
  answers: AnswerWrapperType;
  questionImage?: {
    bucketName: string;
    fileKey: string;
  };
}
export interface QuestionType {
  [questionNumber: string]: SingleQuestion;
}
export interface MidVideoAssessmentContentType {
  _id: string;
  startTime: string;
  triggerTime: string;
  type: string;
  questions: QuestionType;
}
export interface EndVideoAttemptResponse {
  assessmentResponseId: string;
  attemptId: string;
}

export interface EndVideoAttempt {
  assessmentId: string;
  assessmentResponseId: string;
  data: AttemptDataItem[];
  page: number;
  size: number;
  totalRecords: number;
  userId: string;
  videoId: string;
}
export interface AttemptDataItem {
  _id: string;
  responses: AttemptResponse[];
  startedAt: string;
  submittedAt: string;
}
export interface AttemptResponse {
  answers: string[];
  questionId: number;
}
export interface AttemptQuestionResponseType {
  answers: string[];
  questionId: string;
}

export interface AttemptDetailsType {
  _id: string;
  responses: AttemptQuestionResponseType[];
}
export interface AssessmentAttempts {
  assessmentResponseId: string;
  data?: AttemptDetailsType[];
  attemptId?: string;
}
export interface AssignmentResultType {
  _id: string;
  totalMarks: number;
  responses: any;
}
export interface DocumentsType {
  _id: string;
  author: string;
  countryCode: string;
  description: string;
  documentKey: { bucketName: string; fileKey: string };
  gradeId: string;
  lessonIds: string[];
  portraitPreviewImageKey: { bucketName: string; fileKey: string };
  previewImageKey: { bucketName: string; fileKey: string };
  relatedAssessmentIds?: string[];
  relatedDocumentIds?: string[];
  relatedVideoIds?: string[];
  sections?: sectionsType[];
  subjectId: string;
  syllabusId: string;
  title: string;
  topicId: string;
  tutorIds: string[];
  type: string;
}
export interface sectionsType {
  heading: string;
  body: string;
  subSections?: sectionsType[];
}
export interface TheaterTypes {
  content: TheaterContent | null;
  endVideoAssessment: AssessmentContentType;
  endVideoAssessmentId: string;
  endVideoAttemptExistingData: EndVideoAttempt;
  endVideoAttemptsLoading: boolean;
  endVideoAttemptsNoContent: boolean;
  endVideoNewAttemptData: EndVideoAttemptResponse;
  endVideoNewAttemptLoading: boolean;
  isFullScreen: boolean;
  isTutorLoading: boolean;
  midVideoAssessmentIds: string[];
  playerStats: PlayerStatsType;
  selectedReelContent: VideoContent;
  tutorDetail: TutorDetailType | null;
  tutorReelContent: VideoContent[];
  tutorReelContentFinishedLoading: boolean;
  tutorReelContentPage: number;
  watchLaterData: watchLaterContentIdsType[];
  endVideoAssessmentIds: string[];
  summaries: Summary[] | null;
  isDownloading: boolean;
  documents: DocumentsType[] | null;
  linkedDocuments: DocumentsType[] | null;
  midVideoAssessmentContents: MidVideoAssessmentContentType[] | null;
  midVideoTriggerTimes: number[];
  isInitialAttemptsLoading: boolean;
  isInitialAttempt: boolean;
  assessmentAttempt: AssessmentAttempts | null;
  createAttemptLoading: boolean;
  attemptCreationSocketPending: boolean;
  assignmentResult: AssignmentResultType | null;
}

const INITIAL_STATE: TheaterTypes = {
  content: null,
  endVideoAssessment: {} as AssessmentContentType,
  endVideoAssessmentId: '',
  endVideoAttemptExistingData: {} as EndVideoAttempt,
  endVideoAttemptsLoading: false,
  endVideoAttemptsNoContent: false,
  endVideoNewAttemptData: {} as EndVideoAttemptResponse,
  endVideoNewAttemptLoading: false,
  isFullScreen: false,
  isTutorLoading: false,
  playerStats: {
    playedSeconds: 0,
    playingEnded: false, //TODO make this false before merging
    progressPercentage: 0,
    videoDuration: 0,
  },
  selectedReelContent: {} as VideoContent,
  tutorDetail: null,
  tutorReelContent: [],
  tutorReelContentFinishedLoading: false,
  tutorReelContentPage: 0,
  watchLaterData: [],
  midVideoAssessmentContents: null,
  midVideoAssessmentIds: [],
  endVideoAssessmentIds: [],
  summaries: null,
  isDownloading: false,
  documents: null,
  linkedDocuments: null,
  midVideoTriggerTimes: [],
  isInitialAttemptsLoading: true,
  isInitialAttempt: false,
  assessmentAttempt: null,
  createAttemptLoading: true,
  attemptCreationSocketPending: false,
  assignmentResult: null,
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
};

const Theater = (
  state: TheaterTypes = INITIAL_STATE,
  action: Action
): TheaterTypes => {
  const payload: any = action?.payload?.dataWrapper;
  const { data = '', totalRecords = 0, page = 0, size = 0 } = payload || {};
  const customInput = action?.payload?.customInput;

  switch (action.type) {
    case RESET_THEATER:
      return { ...INITIAL_STATE };

    case GET_THEATER_CONTENT_SUCCESS:
      return {
        ...state,
        content: data?.[0] || {},
        midVideoAssessmentIds: getVideoAssessmentIds(
          data?.[0]?.midVideoAssessments || []
        ),
        endVideoAssessmentId: filterEndVideoAssessmentId(
          data?.[0]?.endVideoAssessmentIds || []
        ),
      };
    case FETCH_TUTOR_INFO_REQUEST:
      return {
        ...state,
        isTutorLoading: true,
      };
    case FETCH_TUTOR_INFO_SUCCESS:
      return {
        ...state,
        isTutorLoading: false,
        tutorDetail: data?.[0] || null,
      };
    case FETCH_TUTOR_INFO_FAILED:
      return {
        ...state,
        isTutorLoading: false,
      };

    case THEATER_FULLSCREEN:
      return {
        ...state,
        isFullScreen: data.isFullScreen,
      };

    case GET_THEATRE_WATCH_LATER_DATA_SUCCESS:
      return {
        ...state,
        watchLaterData: data || [],
      };

    case UPDATE_THEATRE_PLAYER_STATS:
      return {
        ...state,
        playerStats: { ...state.playerStats, ...action.payload },
      };

    case GET_THEATRE_TUTOR_REEL_DATA_SUCCESS:
      return {
        ...state,
        tutorReelContent: [...state.tutorReelContent, ...(data || [])],
        tutorReelContentFinishedLoading: !!(
          !Array.isArray(data) || !data.length
        ),
        tutorReelContentPage: customInput.page || 0,
      };
    case GET_THEATRE_TUTOR_REEL_DATA_RESET:
      return {
        ...state,
        tutorReelContent: [],
        tutorReelContentFinishedLoading: false,
        tutorReelContentPage: 0,
      };
    case GET_MID_VIDEO_ASSESSMENT_CONTENT_SUCCESS:
      return {
        ...state,
        midVideoAssessmentContents: data,
        midVideoTriggerTimes: data?.map((data: MidVideoAssessmentContentType) =>
          convertTimeToSeconds(data?.triggerTime || '')
        ),
      };

    case SET_THEATRE_SELECTED_CONTENT:
      return {
        ...state,
        selectedReelContent:
          { ...customInput, _id: customInput.contentId } || {},
      };
    case GET_MID_AND_END_DETAILS_SUCCESS:
      return {
        ...state,
        midVideoAssessmentIds: getVideoAssessmentIds(
          data?.[0]?.midVideoAssessments || []
        ),
        endVideoAssessmentId: filterEndVideoAssessmentId(
          data?.[0]?.endVideoAssessmentIds || []
        ),
      };
    case GET_THEATER_SUMMARY_SUCCESS:
      return {
        ...state,
        summaries: [
          ...(data.map((summary: Summary) => ({
            ...summary,
            _id: `${summary.startTime}${summary.endTime}`,
          })) || []),
        ],
      };
    case DOWNLOAD_SUMMARY_REQUEST:
      return {
        ...state,
        isDownloading: true,
      };
    case DOWNLOAD_SUMMARY_SUCCESS:
      return {
        ...state,
        isDownloading: false,
      };
    case DOWNLOAD_SUMMARY_FAILED:
      return {
        ...state,
        isDownloading: false,
      };

    case GET_DOCUMENTS_SUCCESS:
      return {
        ...state,
        documents: data,
      };

    case GET_LINKED_DOCUMENTS_SUCCESS:
      return {
        ...state,
        linkedDocuments: data,
      };
    case GET_END_VIDEO_ASSESSMENT_SUCCESS:
      return {
        ...state,
        endVideoAssessment: data?.[0] || {},
      };

    case GET_END_VIDEO_ASSESSMENT_ATTEMPTS_REQUEST:
      return {
        ...state,
        endVideoAttemptsLoading: true,
      };
    case GET_END_VIDEO_ASSESSMENT_ATTEMPTS_SUCCESS:
      return {
        ...state,
        endVideoAttemptsLoading: false,
        endVideoAttemptExistingData: payload,
        endVideoAttemptsNoContent: !payload,
      };
    case GET_END_VIDEO_ASSESSMENT_ATTEMPTS_FAILED:
      return {
        ...state,
        endVideoAttemptsLoading: false,
      };

    case CREATE_END_VIDEO_ASSESSMENT_ATTEMPT_REQUEST:
      return {
        ...state,
        endVideoNewAttemptLoading: true,
      };
    case CREATE_END_VIDEO_ASSESSMENT_ATTEMPT_SUCCESS:
      return {
        ...state,
        endVideoNewAttemptData: payload,
        endVideoNewAttemptLoading: false,
      };
    case CREATE_END_VIDEO_ASSESSMENT_ATTEMPT_FAILED:
      return {
        ...state,
        endVideoNewAttemptLoading: false,
      };
    case GET_ASSESSMENT_ATTEMPTS_REQUEST:
      return {
        ...state,
        isInitialAttemptsLoading: true,
        isInitialAttempt: false,
      };

    case GET_ASSESSMENT_ATTEMPTS_SUCCESS:
      return {
        ...state,
        isInitialAttemptsLoading: false,
        isInitialAttempt: !payload,
        assessmentAttempt: payload || null,
        createAttemptLoading: !payload,
      };

    case GET_ASSESSMENT_ATTEMPTS_FAILED:
      return {
        ...state,
        isInitialAttemptsLoading: false,
      };

    case POST_ASSESSMENT_ATTEMPTS_REQUEST: {
      return {
        ...state,
        createAttemptLoading: true,
        attemptCreationSocketPending: true,
      };
    }
    case POST_ASSESSMENT_ATTEMPTS_SUCCESS: {
      return {
        ...state,
        createAttemptLoading: false,
        assessmentAttempt: payload || null,
      };
    }
    case POST_ASSESSMENT_ATTEMPTS_FAILED: {
      return {
        ...state,
        createAttemptLoading: false,
      };
    }
    case ATTEMPT_CREATION_LOADING_SUCCESS: {
      return {
        ...state,
        attemptCreationSocketPending: false,
      };
    }
    case GET_QUESTION_RESULTS_SUCCESS: {
      return {
        ...state,
        assignmentResult: payload || null,
      };
    }

    case RESET_ASSESSMENT_ATTEMPT:
      return {
        ...state,
        isInitialAttemptsLoading: true,
        isInitialAttempt: false,
        assessmentAttempt: null,
        createAttemptLoading: true,
        attemptCreationSocketPending: false,
        assignmentResult: null,
      };

    case RESET_END_VIDEO_ASSESSMENT_ATTEMPT_DATA:
      return {
        ...state,
        endVideoAttemptExistingData: {} as EndVideoAttempt,
        endVideoAttemptsLoading: false,
        endVideoAttemptsNoContent: false,
        endVideoNewAttemptData: {} as EndVideoAttemptResponse,
        endVideoNewAttemptLoading: false,
      };

    default:
      return state;
  }
};

const getVideoAssessmentIds = (assessments: any) => {
  const midVideoAssessmentIds = assessments?.length
    ? assessments?.map((assessment: any) => assessment?._id)
    : [];
  return midVideoAssessmentIds;
};

const filterEndVideoAssessmentId = (data: string[]) => {
  return data.filter(item => !!item)?.[0] || '';
};

export default Theater;
