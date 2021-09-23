import React, { FC, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddTutorMode from '../../../Components/Modal/AddTutorModel';
import {
  CONTENT_SERVICE,
  userTypes,
  USER_SERVICE,
} from '../../../config/constants';

import useApi from '../../../Hooks/useApi';
import { reelTutors } from '../../../redux/product/productReducer';
import { UPDATE_TUTOR_BULK } from '../../../redux/product/productTypes';
import { RootStore } from '../../../redux/store';
import { UserType } from '../../../redux/userManagement/userManagementReducer';
import {
  GET_ALL_TUTORS_REQUEST,
  GET_ALL_TUTORS_SUCCESS,
  GET_ALL_TUTORS_FAILED,
  GET_TUTOR_SUBJECTS_FAIL,
  GET_TUTOR_SUBJECTS_REQUEST,
  GET_TUTOR_SUBJECTS_SUCCESS,
  GET_USER_COUNTRIES_FAILED,
  GET_USER_COUNTRIES_REQUEST,
  GET_USER_COUNTRIES_SUCCESS,
  GET_USER_GRADES_FAILED,
  GET_USER_GRADES_REQUEST,
  GET_USER_GRADES_SUCCESS,
  GET_USER_SYLLABUSES_FAILED,
  GET_USER_SYLLABUSES_REQUEST,
  GET_USER_SYLLABUSES_SUCCESS,
} from '../../../redux/userManagement/userManagementTypes';

import TutorTable from './Table/TutorTable';

interface onFormSubmit {
  onFormSubmit: Function;
  goToPrevious: Function;
}

const TutorSlideContainer: FC<onFormSubmit> = ({
  onFormSubmit,
  goToPrevious,
}) => {
  const {
    productTutorIdList,
    countryCodeList,
  } = useSelector((state: RootStore) => state.products);

  const [isOpenAddTutorModel, setIsOpenAddTutorModel] =
    useState<boolean>(false);
  const {
    allUserCount,
    userGrades,
    userCountries,
    userSyllabuses,
    userSubjects,
    tutors,
  } = useSelector((state: RootStore) => state.userManagement);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<UserType[]>([]);
  const [tutorsRequest] = useApi();
  const [subjectsRequest] = useApi();
  const [getUserGradesApi] = useApi();
  const [getUserCountriesApi] = useApi();
  const [getUserSyllabusesApi] = useApi();
  const dispatch = useDispatch();

  const userPageSize = 10;

  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
        sortType: 'basic',
      },
      {
        Header: 'Email',
        accessor: 'email',
        sortType: 'basic',
      },
    ],
    []
  );

  const [tutorList, setTutorList] = useState<any[]>([]);

  const mappedTutorList = (productTutorIdList: reelTutors[]) => {
    return (
      productTutorIdList?.map(
        ({ firstName, lastName, email, _id, isTutorSelected, ...obj }) => ({
          _id,
          name: `${firstName || ''} ${lastName || ''}`,
          email: email,
          isTutorSelected,
          ...obj,
        })
      ) || []
    );
  };

  useEffect(() => {
    const tutorList = mappedTutorList(productTutorIdList || []);
    setTutorList(tutorList || []);
  }, [productTutorIdList]);

  useEffect(() => {
    countryCodeList?.length && fetchAllTutors(1);
  }, [countryCodeList]);

  const fetchAllTutors = (page: number) => {
    tutorsRequest(
      `/users?page=${page}&size=${userPageSize}&direction=ASC&countryCodes=${countryCodeList}&type=${
        userTypes.tutor
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

  const getSubjectsForTutors = (subjectIds: string[]) => {
    subjectIds.length &&
      subjectsRequest(
        `/subjects?subjectIds=${subjectIds}`,
        GET_TUTOR_SUBJECTS_REQUEST,
        GET_TUTOR_SUBJECTS_SUCCESS,
        GET_TUTOR_SUBJECTS_FAIL,
        {},
        {},
        'GET',
        false,
        CONTENT_SERVICE,
        {}
      );
  };

  const getSyllabusesForUsers = (syllabusIds: string[]) => {
    syllabusIds.length &&
      getUserSyllabusesApi(
        `/syllabuses?page=1&size=${syllabusIds.length}&syllabusIds=${syllabusIds}`,
        GET_USER_SYLLABUSES_REQUEST,
        GET_USER_SYLLABUSES_SUCCESS,
        GET_USER_SYLLABUSES_FAILED,
        {},
        {},
        'GET',
        false,
        CONTENT_SERVICE,
        {}
      );
  };
  const updateTutorList = (users: any) => {
    dispatch({
      type: UPDATE_TUTOR_BULK,
      payload: { dataWrapper: { data: users } },
    });
  };
  useEffect(() => {
    if (!selectedUsers.length) return;
    const existingTutor = productTutorIdList?.map(u => u._id);
    const formattedNewTutor = selectedUsers
      .filter(u => !existingTutor?.includes(u._id))
      .map(user => {
        return {
          ...user,
          isNotActiveContent: true,
        };
      });
    updateTutorList([...(productTutorIdList || []), ...formattedNewTutor]);
    setSelectedUsers([]);
  }, [selectedUsers]);
  useEffect(() => {
    if (tutors[currentPage]?.length) {
      const countryCodeList: string[] = [];
      const newSubjectIds: string[] = [];

      tutors[currentPage].forEach(user => {
        if (user.type === userTypes.tutor) {
          if (user?.subjectIds) {
            user?.subjectIds.forEach(sId => {
              !newSubjectIds.includes(sId) && newSubjectIds.push(sId);
            });
          }
        }
        if (!countryCodeList.includes(user.countryCode)) {
          countryCodeList.push(user.countryCode);
        }
      });
      const availableCountryData =
        userCountries?.map(country => country.countryCode) || [];
      const availableSubjectIds =
        userSubjects?.map(subject => subject._id) || [];

      const filteredCountryCodes = countryCodeList.filter(
        countryCode => !availableCountryData?.includes(countryCode)
      );

      const filteredSubjectIds = newSubjectIds?.filter(
        id => !availableSubjectIds?.includes(id)
      );

      filteredCountryCodes.length && getCountriesForUsers(filteredCountryCodes);
      filteredSubjectIds.length && getSubjectsForTutors(filteredSubjectIds);
    }
  }, [tutors]);

  useEffect(() => {
    if (!userSubjects?.length) return;

    const gradeIdList: string[] = [];

    userSubjects?.forEach(subject => {
      if (subject?.gradeId && !gradeIdList.includes(subject?.gradeId)) {
        gradeIdList.push(subject?.gradeId);
      }
    });
    const availableGradeIds = userGrades?.map(grade => grade?._id) || [];
    const filteredGradeIds = gradeIdList?.filter(
      id => !availableGradeIds?.includes(id)
    );

    filteredGradeIds?.length && getGradesForUsers(filteredGradeIds);
  }, [userSubjects]);

  useEffect(() => {
    if (!userGrades?.length) return;
    const syllabusIds: string[] = [];

    userGrades?.forEach(grade => {
      if (grade?.syllabusId && !syllabusIds?.includes(grade?.syllabusId)) {
        syllabusIds.push(grade?.syllabusId);
      }
    });

    const availableSyllabusIds = userSyllabuses?.map(grade => grade._id);
    const filteredSyllabusIds = syllabusIds?.filter(
      id => !availableSyllabusIds?.includes(id)
    );
    filteredSyllabusIds?.length && getSyllabusesForUsers(filteredSyllabusIds);
  }, [userGrades]);

  let searchTimeout: NodeJS.Timeout;

  useEffect(() => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    searchTimeout = setTimeout(() => {
      setCurrentPage(1);
      fetchAllTutors(1);
    }, 2000);

    return () => {
      clearTimeout(searchTimeout);
    };
  }, [searchText]);
  const onPageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage);

    if (!tutors[selectedPage]?.length || tutors[selectedPage]?.length < 10) {
      fetchAllTutors(selectedPage);
    }
  };
  const addSelectedUsers = (userList: UserType[]) => {
    setSelectedUsers(currentUsers => [...currentUsers, ...userList]);
  };

  return (
    <>
      <TutorTable
        columns={columns}
        data={tutorList}
        addTutor={() => setIsOpenAddTutorModel(true)}
        onFormSubmit={onFormSubmit}
        goToPrevious={goToPrevious}
      />

      {isOpenAddTutorModel && (
        <AddTutorMode
          onClickAway={() => setIsOpenAddTutorModel(false)}
          userData={tutors}
          page={currentPage}
          onPageClick={onPageChange}
          totalRecords={allUserCount}
          userCountries={userCountries}
          userGrades={userGrades}
          userSyllabuses={userSyllabuses}
          setSearchText={setSearchText}
          addSelectedUsers={addSelectedUsers}
          existingUsers={tutorList || []}
          userSubjects={userSubjects || []}
        />
      )}
    </>
  );
};

export default TutorSlideContainer;
