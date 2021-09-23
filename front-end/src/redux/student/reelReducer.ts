import {
  GET_FEATURED_REELS_SUCCESS,
  GET_STANDARD_REELS_SUCCESS,
  RESET_REEL_REDUCER,
} from './reelTypes';

export interface StandardReelType {
  _id: string;
  gradeId: string;
  order: number;
  reelTitle: string;
  subjectId: string;
  syllabusId: string;
  type: string;
}

export interface FeaturedReelType {
  _id: string;
  productCreationContentSelectionRequests: null;
  trialContentIds: null;
  type: null;
}

export interface CreatedDate {}

type reelContentType = {
  standardReels: StandardReelType[][];
  standardReelCurrentPage: number;
  standardReelPageSize: number;
  featuredReel: FeaturedReelType;
  featuredReelIds: string[];
};

const INITIAL_STATE: reelContentType = {
  featuredReel: <FeaturedReelType>{},
  standardReelCurrentPage: 0,
  standardReelPageSize: 5,
  standardReels: [],
  featuredReelIds: [],
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
};

const reelContent = (
  state = INITIAL_STATE,
  action: Action
): reelContentType => {
  const payload = action?.payload?.dataWrapper;
  const customInput = action?.payload?.customInput;
  const { data = [], totalRecords = 0, page = 0, size = 0 } = payload || {};

  switch (action.type) {
    case GET_STANDARD_REELS_SUCCESS:
      return {
        ...state,
        standardReels:
          page === 1
            ? data
            : page === state.standardReelCurrentPage
            ? state.standardReels
            : [...state.standardReels, ...data],
        standardReelCurrentPage: page || state.standardReelCurrentPage,
      };

    case GET_FEATURED_REELS_SUCCESS:
      return {
        ...state,
        featuredReel: data?.[0] || {},
        featuredReelIds: getFeaturedReelIds(data),
      };
    case RESET_REEL_REDUCER:
      return {
        ...INITIAL_STATE,
      };

    default:
      return state;
  }
};

const getFeaturedReelIds = (data: FeaturedReelType[]) => {
  let featuredReelIds: string[] = [];
  featuredReelIds = data?.map((data: FeaturedReelType) => data?._id);
  return featuredReelIds.length ? featuredReelIds : [];
};

export default reelContent;
