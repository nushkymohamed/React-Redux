import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import DropdownInput from '../../Components/FormInput/DropdownInput';
import {
  ADMIN_MENU_LIST,
  CONTENT_SERVICE,
  userRoles,
} from '../../config/constants';
import useApi from '../../Hooks/useApi';
import {
  GET_GRADES_FAILED,
  GET_GRADES_REQUEST,
  GET_GRADES_SUCCESS,
  GET_SYLLABUSES_FAILED,
  GET_SYLLABUSES_REQUEST,
  GET_SYLLABUSES_SUCCESS,
  RESET_GRADES,
  RESET_SUBJECTS,
  SET_SELECTED_GRADE,
  SET_SELECTED_SYLLABUS,
} from '../../redux/common/commonTypes';
import { RootStore } from '../../redux/store';

interface AdminProps {
  history?: any;
}

const AdminHomeContainer: FC<AdminProps> = ({ history }) => {
  const { t } = useTranslation();
  const contentDivRef = useRef<any>();
  const [getSyllabusData] = useApi();
  const [getGradeData] = useApi();
  const [expand, setExpand] = useState(false);

  const [defaultSyllabus, setDefaultSyllabus] = useState<any>(null);
  const [defaultGrade, setDefaultGrade] = useState<any>(null);

  const dispatch = useDispatch();
  const { handleSubmit, errors, control, setValue } = useForm({
    shouldFocusError: true,
  });
  const { grades, syllabuses, selectedGrade, selectedSyllabus } = useSelector(
    (state: RootStore) => state.common
  );
  const { user } = useSelector((state: RootStore) => state.auth);
  useEffect(() => {
    document.addEventListener('click', handleClickOutside, false);
    return () => {
      document.removeEventListener('click', handleClickOutside, false);
    };
  }, [contentDivRef.current]);

  const handleClickOutside = (e: { target: any }) => {
    setExpand(!!contentDivRef?.current?.contains(e?.target));
  };
  const resetSyllabus = () => {
    setValue('syllabus', '');
  };
  const resetGrade = () => {
    setValue('grade', '');
  };

  const selectSyllabus = (syllabus: any) => {
    dispatch({
      type: SET_SELECTED_SYLLABUS,
      payload: { dataWrapper: { data: syllabus } },
    });
  };

  const selectGrade = (grade: any) => {
    dispatch({
      type: SET_SELECTED_GRADE,
      payload: { dataWrapper: { data: grade } },
    });
  };

  const onSyllabusSelected = (syllabus: string) => {
    selectSyllabus(syllabus);
    setValue('syllabus', syllabus);
    setDefaultGrade(null);
    selectGrade(null);
    resetGrade();
  };

  const onGradeSelected = (grade: string) => {
    dispatch({
      type: RESET_SUBJECTS,
    });
    selectGrade(grade);
    setValue('grade', grade);
  };

  const getSyllabuses = () => {
    getSyllabusData(
      `/syllabuses?page=1&size=20`,
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

  const getGrades = (selectedSyllabus: string) => {
    dispatch({
      type: RESET_GRADES,
    });
    getGradeData(
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

  const generateSyllabuses = useMemo(() => {
    if (!syllabuses) {
      resetSyllabus();
      return [];
    }
    const sortedSyllabuses = syllabuses.sort(
      (a: { name: string }, b: { name: any }) => a.name.localeCompare(b.name)
    );

    return sortedSyllabuses.map((syllabus: { _id: any; name: any }) => ({
      value: syllabus._id,
      label: syllabus.name,
    }));
  }, [syllabuses]);

  useEffect(() => {
    if (generateSyllabuses.length) {
      const { value } = generateSyllabuses[0];

      onSyllabusSelected(value);
      setDefaultSyllabus(value);
    }
  }, [generateSyllabuses]);

  const generateGrades = useMemo(() => {
    if (!grades) {
      resetGrade();
      return [];
    }
    const sortedGrades = grades.sort((a: { name: string }, b: { name: any }) =>
      a.name.localeCompare(b.name)
    );

    return sortedGrades.map((grade: { _id: any; name: any }) => ({
      value: grade._id,
      label: grade.name,
    }));
  }, [grades]);

  useEffect(() => {
    getSyllabuses();
  }, []);

  useEffect(() => {
    selectedSyllabus && getGrades(selectedSyllabus);
  }, [selectedSyllabus]);

  const onFormSubmit = (data: any) => {
    const { grade, syllabus } = data;
    history.push(`/admin/home/${syllabus}/${grade}`, {
      selectedSyllabus: {
        ...generateSyllabuses?.find(s => s.value === syllabus),
      },
      selectedGrade: { ...generateGrades?.find(g => g.value === grade) },
    });
  };

  if (user?.roles && !user.roles.includes(userRoles.admin)) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <div className="admin__landing-page">
        <div className="container">
          <div className="admin__landing-page--pannel">
            <div className="admin__landing-page--pannel-header">
              <h2>{t('Welcome Admin')}</h2>
              <p>{t('Please select an option')}</p>
            </div>
            <div className="admin__landing-page--pannel-body">
              <div
                className={`admin__landing-page--pannel-left ${
                  expand ? 'expand' : ''
                }`}
                ref={contentDivRef}
              >
                <div
                  className={`admin__landing-page--selection ${
                    expand ? 'expandend-section ' : ''
                  }`}
                >
                  <div
                    className={`admin__landing-page--selection-title ${
                      expand ? 'expandend-title' : ''
                    }`}
                  >
                    <h3>{t('Content Management')}</h3>
                  </div>
                  <div
                    className={`admin__landing-page--selection-content ${
                      expand ? 'expandend-contend' : ''
                    }`}
                  >
                    <form
                      className="form"
                      onSubmit={handleSubmit(onFormSubmit)}
                    >
                      <DropdownInput
                        Controller={Controller}
                        control={control}
                        errorMessage={errors.syllabus?.message}
                        label={t('Syllabus')}
                        name="syllabus"
                        placeholder={t('Select syllabus')}
                        required
                        options={generateSyllabuses}
                        rules={{ required: t('Please select your syllabus') }}
                        customOnchangeAction={value => {
                          onSyllabusSelected(value);
                          setDefaultSyllabus(value);
                        }}
                        isRequiredIconShow={false}
                        value={defaultSyllabus}
                      />

                      <DropdownInput
                        Controller={Controller}
                        control={control}
                        errorMessage={errors.grade?.message}
                        label={t('Grade')}
                        name="grade"
                        placeholder={t('Select grade')}
                        required
                        options={generateGrades}
                        rules={{ required: t('Please select your grade') }}
                        customOnchangeAction={value => {
                          onGradeSelected(value);
                          setDefaultGrade(value);
                        }}
                        isRequiredIconShow={false}
                        value={defaultGrade}
                      />

                      <div className="form__form--field buttons">
                        <button type="submit" className="btn btn--primary">
                          {t('Proceed')}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div className="admin__landing-page--pannel-right">
                {ADMIN_MENU_LIST.map((col, index) => {
                  return (
                    <div
                      key={index}
                      className="admin__landing-page--pannel-innerRight"
                    >
                      {col.map((menu, menuIndex) => {
                        const { title, path, identifer } = menu;
                        return (
                          <Link
                            to={path}
                            className={`admin__landing-page--selection-item__${identifer}`}
                            key={menuIndex}
                          >
                            <div className="admin__landing-page--selection-title">
                              <h3>{t(title)}</h3>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHomeContainer;
