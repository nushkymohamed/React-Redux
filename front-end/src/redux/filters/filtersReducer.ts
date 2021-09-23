import { avoidedDuplicationData } from '../../Helper';
import {
  singleCountryType,
  singleGradeType,
  singleSchoolType,
  singleSubjectType,
  singleSyllabusType,
} from '../common/commonReducer';
import {
  GET_COUNTRIES_DATA_SUCCESS,
  GET_GRADES_DATA_SUCCESS,
  GET_SCHOOLS_DATA_SUCCESS,
  GET_SUBJECTS_DATA_SUCCESS,
  GET_SYLLABUSES_DATA_SUCCESS,
  REMOVE_UNSELECTED_GRADES,
  REMOVE_UNSELECTED_SCHOOLS,
  REMOVE_UNSELECTED_SUBJECTS,
  REMOVE_UNSELECTED_SYLLABUSES,
  RESET_COUNTRIES_DATA,
  RESET_GRADES_DATA,
  RESET_SCHOOLS_DATA,
  RESET_SUBJECTS_DATA,
  RESET_SYLLABUSES_DATA,
  SET_SELECTED_COUNTRY_LIST,
  SET_SELECTED_GRADE_LIST,
  SET_SELECTED_SCHOOL_LIST,
  SET_SELECTED_SUBJECT_LIST,
  SET_SELECTED_SYLLABUS_LIST,
} from './filterTypes';

export interface filterSingleSubjectType extends singleSubjectType {
  gradeId?: string;
}

export interface filterSingleSchoolType extends singleSchoolType {
  countryCode?: string;
}
export interface filterSingleGradeType extends singleGradeType {
  syllabusId?: string;
}
export interface filterSingleSyllabusType extends singleSyllabusType {
  countryCode?: string;
}

type Action = {
  type: string;
  payload: {
    dataWrapper: {
      data?: any;
      totalRecords?: number;
      email?: string;
      page?: number;
      size?: number;
    };
    customInput: any;
  };
};

export interface filterTypes {
  countries: singleCountryType[] | null;
  grades: filterSingleGradeType[] | null;
  schools: filterSingleSchoolType[] | null;
  subjects: filterSingleSubjectType[] | null;
  syllabuses: filterSingleSyllabusType[] | null;

  countriesSize: number;
  gradesSize: number;
  schoolsSize: number;
  syllabusesSize: number;
  subjectsSize: number;

  selectedCountryList: string[] | null;
  selectedGradeList: string[] | null;
  selectedSchoolList: string[] | null;
  selectedSubjectList: string[] | null;
  selectedSyllabusList: string[] | null;

  countriesPage: number;
  gradesPage: number;
  schoolsPage: number;
  subjectsPage: number;
  syllabusesPage: number;
}

const INITIAL_STATE: filterTypes = {
  countries: null,
  countriesPage: 0,
  countriesSize: 20,
  grades: null,
  gradesPage: 0,
  gradesSize: 20,
  schools: null,
  schoolsPage: 0,
  schoolsSize: 20,
  selectedCountryList: null,
  selectedGradeList: null,
  selectedSchoolList: null,
  selectedSubjectList: null,
  selectedSyllabusList: null,
  subjects: null,
  subjectsPage: 0,
  subjectsSize: 20,
  syllabuses: null,
  syllabusesPage: 0,
  syllabusesSize: 20,
};

const filters = (state = INITIAL_STATE, action: Action): filterTypes => {
  const payload = action?.payload?.dataWrapper;
  const { data = '', totalRecords = 0, page = 0, size = 0 } = payload || {};
  const customInput = action?.payload?.customInput;

  switch (action.type) {
    case GET_COUNTRIES_DATA_SUCCESS:
      return {
        ...state,
        countries: avoidedDuplicationData(state.countries, data, 'countryCode'),
        countriesPage: page || state.countriesPage,
        countriesSize: size || state.countriesSize,
      };

    case GET_SYLLABUSES_DATA_SUCCESS:
      return {
        ...state,
        syllabuses: avoidedDuplicationData(state.syllabuses, data, '_id'),
        syllabusesPage: page || state.syllabusesPage,
        syllabusesSize: size || state.syllabusesSize,
      };

    case GET_GRADES_DATA_SUCCESS:
      return {
        ...state,
        grades: avoidedDuplicationData(state.grades, data, '_id'),
        gradesPage: page || state.gradesPage,
        gradesSize: size || state.gradesSize,
      };

    case GET_SCHOOLS_DATA_SUCCESS:
      return {
        ...state,
        schools: avoidedDuplicationData(state.schools, data, '_id'),
        schoolsPage: page || state.schoolsPage,
        schoolsSize: size || state.schoolsSize,
      };
    case GET_SUBJECTS_DATA_SUCCESS:
      return {
        ...state,
        subjects: avoidedDuplicationData(state.subjects, data, '_id'),
        subjectsPage: page || state.subjectsPage,
        subjectsSize: size || state.subjectsSize,
      };

    case RESET_COUNTRIES_DATA:
      return {
        ...state,
        countries: null,
        countriesPage: 0,
      };
    case RESET_SYLLABUSES_DATA:
      return {
        ...state,
        syllabuses: null,
        syllabusesPage: 0,
      };
    case RESET_GRADES_DATA:
      return {
        ...state,
        grades: null,
        gradesPage: 0,
      };

    case RESET_SCHOOLS_DATA:
      return {
        ...state,
        schools: null,
        schoolsPage: 0,
      };

    case RESET_SUBJECTS_DATA:
      return {
        ...state,
        subjects: null,
        subjectsPage: 0,
        subjectsSize: 20,
      };

    case SET_SELECTED_COUNTRY_LIST:
      return {
        ...state,
        selectedCountryList: data,
      };

    case SET_SELECTED_SYLLABUS_LIST:
      return {
        ...state,
        selectedSyllabusList: data,
      };

    case SET_SELECTED_GRADE_LIST:
      return {
        ...state,
        selectedGradeList: data,
      };

    case SET_SELECTED_SCHOOL_LIST:
      return {
        ...state,
        selectedSchoolList: data,
      };
    case SET_SELECTED_SUBJECT_LIST:
      return {
        ...state,
        selectedSubjectList: data,
      };

    case REMOVE_UNSELECTED_SYLLABUSES:
      return {
        ...state,
        syllabuses: removeUnselected(state.syllabuses, data),
        selectedSyllabusList: removeSelectedItems(
          state.syllabuses,
          state.selectedSyllabusList,
          data
        ),
      };
    case REMOVE_UNSELECTED_GRADES:
      return {
        ...state,
        grades: removeUnselected(state.grades, data),
        selectedGradeList: removeSelectedItems(
          state.grades,
          state.selectedGradeList,
          data
        ),
      };
    case REMOVE_UNSELECTED_SUBJECTS:
      return {
        ...state,
        subjects: removeUnselected(state.subjects, data),
        selectedSubjectList: removeSelectedItems(
          state.subjects,
          state.selectedSubjectList,
          data
        ),
      };
    case REMOVE_UNSELECTED_SCHOOLS:
      return {
        ...state,
        schools: removeUnselected(state.schools, data),
        selectedSchoolList: removeSelectedItems(
          state.schools,
          state.selectedSchoolList,
          data
        ),
      };

    default:
      return state;
  }
};

const removeUnselected = (
  dataList: any[] | null,
  filter: { key: string; value: string[] }
) => {
  if (!dataList) return [];

  return dataList.filter(item => !filter.value.includes(item[filter.key]));
};

const removeSelectedItems = (
  dataList: any[] | null,
  selectedList: string[] | null,
  filter: { key: string; value: string[] }
) => {
  if (!selectedList?.length || !dataList?.length) {
    return [];
  }

  const itemsToRemove = dataList.filter(item =>
    filter.value.includes(item[filter.key])
  );

  const itemKeysToRemove = itemsToRemove.map(item => item?._id);

  return selectedList.filter(
    selectedItem => !itemKeysToRemove.includes(selectedItem)
  );
};

export default filters;
