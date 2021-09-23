import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FcGenericSortingDesc, FcGenericSortingAsc } from 'react-icons/fc';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import LoadingScreen from '../../Components/LoadingScreen/LoadingScreen';
import User from '../../Components/UserManagement/User/User';
import {
  CONTENT_SERVICE,
  UserManagementTabTypes,
  UserManagementURLTabTypes,
  userTypes,
  USER_MANAGEMENT_PAGE_SIZE,
  USER_SERVICE,
} from '../../config/constants';
import useApi from '../../Hooks/useApi';

import { RootStore } from '../../redux/store';
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
  GET_USER_COUNTRIES_FAILED,
  GET_USER_COUNTRIES_REQUEST,
  GET_USER_COUNTRIES_SUCCESS,
  GET_USER_GRADES_FAILED,
  GET_USER_GRADES_REQUEST,
  GET_USER_GRADES_SUCCESS,
} from '../../redux/userManagement/userManagementTypes';
import FilterDropdownContainer from './FilterDropdownContainer';

export type sortDirectionType = 'ASC' | 'DESC';

const UserManagementContainer = () => {
  const [getAllusersApi] = useApi();
  const [getAllStudentsApi] = useApi();
  const [getAllTutorsApi] = useApi();
  const [getAllAdminsApi] = useApi();
  const [getUserGradesApi] = useApi();
  const [getUserCountriesApi] = useApi();
  const { t } = useTranslation();
  const history = useHistory();
  const {
    selectedCountryList,
    selectedGradeList,
    selectedSyllabusList,
    selectedSubjectList,
    selectedSchoolList,
  } = useSelector((state: RootStore) => state.filter);

  const {
    allUsers,
    students,
    parents,
    tutors,
    admins,
    allUserCount,
    studentCount,
    parentCount,
    tutorCount,
    adminCount,
    allUsersLoading,
    tutorsLoading,
    adminsLoading,
    studentsLoading,
    parentsLoading,
    userGrades,
    userCountries,
  } = useSelector((state: RootStore) => state.userManagement);

  const [userCounts, setUserCounts] = useState({
    [UserManagementTabTypes.ALL]: 0,
    [UserManagementTabTypes.STUDENTS]: 0,
    [UserManagementTabTypes.PARENTS]: 0,
    [UserManagementTabTypes.TUTORS]: 0,
    [UserManagementTabTypes.ADMINS]: 0,
  });

  const [visibleFilters, setVisibleFilters] = useState({
    disableGradeDropdown: false,
    disableSchoolDropdown: false,
    disableSubjectDropdown: false,
    disableSyllabusDropdown: false,
  });

  const [sortDirection, setSortDirection] = useState<sortDirectionType>('ASC');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    setUserCounts({
      [UserManagementTabTypes.ALL]: allUserCount,
      [UserManagementTabTypes.STUDENTS]: studentCount,
      [UserManagementTabTypes.PARENTS]: parentCount,
      [UserManagementTabTypes.TUTORS]: tutorCount,
      [UserManagementTabTypes.ADMINS]: adminCount,
    });
  }, [allUserCount, studentCount, parentCount, tutorCount, adminCount]);

  const [selectedTab, setSelectedTab] = useState(UserManagementTabTypes.ALL);

  const TabList = [
    {
      label: 'All',
      type: UserManagementTabTypes.ALL,
    },
    {
      label: 'Students',
      type: UserManagementTabTypes.STUDENTS,
    },
    // {
    //   label: 'Parents',
    //   type: UserManagementTabTypes.PARENTS,
    // },
    {
      label: 'Tutors',
      type: UserManagementTabTypes.TUTORS,
    },
    {
      label: 'Admins',
      type: UserManagementTabTypes.ADMINS,
    },
  ];

  const getAllusers = (page: number) => {
    getAllusersApi(
      `/users?page=${page}&size=${USER_MANAGEMENT_PAGE_SIZE}&direction=${sortDirection}${
        selectedCountryList?.length
          ? `&countryCodes=${selectedCountryList}`
          : ''
      }${searchText ? `&search=${searchText}` : ''}`,
      GET_ALL_USERS_REQUEST,
      GET_ALL_USERS_SUCCESS,
      GET_ALL_USERS_FAILED,
      {},
      {},
      'GET',
      false,
      USER_SERVICE,
      { page }
    );
  };
  const getAllAdmins = (page: number) => {
    getAllAdminsApi(
      `/users?page=${page}&size=${USER_MANAGEMENT_PAGE_SIZE}&direction=${sortDirection}${
        selectedCountryList?.length
          ? `&countryCodes=${selectedCountryList}`
          : ''
      }&type=${userTypes.admin}${searchText ? `&search=${searchText}` : ''}`,
      GET_ALL_ADMINS_REQUEST,
      GET_ALL_ADMINS_SUCCESS,
      GET_ALL_ADMINS_FAILED,
      {},
      {},
      'GET',
      false,
      USER_SERVICE,
      { page }
    );
  };
  const getAllStudents = (page: number) => {
    getAllStudentsApi(
      `/students?page=${page}&size=${USER_MANAGEMENT_PAGE_SIZE}&direction=${sortDirection}${
        selectedCountryList?.length
          ? `&countryCodes=${selectedCountryList}`
          : ''
      }${
        selectedSyllabusList?.length
          ? `&syllabusIds=${selectedSyllabusList}`
          : ''
      }${selectedGradeList?.length ? `&gradeIds=${selectedGradeList}` : ''}${
        selectedSchoolList?.length ? `&schoolIds=${selectedSchoolList}` : ''
      }${searchText ? `&search=${searchText}` : ''}`,
      GET_ALL_STUDENTS_REQUEST,
      GET_ALL_STUDENTS_SUCCESS,
      GET_ALL_STUDENTS_FAILED,
      {},
      {},
      'GET',
      false,
      USER_SERVICE,
      { page }
    );
  };
  const getAllTutors = (page: number) => {
    getAllTutorsApi(
      `/tutors?page=${page}&size=${USER_MANAGEMENT_PAGE_SIZE}&direction=${sortDirection}${
        selectedCountryList?.length
          ? `&countryCodes=${selectedCountryList}`
          : ''
      }${
        selectedSyllabusList?.length
          ? `&syllabusIds=${selectedSyllabusList}`
          : ''
      }${selectedGradeList?.length ? `&gradeIds=${selectedGradeList}` : ''}${
        selectedSubjectList?.length ? `&subjectIds=${selectedSubjectList}` : ''
      }${searchText ? `&search=${searchText}` : ''}`,
      GET_ALL_TUTORS_REQUEST,
      GET_ALL_TUTORS_SUCCESS,
      GET_ALL_TUTORS_FAILED,
      {},
      {},
      'GET',
      false,
      USER_SERVICE,
      { page }
    );
  };

  const getGradesForUsers = (gradeIds: string[]) => {
    gradeIds.length &&
      getUserGradesApi(
        `/grades?page=1&size=${gradeIds.length}&gradeIds=${gradeIds}`,
        GET_USER_GRADES_REQUEST,
        GET_USER_GRADES_SUCCESS,
        GET_USER_GRADES_FAILED,
        {},
        {},
        'GET',
        false,
        CONTENT_SERVICE,
        {}
      );
  };
  const getCountriesForUsers = (countryCodes: string[]) => {
    countryCodes.length &&
      getUserCountriesApi(
        `/countries?page=1&size=${countryCodes.length}&countryCodes=${countryCodes}`,
        GET_USER_COUNTRIES_REQUEST,
        GET_USER_COUNTRIES_SUCCESS,
        GET_USER_COUNTRIES_FAILED,
        {},
        {},
        'GET',
        false,
        CONTENT_SERVICE,
        {}
      );
  };

  useEffect(() => {
    const tabUrlType = history.location.pathname.split('/');
    switch (tabUrlType[tabUrlType.length - 1]) {
      case UserManagementURLTabTypes.TUTORS:
        setSelectedTab(UserManagementTabTypes.TUTORS);
        break;
      default:
        return;
    }
    //get all user details on initial loading to get user counts
    getAllusers(1);
    getAllStudents(1);
    getAllTutors(1);
    getAllAdmins(1);
  }, []);

  const createTutor = () => {
    history.push(`/admin/user-management/create-tutor`);
  };

  const onChangeTab = (tabType: string) => {
    setSelectedTab(tabType);
  };

  const pageCount = useMemo(() => {
    return Math.ceil(userCounts[selectedTab] / USER_MANAGEMENT_PAGE_SIZE);
  }, [userCounts, selectedTab]);

  const userList = useMemo(() => {
    switch (selectedTab) {
      case UserManagementTabTypes.ALL:
        return allUsers;

      case UserManagementTabTypes.ADMINS:
        return admins;

      case UserManagementTabTypes.PARENTS:
        return parents;

      case UserManagementTabTypes.STUDENTS:
        return students;

      case UserManagementTabTypes.TUTORS:
        return tutors;

      default:
        return allUsers;
    }
  }, [allUsers, tutors, students, admins, parents, selectedTab]);

  const usersLoading = useMemo(() => {
    switch (selectedTab) {
      case UserManagementTabTypes.ALL:
        return allUsersLoading;

      case UserManagementTabTypes.ADMINS:
        return adminsLoading;

      case UserManagementTabTypes.PARENTS:
        return parentsLoading;

      case UserManagementTabTypes.STUDENTS:
        return studentsLoading;

      case UserManagementTabTypes.TUTORS:
        return tutorsLoading;

      default:
        return allUsersLoading;
    }
  }, [
    allUsersLoading,
    adminsLoading,
    parentsLoading,
    studentsLoading,
    tutorsLoading,
    selectedTab,
  ]);

  useEffect(() => {
    let currentFilters = { ...visibleFilters };

    switch (selectedTab) {
      case UserManagementTabTypes.ALL:
        currentFilters.disableGradeDropdown = true;
        currentFilters.disableSchoolDropdown = true;
        currentFilters.disableSubjectDropdown = true;
        currentFilters.disableSyllabusDropdown = true;
        break;

      case UserManagementTabTypes.ADMINS:
        currentFilters.disableGradeDropdown = true;
        currentFilters.disableSchoolDropdown = true;
        currentFilters.disableSubjectDropdown = true;
        currentFilters.disableSyllabusDropdown = true;
        break;

      case UserManagementTabTypes.PARENTS:
        currentFilters.disableGradeDropdown = true;
        currentFilters.disableSchoolDropdown = true;
        currentFilters.disableSubjectDropdown = true;
        currentFilters.disableSyllabusDropdown = true;
        break;

      case UserManagementTabTypes.STUDENTS:
        currentFilters.disableGradeDropdown = false;
        currentFilters.disableSchoolDropdown = false;
        currentFilters.disableSubjectDropdown = false;
        currentFilters.disableSyllabusDropdown = false;
        break;

      case UserManagementTabTypes.TUTORS:
        currentFilters.disableGradeDropdown = false;
        currentFilters.disableSchoolDropdown = true;
        currentFilters.disableSubjectDropdown = false;
        currentFilters.disableSyllabusDropdown = false;
        break;

      default:
        break;
    }
    setVisibleFilters(currentFilters);
  }, [selectedTab]);

  useEffect(() => {
    if (selectedTab === UserManagementTabTypes.ALL) {
      getAllusers(1);
    } else if (selectedTab === UserManagementTabTypes.ADMINS) {
      getAllAdmins(1);
    }
  }, [selectedCountryList, selectedTab, sortDirection]);

  useEffect(() => {
    if (selectedTab === UserManagementTabTypes.TUTORS) {
      getAllTutors(1);
    }
  }, [
    selectedCountryList,
    selectedSyllabusList,
    selectedGradeList,
    selectedSubjectList,
    selectedTab,
    sortDirection,
  ]);
  useEffect(() => {
    if (selectedTab === UserManagementTabTypes.STUDENTS) {
      getAllStudents(1);
    }
  }, [
    selectedCountryList,
    selectedSyllabusList,
    selectedGradeList,
    selectedSubjectList,
    selectedSchoolList,
    selectedTab,
    sortDirection,
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedCountryList,
    selectedSyllabusList,
    selectedGradeList,
    selectedSubjectList,
    selectedSchoolList,
    selectedTab,
    sortDirection,
  ]);

  const onPageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage);

    if (
      !userList[selectedPage]?.length ||
      userList[selectedPage]?.length < USER_MANAGEMENT_PAGE_SIZE
    ) {
      switch (selectedTab) {
        case UserManagementTabTypes.ALL:
          getAllusers(selectedPage);
          break;
        case UserManagementTabTypes.STUDENTS:
          getAllStudents(selectedPage);
          break;
        case UserManagementTabTypes.TUTORS:
          getAllTutors(selectedPage);
          break;
        case UserManagementTabTypes.ADMINS:
          getAllAdmins(selectedPage);
          break;
        default:
          getAllusers(selectedPage);
          break;
      }
    }
  };

  const changeSorting = () => {
    setSortDirection(currentSort => (currentSort === 'ASC' ? 'DESC' : 'ASC'));
  };

  let searchTimeout: NodeJS.Timeout;

  useEffect(() => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    searchTimeout = setTimeout(() => {
      setCurrentPage(1);
      switch (selectedTab) {
        case UserManagementTabTypes.ALL:
          getAllusers(1);
          break;
        case UserManagementTabTypes.STUDENTS:
          getAllStudents(1);
          break;
        case UserManagementTabTypes.TUTORS:
          getAllTutors(1);
          break;
        case UserManagementTabTypes.ADMINS:
          getAllAdmins(1);
          break;
        default:
          getAllusers(1);
          break;
      }
    }, 2000);

    return () => {
      clearTimeout(searchTimeout);
    };
  }, [searchText]);

  useEffect(() => {
    if (userList[currentPage]?.length) {
      const gradeIdList: string[] = [];
      const countryCodeList: string[] = [];
      userList[currentPage].forEach(user => {
        if (user.type === userTypes.student && user.currentGradeId) {
          if (!gradeIdList.includes(user.currentGradeId)) {
            gradeIdList.push(user.currentGradeId);
          }
        }
        if (!countryCodeList.includes(user.countryCode)) {
          countryCodeList.push(user.countryCode);
        }
      });

      const availableGradeData = userGrades?.map(grade => grade._id) || [];
      const availablCountryData =
        userCountries?.map(country => country.countryCode) || [];

      const filteredGradeIds = gradeIdList.filter(
        grade => !availableGradeData?.includes(grade)
      );
      const filteredCountryCodes = countryCodeList.filter(
        countryCode => !availablCountryData?.includes(countryCode)
      );

      filteredGradeIds.length && getGradesForUsers(filteredGradeIds);
      filteredCountryCodes.length && getCountriesForUsers(filteredCountryCodes);
    }
  }, [userList]);

  return (
    <div className="container">
      <div className="usermanagement-wrapper">
        <div className="usermanagement-wrapper-header">
          <div className="usermanagement-wrapper-header-title-wrapper">
            <h1 className="usermanagement-wrapper-header-title-wrapper-title">
              {t('User Management')}
            </h1>
          </div>
          <FilterDropdownContainer {...visibleFilters} />
        </div>

        <div className="createContent__body">
          <div className="createContent__body--header usermanagement-wrapper-body-search-wrapper">
            <input
              placeholder={t('Search Name')}
              className="form-input--search usermanagement-wrapper-body-search-wrapper-input"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
            />
            <button
              className="btn btn--filter usermanagement-wrapper-body-search-wrapper-button"
              type="button"
              onClick={changeSorting}
            >
              {sortDirection === 'ASC' ? (
                <FcGenericSortingDesc className="icon color-white small-icon" />
              ) : (
                <FcGenericSortingAsc className="icon color-white small-icon" />
              )}
            </button>
          </div>
        </div>

        <div className="usermanagement-wrapper-body-userlist-wrapper">
          <div className="usermanagement-wrapper-body-userlist-wrapper-users">
            {TabList.map(({ label, type }, i) => {
              return (
                <span
                  className={`usermanagement-wrapper-body-userlist-wrapper-users-section ${
                    selectedTab === type
                      ? 'usermanagement-wrapper-body-userlist-wrapper-users-section-selected'
                      : ''
                  }`}
                  onClick={() => onChangeTab(type)}
                  key={i}
                >
                  {label}
                  <span
                    className={`usermanagement-wrapper-body-userlist-wrapper-users-section-count ${
                      selectedTab === type
                        ? 'usermanagement-wrapper-body-userlist-wrapper-users-section-count-selected'
                        : ''
                    }`}
                  >
                    {userCounts[type]}
                  </span>
                </span>
              );
            })}
          </div>

          {/* Buttons */}
          <div>
            {selectedTab === UserManagementTabTypes.TUTORS && (
              <button
                className="btn usermanagement-wrapper-body-userlist-wrapper-create-user"
                onClick={createTutor}
              >
                {t('Create Tutor')}
              </button>
            )}
          </div>
        </div>

        {usersLoading && <LoadingScreen />}
        {!usersLoading &&
          (!userList[currentPage]?.length ? (
            <div className="noContent">{t('No Users Available')}</div>
          ) : (
            <div className="usermanagement-wrapper-body-userlist">
              {userList[currentPage]?.map(user => (
                <User user={user} key={user._id} selectedTab={selectedTab} />
              ))}
            </div>
          ))}
        {pageCount > 0 && (
          <ReactPaginate
            previousLabel={'<'}
            nextLabel={'>'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={({ selected }) => onPageChange(selected + 1)}
            containerClassName={'react-paginate'}
            activeClassName={'active'}
            forcePage={currentPage - 1}
          />
        )}
      </div>
    </div>
  );
};

export default UserManagementContainer;
