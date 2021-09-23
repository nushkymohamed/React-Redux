import React, { useState, useEffect, FC, useCallback } from 'react';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import TimePicker from '../../Components/FormInput/TimePicker/TimePicker';
import QuestionComponent from '../../Components/Question/Question';
import { CONTENT_SERVICE, QUESTION_TYPE } from '../../config/constants';
import { convertTimeToNumber, uuidv4 } from '../../Helper';

import useApi from '../../Hooks/useApi';
import {
  FILE_UPLOAD_S3_INFO_FAILED,
  FILE_UPLOAD_S3_INFO_REQUEST,
  FILE_UPLOAD_S3_INFO_SUCCESS,
} from '../../redux/common/commonTypes';
interface midVideoType {
  type: string;
  startTime: string;
  triggerTime: string;
}
interface QuestionProps {
  Controller: any;
  control: any;
  name: string;
  setValue: any;
  errors?: any;
  setError?: any;
  clearErrors?: any;
  setTime?: any;
  index: number;
  setQuestions: any;
  setValidation: (index: string, method: any) => void;
  id: string;
  removeMidVideoAssessment: (id: string) => void;
  showDeleteButton: boolean;
  startTime: string;
  triggerTime: string;
  assessmentList: midVideoType[];
}

export interface UploadItem {
  bucketName: string;
  fileKey: string;
}
export interface SingleQuestionType {
  answers: {
    option: string;
    correctAnswer: boolean;
    index: string;
    errorMessage?: string;
  }[];
  question: string;
  uploadedImage: UploadItem;
  errorMessage?: string;
  questionType?: string;
}

interface QuestionListTypes {
  questionList: {
    question: SingleQuestionType | null;
    index: string;
  }[];
}

const QuestionContainer: FC<QuestionProps> = ({
  Controller,
  control,
  name,
  setValue,
  clearErrors,
  setTime,
  index,
  setQuestions,
  setValidation,
  id,
  removeMidVideoAssessment,
  showDeleteButton,
  startTime,
  triggerTime,
  assessmentList,
}) => {
  const [uploadRequest] = useApi();
  const { t } = useTranslation();
  const [questionList, setQuestionList] = useState<
    QuestionListTypes['questionList']
  >([]);
  const [startTimeError, setStartTimeError] = useState('');
  const [triggerTimeError, setTriggerTimeError] = useState('');
  const singleQuestion = { question: null, index: uuidv4() };

  useEffect(() => {
    setQuestionList([...questionList, singleQuestion]);
  }, []);

  const addQuestion = () => {
    setQuestionList([...questionList, singleQuestion]);
  };

  const updateQuestionList = (
    questionSet: SingleQuestionType,
    index: string
  ) => {
    const questionIndex = questionList.findIndex(
      question => question.index === index
    );

    questionList[questionIndex].question = questionSet;

    setQuestionList([...questionList]);
  };

  const deleteQuestionSet = (index: string) => {
    const questionArray = questionList.filter(
      question => question.index !== index
    );

    setQuestionList([...questionArray]);
  };

  const questionListRef = useRef<QuestionListTypes['questionList']>();

  useEffect(() => {
    questionListRef.current = questionList;
  }, [questionList]);

  const validateQuestions = useCallback(
    (startTime: string, triggerTime: string) => {
      let isError = false;

      const questions = questionListRef.current || [];

      const validatedQuestions = questions.map(q => {
        if (!q?.question?.question) {
          isError = true;
          if (q?.question)
            q.question.errorMessage = t('Question cannot be empty');
        } else {
          delete q.question.errorMessage;
        }
        q?.question?.answers?.map(a => {
          if (!a?.option) {
            isError = true;
            a.errorMessage = t('Answer cannot be empty');
          } else {
            delete a.errorMessage;
          }
          return a;
        });

        return q;
      });
      const isStartTimeError = !isValidTime(startTime);
      const isTriggerTimeError = !isValidTime(triggerTime);

      onTimeError({
        isError: isStartTimeError,
        isStartTime: true,
        message: 'Select a Valid Start Time',
      });
      onTimeError({
        isError: isTriggerTimeError,
        isStartTime: false,
        message: 'Select a Valid Trigger Time',
      });
      const isValidTimerValuesError = !isvalidateTimerValues(
        startTime,
        triggerTime
      );

      setQuestionList(validatedQuestions);

      return !(
        isError ||
        isStartTimeError ||
        isTriggerTimeError ||
        isValidTimerValuesError
      );
    },
    [questionList]
  );

  useEffect(() => {
    setValidation(id, validateQuestions);
  }, [validateQuestions]);

  useEffect(() => {
    const questionAndAnswer = questionList.map(
      ({ question: mainQuestionKey }) => {
        const { answers, question, uploadedImage, questionType } =
          mainQuestionKey || {};

        return {
          question,
          questionType:
            questionType === QUESTION_TYPE.SINGLE_ANSWER_MCQ_WITHIMAGE
              ? QUESTION_TYPE.SINGLE_ANSWER_MCQ_WITHIMAGE
              : QUESTION_TYPE.SINGLE_ANSWER_MCQ,
          answers: answers?.map(a => {
            return { answer: a.option, isCorrect: a.correctAnswer };
          }),
          questionImage: uploadedImage,
        };
      }
    );
    setQuestions(index, questionAndAnswer);
  }, [questionList]);

  const uploadFileKey = 'questionImageUpload';
  useEffect(() => {
    uploadRequest(
      `/cloud-storage/path/learning-materials`,
      FILE_UPLOAD_S3_INFO_REQUEST,
      FILE_UPLOAD_S3_INFO_SUCCESS,
      FILE_UPLOAD_S3_INFO_FAILED,
      {},
      {},
      'GET',
      false,
      CONTENT_SERVICE,
      { key: uploadFileKey }
    );
  }, []);

  const onTimeError = ({
    isError,
    isStartTime,
    message,
  }: {
    isError: boolean;
    isStartTime: boolean;
    message: string;
  }) => {
    if (isError) {
      if (isStartTime) {
        setStartTimeError(t(message));
      } else {
        setTriggerTimeError(t(message));
      }
    } else {
      if (isStartTime) {
        setStartTimeError('');
      } else {
        setTriggerTimeError('');
      }
    }
  };

  const isValidTime = (time: string | undefined) => {
    if (!time) return false;
    return time !== '00:00:00';
  };

  const validateAndSetTime = (
    index: number,
    name: string,
    timeString: string
  ) => {
    if (name === 'start-time' || name === 'trigger-time') {
      let generateOtherMidVideoQuestionList = assessmentList.filter(
        (item, assessmentIndex) => assessmentIndex !== index
      );
      const timeValue = convertTimeToNumber(timeString);

      let overLapTimeSlot = generateOtherMidVideoQuestionList.filter(
        item =>
          convertTimeToNumber(item.startTime) <= timeValue &&
          timeValue <= convertTimeToNumber(item.triggerTime)
      );
      if (overLapTimeSlot?.length) {
        onTimeError({
          isError: true,
          isStartTime: false,
          message: "Two assessments can't contain overlapping times",
        });
      } else {
        if (name === 'start-time') {
          onTimeError({
            isError: !isValidTime(timeString),
            isStartTime: true,
            message: 'Select a Valid Start Time',
          });
          isValidTime(timeString) &&
            isvalidateTimerValues(timeString, triggerTime);
        } else {
          onTimeError({
            isError: !isValidTime(timeString),
            isStartTime: false,
            message: 'Select a Valid Trigger Time',
          });
          isValidTime(timeString) &&
            isvalidateTimerValues(startTime, timeString);
        }
      }

      setTime(index, name, timeString);
    }
  };
  const isvalidateTimerValues = (startTime: string, triggerTime: string) => {
    let status = true;
    if (startTime || triggerTime) {
      if (convertTimeToNumber(startTime) > convertTimeToNumber(triggerTime)) {
        status = false;
        onTimeError({
          isError: true,
          isStartTime: false,
          message: 'Start time must be less than Trigger time',
        });
      } else {
        onTimeError({
          isError: false,
          isStartTime: false,
          message: '',
        });
      }
    }

    return status;
  };

  return (
    <Controller
      control={control}
      name={name}
      render={() => (
        <>
          <div className="form fullWidth no-spacing">
            {showDeleteButton && (
              <div
                className="btn-close"
                onClick={() => removeMidVideoAssessment(id)}
              >
                &times;
              </div>
            )}
            <div className="summary-container row">
              <div className="field__form--field-wrapper">
                <div className="timer-wrapper">
                  <div className="label"> {t('Start Time')}</div>
                  <div className="timer-wrapper-time">
                    <TimePicker
                      action={validateAndSetTime}
                      index={index}
                      name="start-time"
                      label={t('Select Start Time')}
                    />
                    <span className="timer-wrapper-time-icon" />
                    {startTimeError && (
                      <span className="error-message push-down">
                        {startTimeError}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="field__form--field-wrapper">
                <div className="timer-wrapper">
                  <div className="label"> {t('Trigger Time')}</div>
                  <div className="timer-wrapper-time">
                    <TimePicker
                      action={validateAndSetTime}
                      index={index}
                      name="trigger-time"
                      label={t('Select Trigger Time')}
                    />
                    <span className="timer-wrapper-time-icon" />
                    {triggerTimeError && (
                      <span className="error-message push-down">
                        {triggerTimeError}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {questionList.map(({ question, index }) => (
              <div key={index} className="createContent__row--wrapper">
                <QuestionComponent
                  key={index}
                  index={`${index}`}
                  question={question}
                  updateQuestionList={updateQuestionList}
                  deleteQuestionSet={deleteQuestionSet}
                  questionListLength={questionList.length}
                  uploadFileKey={uploadFileKey}
                />
              </div>
            ))}
          </div>

          <div className="createContent fullWidth wysiwyg--section no-spacing">
            <div onClick={() => addQuestion()} className="btn-section">
              {t('Add Another Question')}
            </div>
          </div>
        </>
      )}
    />
  );
};

export default QuestionContainer;
