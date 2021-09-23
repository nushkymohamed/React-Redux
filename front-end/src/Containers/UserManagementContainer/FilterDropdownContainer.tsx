import React, { FC, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import DropdownWithPagination from '../../Components/FormInput/DropdownInput/DropdownWithPagination';
import { CONTENT_SERVICE } from '../../config/constants';
import {
  filterArrayComparison,
  resetReducerDataByCommonType,
} from '../../Helper';
import useApi from '../../Hooks/useApi';
import usePrevious from '../../Hooks/usePrevious';
import {
  GET_COUNTRIES_DATA_FAILED,
  GET_COUNTRIES_DATA_REQUEST,
  GET_COUNTRIES_DATA_SUCCESS,
  GET_GRADES_DATA_FAILED,
  GET_GRADES_DATA_REQUEST,
  GET_GRADES_DATA_SUCCESS,
  GET_SCHOOLS_DATA_FAILED,
  GET_SCHOOLS_DATA_REQUEST,
  GET_SCHOOLS_DATA_SUCCESS,
  GET_SUBJECTS_DATA_FAILED,
  GET_SUBJECTS_DATA_REQUEST,
  GET_SUBJECTS_DATA_SUCCESS,
  GET_SYLLABUSES_DATA_FAILED,
  GET_SYLLABUSES_DATA_REQUEST,
  GET_SYLLABUSES_DATA_SUCCESS,
  REMOVE_UNSELECTED_GRADES,
  REMOVE_UNSELECTED_SCHOOLS,
  REMOVE_UNSELECTED_SUBJECTS,
  REMOVE_UNSELECTED_SYLLABUSES,
  RESET_GRADES_DATA,
  RESET_SCHOOLS_DATA,
  RESET_SUBJECTS_DATA,
  RESET_SYLLABUSES_DATA,
  SET_SELECTED_COUNTRY_LIST,
  SET_SELECTED_GRADE_LIST,
  SET_SELECTED_SCHOOL_LIST,
  SET_SELECTED_SUBJECT_LIST,
  SET_SELECTED_SYLLABUS_LIST,
} from '../../redux/filters/filterTypes';
import { RootStore } from '../../redux/store';

export interface FilterDropdownContainerProps {
  disableSyllabusDropdown?: boolean;
  disableGradeDropdown?: boolean;
  disableSubjectDropdown?: boolean;
  disableSchoolDropdown?: boolean;
}

const FilterDropdownContainer: FC<FilterDropdownContainerProps> = ({
  disableGradeDropdown,
  disableSchoolDropdown,
  disableSubjectDropdown,
  disableSyllabusDropdown,
}) => {
  const [getCountryApi] = useApi();
  const [getSyllabusApi] = useApi();
  const [getGradesApi] = useApi();
  const [getSubjectsApi] = useApi();
  const [getSchoolsApi] = useApi();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const {
    countries,
    countriesPage,
    countriesSize,
    grades,
    gradesPage,
    gradesSize,
    schools,
    schoolsPage,
    schoolsSize,
    selectedCountryList,
    selectedGradeList,
    selectedSchoolList,
    selectedSubjectList,
    selectedSyllabusList,
    subjects,
    subjectsPage,
    subjectsSize,
    syllabuses,
    syllabusesPage,
    syllabusesSize,
  } = useSelector((state: RootStore) => state.filter);

  const previousCountryList = usePrevious(selectedCountryList);
  const previousSyllabusList = usePrevious(selectedSyllabusList);
  const previousGradeList = usePrevious(selectedGradeList);
  const previousSubjectList = usePrevious(selectedSubjectList);
  const previousSchoolList = usePrevious(selectedSchoolList);

  const getCountry = (page: number) => {
    getCountryApi(
      `/countries?page=${page}&size=${countriesSize}`,
      GET_COUNTRIES_DATA_REQUEST,
      GET_COUNTRIES_DATA_SUCCESS,
      GET_COUNTRIES_DATA_FAILED,
      {},
      {},
      'GET',
      false,
      CONTENT_SERVICE,
      {}
    );
  };
  const getSyllabus = (page: number) => {
    getSyllabusApi(
      `/syllabuses?page=${page}&size=${syllabusesSize}&countryCodes=${selectedCountryList}`,
      GET_SYLLABUSES_DATA_REQUEST,
      GET_SYLLABUSES_DATA_SUCCESS,
      GET_SYLLABUSES_DATA_FAILED,
      {},
      {},
      'GET',
      false,
      CONTENT_SERVICE,
      {}
    );
  };
  const getGrades = (page: number) => {
    getGradesApi(
      `/grades?page=${page}&size=${gradesSize}&syllabusIds=${selectedSyllabusList}`,
      GET_GRADES_DATA_REQUEST,
      GET_GRADES_DATA_SUCCESS,
      GET_GRADES_DATA_FAILED,
      {},
      {},
      'GET',
      false,
      CONTENT_SERVICE,
      {}
    );
  };
  const getSubjects = (page: number) => {
    getSubjectsApi(
      `/subjects?page=${page}&size=${subjectsSize}&gradeIds=${selectedGradeList}`,
      GET_SUBJECTS_DATA_REQUEST,
      GET_SUBJECTS_DATA_SUCCESS,
      GET_SUBJECTS_DATA_FAILED,
      {},
      {},
      'GET',
      false,
      CONTENT_SERVICE,
      {}
    );
  };
  const getSchools = (page: number) => {
    getSchoolsApi(
      `/countries/schools?page=${page}&size=${schoolsSize}&countryCodes=${selectedCountryList}`,
      GET_SCHOOLS_DATA_REQUEST,
      GET_SCHOOLS_DATA_SUCCESS,
      GET_SCHOOLS_DATA_FAILED,
      {},
      {},
      'GET',
      false,
      CONTENT_SERVICE,
      {}
    );
  };

  const onCountrySelect = (countryList: any) => {
    if (!countryList?.length) {
      resetReducerDataByCommonType(dispatch, [
        RESET_SYLLABUSES_DATA,
        RESET_SCHOOLS_DATA,
      ]);
      onSyllabusSelect([]);
      onSchoolSelect([]);
    }

    dispatch({
      type: SET_SELECTED_COUNTRY_LIST,
      payload: { dataWrapper: { data: countryList } },
    });
  };

  const onSyllabusSelect = (syllabusList: any) => {
    if (!syllabusList.length) {
      resetReducerDataByCommonType(dispatch, [RESET_GRADES_DATA]);
      onGradeSelect([]);
    }
    dispatch({
      type: SET_SELECTED_SYLLABUS_LIST,
      payload: { dataWrapper: { data: syllabusList } },
    });
  };
  const onGradeSelect = (gradeList: any) => {
    if (!gradeList?.length) {
      resetReducerDataByCommonType(dispatch, [RESET_SUBJECTS_DATA]);

      onSubjectSelect([]);
    }
    dispatch({
      type: SET_SELECTED_GRADE_LIST,
      payload: { dataWrapper: { data: gradeList } },
    });
  };
  const onSchoolSelect = (schoolList: any) => {
    dispatch({
      type: SET_SELECTED_SCHOOL_LIST,
      payload: { dataWrapper: { data: schoolList } },
    });
  };
  const onSubjectSelect = (subjectList: any) => {
    dispatch({
      type: SET_SELECTED_SUBJECT_LIST,
      payload: { dataWrapper: { data: subjectList } },
    });
  };

  useEffect(() => {
    getCountry(1);
  }, []);

  const getDataOnFilterChange = (
    previousSelectedList: string[] | null,
    currentSelectedList: string[] | null,
    REMOVE_ACTION: string,
    filterKey: string,
    dataFetchMethods: Function[]
  ) => {
    const { newFilters, removedFilters } = filterArrayComparison(
      previousSelectedList,
      currentSelectedList
    );

    if (!previousSelectedList?.length && currentSelectedList?.length) {
      dataFetchMethods.forEach(getDataMethod => getDataMethod(1));
    } else {
      if (removedFilters) {
        dispatch({
          type: REMOVE_ACTION,
          payload: {
            dataWrapper: {
              data: { key: filterKey, value: removedFilters },
            },
          },
        });
      }
      if (newFilters.length) {
        dataFetchMethods.forEach(getDataMethod => getDataMethod(1));
      }
    }
  };

  useEffect(() => {
    //get syllabuses and schools on country change
    getDataOnFilterChange(
      previousCountryList,
      selectedCountryList,
      REMOVE_UNSELECTED_SYLLABUSES,
      'countryCode',
      [getSyllabus]
    );
    getDataOnFilterChange(
      previousCountryList,
      selectedCountryList,
      REMOVE_UNSELECTED_SCHOOLS,
      'countryCode',
      [getSchools]
    );
  }, [selectedCountryList]);

  useEffect(() => {
    //get grades on syllabus change
    getDataOnFilterChange(
      previousSyllabusList,
      selectedSyllabusList,
      REMOVE_UNSELECTED_GRADES,
      'syllabusId',
      [getGrades]
    );
  }, [selectedSyllabusList]);

  useEffect(() => {
    //get subjects on grade change
    getDataOnFilterChange(
      previousGradeList,
      selectedGradeList,
      REMOVE_UNSELECTED_SUBJECTS,
      'gradeId',
      [getSubjects]
    );
  }, [selectedGradeList]);

  const generateCountries = useMemo(() => {
    if (!countries) return [];
    return countries.map(country => ({
      value: country.countryCode,
      label: country.name,
    }));
  }, [countries]);

  const generateSyllabuses = useMemo(() => {
    if (!syllabuses) return [];
    return syllabuses.map(syllabus => ({
      value: syllabus._id,
      label: syllabus.name,
    }));
  }, [syllabuses]);

  const generateGrades = useMemo(() => {
    if (!grades) return [];
    return grades.map(grade => ({
      value: grade._id,
      label: grade.name,
    }));
  }, [grades]);
  const generateSchools = useMemo(() => {
    if (!schools) return [];
    return schools.map(school => ({
      value: school._id,
      label: school.name,
    }));
  }, [schools]);
  const generateSubjects = useMemo(() => {
    if (!subjects) return [];
    return subjects.map(subject => ({
      value: subject._id,
      label: subject.name,
    }));
  }, [subjects]);

  return (
    <div className="usermanagement-wrapper-header-selections">
      <div className="usermanagement-wrapper-header-selections-dropdown-wrapper">
        <DropdownWithPagination
          label={t('Country')}
          placeholder={t('Country')}
          options={generateCountries}
          customOnchangeAction={onCountrySelect}
          scrollCallBack={() => getCountry(countriesPage + 1)}
          hideLabelText
          multiple
          value={selectedCountryList}
          inputClass="usermanagement-wrapper-header-selections-dropdown-wrapper-dropdowns form-input "
        />
      </div>

      {!disableSyllabusDropdown && (
        <div className="usermanagement-wrapper-header-selections-dropdown-wrapper">
          <DropdownWithPagination
            label={t('Syllabus')}
            placeholder={t('Syllabus')}
            options={generateSyllabuses}
            customOnchangeAction={onSyllabusSelect}
            scrollCallBack={() => getSyllabus(syllabusesPage + 1)}
            hideLabelText
            multiple
            value={selectedSyllabusList}
            inputClass="usermanagement-wrapper-header-selections-dropdown-wrapper-dropdowns form-input "
          />
        </div>
      )}

      {!disableGradeDropdown && (
        <div className="usermanagement-wrapper-header-selections-dropdown-wrapper">
          <DropdownWithPagination
            label={t('Grade')}
            placeholder={t('Grade')}
            options={generateGrades}
            customOnchangeAction={onGradeSelect}
            scrollCallBack={() => getGrades(gradesPage + 1)}
            hideLabelText
            multiple
            value={selectedGradeList}
            inputClass="usermanagement-wrapper-header-selections-dropdown-wrapper-dropdowns form-input"
          />
        </div>
      )}

      {!disableSubjectDropdown && (
        <div className="usermanagement-wrapper-header-selections-dropdown-wrapper">
          <DropdownWithPagination
            label={t('Subject')}
            placeholder={t('Subject')}
            options={generateSubjects}
            customOnchangeAction={onSubjectSelect}
            scrollCallBack={() => getSubjects(subjectsPage + 1)}
            hideLabelText
            multiple
            value={selectedSubjectList}
            inputClass="usermanagement-wrapper-header-selections-dropdown-wrapper-dropdowns form-input"
          />
        </div>
      )}
      {!disableSchoolDropdown && (
        <div className="usermanagement-wrapper-header-selections-dropdown-wrapper">
          <DropdownWithPagination
            label={t('School')}
            placeholder={t('School')}
            options={generateSchools}
            customOnchangeAction={onSchoolSelect}
            scrollCallBack={() => getSchools(schoolsPage + 1)}
            hideLabelText
            multiple
            value={selectedSchoolList}
            inputClass="usermanagement-wrapper-header-selections-dropdown-wrapper-dropdowns form-input"
          />
        </div>
      )}
    </div>
  );
};

export default FilterDropdownContainer;
