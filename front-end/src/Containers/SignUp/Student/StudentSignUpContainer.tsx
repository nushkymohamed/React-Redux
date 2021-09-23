import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Slider from 'react-slick';
import { useTranslation } from 'react-i18next';

import StudentStepOne from '../../../Components/SignUp/Student/StudentSignUpStepOne';
import StudentStepTwo from '../../../Components/SignUp/Student/StudentSignUpStepTwo';
import useApi from '../../../Hooks/useApi';

import {
  RESET_SIGNUP_FETCH,
  STUDENT_SIGNUP_FAILED,
  STUDENT_SIGNUP_REQUEST,
  STUDENT_SIGNUP_SUCCESS,
} from '../../../redux/signup/signupTypes';
import {
  GET_COUNTRIES_FAILED,
  GET_COUNTRIES_REQUEST,
  GET_COUNTRIES_SUCCESS,
  GET_GRADES_FAILED,
  GET_GRADES_REQUEST,
  GET_GRADES_SUCCESS,
  GET_SCHOOLS_FAILED,
  GET_SCHOOLS_REQUEST,
  GET_SCHOOLS_SUCCESS,
  GET_SYLLABUSES_FAILED,
  GET_SYLLABUSES_REQUEST,
  GET_SYLLABUSES_SUCCESS,
  GET_USEREXIST_FAILED,
  GET_USEREXIST_REQUEST,
  GET_USEREXIST_SUCCESS,
  RESET_USEREXIST_FETCH,
  SET_SELECTED_COUNTRY,
  SET_SELECTED_GRADE,
  SET_SELECTED_SCHOOL,
  SET_SELECTED_SYLLABUS,
} from '../../../redux/common/commonTypes';
import {
  CONTENT_SERVICE,
  TIMER,
  USER_SERVICE,
  userTypes,
} from '../../../config/constants';
import EmailResendModal from '../../../Components/Modal/EmailResendModal';
import { RootStore } from '../../../redux/store';

interface FormTypes {
  type?: string;
  email?: string;
  phone?: string;
  country?: string;
  lastName?: string;
  password?: string;
  firstName?: string;
  grade?: string;
  school?: string;
  syllabus?: string;
  dateOfBirth?: string;
}

const StudentSignUpContainer = () => {
  const { t } = useTranslation();

  const sliderRef = useRef<any>();
  const history = useHistory();
  const dispatch = useDispatch();
  const [getCountryApi] = useApi();
  const [getDataApi] = useApi();
  const [registerStudent] = useApi();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState<FormTypes>({
    type: userTypes.student,
  });
  const [isEmailModelOpen, setIsEmailModelOpen] = useState(false);
  const { success, error: signUpError } = useSelector(
    (state: RootStore) => state.signup
  );
  const {
    countries,
    grades,
    schools,
    selectedCountry,
    selectedGrade,
    selectedSyllabus,
    syllabuses,
    isUserExist,
    isUserExistLoading,
  } = useSelector((state: RootStore) => state.common);

  useEffect((): any => {
    return () => {
      dispatch({
        type: RESET_SIGNUP_FETCH,
      });

      dispatch({
        type: RESET_USEREXIST_FETCH,
      });
    };
  }, []);

  useEffect(() => {
    success && setIsEmailModelOpen(true);
  }, [success]);

  useEffect(() => {
    getCountryApi(
      '/countries',
      GET_COUNTRIES_REQUEST,
      GET_COUNTRIES_SUCCESS,
      GET_COUNTRIES_FAILED,
      {},
      {},
      'GET',
      false,
      CONTENT_SERVICE,
      {}
    );
  }, []);

  const getIsUserExist = (email: string) => {
    getDataApi(
      `/users/${email}/id`,
      GET_USEREXIST_REQUEST,
      GET_USEREXIST_SUCCESS,
      GET_USEREXIST_FAILED,
      {},
      {},
      'GET',
      false,
      USER_SERVICE
    );
  };

  useEffect(() => {
    if (isUserExist == null || isUserExist || isUserExistLoading) return;
    sliderRef?.current && sliderRef.current.slickNext();
    window.scrollTo(0, 0);
  }, [isUserExist, isUserExistLoading]);

  const submitAllData = () => {
    const {
      type,
      email,
      phone,
      grade,
      school,
      country,
      lastName,
      syllabus,
      password,
      firstName,
      dateOfBirth,
    } = formData;

    let signUpData = {
      type,
      email,
      phone: phone?.slice(1),
      lastName,
      password,
      firstName,
      dob: moment(dateOfBirth).format('DD/MM/YYYY'),
      countryCode: country,
      currentSyllabusId: syllabus,
      currentGradeId: grade,
      currentSchoolId: school,
    };

    registerStudent(
      `/users`,
      STUDENT_SIGNUP_REQUEST,
      STUDENT_SIGNUP_SUCCESS,
      STUDENT_SIGNUP_FAILED,
      signUpData,
      {},
      'POST',
      false,
      USER_SERVICE,
      {}
    );
  };

  const updateFormData = (data: FormTypes) => {
    setFormData(currentFormData => Object.assign(currentFormData, data));
  };

  const sliderSettings = {
    speed: 500,
    dots: false,
    swipe: false,
    arrows: false,
    infinite: false,
    slidesToShow: 1,
    initialSlide: 0,
    draggable: false,
    slidesToScroll: 1,
    swipeToSlide: false,
    beforeChange: (current: any, next: any) => setCurrentSlide(next),
  };

  const goToNext = (email: string) => {
    if (currentSlide) {
      submitAllData();
    } else {
      getIsUserExist(email);
    }
  };

  const goToPrevious = () => {
    if (!currentSlide) {
      history.goBack();
      return;
    }
    sliderRef?.current && sliderRef.current.slickPrev();
  };

  const selectCountry = (country: string) => {
    dispatch({
      type: SET_SELECTED_COUNTRY,
      payload: { dataWrapper: { data: country } },
    });
  };
  const selectSyllabus = (syllabus: string) => {
    dispatch({
      type: SET_SELECTED_SYLLABUS,
      payload: { dataWrapper: { data: syllabus } },
    });
  };
  const selectGrade = (grade: string) => {
    dispatch({
      type: SET_SELECTED_GRADE,
      payload: { dataWrapper: { data: grade } },
    });
  };
  const selectSchool = (school: string) => {
    dispatch({
      type: SET_SELECTED_SCHOOL,
      sypayload: { dataWrapper: { data: school } },
    });
  };

  useEffect(() => {
    const getSyllabuses = () => {
      getDataApi(
        `/countries/${selectedCountry}/syllabuses?page=1&size=20`,
        GET_SYLLABUSES_REQUEST,
        GET_SYLLABUSES_SUCCESS,
        GET_SYLLABUSES_FAILED,
        {},
        {},
        'GET',
        false,
        CONTENT_SERVICE,
        {}
      );
    };
    selectedCountry && getSyllabuses();
  }, [selectedCountry]);

  useEffect(() => {
    const getGrades = () => {
      getDataApi(
        `/syllabuses/${selectedSyllabus}/grades?page=1&size=20`,
        GET_GRADES_REQUEST,
        GET_GRADES_SUCCESS,
        GET_GRADES_FAILED,
        {},
        {},
        'GET',
        false,
        CONTENT_SERVICE,
        {}
      );
    };
    selectedSyllabus && getGrades();
  }, [selectedSyllabus]);

  useEffect(() => {
    const getSchools = () => {
      getDataApi(
        `/countries/${selectedCountry}/schools?syllabusId=${selectedSyllabus}&gradeId=${selectedGrade}&page=1&size=20`,
        GET_SCHOOLS_REQUEST,
        GET_SCHOOLS_SUCCESS,
        GET_SCHOOLS_FAILED,
        {},
        {},
        'GET',
        false,
        CONTENT_SERVICE,
        {}
      );
    };
    selectedGrade && selectedSyllabus && selectedCountry && getSchools();
  }, [selectedGrade]);

  return (
    <>
      <div className="signup-page signup-page--form">
        <div className="container">
          <div className="signup-page__wrapper">
            <div className="signup-page__title">
              <h2>{t('Student Signup')}</h2>
              <p>{t('Please enter your basic details')}</p>
            </div>
            <div className="signup-page__form">
              <Slider {...sliderSettings} ref={sliderRef}>
                <div>
                  <StudentStepOne
                    goToNext={(email: string) => goToNext(email)}
                    countries={countries}
                    onSubmit={updateFormData}
                    goToPrevious={goToPrevious}
                    selectCountry={selectCountry}
                    isUserExist={isUserExist}
                    isUserExistLoading={isUserExistLoading}
                  />
                </div>
                <div>
                  <StudentStepTwo
                    grades={grades}
                    schools={schools}
                    goToNext={goToNext}
                    syllabuses={syllabuses}
                    onSubmit={updateFormData}
                    selectGrade={selectGrade}
                    goToPrevious={goToPrevious}
                    selectSchool={selectSchool}
                    selectSyllabus={selectSyllabus}
                    signUpError={signUpError}
                  />
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </div>

      {isEmailModelOpen && <EmailResendModal email={formData.email} />}
    </>
  );
};

export default StudentSignUpContainer;
