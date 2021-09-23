import React, { memo, useMemo, useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Dropdown from 'react-dropdown';
import ButtonWithAnimation from '../../ButtonWithAnimation/ButtonWithAnimation';
import { RESET_GRADES, RESET_SCHOOLS } from '../../../redux/common/commonTypes';
import { useDispatch } from 'react-redux';
const StudentStepTwo = ({
  grades,
  schools,
  onSubmit,
  goToNext,
  syllabuses,
  selectGrade,
  goToPrevious,
  selectSchool,
  selectSyllabus,
  signUpError,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    handleSubmit: handleFinalSubmit,
    errors,
    control,
    setValue,
  } = useForm();
  const [syllabus, setSyllabus] = useState('');
  const [grade, setGrade] = useState('');
  const [school, setSchool] = useState('');

  const resetSyllabus = () => {
    onSyllabusSelected(null);
    setSyllabus('');
    setValue('syllabus', '');
  };
  const resetGrade = () => {
    onGradeSelected(null);
    setGrade('');
    setValue('grade', '');
  };
  const resetSchool = () => {
    onSchoolSelected(null);
    setSchool('');
    setValue('school', '');
  };

  const onSyllabusSelected = syllabus => {
    dispatch({
      type: RESET_GRADES,
    });
    selectSyllabus(syllabus);
    setSyllabus(syllabus);
    resetGrade();
    resetSchool();
  };

  const onGradeSelected = grade => {
    dispatch({
      type: RESET_SCHOOLS,
    });
    selectGrade(grade);
    setGrade(grade);
    resetSchool();
  };

  const onSchoolSelected = school => {
    selectSchool(school);
    setSchool(school);
  };

  const onFormSubmit = data => {
    onSubmit(data);
    goToNext();
  };

  const generateSyllabuses = useMemo(() => {
    if (!syllabuses) {
      resetSyllabus();
      return [];
    }
    return syllabuses.map(syllabus => ({
      value: syllabus._id,
      label: syllabus.name,
    }));
  }, [syllabuses]);
  const generateGrades = useMemo(() => {
    if (!grades || !syllabus) {
      resetGrade();
      return [];
    }
    return grades.map(grade => ({
      value: grade._id,
      label: grade.name,
    }));
  }, [grades, syllabus]);
  const generateSchools = useMemo(() => {
    if (!schools || !grade) {
      resetSchool();
      return [];
    }
    return schools.map(school => ({
      value: school._id,
      label: school.name,
    }));
  }, [schools, grade]);

  const signUpErrorMessage = errorMessage => {
    if (errorMessage === 'Username already exists') {
      return t(errorMessage);
    } else {
      return t('Failed to SignUp');
    }
  };

  const [animationClassName, setAnimationClassName] = useState('');
  const [loadingAnimation, setLoadingAnimation] = useState(false);
  const [isSubmitClick, setIsSubmitClick] = useState(false);
  useEffect(() => {
    if (!Object.keys(errors).length && isSubmitClick) {
      setLoadingAnimation(true);
      setAnimationClassName('btn btn--primary btn--loader active');
      setIsSubmitClick(false);
    }
  }, [errors]);

  return (
    <div>
      <h3>{t('Education Information')}</h3>
      <form className="form" onSubmit={handleFinalSubmit(onFormSubmit)}>
        <div className="form__form--field">
          <label>
            {t('Syllabus')}
            <span>*</span>
          </label>
          <Controller
            control={control}
            name="syllabus"
            rules={{ required: t('Please select your syllabus') }}
            render={props => (
              <Dropdown
                className="form-input"
                placeholder={t('Select syllabus')}
                onChange={({ value }) => {
                  onSyllabusSelected(value);
                  props.onChange(value);
                }}
                value={syllabus}
                options={generateSyllabuses}
              />
            )}
          />
          <span className="error">{errors.syllabus?.message}</span>
        </div>

        <div className="form__form--field">
          <label>
            {t('Grade')}
            <span>*</span>
          </label>
          <Controller
            control={control}
            name="grade"
            rules={{ required: t('Please select your grade') }}
            render={props => (
              <Dropdown
                className="form-input"
                placeholder={t('Select grade')}
                onChange={({ value }) => {
                  onGradeSelected(value);
                  props.onChange(value);
                }}
                value={grade}
                options={generateGrades}
              />
            )}
          />
          <span className="error">{errors.grade?.message}</span>
        </div>

        <div className="form__form--field">
          <label>
            {t('School')}
            <span>*</span>
          </label>
          <Controller
            control={control}
            name="school"
            rules={{ required: t('Please select your school') }}
            render={props => (
              <Dropdown
                className="form-input"
                placeholder={t('Select school')}
                onChange={({ value }) => {
                  onSchoolSelected(value);
                  props.onChange(value);
                }}
                value={school}
                options={generateSchools}
              />
            )}
          />
          <span className="error">{errors.school?.message}</span>
        </div>
        {signUpError && (
          <span className="error signup-error">
            {signUpErrorMessage(signUpError)}
          </span>
        )}

        <div className="form__form--field buttons">
          <button
            onClick={goToPrevious}
            type="button"
            className="btn btn--secondary"
          >
            {t('Back')}
          </button>
          {!loadingAnimation ? (
            <button
              type="submit"
              className="btn btn--primary btn--loader"
              onClick={() => setIsSubmitClick(true)}
            >
              {t('Next')}
            </button>
          ) : (
            <ButtonWithAnimation
              animationClassName={animationClassName}
              onTransitionEnd={setAnimationClassName}
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default memo(StudentStepTwo);
