import moment from 'moment';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
//component imports
import LoadingScreen from '../../Components/LoadingScreen/LoadingScreen';
import AdminEditPage from '../../Components/ProfilePages/TabOverview/EditProfile/Admin/AdminEditPage';
import StudentEditPage from '../../Components/ProfilePages/TabOverview/EditProfile/Student/StudentEditPage';
import AdminViewPage from '../../Components/ProfilePages/TabOverview/ViewProfile/Admin/AdminViewPage';
import StudentViewPage from '../../Components/ProfilePages/TabOverview/ViewProfile/Student/StudentViewPage';
import TutorViewPage from '../../Components/ProfilePages/TabOverview/ViewProfile/Tutor/TutorViewPage';
import {
  CONTENT_SERVICE,
  userTypes,
  USER_SERVICE,
} from '../../config/constants';
//helper class imports
import {
  generateTutorEducatinalData,
  getDistinctArray,
} from '../../Helper/index';
import useApi from '../../Hooks/useApi';
import {
  USER_TYPE_UPDATE_FAILED,
  USER_TYPE_UPDATE_REQUEST,
  USER_TYPE_UPDATE_SUCCESS,
} from '../../redux/auth/authTypes';
//redux
import { RootStore } from '../../redux/store';
import {
  GET_COUNTRY_DETAILS_FAILED,
  GET_COUNTRY_DETAILS_REQUEST,
  GET_COUNTRY_DETAILS__SUCCESS,
  GET_GRADE_DETAILS_FAILED,
  GET_GRADE_DETAILS_REQUEST,
  GET_GRADE_DETAILS__SUCCESS,
  GET_SCHOOL_DETAILS_FAILED,
  GET_SCHOOL_DETAILS_REQUEST,
  GET_SCHOOL_DETAILS__SUCCESS,
  GET_SUBJECTS_DETAILS_FAILED,
  GET_SUBJECTS_DETAILS_REQUEST,
  GET_SUBJECTS_DETAILS_SUCCESS,
  GET_SYLLABUS_DETAILS_FAILED,
  GET_SYLLABUS_DETAILS_REQUEST,
  GET_SYLLABUS_DETAILS__SUCCESS,
  GET_TUTOR_COUNTRY_FAILED,
  GET_TUTOR_COUNTRY_REQUEST,
  GET_TUTOR_COUNTRY_SUCCESS,
  GET_TUTOR_GRADES_FAILED,
  GET_TUTOR_GRADES_REQUEST,
  GET_TUTOR_GRADES_SUCCESS,
  GET_TUTOR_SYLLABUS_FAILED,
  GET_TUTOR_SYLLABUS_REQUEST,
  GET_TUTOR_SYLLABUS_SUCCESS,
  GET_USER_DETAILS_FAILED,
  GET_USER_DETAILS_REQUEST,
  GET_USER_DETAILS__SUCCESS,
  RESET_INDIVIDUAL_USER_MANAGEMENT,
} from '../../redux/userManagement/userManagementTypes';

const UserDetailsContainer = (props: any) => {
  const { userId, userType } = props.match.params;
  const [getUserInformation] = useApi();
  const [getUserCountryDetails] = useApi();
  const [getUserGradesDetails] = useApi();
  const [getUserSyllabusDetails] = useApi();
  const [getUserSchoolDetails] = useApi();
  const [getUserSubjectDetails] = useApi();
  const [userUpdate] = useApi();

  const { t } = useTranslation();

  //edit <==> view toggle states
  const [adminEdit, setAdminEdit] = useState<boolean>(false);
  const [studentEdit, setStudentEdit] = useState<boolean>(false);
  const [tutorEducationalData, setTutorEducationalData] = useState<any[]>();
  const history = useHistory();
  const dispatch = useDispatch();

  //redux global states
  const {
    userData,
    usersLoading,
    countryData,
    gradeData,
    syllabusData,
    schoolData,
    tutorSubjectData,
    tutorGradesData,
    tutorSyllabusData,
    tutorCountryData,
  } = useSelector((state: RootStore) => state.userIndividualManagement);

  const { userData: loggedUserData } = useSelector(
    (state: RootStore) => state.auth
  );

  //check logged user and profile details type
  const checkIsEdit = useMemo(() => {
    if (loggedUserData?.type === userTypes.admin) {
      if (userType === userTypes.admin) {
        if (loggedUserData?._id === userId) {
          return true;
        }
      } else if (userType === userTypes.tutor) {
        return true;
      }
      return false;
    } else {
      if (loggedUserData?._id === userId) {
        return true;
      }
      return false;
    }
  }, []);

  //toggle edit to view
  const toggleHandler = useCallback(
    type => {
      //toggle admin
      if (type === userTypes.admin) {
        setAdminEdit(!adminEdit);
      }
      //toggle student
      if (type === userTypes.student) {
        setStudentEdit(!studentEdit);
      }
    },
    [adminEdit, studentEdit]
  );

  //update user details
  const userUpdateDetails = (data: any, type: any) => {
    var updatedData: any = {
      _id: userData?._id,
      type: userData?.type,
      ...data,
    };

    if (type === userTypes.student) {
      updatedData['dob'] = moment(data['dob']).format('DD/MM/YYYY');
    }

    userUpdate(
      `/users`,
      USER_TYPE_UPDATE_REQUEST,
      USER_TYPE_UPDATE_SUCCESS,
      USER_TYPE_UPDATE_FAILED,
      updatedData,
      {},
      'PUT',
      false,
      USER_SERVICE
    );
  };

  useEffect(() => {
    !adminEdit &&
      !studentEdit &&
      getUserInformation(
        `/users?userIds=${userId}`,
        GET_USER_DETAILS_REQUEST,
        GET_USER_DETAILS__SUCCESS,
        GET_USER_DETAILS_FAILED,
        {},
        {},
        'GET',
        false,
        USER_SERVICE,
        {}
      );
  }, [adminEdit, studentEdit]);

  //unmound delete all data
  useEffect(() => {
    return () => {
      dispatch({
        type: RESET_INDIVIDUAL_USER_MANAGEMENT,
      });
    };
  }, []);

  //country details
  const getCountryDetailsData = (
    countryId: any,
    typeReq: any,
    typeSuccess: any,
    typeFail: any
  ) => {
    getUserCountryDetails(
      `/countries?countryCodes=${countryId}`,
      typeReq,
      typeSuccess,
      typeFail,
      {},
      {},
      'GET',
      false,
      CONTENT_SERVICE,
      {}
    );
  };
  //grades details
  const getGradesDetailsData = (
    gradeId: any,
    typeReq: any,
    typeSuccess: any,
    typeFail: any
  ) => {
    getUserGradesDetails(
      `/grades?gradeIds=${gradeId}&page=1&size=15`,
      typeReq,
      typeSuccess,
      typeFail,
      {},
      {},
      'GET',
      false,
      CONTENT_SERVICE,
      {}
    );
  };

  //syllabus details
  const getSyllabusDetailsData = (
    syllabusId: any,
    typeReq: any,
    typeSuccess: any,
    typeFail: any
  ) => {
    getUserSyllabusDetails(
      `/syllabuses?syllabusIds=${syllabusId}&page=1&size=15`,
      typeReq,
      typeSuccess,
      typeFail,
      {},
      {},
      'GET',
      false,
      CONTENT_SERVICE,
      {}
    );
  };

  //school details
  const getSchoolDetailsData = () => {
    getUserSchoolDetails(
      `/countries/${userData?.countryCode}/schools?schoolId=${userData?.currentSchoolId}&page=1&size=5`,
      GET_SCHOOL_DETAILS_REQUEST,
      GET_SCHOOL_DETAILS__SUCCESS,
      GET_SCHOOL_DETAILS_FAILED,
      {},
      {},
      'GET',
      false,
      CONTENT_SERVICE,
      {}
    );
  };
  //subjects details
  const getSubjectDetailsData = () => {
    getUserSubjectDetails(
      `/subjects?subjectIds=${getDistinctArray(
        userData?.subjectIds
      )}&page=1&size=15`,
      GET_SUBJECTS_DETAILS_REQUEST,
      GET_SUBJECTS_DETAILS_SUCCESS,
      GET_SUBJECTS_DETAILS_FAILED,
      {},
      {},
      'GET',
      false,
      CONTENT_SERVICE,
      {}
    );
  };

  useEffect(() => {
    if (userData?.type === userTypes.student) {
      userData?.countryCode &&
        getCountryDetailsData(
          userData.countryCode,
          GET_COUNTRY_DETAILS_REQUEST,
          GET_COUNTRY_DETAILS__SUCCESS,
          GET_COUNTRY_DETAILS_FAILED
        );
      userData?.currentGradeId &&
        getGradesDetailsData(
          userData.currentGradeId,
          GET_GRADE_DETAILS_REQUEST,
          GET_GRADE_DETAILS__SUCCESS,
          GET_GRADE_DETAILS_FAILED
        );
      userData?.currentSyllabusId &&
        getSyllabusDetailsData(
          userData.currentSyllabusId,
          GET_SYLLABUS_DETAILS_REQUEST,
          GET_SYLLABUS_DETAILS__SUCCESS,
          GET_SYLLABUS_DETAILS_FAILED
        );
      userData?.countryCode &&
        userData?.currentSchoolId &&
        getSchoolDetailsData();
    } else if (userData?.type === userTypes.tutor) {
      userData?.subjectIds?.length && getSubjectDetailsData();
      userData?.countryCode &&
        getCountryDetailsData(
          userData.countryCode,
          GET_COUNTRY_DETAILS_REQUEST,
          GET_COUNTRY_DETAILS__SUCCESS,
          GET_COUNTRY_DETAILS_FAILED
        );
    }
  }, [userData]);

  //get grade ids for tutor
  useEffect(() => {
    const gradeIds = tutorSubjectData?.map(data => {
      return data?.gradeId;
    });

    gradeIds?.length &&
      getGradesDetailsData(
        getDistinctArray(gradeIds),
        GET_TUTOR_GRADES_REQUEST,
        GET_TUTOR_GRADES_SUCCESS,
        GET_TUTOR_GRADES_FAILED
      );
  }, [tutorSubjectData]);

  //get syllabus ids for tutor
  useEffect(() => {
    const syllabusIds = tutorGradesData?.map(data => {
      return data?.syllabusId;
    });

    syllabusIds?.length &&
      getSyllabusDetailsData(
        getDistinctArray(syllabusIds),
        GET_TUTOR_SYLLABUS_REQUEST,
        GET_TUTOR_SYLLABUS_SUCCESS,
        GET_TUTOR_SYLLABUS_FAILED
      );
  }, [tutorGradesData]);

  //get country details for tutor
  useEffect(() => {
    const countryCodes = tutorSyllabusData?.map(data => {
      return data?.countryCode;
    });
    countryCodes?.length &&
      getCountryDetailsData(
        getDistinctArray(countryCodes),
        GET_TUTOR_COUNTRY_REQUEST,
        GET_TUTOR_COUNTRY_SUCCESS,
        GET_TUTOR_COUNTRY_FAILED
      );
  }, [tutorSyllabusData]);

  //generate tutor educatinal data
  useEffect(() => {
    if (
      tutorCountryData &&
      tutorSyllabusData &&
      tutorGradesData &&
      tutorSubjectData
    ) {
      const generatedMapData = generateTutorEducatinalData(
        tutorCountryData,
        tutorSyllabusData,
        tutorGradesData,
        tutorSubjectData
      );
      setTutorEducationalData(generatedMapData);
    }
  }, [tutorCountryData]);

  //invalid user id pop back
  useEffect(() => {
    !usersLoading && !userData && history.goBack();
  }, [usersLoading]);

  return (
    <>
      {/* admin view & edit */}
      {userType === userTypes.admin &&
        (!usersLoading ? (
          userData ? (
            adminEdit ? (
              <AdminEditPage
                userData={userData}
                toggleHandler={toggleHandler}
                userUpdateDetails={userUpdateDetails}
                isEdit={checkIsEdit}
              />
            ) : (
              <AdminViewPage
                userData={userData}
                toggleHandler={toggleHandler}
                isEdit={checkIsEdit}
              />
            )
          ) : (
            <div>{t('something went wrong!')}</div>
          )
        ) : (
          <LoadingScreen />
        ))}

      {/* tutor view & edit */}
      {userType === userTypes.tutor &&
        (!usersLoading ? (
          userData ? (
            <TutorViewPage
              userData={userData}
              isEdit={checkIsEdit}
              countryData={countryData}
              tutorEducatinalData={tutorEducationalData}
            />
          ) : (
            <div>{t('something went wrong!')}</div>
          )
        ) : (
          <LoadingScreen />
        ))}

      {/* student  view & edit  */}
      {userType === userTypes.student &&
        (!usersLoading ? (
          userData ? (
            studentEdit ? (
              <StudentEditPage
                userData={userData}
                countryData={countryData}
                gradeData={gradeData}
                syllabusData={syllabusData}
                schoolData={schoolData}
                userOrigin={loggedUserData?._id === userId}
                toggleHandler={toggleHandler}
                userUpdateDetails={userUpdateDetails}
              />
            ) : (
              <StudentViewPage
                userData={userData}
                countryData={countryData}
                gradeData={gradeData}
                syllabusData={syllabusData}
                schoolData={schoolData}
                isEdit={checkIsEdit}
                userOrigin={loggedUserData?._id === userId}
                toggleHandler={toggleHandler}
              />
            )
          ) : (
            <div> {t('something went wrong!')}</div>
          )
        ) : (
          <LoadingScreen />
        ))}
    </>
  );
};

export default UserDetailsContainer;
