import { avoidedDuplicationData } from '../../Helper';
import { singleCountryType } from '../common/commonReducer';

import {
  filterSingleGradeType,
  filterSingleSubjectType,
  filterSingleSyllabusType,
} from '../filters/filtersReducer';
import {
  GET_ALL_ADMINS_FAILED,
  GET_ALL_ADMINS_REQUEST,
  GET_ALL_ADMINS_SUCCESS,
  GET_ALL_STUDENTS_FAILED,
  GET_ALL_STUDENTS_REQUEST,
  GET_ALL_STUDENTS_SUCCESS,
  GET_ALL_TUTORS_FAILED,
  GET_ALL_TUTORS_REQUEST,
  GET_ALL_TUTORS_SUCCESS,
  GET_ALL_USERS_FAILED,
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  GET_TUTOR_SUBJECTS_SUCCESS,
  GET_USER_COUNTRIES_SUCCESS,
  GET_USER_GRADES_SUCCESS,
  GET_USER_SYLLABUSES_SUCCESS,
} from './userManagementTypes';

type Action = {
  type: string;
  payload: {
    dataWrapper: {
      data?: any;
      totalRecords?: number;
      page?: number;
      size?: number;
    };
    customInput: any;
  };
};

export interface imageType {
  bucketName: string;
  fileKey: string;
}

export interface userManagementStateType {
  allUsers: UserListPaginated;
  allUserCount: number;
  allUsersPage: number;
  allUsersLoading: boolean;
  students: UserListPaginated;
  studentCount: number;
  studentPage: number;
  studentsLoading: boolean;
  parents: UserListPaginated;
  parentCount: number;
  parentPage: number;
  parentsLoading: boolean;
  tutors: UserListPaginated;
  tutorCount: number;
  tutorPage: number;
  tutorsLoading: boolean;
  admins: UserListPaginated;
  adminCount: number;
  adminPage: number;
  adminsLoading: boolean;
  userGrades: filterSingleGradeType[] | null;
  userCountries: singleCountryType[] | null;
  userSyllabuses: filterSingleSyllabusType[] | null;
  userSubjects?: filterSingleSubjectType[] | null;
}

export interface UserType {
  _id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  type: string;
  profileImage?: imageType;
  currentGradeId?: string;
  currentSchoolId?: string;
  currentSyllabusId?: string;
  countryCode: string;
  phone?: string;
  backgroundImage?: imageType;
  dob?: string;
  joinedDate?: string;
  subjectIds?: string[] | null;
}

export interface UserListPaginated {
  [page: number]: UserType[];
}

const INITIAL_STATE: userManagementStateType = {
  allUsers: <UserListPaginated>{},
  allUserCount: 0,
  allUsersPage: 0,
  allUsersLoading: false,
  students: <UserListPaginated>{},
  studentCount: 0,
  studentPage: 0,
  studentsLoading: false,
  parents: <UserListPaginated>{},
  parentCount: 0,
  parentPage: 0,
  parentsLoading: false,
  tutors: <UserListPaginated>{},
  tutorCount: 0,
  tutorPage: 0,
  tutorsLoading: false,
  admins: <UserListPaginated>{},
  adminCount: 0,
  adminPage: 0,
  adminsLoading: false,
  userGrades: [],
  userCountries: [],
  userSyllabuses: [],
  userSubjects: [],
};

const userManagementReducer = (
  state = INITIAL_STATE,
  action: Action
): userManagementStateType => {
  const payload = action?.payload?.dataWrapper;
  const { data = '', totalRecords = 0, page = 0, size = 0 } = payload || {};
  const customInput = action?.payload?.customInput;

  switch (action.type) {
    case GET_ALL_USERS_REQUEST:
      return {
        ...state,
        allUsersLoading: true,
      };
    case GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        allUsersLoading: false,
        allUserCount:
          totalRecords || customInput?.page === 1
            ? totalRecords
            : state.allUserCount,
        allUsersPage: page || state.allUsersPage,
        allUsers: formatToPaginatedData(
          state.allUsers,
          data,
          page,
          customInput
        ),
      };
    case GET_ALL_USERS_FAILED:
      return {
        ...state,
        allUsersLoading: false,
      };
    case GET_ALL_STUDENTS_REQUEST:
      return {
        ...state,
        studentsLoading: true,
      };
    case GET_ALL_STUDENTS_SUCCESS:
      return {
        ...state,
        studentsLoading: false,
        studentCount:
          totalRecords || customInput?.page === 1
            ? totalRecords
            : state.studentCount,
        studentPage: page || state.studentPage,
        students: formatToPaginatedData(
          state.students,
          data,
          page,
          customInput
        ),
      };
    case GET_ALL_STUDENTS_FAILED:
      return {
        ...state,
        studentsLoading: false,
      };
    case GET_ALL_TUTORS_REQUEST:
      return {
        ...state,
        tutorsLoading: true,
      };
    case GET_ALL_TUTORS_SUCCESS:
      return {
        ...state,
        tutorsLoading: false,
        tutorCount:
          totalRecords || customInput?.page === 1
            ? totalRecords
            : state.tutorCount,
        tutorPage: page || state.tutorPage,
        tutors: formatToPaginatedData(state.tutors, data, page, customInput),
      };
    case GET_ALL_TUTORS_FAILED:
      return {
        ...state,
        tutorsLoading: false,
      };
    case GET_ALL_ADMINS_REQUEST:
      return {
        ...state,
        adminsLoading: true,
      };
    case GET_ALL_ADMINS_SUCCESS:
      return {
        ...state,
        adminsLoading: false,
        adminCount:
          totalRecords || customInput?.page === 1
            ? totalRecords
            : state.adminCount,
        adminPage: page || state.adminPage,
        admins: formatToPaginatedData(state.admins, data, page, customInput),
      };
    case GET_ALL_ADMINS_FAILED:
      return {
        ...state,
        adminsLoading: false,
      };

    case GET_USER_GRADES_SUCCESS:
      return {
        ...state,
        userGrades: avoidedDuplicationData(state.userGrades, data, '_id'),
      };
    case GET_USER_COUNTRIES_SUCCESS:
      return {
        ...state,
        userCountries: avoidedDuplicationData(state.userCountries, data, '_id'),
      };
    case GET_USER_SYLLABUSES_SUCCESS:
      return {
        ...state,
        userSyllabuses: avoidedDuplicationData(
          state.userSyllabuses,
          data,
          '_id'
        ),
      };

    case GET_TUTOR_SUBJECTS_SUCCESS:
      return {
        ...state,
        userSubjects: [...(data || [])],
      };

    default:
      return state;
  }
};

const formatToPaginatedData = (
  currentData: UserListPaginated,
  newData: any,
  page: number,
  customInput: any
) => {
  if (newData && page) {
    return {
      ...currentData,
      [page]: [...newData],
    };
  } else if (customInput?.page === 1) {
    return <UserListPaginated>{};
  } else {
    return currentData;
  }
};

export default userManagementReducer;
