import React, { FC, useMemo, useState, useEffect } from 'react';
import DropdownInput from '../../FormInput/DropdownInput/DropdownWithPagination';
import { useTranslation } from 'react-i18next';
import { CommonTypes } from '../../../redux/common/commonReducer';
import {
  filterOutSelectedOptionLabelAndValue,
  mapArrayIntoDropDownOption,
} from '../../../Helper';

interface AddContentProps {
  Controller: any;
  control: any;
  subjects: CommonTypes['subjects'];
  grades: CommonTypes['grades'];
  syllabuses: CommonTypes['syllabuses'];
  selectedSyllabusID: (arg0: any) => void;
  selectedGradeID: (arg0: any) => void;
  generateNewReel: (arg0: object) => void;
  subjectsPage: number;
  syllabusesPage: number;
  gradesPage: number;
  getSyllabuses: Function;
  getGrades: Function;
  getSubject: Function;
}
interface selectedOption {
  label: string;
  value: string;
}

const AddContent: FC<AddContentProps> = ({
  Controller,
  control,
  subjects,
  grades,
  syllabuses,
  selectedSyllabusID,
  selectedGradeID,
  generateNewReel,
  subjectsPage,
  syllabusesPage,
  gradesPage,
  getSyllabuses,
  getGrades,
  getSubject,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<selectedOption | null>(
    null
  );
  const [selectedGrade, setSelectedGrade] = useState<selectedOption | null>(
    null
  );
  const [selectedSyllabus, setSelectedSyllabus] =
    useState<selectedOption | null>(null);
  const [isAddReelReady, setIsAddReelReady] = useState<boolean>(false);

  const { t } = useTranslation();

  const generateSubjects = useMemo(() => {
    if (!subjects) {
      return [];
    }

    return mapArrayIntoDropDownOption(subjects, '_id', 'name');
  }, [subjects]);

  const generateSyllabuses = useMemo(() => {
    if (!syllabuses) {
      return [];
    }

    return mapArrayIntoDropDownOption(syllabuses, '_id', 'name');
  }, [syllabuses]);

  const generateGrades = useMemo(() => {
    if (!grades) {
      return [];
    }

    return mapArrayIntoDropDownOption(grades, '_id', 'name');
  }, [grades]);
  useEffect(() => {
    selectedGrade && selectedSubject && selectedSyllabus
      ? setIsAddReelReady(false)
      : setIsAddReelReady(true);
  }, [selectedGrade, selectedSubject, selectedSyllabus]);

  return (
    <>
      <div className="createContent__row product_reel--selections">
        <h3 className="createContent__rowtitle">Select Content</h3>
        <div className="createContent__column">
          <DropdownInput
            label={t('Syllabus') || ''}
            Controller={Controller}
            control={control}
            options={generateSyllabuses}
            name={'syllabusId'}
            placeholder={t('Select Syllabus') || ''}
            customOnchangeAction={value => {
              selectedSyllabusID(value);
              setSelectedGrade(null);
              setSelectedSubject(null);

              const list = filterOutSelectedOptionLabelAndValue(
                generateSyllabuses,
                value
              );
              list.length && setSelectedSyllabus(list[0]);
            }}
            scrollCallBack={() => getSyllabuses(syllabusesPage + 1)}
            value={selectedSyllabus?.value || null}
            disabled={!generateSyllabuses.length}
          />
        </div>
        <div className="createContent__column">
          <DropdownInput
            label={t('Grade') || ''}
            Controller={Controller}
            control={control}
            options={generateGrades}
            name={'gradeId'}
            placeholder={t('Select Grade') || ''}
            customOnchangeAction={value => {
              selectedGradeID(value);
              setSelectedSubject(null);
              const list = filterOutSelectedOptionLabelAndValue(
                generateGrades,
                value
              );
              list.length && setSelectedGrade(list[0]);
            }}
            disabled={!selectedSyllabus || !generateGrades.length}
            scrollCallBack={() => getGrades(gradesPage + 1)}
            value={selectedGrade?.value || null}
          />
        </div>
        <div className="createContent__column">
          <DropdownInput
            label={t('Subject') || ''}
            Controller={Controller}
            control={control}
            options={generateSubjects}
            name={'subjectId'}
            placeholder={t('Select Subject') || ''}
            customOnchangeAction={value => {
              const list = filterOutSelectedOptionLabelAndValue(
                generateSubjects,
                value
              );
              list.length && setSelectedSubject(list[0]);
            }}
            disabled={
              !selectedSyllabus || !selectedGrade || !generateSubjects.length
            }
            scrollCallBack={() => getSubject(subjectsPage + 1)}
            value={selectedSubject?.value || null}
          />
          <div className="form__form--field buttons">
            <button
              type={'button'}
              disabled={isAddReelReady}
              onClick={() => {
                generateNewReel({
                  grade: selectedGrade,
                  subject: selectedSubject,
                  syllabus: selectedSyllabus,
                });
              }}
              className={`btn btn--primary btn--roundEdges btn--addButton ${
                isAddReelReady ? 'disable' : ''
              }`}
            >
              {t('Add Reel')}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddContent;
