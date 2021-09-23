import React, { FC, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Dropdown from 'react-dropdown';
import CheckBox from '../../FormInput/CheckBox/CheckBox';
import { getMonths, getOrders, getYears } from '../../../Helper';
import {
  OrderByFieldNames,
  pastPaperConstant,
} from '../../../config/constants';
import PastPaper from '../../Pastpaper/PastPaper';
import { CommonTypes } from '../../../redux/common/commonReducer';
import Input from '../../FormInput/Input';
import TextareaInput from '../../FormInput/TextareaInput/TextareaInput';
import DropdownInput from '../../FormInput/DropdownInput';

interface BasicInformationProps {
  Controller: any;
  control: any;
  errors: any;
  lessons: CommonTypes['lessons'];
  order: CommonTypes['order'];
  register: any;
  selectedSubject: CommonTypes['selectedSubject'];
  setError: any;
  setSubjectId: any;
  setValue: any;
  subjects: CommonTypes['subjects'];
  topicSelected: (arg0: any) => void;
  topics: CommonTypes['topics'];
  tutorSelected: any;
  tutors: CommonTypes['tutors'];
  clearErrors?: any;
  defaultSubjectID?: string;
  onClickPastPaper?: any;
  isPastPaper?: any;
  unRegister?: any;
  selectedTopic: CommonTypes['selectedTopic'];
}

const BasicInformation: FC<BasicInformationProps> = ({
  Controller,
  control,
  errors,
  lessons,
  order,
  register,
  selectedSubject,
  setError,
  setSubjectId,
  setValue,
  subjects,
  topicSelected,
  topics,
  tutorSelected,
  tutors,
  onClickPastPaper,
  isPastPaper,
  unRegister,
  defaultSubjectID,
  selectedTopic,
}) => {
  const { t } = useTranslation();

  const [lessonsArray, setLessonsArray] = useState<any[]>([]);
  const [defaultSubject, setDefaultSubject] = useState<any>(null);
  const [defaultTopic, setDefaultTopic] = useState<any>(null);
  const [defaultLesson, setDefaultLesson] = useState<any>(null);
  const [defaultTutor, setDefaultTutor] = useState<any>(null);
  const [defaultOrder, setDefaultOrder] = useState<any>(null);

  useEffect(() => {
    setLessonsArray([]);
  }, [selectedTopic, defaultSubject]);

  const sortingArray = (array: any[]) => {
    return array.sort((a, b) => a.label.localeCompare(b.label));
  };

  const filterObjectBySelectedValue = (array: any[], value: string) => {
    return array.filter(item => item.value === value);
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

    let optionList = subjects.map(subject => ({
      value: subject._id,
      label: subject.name,
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
    const optionList = tutors.map(tutor => ({
      value: tutor._id,
      label: `${tutor.firstName} ${tutor.lastName}`,
    }));

    return sortingArray(optionList);
  }, [tutors]);

  const generateTopics = useMemo(() => {
    if (!topics) {
      return [];
    }

    const optionList = topics.map(topic => ({
      value: topic._id,
      label: topic.topic,
    }));

    return sortingArray(optionList);
  }, [topics]);

  const generateLessons = useMemo(() => {
    if (!lessons) {
      return [];
    }

    const optionList = lessons.map(lesson => ({
      value: lesson._id,
      label: lesson.name,
    }));

    return sortingArray(optionList);
  }, [lessons]);

  const addSelectedItemToArray = (
    state: any[],
    array: any[],
    value: string
  ) => {
    if (!state.filter(item => item.value === value).length) {
      state.push(filterObjectBySelectedValue(array, value)[0]);
    }

    return state;
  };

  useEffect(() => {
    setDefaultLesson(null);

    setValue(
      'lessonIds',
      lessonsArray.length ? lessonsArray.map((a: any) => a.value) : ''
    );
  }, [lessonsArray]);

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

  useEffect(() => {
    if (isPastPaper) {
      unRegister(['tutorIds', 'order'], { keepValid: true });
    } else {
      register(['tutorIds', 'order']);
    }
  }, [isPastPaper]);

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
            rules={{
              required: isPastPaper ? false : t('Tutor cannot be empty'),
            }}
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
            errorMessage={errors?.[OrderByFieldNames.DOCUMENT]?.message}
            label={t('Order')}
            name={OrderByFieldNames.DOCUMENT}
            placeholder={t('Select Order')}
            required
            options={generateOrders}
            rules={{
              required:
                isPastPaper && !defaultTutor
                  ? false
                  : t('Order cannot be empty'),
            }}
            value={defaultOrder}
            customOnchangeAction={value => {
              setDefaultOrder(value);
            }}
            disabled={!defaultSubject || !defaultTopic || !defaultTutor}
          />
          <PastPaper
            errors={errors}
            Controller={Controller}
            control={control}
            isPastPaper={isPastPaper}
            onClickPastPaper={onClickPastPaper}
            unRegister={unRegister}
          />
        </div>
      </div>
    </div>
  );
};

export default BasicInformation;
