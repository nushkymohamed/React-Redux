import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { QuestionItemType } from '../../Components/CreateVideo/MidVideoAssessment/MidVideoAssessment';
import QuestionComponent from '../../Components/Question/Question';
import { CONTENT_SERVICE, QUESTION_TYPE } from '../../config/constants';
import useApi from '../../Hooks/useApi';
import {
  FILE_UPLOAD_S3_INFO_FAILED,
  FILE_UPLOAD_S3_INFO_REQUEST,
  FILE_UPLOAD_S3_INFO_SUCCESS,
} from '../../redux/common/commonTypes';
interface QuestionProps {
  Controller: any;
  control: any;
  name: string;
  setValue: any;
  errors?: any;
  setError?: any;
  clearErrors?: any;
  setValidateQuestions?: any;
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

const Question: FC<QuestionProps> = ({
  Controller,
  control,
  name,
  setValue,
  errors,
  setError,
  clearErrors,
  setValidateQuestions,
}) => {
  const [uploadRequest] = useApi();
  const { t } = useTranslation();
  const [questionList, setQuestionList] = useState<
    QuestionListTypes['questionList']
  >([]);
  const singleQuestion = { question: null, index: `${Date.now()}` };

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

  useEffect(() => {
    setValidateQuestions(validateQuestions);
  }, [setValidateQuestions]);

  const validateQuestions = () => {
    let isError = false;

    const validatedQuestions = questionList.map(q => {
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

    setQuestionList(validatedQuestions);

    return !isError;
  };

  useEffect(() => {
    let questionsObj: { [key: string]: any } = {};
    questionList.forEach(({ question: mainQuestionKey }, index) => {
      const { answers, question, uploadedImage, questionType } =
        mainQuestionKey || {};
      let mappedQuestion: QuestionItemType = {} as QuestionItemType;

      let answersObj: { [key: string]: any } = {};
      answers?.forEach(({ option, correctAnswer }, index) => {
        answersObj[++index] = {
          answer: option,
          isCorrect: correctAnswer,
        };
      });

      mappedQuestion.question = question || '';
      mappedQuestion.answers = answersObj;
      mappedQuestion.questionType = questionType || '';

      if (
        questionType === QUESTION_TYPE.SINGLE_ANSWER_MCQ_WITHIMAGE &&
        uploadedImage?.fileKey
      ) {
        mappedQuestion.questionImage = uploadedImage;
      }
      questionsObj[++index] = mappedQuestion;
    });

    setValue('questions', questionsObj);
    clearErrors('questionsValidate');
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

  return (
    <Controller
      control={control}
      name={name}
      render={() => (
        <>
          <div className="createContent__row wrap normalSpacing">
            <div className="createContent__column">
              <h3 className="createContent__rowtitle">Upload Contents</h3>
              <div className="createContent__background-wrap">
                <div className="countTile">Number Of Question</div>
                <div className="count">{questionList.length}</div>
              </div>
            </div>
          </div>
          <div className="createContent__column fullWidth">
            <div className="form fullWidth no-spacing">
              {questionList.map(({ question, index }) => (
                <QuestionComponent
                  key={index}
                  index={`${index}`}
                  question={question}
                  updateQuestionList={updateQuestionList}
                  deleteQuestionSet={deleteQuestionSet}
                  questionListLength={questionList.length}
                  uploadFileKey={uploadFileKey}
                />
              ))}
            </div>
          </div>
          <div className="createContent fullWidth wysiwyg--section no-spacing">
            <div onClick={() => addQuestion()} className="btn-section">
              Add Another Question
            </div>
          </div>
        </>
      )}
    />
  );
};

export default Question;
