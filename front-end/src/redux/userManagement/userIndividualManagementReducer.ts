import {
  GET_USER_DETAILS_FAILED,
  GET_USER_DETAILS_REQUEST,
  GET_USER_DETAILS__SUCCESS,
  GET_COUNTRY_DETAILS_FAILED,
  GET_COUNTRY_DETAILS_REQUEST,
  GET_COUNTRY_DETAILS__SUCCESS,
  GET_GRADE_DETAILS_FAILED,
  GET_GRADE_DETAILS_REQUEST,
  GET_GRADE_DETAILS__SUCCESS,
  GET_SYLLABUS_DETAILS_FAILED,
  GET_SYLLABUS_DETAILS_REQUEST,
  GET_SYLLABUS_DETAILS__SUCCESS,
  GET_SCHOOL_DETAILS_FAILED,
  GET_SCHOOL_DETAILS_REQUEST,
  GET_SCHOOL_DETAILS__SUCCESS,
  RESET_INDIVIDUAL_USER_MANAGEMENT,
  GET_SUBJECTS_DETAILS_FAILED,
  GET_SUBJECTS_DETAILS_REQUEST,
  GET_SUBJECTS_DETAILS_SUCCESS,
  GET_TUTOR_GRADES_FAILED,
  GET_TUTOR_GRADES_REQUEST,
  GET_TUTOR_GRADES_SUCCESS,
  GET_TUTOR_SYLLABUS_FAILED,
  GET_TUTOR_SYLLABUS_REQUEST,
  GET_TUTOR_SYLLABUS_SUCCESS,
  GET_TUTOR_COUNTRY_FAILED,
  GET_TUTOR_COUNTRY_REQUEST,
  GET_TUTOR_COUNTRY_SUCCESS,
} from './userManagementTypes';

type Action = {
  type: string;
  payload: {
    dataWrapper: any;
    customInput: any;
  };
};

export interface userIndividualManagementTypes {
  _id: string;
  firstName: string;
  lastName: string;
  phone?: string;
  email: string;
  type?: string;
  countryCode?: string;
  profileImage?: number;
  backgroundImage?: boolean;
  dob?: string;
  joinedDate?: string;
  currentGradeId?: string;
  currentSchoolId?: string;
  currentSyllabusId?: string;
  subjectIds?: string[];
}

export interface subjectDetailsTypes {
  _id: string;
  name: string;
  gradeId: string;
}
export interface gradeDetailsTypes {
  _id: string;
  name: string;
  syllabusId: string;
  subjects?: subjectDetailsTypes[];
}

export interface syllabusDetailsTypes {
  _id: string;
  countryCode: string;
  name: string;
  grades?: gradeDetailsTypes[];
}
export interface countryDetailsTypes {
  name: string;
  countryCode: string;
  syllabus?: syllabusDetailsTypes[];
}

export interface schoolDetailsTypes {
  _id: string;
  name: string;
}

export interface userIndividualManagementReducerType {
  userData: userIndividualManagementTypes | null;
  usersLoading: boolean;
  countryData: countryDetailsTypes | null;
  countryLoading: boolean;
  gradeData: gradeDetailsTypes | null;
  gradeLoading: boolean;
  syllabusData: syllabusDetailsTypes | null;
  syllabusLoading: boolean;
  schoolData: schoolDetailsTypes | null;
  schoolLoading: boolean;
  tutorSubjectData: subjectDetailsTypes[] | null;
  tutorSubjectLoading: boolean;
  tutorGradesData: gradeDetailsTypes[] | null;
  tutorGradeLoading: boolean;
  tutorSyllabusData: syllabusDetailsTypes[] | null;
  tutorSyllabusLoading: boolean;
  tutorCountryData: countryDetailsTypes[] | null;
  tutorCountryLoading: boolean;
}

const INITIAL_STATE: userIndividualManagementReducerType = {
  userData: null,
  usersLoading: true,
  countryData: null,
  countryLoading: true,
  gradeData: null,
  gradeLoading: true,
  syllabusData: null,
  syllabusLoading: true,
  schoolData: null,
  schoolLoading: true,
  tutorSubjectData: null,
  tutorSubjectLoading: true,
  tutorGradesData: null,
  tutorGradeLoading: true,
  tutorSyllabusData: null,
  tutorSyllabusLoading: true,
  tutorCountryData: null,
  tutorCountryLoading: true,
};

const userIndividualManagementReducer = (
  state = INITIAL_STATE,
  action: Action
): userIndividualManagementReducerType => {
  const payload = action?.payload?.dataWrapper;
  const { data } = payload || {};

  switch (action.type) {
    case GET_USER_DETAILS_REQUEST:
      return {
        ...state,
        usersLoading: true,
      };
    case GET_USER_DETAILS__SUCCESS:
      return {
        ...state,
        usersLoading: false,
        userData: data?.[0] || null,
      };
    case GET_USER_DETAILS_FAILED:
      return {
        ...state,
        usersLoading: false,
      };
    case GET_COUNTRY_DETAILS_REQUEST:
      return {
        ...state,
        countryLoading: true,
      };
    case GET_COUNTRY_DETAILS__SUCCESS:
      return {
        ...state,
        countryLoading: false,
        countryData: data?.[0] || null,
      };
    case GET_COUNTRY_DETAILS_FAILED:
      return {
        ...state,
        countryLoading: false,
      };
    case GET_GRADE_DETAILS_REQUEST:
      return {
        ...state,
        gradeLoading: true,
      };
    case GET_GRADE_DETAILS__SUCCESS:
      return {
        ...state,
        gradeLoading: false,
        gradeData: data?.[0] || null,
      };
    case GET_GRADE_DETAILS_FAILED:
      return {
        ...state,
        gradeLoading: false,
      };
    case GET_SYLLABUS_DETAILS_REQUEST:
      return {
        ...state,
        syllabusLoading: true,
      };
    case GET_SYLLABUS_DETAILS__SUCCESS:
      return {
        ...state,
        syllabusLoading: false,
        syllabusData: data?.[0] || null,
      };
    case GET_SYLLABUS_DETAILS_FAILED:
      return {
        ...state,
        syllabusLoading: false,
      };
    case GET_SCHOOL_DETAILS_REQUEST:
      return {
        ...state,
        schoolLoading: true,
      };
    case GET_SCHOOL_DETAILS__SUCCESS:
      return {
        ...state,
        schoolLoading: false,
        schoolData: data?.[0] || null,
      };
    case GET_SCHOOL_DETAILS_FAILED:
      return {
        ...state,
        schoolLoading: false,
      };
    case GET_SUBJECTS_DETAILS_REQUEST:
      return {
        ...state,
        tutorSubjectLoading: true,
      };
    case GET_SUBJECTS_DETAILS_SUCCESS:
      return {
        ...state,
        tutorSubjectLoading: false,
        tutorSubjectData: data || null,
      };
    case GET_SUBJECTS_DETAILS_FAILED:
      return {
        ...state,
        tutorSubjectLoading: false,
      };
    case GET_TUTOR_GRADES_REQUEST:
      return {
        ...state,
        tutorGradeLoading: true,
      };
    case GET_TUTOR_GRADES_SUCCESS:
      return {
        ...state,
        tutorGradeLoading: false,
        tutorGradesData: data || null,
      };
    case GET_TUTOR_GRADES_FAILED:
      return {
        ...state,
        tutorGradeLoading: false,
      };
    case GET_TUTOR_SYLLABUS_REQUEST:
      return {
        ...state,
        tutorSyllabusLoading: true,
      };
    case GET_TUTOR_SYLLABUS_SUCCESS:
      return {
        ...state,
        tutorSyllabusLoading: false,
        tutorSyllabusData: data || null,
      };
    case GET_TUTOR_SYLLABUS_FAILED:
      return {
        ...state,
        tutorSyllabusLoading: false,
      };
    case GET_TUTOR_COUNTRY_REQUEST:
      return {
        ...state,
        tutorCountryLoading: true,
      };
    case GET_TUTOR_COUNTRY_SUCCESS:
      return {
        ...state,
        tutorCountryLoading: false,
        tutorCountryData: data || null,
      };
    case GET_TUTOR_COUNTRY_FAILED:
      return {
        ...state,
        tutorCountryLoading: false,
      };
    case RESET_INDIVIDUAL_USER_MANAGEMENT:
      return {
        ...INITIAL_STATE,
      };

    default:
      return state;
  }
};

export default userIndividualManagementReducer;
