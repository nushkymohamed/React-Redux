import React, { useState, useEffect, useMemo, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { CommonTypes } from '../../../redux/common/commonReducer';
import Input from '../../FormInput/Input';
import TextareaInput from '../../FormInput/TextareaInput/TextareaInput';
import DropdownInput from '../../FormInput/DropdownInput';
import { sortingArray } from '../../../Helper';

import TimePickerInput from '../../FormInput/TimePickerInput/TimePickerInput';
import { OrderByFieldNames } from '../../../config/constants';

interface BasicInformationProps {
  Controller: any;
  control: any;
  errors: any;
  lessons: CommonTypes['lessons'];
  order: CommonTypes['order'];
  setSubjectId: any;
  setValue: any;
  subjects: CommonTypes['subjects'];
  topicSelected: (arg0: any) => void;
  topics: CommonTypes['topics'];
  tutorSelected: any;
  tutors: CommonTypes['tutors'];
  selectedTopic: CommonTypes['selectedTopic'];
  defaultSubjectID: string;
}

const BasicInformation: FC<BasicInformationProps> = ({
  Controller,
  control,
  errors,
  lessons,
  order,
  setSubjectId,
  setValue,
  subjects,
  topicSelected,
  topics,
  tutorSelected,
  tutors,
  selectedTopic,
  defaultSubjectID,
}) => {
  const { t } = useTranslation();

  const [lessonsArray, setLessonsArray] = useState<string[]>([]);

  const [defaultSubject, setDefaultSubject] = useState<any>(null);
  const [defaultTopic, setDefaultTopic] = useState<any>(null);
  const [defaultLesson, setDefaultLesson] = useState<any>(null);
  const [defaultTutor, setDefaultTutor] = useState<any>(null);
  const [defaultOrder, setDefaultOrder] = useState<any>(null);

  useEffect(() => {
    setLessonsArray([]);
  }, [selectedTopic, defaultSubject]);

  useEffect(() => {
    setDefaultLesson(null);

    setValue(
      'lessonIds',
      lessonsArray.length ? lessonsArray.map((a: any) => a.value) : []
    );
  }, [lessonsArray]);
  const filterObjectBySelectedValue = (array: any[], value: string) => {
    return array.filter((item: { value: string }) => item.value === value);
  };

  const generateOrders = useMemo(() => {
    if (!order) {
      return [
        {
          value: `1`,
          label: `1`,
        },
      ];
    }
    let optionList = [];
    let i;
    for (i = 0; i <= order; i++) {
      optionList.push({
        value: `${i + 1}`,
        label: `${i + 1}`,
      });
    }

    return optionList;
  }, [order]);

  const generateSubjects = useMemo(() => {
    if (!subjects) {
      return [];
    }

    let optionList = subjects.map(({ _id, name }) => ({
      value: _id,
      label: name,
    }));

    let list = sortingArray(optionList);
    const { value } = list[0];

    const defaultSubject = optionList.find(
      ({ value }) => value === defaultSubjectID
    );

    const subjectID = defaultSubject?.value || value;

    setDefaultSubject(subjectID ? subjectID : null);
    if (subjectID) {
      setValue('subjectId', subjectID);
      setSubjectId(subjectID);
    }
    return list;
  }, [subjects]);

  const generateTutors = useMemo(() => {
    if (!tutors) {
      return [];
    }

    const optionList = tutors.map(({ _id, firstName, lastName }) => ({
      value: _id,
      label: `${firstName} ${lastName}`,
    }));

    let list = sortingArray(optionList);

    setDefaultTutor(null);

    return list;
  }, [tutors]);

  const generateTopics = useMemo(() => {
    if (!topics) {
      return [];
    }

    const optionList = topics.map(({ _id, topic }) => ({
      value: _id,
      label: topic,
    }));

    let list = sortingArray(optionList);

    return list;
  }, [topics]);

  const generateLessons = useMemo(() => {
    if (!lessons) {
      setDefaultLesson(null);
      return [];
    }

    const optionList = lessons.map(({ _id, name }) => ({
      value: _id,
      label: name,
    }));

    return sortingArray(optionList);
  }, [lessons]);

  const addSelectedItemToArray = (state: any, array: any[], value: string) => {
    if (!state.filter((item: { value: any }) => item.value === value).length) {
      state.push(filterObjectBySelectedValue(array, value)[0]);
    }

    return state;
  };

  const removeObjectFromArray = (
    arrayIndex: number,
    array: any[],
    callback: any
  ) => {
    array.splice(arrayIndex, 1);

    callback([...array]);
  };

  const filteredLessonList = (lessonList: any[], selectedLessonList: any[]) => {
    const mapSelectedList = selectedLessonList.map(({ value }) => value);
    return lessonList.filter(item => !mapSelectedList.includes(item.value));
  };

  return (
    <div className="createContent__row basic-info">
      <div className="createContent__column">
        <h3 className="createContent__rowtitle">{t('Basic Information')}</h3>
        <div className="form">
          <Input
            Controller={Controller}
            control={control}
            errorMessage={errors?.title?.message}
            label={t('Title')}
            maxLength={35}
            name={'title'}
            placeholder={t('Title')}
            required
            type={'text'}
            rules={{
              required: t('Document Title cannot be empty'),
            }}
          />

          <TextareaInput
            Controller={Controller}
            control={control}
            label={t('Description')}
            name={'description'}
            placeholder={t('Description')}
            rows={3}
            wrapperClass={'form__form--field description-field'}
          />
        </div>
      </div>
      <div className="createContent__column">
        <h3 className="createContent__rowtitle">{t('Subject')}</h3>
        <div className="form">
          <DropdownInput
            Controller={Controller}
            control={control}
            errorMessage={errors?.subjectId?.message}
            value={defaultSubject}
            label={t('Subject')}
            name={'subjectId'}
            placeholder={t('Select the subject')}
            required
            options={generateSubjects}
            rules={{ required: t('Subject cannot be empty') }}
            customOnchangeAction={value => {
              setSubjectId(value);
              setDefaultSubject(value);
              setDefaultLesson(null);
              setDefaultOrder(null);
              setDefaultTopic(null);
              setDefaultTutor(null);
            }}
          />

          <DropdownInput
            Controller={Controller}
            control={control}
            errorMessage={errors?.topicId?.message}
            label={t('Topic')}
            name="topicId"
            placeholder={t('Video Topic')}
            required
            options={generateTopics}
            rules={{ required: t('Video Topic cannot be empty') }}
            customOnchangeAction={value => {
              topicSelected(value);
              setDefaultLesson(null);
              setDefaultTopic(value);
              setDefaultOrder(null);
            }}
            value={defaultTopic}
          />

          <DropdownInput
            Controller={Controller}
            control={control}
            label={t('Lesson')}
            name="lessonIds"
            required
            rules={{ required: t('Lesson cannot be empty') }}
            errorMessage={errors?.lessonIds?.message}
            placeholder={t('Select Lesson')}
            options={filteredLessonList(generateLessons, lessonsArray)}
            customOnchangeAction={value => {
              const values: string[] = addSelectedItemToArray(
                lessonsArray,
                generateLessons,
                value
              );
              setDefaultLesson(value);
              setLessonsArray([...values]);
            }}
            value={defaultLesson}
          />

          <div className="form__form--field">
            <div className="form__form--field dropdown-selection dropdown-tags">
              {lessonsArray.map((item: any, index) => {
                return (
                  <p
                    className="form__form--field dropdown-selected"
                    key={index}
                  >
                    {item.label}
                    <a
                      className="btn-close closemodale"
                      aria-hidden="true"
                      onClick={() =>
                        removeObjectFromArray(
                          index,
                          lessonsArray,
                          setLessonsArray
                        )
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
      </div>
      <div className="createContent__column">
        <div className="form">
          <Input
            Controller={Controller}
            control={control}
            label={t('Author')}
            maxLength={35}
            name={'author'}
            placeholder={t('Name of the author')}
            type={'text'}
          />

          <DropdownInput
            Controller={Controller}
            control={control}
            errorMessage={errors?.tutorIds?.message}
            label={t('Tutor')}
            name="tutorIds"
            placeholder={t('Select Tutor')}
            required
            options={generateTutors}
            rules={{ required: t('Tutor cannot be empty') }}
            customOnchangeAction={value => {
              setValue('tutorIds', [value]);
              tutorSelected(value);
              setDefaultTutor(value);
              setDefaultOrder(null);
            }}
            value={defaultTutor}
          />

          <DropdownInput
            Controller={Controller}
            control={control}
            errorMessage={errors?.[OrderByFieldNames.ASSESSMENT]?.message}
            label={t('Order')}
            name={OrderByFieldNames.ASSESSMENT}
            placeholder={t('Select Order')}
            required
            options={generateOrders}
            rules={{ required: t('Order cannot be empty') }}
            value={defaultOrder}
            customOnchangeAction={value => {
              setDefaultOrder(value);
            }}
            disabled={!defaultSubject || !defaultTopic || !defaultTutor}
          />
          <Controller
            control={control}
            name={'duration'}
            render={({ onChange }: any) => (
              <TimePickerInput
                label={'Enter Duration'}
                action={(value: any) => {
                  onChange(value);
                }}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default BasicInformation;
