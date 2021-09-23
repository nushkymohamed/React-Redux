import { avoidedDuplicationData } from '../../Helper';
import { InitialUserDataTypes } from '../auth/authReducer';
import { GET_STANDARD_REEL_TUTOR_SUCCESS } from './reelTypes';

export interface tutorType extends InitialUserDataTypes {
  address: string;
  subjectIds: string;
}

type reelTutorType = {
  standardReelTutorContent: {
    [reelId: string]: {
      tutors: tutorType[];
      totalRecords: number;
      currentPage: number;
    };
  };
};

const INITIAL_STATE: reelTutorType = {
  standardReelTutorContent: {},
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

const reelContent = (state = INITIAL_STATE, action: Action): reelTutorType => {
  const payload = action?.payload?.dataWrapper;
  const customInput = action?.payload?.customInput;
  const { data = [], totalRecords = 0, page = 0, size = 0 } = payload || {};

  switch (action.type) {
    case GET_STANDARD_REEL_TUTOR_SUCCESS:
      return {
        ...state,
        standardReelTutorContent: {
          ...state.standardReelTutorContent,
          [customInput.reelId]: {
            tutors:
              page === 1
                ? data
                : avoidedDuplicationData(
                    state.standardReelTutorContent[customInput.reelId]?.tutors,
                    data,
                    '_id'
                  ),
            totalRecords,
            currentPage:
              page ||
              state.standardReelTutorContent[customInput.reelId]?.currentPage,
          },
        },
      };

    default:
      return state;
  }
};

export default reelContent;
