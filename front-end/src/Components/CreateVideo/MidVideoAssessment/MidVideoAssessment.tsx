import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { assessmentType, QUESTION_TYPE } from '../../../config/constants';
import QuestionContainer, {
  UploadItem,
} from '../../../Containers/CreateVideo/QuestionContainer';
import { uuidv4 } from '../../../Helper';

interface MidVideoAssessmentProps {
  setValue: any;
  register: any;
  errors: any;
  Controller: any;
  control: any;
  clearErrors: any;
  setValidateMethod: any;
}

interface midVideoType {
  type: string;
  questions: question[];
  startTime: string;
  triggerTime: string;
}

interface midVideoWithIdType extends midVideoType {
  key: string;
}

interface question {
  question: string;
  answers: {
    answer: string;
    isCorrect: boolean;
  }[];
  questionType: string;
  questionImage?: UploadItem;
}

interface validationMethodsType {
  [key: string]: any;
}

export type QuestionItemType = {
  question: string;
  questionType: string;
  answers: { [key: string]: any };
  questionImage?: UploadItem;
};

type formattedAssessmentType = {
  type: string;
  startTime: string;
  triggerTime: string;
  questions: {
    [key: string]: QuestionItemType;
  };
};

const MidVideoAssessment: FC<MidVideoAssessmentProps> = ({
  register,
  errors,
  Controller,
  control,
  setValue,
  clearErrors,
  setValidateMethod,
}) => {
  const { t } = useTranslation();
  const initialAssessmentArray: midVideoWithIdType = {
    startTime: '',
    triggerTime: '',
    type: assessmentType.MID_VIDEO_ASSESSMENT,
    questions: [],
    key: uuidv4(),
  };

  const [midVideoAssessments, setMidVideoAssessments] = useState<
    midVideoWithIdType[]
  >([initialAssessmentArray]);

  const [validationMethods, setValidationMethods] =
    useState<validationMethodsType>({});

  useEffect(() => {
    const assessments: midVideoType[] = [...midVideoAssessments];

    let formattedAssessments: formattedAssessmentType[] = [];

    assessments.forEach(({ type, startTime, triggerTime, questions }) => {
      let questionsObj: { [key: string]: any } = {};

      let questionIndex = 1;
      questions.forEach(
        ({ answers, question, questionType, questionImage }) => {
          let answersObj: { [key: string]: any } = {};

          answers.forEach((ans, i) => {
            answersObj[i + 1] = ans;
          });

          let questionItem: QuestionItemType = {
            question,
            questionType,
            answers: answersObj,
          };
          if (questionType === QUESTION_TYPE.SINGLE_ANSWER_MCQ_WITHIMAGE) {
            questionItem['questionImage'] = questionImage;
          }

          //add item only if it contains at least a question or an answer
          if (question || answers.some(a => a.answer)) {
            questionsObj[questionIndex] = questionItem;
            questionIndex++;
          }
        }
      );

      if (
        !isInitialTime(startTime) ||
        !isInitialTime(triggerTime) ||
        Object.keys(questionsObj).length
      ) {
        formattedAssessments.push({
          type,
          startTime,
          triggerTime,
          questions: questionsObj,
        });
      }
    });

    setValue('midVideoAssessments', formattedAssessments);
  }, [midVideoAssessments]);

  const setTime = (index: number, name: string, timeString: string) => {
    let assessments = [...midVideoAssessments];

    if (assessments[index]) {
      if (name === 'start-time') {
        assessments[index].startTime = timeString;
      } else {
        assessments[index].triggerTime = timeString;
      }
    }
    setMidVideoAssessments(assessments);
  };

  const setQuestions = (index: number, questions: question[]) => {
    let assessments = [...midVideoAssessments];
    assessments[index].questions = questions;
    setMidVideoAssessments(assessments);
  };

  const addNewMidVideoAssessment = () => {
    setMidVideoAssessments(current => [...current, initialAssessmentArray]);
  };

  const removeMidVideoAssessment = (id: string) => {
    setMidVideoAssessments(current =>
      current.filter(assessment => assessment.key !== id)
    );

    let validationMethodsCopy = { ...validationMethods };
    delete validationMethodsCopy[id];
    setValidationMethods(validationMethodsCopy);
  };

  const setValidation = (index: string, validationMethod: any) => {
    setValidationMethods({ ...validationMethods, [index]: validationMethod });
  };

  const validateAssessments = () => {
    let validationSuccess = true;

    midVideoAssessments.forEach((assessment: midVideoWithIdType) => {
      if (isQuestionsAdded(assessment)) {
        const validate = validationMethods[assessment.key];
        if (!validate(assessment.startTime, assessment.triggerTime)) {
          validationSuccess = false;
        }
      }
    });
    return validationSuccess;
  };

  useEffect(() => {
    setValidateMethod && setValidateMethod(validateAssessments);
  }, [setValidateMethod]);

  const isInitialTime = (time: string | undefined) => {
    if (!time) return true;
    return time === '00:00:00';
  };

  const isQuestionsAdded = (data: midVideoWithIdType) => {
    let isQuestionsAvailable = false;
    let isTimeAvailable = false;

    if (!isInitialTime(data.startTime) || !isInitialTime(data.triggerTime)) {
      isTimeAvailable = true;
    }

    if (data?.questions) {
      data?.questions?.forEach((q: question) => {
        if (q.question) {
          isQuestionsAvailable = true;
        }
        q.answers?.forEach((ans: question['answers'][0]) => {
          if (ans.answer) {
            isQuestionsAvailable = true;
          }
        });
      });
    }

    return isQuestionsAvailable || isTimeAvailable;
  };

  return (
    <div>
      {midVideoAssessments.map(({ key, startTime, triggerTime }, i) => {
        return (
          <QuestionContainer
            key={key}
            id={key}
            Controller={Controller}
            control={control}
            name={'midVideoAssessments'}
            setValue={setValue}
            clearErrors={clearErrors}
            setTime={setTime}
            index={i}
            setQuestions={setQuestions}
            setValidation={setValidation}
            removeMidVideoAssessment={removeMidVideoAssessment}
            showDeleteButton={midVideoAssessments.length > 1}
            startTime={startTime}
            triggerTime={triggerTime}
            assessmentList={midVideoAssessments}
          />
        );
      })}
      <div className="createContent fullWidth wysiwyg--section no-spacing">
        <div onClick={addNewMidVideoAssessment} className="btn-section sub">
          {t('Add Mid Video Assessment')}
        </div>
      </div>
    </div>
  );
};

export default MidVideoAssessment;
