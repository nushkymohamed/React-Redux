import React, { useState, useEffect, useMemo, FC } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Dropdown from 'react-dropdown';
import { CommonTypes } from '../../../redux/common/commonReducer';
import { RESET_SUBJECTS } from '../../../redux/common/commonTypes';
import { useDispatch } from 'react-redux';

interface SubjectTagsProps {
  onChange: any;
  setSyllabusID: any;
  syllabuses: CommonTypes['syllabuses'];
  subjects: CommonTypes['subjects'];
}

const SubjectTags: FC<SubjectTagsProps> = ({
  onChange,
  setSyllabusID,
  syllabuses,
  subjects,
}) => {
  const { t } = useTranslation();

  const [subjectArray, setSubjectArray] = useState<any>([]);

  const [selectedSyllabusID, setSelectedSyllabusID] = useState<any>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const subjectList = subjectArray.map((item: any) => item && item.value);

    onChange(subjectList);
  }, [subjectArray]);

  useEffect(() => {
    if (selectedSyllabusID) {
      dispatch({
        type: RESET_SUBJECTS,
      });
      setSyllabusID(selectedSyllabusID);
    }
  }, [selectedSyllabusID]);

  const filterObjectBySelectedValue = (array: any[], value: any) => {
    return array.filter((item: { value: any }) => item.value === value);
  };

  const addSelectedItemToArray = (state: any, array: any, value: string) => {
    if (!state.filter((item: { value: any }) => item.value === value).length) {
      const selectedSyllabus = generateSyllabuses.filter(
        (e: { value: null }) => e.value == selectedSyllabusID
      );

      const selectedSubject = {
        ...filterObjectBySelectedValue(array, value)[0],
      };

      selectedSubject.label = `${selectedSyllabus[0]?.label} ${selectedSubject.label}`;

      state.push(selectedSubject);
    }

    return state;
  };

  const generateSubjects = useMemo(() => {
    if (!subjects) return [];
    return subjects.map((item: { _id: any; name: any }) => ({
      value: item._id,
      label: item.name,
    }));
  }, [subjects]);

  const generateSyllabuses = useMemo(() => {
    if (!syllabuses) return [];

    return syllabuses.map((item: { _id: any; name: any }) => ({
      value: item._id,
      label: item.name,
    }));
  }, [syllabuses]);

  const removeObjectFromArray = (
    arrayIndex: number,
    array: any[],
    callback: any
  ) => {
    array.splice(arrayIndex, 1);

    callback([...array]);
  };

  return (
    <div className="createContent__row subject_tags">
      <div className="createContent__column">
        <div className="form">
          <div className="form__form--field">
            <label>{t('Syllabus')}</label>

            <Dropdown
              className="form-input"
              options={generateSyllabuses}
              placeholder={t('Select the Syllabus')}
              onChange={({ value }: any) => {
                setSelectedSyllabusID(value);
              }}
            />
          </div>

          <div className="form__form--field">
            <label>{t('Subject')}</label>

            <Dropdown
              className="form-input"
              options={generateSubjects}
              placeholder={t('Select the Subject')}
              onChange={({ value }: any) => {
                let values = addSelectedItemToArray(
                  subjectArray,
                  generateSubjects,
                  value
                );

                setSubjectArray([...values]);
              }}
            />
          </div>
        </div>

        <div className="form__form--field">
          {subjectArray.map((item: any, index: number) => {
            return (
              <p
                className="form__form--field dropdown-selected dropdown-selected-added"
                key={index}
              >
                <div>{item.label}</div>
                <a
                  className="close"
                  onClick={() =>
                    removeObjectFromArray(index, subjectArray, setSubjectArray)
                  }
                >
                  &times;
                </a>
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SubjectTags;
