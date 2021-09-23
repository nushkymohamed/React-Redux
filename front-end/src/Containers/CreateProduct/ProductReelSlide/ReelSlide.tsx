import React, { FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import AddContent from '../../../Components/CreateProduct/AddContents/AddContent';
import { RootStore } from '../../../redux/store';
import { useTranslation } from 'react-i18next';
import { ADD_NEW_REEL } from '../../../redux/product/productTypes';
import ReelContainer from './ReelContainer';
import {
  RESET_GRADES,
  RESET_SUBJECTS,
} from '../../../redux/common/commonTypes';
import { resetReducerDataByCommonType } from '../../../Helper';
interface FeatureReelSlide {
  setSelectedSyllabusID: (arg0: any) => void;
  setSelectedGradeID: (arg0: any) => void;
  getSyllabuses: Function;
  getGrades: Function;
  getSubject: Function;
  goToNext: any;
  goToPrevious: any;
  setIsDuplicateReel: Function;
  onFormSubmit: any;
  setIsProductReelErrorModelOpen: Function;
  setFormsCommonErrors: Function;
}

const ReelSlide: FC<FeatureReelSlide> = ({
  setSelectedSyllabusID,
  setSelectedGradeID,
  getSyllabuses,
  getGrades,
  getSubject,
  goToNext,
  goToPrevious,
  setIsDuplicateReel,
  onFormSubmit,
  setIsProductReelErrorModelOpen,
  setFormsCommonErrors,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { handleSubmit, control, setError, clearErrors, errors } = useForm({
    shouldFocusError: true,
  });

  useEffect(() => {
    setFormsCommonErrors(errors);
  }, [errors]);

  const {
    subjects,
    grades,
    syllabuses,
    subjectsPage,
    syllabusesPage,
    gradesPage,
  } = useSelector((state: RootStore) => state.common);
  const { reels } = useSelector((state: RootStore) => state.products);

  const generateNewReel = (data: any) => {
    const duplicatedReel = reels?.filter(reel => {
      const { grade, subject, syllabus } = reel;
      if (
        data.grade.value === grade?.value &&
        data.subject.value === subject?.value &&
        data.syllabus.value === syllabus?.value
      ) {
        return true;
      }
    });
    if (!duplicatedReel?.length) {
      dispatch({
        type: ADD_NEW_REEL,
        payload: { dataWrapper: { data } },
      });
    } else {
      setIsDuplicateReel(true);
    }
  };

  useEffect(() => {
    const unSavedReel = reels?.filter(({ isReelSaved }) => !isReelSaved);

    if (reels?.length) {
      if (unSavedReel?.length) {
        setError('unsavedReels', {
          type: 'manual',
          message: 'Need to save a product reel',
        });
        setIsProductReelErrorModelOpen(true);
      } else {
        clearErrors('unsavedReels');
        setIsProductReelErrorModelOpen(false);
      }
      clearErrors('emptyReel');
    } else {
      setError('emptyReel', {
        type: 'manual',
        message: 'Need to add a product reel',
      });
      setIsProductReelErrorModelOpen(true);
    }
  }, [reels]);

  return (
    <form className="main-form" onSubmit={handleSubmit(onFormSubmit)}>
      <AddContent
        Controller={Controller}
        control={control}
        subjects={subjects}
        grades={grades}
        syllabuses={syllabuses}
        selectedSyllabusID={id => {
          resetReducerDataByCommonType(dispatch, [
            RESET_GRADES,
            RESET_SUBJECTS,
          ]);
          setSelectedSyllabusID(id);
        }}
        selectedGradeID={id => {
          resetReducerDataByCommonType(dispatch, [RESET_SUBJECTS]);
          setSelectedGradeID(id);
        }}
        generateNewReel={(info: any) => generateNewReel(info)}
        subjectsPage={subjectsPage}
        syllabusesPage={syllabusesPage}
        gradesPage={gradesPage}
        getSyllabuses={getSyllabuses}
        getGrades={getGrades}
        getSubject={getSubject}
      />

      {reels?.map((reel: any, index) => (
        <ReelContainer
          reelIndex={reel.id}
          reel={reel}
          key={reel.id}
          reelOrder={index}
          reelsLength={reels.length}
        />
      ))}

      <div className="createContent__row submit-button">
        <div className="form">
          <div className="form__form--field buttons">
            <button
              onClick={goToPrevious}
              type="button"
              className="btn btn--secondary"
            >
              {t('Back')}
            </button>
            <button
              type="submit"
              className="btn btn--primary"
              onClick={goToNext}
            >
              {t('Next')}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ReelSlide;
