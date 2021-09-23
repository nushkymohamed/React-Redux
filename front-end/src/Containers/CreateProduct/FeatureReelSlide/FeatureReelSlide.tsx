import React, { FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import AddContent from '../../../Components/CreateProduct/AddContents/AddContent';
import { RootStore } from '../../../redux/store';
import { useTranslation } from 'react-i18next';
import {
  ADD_NEW_FEATURE_REEL,
  GET_FEATURE_REEL_SELECTED_CONTENT_FAILED,
  GET_FEATURE_REEL_SELECTED_CONTENT_REQUEST,
  GET_FEATURE_REEL_SELECTED_CONTENT_SUCCESS,
  RESET_FEATURE_REEL_SELECTED_CONTENTS,
} from '../../../redux/product/productTypes';
import FeatureReelViewContainer from './FeatureReel/FeatureReelViewContainer';
import FeatureReelContainer from './FeatureReel/FeatureReelContainer';
import useApi from '../../../Hooks/useApi';
import { CONTENT_SERVICE } from '../../../config/constants';
import { resetReducerDataByCommonType } from '../../../Helper';
import {
  RESET_GRADES,
  RESET_SUBJECTS,
} from '../../../redux/common/commonTypes';

interface FeatureReelSlide {
  setSelectedSyllabusID: (arg0: any) => void;
  setSelectedGradeID: (arg0: any) => void;
  getSyllabuses: Function;
  getGrades: Function;
  getSubject: Function;
  goToNext: any;
  goToPrevious: any;
  onFormSubmit: any;
}

const FeatureReelSlide: FC<FeatureReelSlide> = ({
  setSelectedSyllabusID,
  setSelectedGradeID,
  getSyllabuses,
  getGrades,
  getSubject,
  goToNext,
  goToPrevious,
  onFormSubmit,
}) => {
  const [allContentRequest] = useApi();

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { handleSubmit, control } = useForm({
    shouldFocusError: true,
  });
  const {
    subjects,
    grades,
    syllabuses,
    subjectsPage,
    syllabusesPage,
    gradesPage,
  } = useSelector((state: RootStore) => state.common);
  const { featureReel, featureReelAllSelectedContentIds } = useSelector(
    (state: RootStore) => state.products
  );

  const { isReelEdited } = featureReel || {};
  const generateNewReel = (data: any) => {
    dispatch({
      type: ADD_NEW_FEATURE_REEL,
      payload: { dataWrapper: { data } },
    });
  };

  const [isSelectedShow, setIsSelectedShow] = useState(false);

  const { subject, syllabus, grade } = featureReel || {};

  const { label: subjectLabel } = subject || {};
  const { label: syllabusLabel } = syllabus || {};
  const { label: gradeLabel } = grade || {};

  const contentRequest = (pageNumber: number) => {
    let url = `/contents/learningMaterials?contentIds=${featureReelAllSelectedContentIds}&page=${pageNumber}&size=${featureReelAllSelectedContentIds?.length}`;
    allContentRequest(
      url,
      GET_FEATURE_REEL_SELECTED_CONTENT_REQUEST,
      GET_FEATURE_REEL_SELECTED_CONTENT_SUCCESS,
      GET_FEATURE_REEL_SELECTED_CONTENT_FAILED,
      {},
      {},
      'GET',
      false,
      CONTENT_SERVICE
    );
  };

  useEffect(() => {
    dispatch({ type: RESET_FEATURE_REEL_SELECTED_CONTENTS });

    featureReelAllSelectedContentIds?.length && contentRequest(1);
  }, [featureReelAllSelectedContentIds]);

  return (
    <form className="main-form" onSubmit={handleSubmit(onFormSubmit)}>
      {!isReelEdited ? (
        <FeatureReelViewContainer />
      ) : (
        <>
          <div style={{ display: `${isSelectedShow ? 'block' : 'none'}` }}>
            <FeatureReelViewContainer
              isOderReel
              setIsSelectedShow={setIsSelectedShow}
            />
          </div>

          <div
            className={`addContentScreen editProduct reelContent edit`}
            style={{ display: `${isSelectedShow ? 'none' : 'block'}` }}
          >
            <div className="addContentScreen--wrapper">
              <div className="addContentScreen--titleArea">
                {subjectLabel &&
                  `${gradeLabel} - ${syllabusLabel} - ${subjectLabel}`}
              </div>
              <button
                className="btn btn--gray btn--centerText btn--roundEdges showSelected"
                onClick={() => setIsSelectedShow(true)}
                disabled={!featureReelAllSelectedContentIds?.length}
                type={'button'}
              >
                {t('Show Selected')}
              </button>
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
                generateNewReel={info => generateNewReel(info)}
                subjectsPage={subjectsPage}
                syllabusesPage={syllabusesPage}
                gradesPage={gradesPage}
                getSyllabuses={getSyllabuses}
                getGrades={getGrades}
                getSubject={getSubject}
              />
              <FeatureReelContainer
                reel={featureReel || {}}
                resetSelection={() => {
                  setSelectedSyllabusID(null);
                  setSelectedGradeID(null);
                }}
              />
            </div>
          </div>
        </>
      )}

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

export default FeatureReelSlide;
