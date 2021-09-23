import {
  singleCountryType,
  singleGradeType,
  singleLessonType,
  singleSubjectType,
  singleSyllabusType,
  singleTopicType,
} from '../common/commonReducer';
import {
  GET_DIVISION_HIERARCHY_REQUEST,
  GET_DIVISION_HIERARCHY_SUCCESS,
} from './dataBaseTypes';

export interface DataBaseTopic extends singleTopicType {
  lessons: singleLessonType[] | null;
}

export interface DataBaseSubject extends singleSubjectType {
  topics: DataBaseTopic[] | null;
}

export interface DataBaseGrade extends singleGradeType {
  subjects: DataBaseSubject[] | null;
}

export interface DataBaseSyllabus extends singleSyllabusType {
  grades: DataBaseGrade[] | null;
}

export interface DataBaseCountry extends singleCountryType {
  syllabuses: DataBaseSyllabus[] | null;
}

export interface DataBaseState {
  hierarchy: DataBaseCountry | null;
}

const INITIAL_STATE: DataBaseState = {
  hierarchy: null,
};

type Action = {
  type: string;
  payload: {
    dataWrapper: {
      data?: any;
    };
    customInput: any;
  };
};

const dataBase = (state: DataBaseState = INITIAL_STATE, action: Action) => {
  const payload = action?.payload?.dataWrapper;
  const { data } = payload || {};

  switch (action.type) {
    case GET_DIVISION_HIERARCHY_REQUEST:
      return INITIAL_STATE;

    case GET_DIVISION_HIERARCHY_SUCCESS:
      return {
        ...state,
        hierarchy: (payload || {}) as DataBaseCountry,
      };
    default:
      return state;
  }
};

export default dataBase;
