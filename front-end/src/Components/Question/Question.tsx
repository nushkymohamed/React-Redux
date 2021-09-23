import React, { FC, useEffect, useState, memo } from 'react';
import { useTranslation } from 'react-i18next';
import video_preview_image from '../../assets/images/400x250.png';
import { QUESTION_TYPE } from '../../config/constants';
import PreviewContainer from '../../Containers/PreviewContainer/PreviewContainer';
import SingleQuestion from './SingleQuestion';
import {
  SingleQuestionType,
  UploadItem,
} from '../../Containers/Question/Question';
interface QuestionProps {
  index: string;
  updateQuestionList: Function;
  deleteQuestionSet: any;
  questionListLength: number;
  uploadFileKey: string;
  question?: SingleQuestionType | null;
}

const Question: FC<QuestionProps> = ({
  index,
  updateQuestionList,
  deleteQuestionSet,
  questionListLength,
  uploadFileKey,
  question: questionData,
}) => {
  const { t } = useTranslation();

  const singleAnswer = {
    option: '',
    correctAnswer: false,
    index: `${Date.now()}`,
  };

  const [uploadedImage, setUploadedImage] = useState({});

  const [question, setQuestion] = useState('');

  const [answers, setAnswers] = useState<SingleQuestionType['answers']>([
    { option: '', correctAnswer: true, index: `${Date.now()}1` },
    { option: '', correctAnswer: false, index: `${Date.now()}2` },
  ]);

  const [questionType, setQuestionType] = useState(
    QUESTION_TYPE.SINGLE_ANSWER_MCQ
  );

  const answersNumbering = [
    { letter: 'A' },
    { letter: 'B' },
    { letter: 'C' },
    { letter: 'D' },
    { letter: 'E' },
  ];

  const deleteAnswer = (key: string) => {
    const answersList = answers;
    const isCorrectAnswer = answersList.find(
      a => a.index === key
    )?.correctAnswer;
    const filterAnswerList = answersList.filter(
      ({ index }, i) => index !== key
    );
    setAnswers([...filterAnswerList]);
    if (isCorrectAnswer && filterAnswerList.length) {
      setCorrectAnswer(filterAnswerList[0].index);
    }
  };

  const setCorrectAnswer = (key: string) => {
    answers.map(answer => {
      answer.correctAnswer = false;
      if (answer.index === key) {
        answer.correctAnswer = true;
      }
      return answer;
    });

    setAnswers([...answers]);
  };

  const answerUpdate = (e: any, key: string) => {
    const answersIndex = answers.findIndex(({ index }) => index === key);
    answers[answersIndex].option = e.target.value;
    delete answers[answersIndex].errorMessage;
    setAnswers([...answers]);
  };

  const addAnotherAnswer = () => {
    const answersList = answers;
    answers.length < 5 && setAnswers([...answersList, singleAnswer]);
  };

  useEffect(() => {
    updateQuestionList(
      {
        answers,
        uploadedImage,
        question,
        questionType,
      },
      index
    );
  }, [answers, uploadedImage, question, questionType]);

  const [uploadComponent, setUploadComponent] = useState({
    accept: 'image/*',
    backgroundImage: video_preview_image,
    inputName: `previewImageUploadId-${index}`,
    title: '',
    uploadType: 'image',
    fileType: 'learning-materials',
  });

  const { accept, backgroundImage, inputName, title, uploadType } =
    uploadComponent;

  return (
    <div className="createContent__row wrap inner-row background">
      <div className="createContent__column">
        <div className="createContent__column--title">Question Type</div>
        <div className="createContent__column--content">
          <>
            <input
              type="radio"
              id={`${index}_textType`}
              checked={questionType === QUESTION_TYPE.SINGLE_ANSWER_MCQ}
              onClick={e => setQuestionType(QUESTION_TYPE.SINGLE_ANSWER_MCQ)}
              readOnly
            />
            <label htmlFor={`${index}_textType`}> Text Only</label>
          </>
          <>
            <input
              type="radio"
              id={`${index}_imageType`}
              checked={
                questionType === QUESTION_TYPE.SINGLE_ANSWER_MCQ_WITHIMAGE
              }
              onClick={e =>
                setQuestionType(QUESTION_TYPE.SINGLE_ANSWER_MCQ_WITHIMAGE)
              }
              readOnly
            />
            <label htmlFor={`${index}_imageType`}> With an image </label>
          </>
        </div>
        {questionType === QUESTION_TYPE.SINGLE_ANSWER_MCQ_WITHIMAGE && (
          <div>
            <div>Upload Image</div>
            <PreviewContainer
              accept={accept}
              backgroundImage={backgroundImage}
              componentKey={inputName}
              error={{ message: '' }}
              title={t(title)}
              uploadType={uploadType}
              action={(e: UploadItem) => {
                setUploadedImage(e);
              }}
              uploadFileKey={uploadFileKey}
            />
          </div>
        )}
      </div>
      <div className="createContent__column two-spaces">
        <label>Question</label>
        <input
          type="text"
          onChange={e => setQuestion(e.target.value)}
          value={question}
          className="createContent__question--input"
          placeholder="Write your question"
        />
        <span className="error-message push-right">
          {questionData?.errorMessage}
        </span>
        <div className="createContent__answers">
          <div className="createContent__answers--left-col">
            <span>Answers</span>
          </div>
          <div className="createContent__answers--right-col">
            <span>Correct Answer</span>
          </div>
        </div>

        {answers.map((data, i) => {
          const { letter } = answersNumbering[i];

          return (
            <SingleQuestion
              key={data.index}
              data={data}
              deleteAnswer={deleteAnswer}
              answerUpdate={answerUpdate}
              letter={letter}
              setCorrectAnswer={setCorrectAnswer}
              answersLength={answers.length}
            />
          );
        })}

        <div className="createContent fullWidth no-spacing pull-left">
          {answers.length < 5 ? (
            <div onClick={() => addAnotherAnswer()} className="btn-section">
              Add Another Answer
            </div>
          ) : null}
        </div>
      </div>
      {questionListLength > 1 && (
        <div className="btn-close" onClick={() => deleteQuestionSet(index)}>
          &times;
        </div>
      )}
    </div>
  );
};

export default memo(Question);
