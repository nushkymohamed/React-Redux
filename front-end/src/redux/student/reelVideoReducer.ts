import { avoidedDuplicationData, getArrayIndexUsingKey } from '../../Helper';
import { s3FileObjectType, singleLessonType } from '../common/commonReducer';
import { Summary } from '../Theater/TheaterReducer';
import {
  GET_FEATURED_REELS_CONTENT_FAILED,
  GET_FEATURED_REELS_CONTENT_SUCCESS,
  GET_STANDARD_REEL_CONTENT_SUCCESS,
  LIKED_VIDEO_CONTENT_SUCCESS,
  REMOVE_WATCH_LATER_VIDEO_FAILED,
  REMOVE_WATCH_LATER_VIDEO_REQUEST,
  RESET_REEL_CONTENT_REDUCER,
  SET_EMPTY_LIKE_CONTENT,
  SUBMIT_REMAINDER_FAILED,
  SUBMIT_REMAINDER_REQUEST,
  SUBMIT_REMAINDER_SUCCESS,
  WATCH_LATER_IDS_LOAD_MORE,
  WATCH_LATER_IDS_SUCCESS,
  WATCH_LATER_VIDEO_CONTENT_LOAD_MORE,
  WATCH_LATER_VIDEO_CONTENT_SUCCESS,
} from './reelTypes';

export interface VideoContent {
  _id: string;
  author: string;
  contentId: string;
  countryCode?: string;
  countryName?: string;
  createdDate?: CreatedDate;
  description: string;
  endVideoAssessmentIds?: string[];
  gradeId?: string;
  gradeName?: string;
  lessons?: singleLessonType[];
  midVideoAssessmentIds?: string[];
  portraitPreviewImageKey: s3FileObjectType;
  previewImageKey: s3FileObjectType;
  previewVideoKey: s3FileObjectType;
  productId?: string;
  subjectId?: string;
  subjectName?: string;
  subjectTopicTutorVideoOrder: number;
  subtitle?: s3FileObjectType | null;
  summaries?: Summary[];
  syllabusId?: string;
  syllabusName?: string;
  tags?: string[];
  title: string;
  topicId?: string;
  topicName?: string;
  tutorIds: string[];
  type: string;
  videoUploadKey: s3FileObjectType;
}

export interface CreatedDate {}

export interface watchLaterContentIdsType {
  _id: string;
  userId: string;
  contentId: string;
}
type reelVideoType = {
  standardReelVideoContent: {
    [reelId: string]: {
      videos: VideoContent[];
      totalRecords: number;
      currentPage: number;
    };
  };
  watchLaterVideoReelContentIds: watchLaterContentIdsType[] | null;
  watchLaterIdsSize: number;
  watchLaterIdsPage: number;
  watchLaterIdsTotalRecords: number;
  watchLaterVideoReelContent: VideoContent[] | null;
  featuredReelContent: VideoContent[] | null;
  featureContentLoading: boolean;
  featuredReelContentPage: number;
  featuredReelContentSize: number;
  featuredReelContentTotalRecords: number;
  isLoadingNotification: boolean;
  likedVideoesContent: VideoContent[] | null;
  likedVideoesContentPage: number;
  likedVideoesContentSize: number;
  likedVideoesContentTotalRecords: number;
};

const INITIAL_STATE: reelVideoType = {
  standardReelVideoContent: {},
  watchLaterIdsSize: 10,
  watchLaterIdsPage: 1,
  watchLaterIdsTotalRecords: 0,
  watchLaterVideoReelContentIds: null,
  watchLaterVideoReelContent: null,
  featuredReelContent: null,
  featureContentLoading: true,
  featuredReelContentPage: 1,
  featuredReelContentSize: 3,
  featuredReelContentTotalRecords: 0,
  isLoadingNotification: false,
  likedVideoesContent: null,
  likedVideoesContentPage: 1,
  likedVideoesContentSize: 10,
  likedVideoesContentTotalRecords: 0,
};

type Action = {
  type: string;
  payload: {
    dataWrapper:
      | {
          data?: any;
          page?: number;
          size?: number;
          totalRecords?: number;
        }
      | string[]
      | any;
    customInput: any;
  };
  customInput?: any;
};

const reelContent = (state = INITIAL_STATE, action: Action): reelVideoType => {
  const payload = action?.payload?.dataWrapper;
  const customInput = action?.payload?.customInput || action?.customInput;

  const { data = [], totalRecords = 0, page = 0, size = 0 } = payload || {};

  switch (action.type) {
    case GET_STANDARD_REEL_CONTENT_SUCCESS: {
      const currentStateData =
        state.standardReelVideoContent[customInput.reelId];
      return {
        ...state,
        standardReelVideoContent: {
          ...state.standardReelVideoContent,
          [customInput.reelId]: {
            videos:
              customInput.page === 1
                ? data
                : avoidedDuplicationData(currentStateData?.videos, data, '_id'),
            totalRecords,
            currentPage: page || currentStateData?.currentPage,
          },
        },
      };
    }

    case GET_FEATURED_REELS_CONTENT_SUCCESS: {
      return {
        ...state,
        featureContentLoading: false,
        featuredReelContentPage: page || state.featuredReelContentPage,
        featuredReelContentSize: size || state.featuredReelContentSize,
        featuredReelContentTotalRecords:
          totalRecords || state.featuredReelContentTotalRecords,
        featuredReelContent: state?.featuredReelContent
          ? avoidedDuplicationData(
              state?.featuredReelContent,
              data || null,
              '_id'
            )
          : data || null,
      };
    }
    case GET_FEATURED_REELS_CONTENT_FAILED: {
      return {
        ...state,
        featureContentLoading: false,
      };
    }
    case RESET_REEL_CONTENT_REDUCER:
      return {
        ...INITIAL_STATE,
      };

    case WATCH_LATER_IDS_SUCCESS: {
      return {
        ...state,
        watchLaterVideoReelContentIds: [...data],
        watchLaterIdsSize: size || state.watchLaterIdsSize,
        watchLaterIdsPage: page || state.watchLaterIdsPage,
        watchLaterIdsTotalRecords:
          totalRecords || state.watchLaterIdsTotalRecords,
      };
    }
    case WATCH_LATER_IDS_LOAD_MORE:
      return {
        ...state,
        watchLaterVideoReelContentIds: [
          ...(state?.watchLaterVideoReelContentIds || []),
          ...data,
        ],
        watchLaterIdsSize: size || state.watchLaterIdsSize,
        watchLaterIdsPage: page || state.watchLaterIdsPage,
        watchLaterIdsTotalRecords:
          totalRecords || state.watchLaterIdsTotalRecords,
      };
    case WATCH_LATER_VIDEO_CONTENT_SUCCESS:
      return {
        ...state,
        watchLaterVideoReelContent:
          data?.map((content: VideoContent) => ({
            ...content,
            contentId: content?._id,
          })) || [],
      };
    case WATCH_LATER_VIDEO_CONTENT_LOAD_MORE:
      return {
        ...state,
        watchLaterVideoReelContent:
          avoidedDuplicationData(
            state.watchLaterVideoReelContent,
            data,
            '_id'
          )?.map((content: VideoContent) => ({
            ...content,
            contentId: content?._id,
          })) || [],
      };
    case SUBMIT_REMAINDER_REQUEST:
      return {
        ...state,
        isLoadingNotification: true,
      };
    case SUBMIT_REMAINDER_SUCCESS:
      return {
        ...state,
        isLoadingNotification: false,
      };
    case SUBMIT_REMAINDER_FAILED:
      return {
        ...state,
        isLoadingNotification: false,
      };
    case REMOVE_WATCH_LATER_VIDEO_REQUEST:
      return {
        ...state,
        watchLaterVideoReelContent: removeContentByID(
          state?.watchLaterVideoReelContent,
          customInput?.videoInfo
        ),
      };
    case REMOVE_WATCH_LATER_VIDEO_FAILED:
      return {
        ...state,
        watchLaterVideoReelContent: [
          ...(state.watchLaterVideoReelContent || []),
          customInput?.videoInfo,
        ],
      };
    case LIKED_VIDEO_CONTENT_SUCCESS:
      const arrangedData =
        data?.map((content: VideoContent) => ({
          ...content,
          contentId: content?._id,
        })) || null;

      return {
        ...state,
        likedVideoesContentPage: page || state.likedVideoesContentPage,
        likedVideoesContentSize: size || state.likedVideoesContentSize,
        likedVideoesContentTotalRecords:
          totalRecords || state.likedVideoesContentTotalRecords,
        likedVideoesContent: !(
          customInput?.refreshStatus && state?.likedVideoesContent
        )
          ? avoidedDuplicationData(
              state?.likedVideoesContent,
              arrangedData,
              '_id'
            )
          : arrangedData,
      };
    case SET_EMPTY_LIKE_CONTENT:
      return {
        ...state,
        likedVideoesContentPage: 1,
        likedVideoesContentSize: 10,
        likedVideoesContentTotalRecords: 0,
        likedVideoesContent: null,
      };
    default:
      return state;
  }
};
const removeContentByID = (
  watchLaterVideoReelContent: VideoContent[] | null,
  customInput: any
) => {
  const index = getArrayIndexUsingKey(
    watchLaterVideoReelContent || [],
    'contentId',
    customInput.contentId
  );
  if (index > -1) {
    watchLaterVideoReelContent?.splice(index, 1);
  }
  return [...(watchLaterVideoReelContent || [])];
};
const removeContentId = (
  allWatchLaterContentIds: watchLaterContentIdsType[] | null,
  customInput: any
) => {
  const index = allWatchLaterContentIds?.findIndex(
    el => el.contentId === customInput
  );
  if (index !== undefined && index > -1) {
    allWatchLaterContentIds?.splice(index, 1);
  }
  return [...(allWatchLaterContentIds || [])];
};

export default reelContent;
