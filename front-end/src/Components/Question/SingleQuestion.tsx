import React from 'react';
import { FC } from 'react';

interface SingleQuestionProps {
  data: {
    option: any;
    correctAnswer?: boolean;
    index: string;
    errorMessage?: string;
  };
  answerUpdate: any;
  deleteAnswer: any;
  letter: string;
  setCorrectAnswer: Function;
  answersLength: number;
}

const SingleQuestion: FC<SingleQuestionProps> = ({
  data,
  deleteAnswer,
  answerUpdate,
  letter,
  setCorrectAnswer,
  answersLength,
}) => {
  const { option, index, correctAnswer, errorMessage } = data;

  return (
    <div className="createContent__answers">
      <div className="createContent__answers--left-col">
        <div className="createContent__answers--number">{letter}</div>
        <div className="createContent__answers--input">
          <input
            type="text"
            onChange={e => answerUpdate(e, index)}
            value={option}
          />
          {answersLength > 2 && (
            <a className="btn-close input" onClick={() => deleteAnswer(index)}>
              &times;
            </a>
          )}
          <span className="error-message pull-up">{errorMessage}</span>
        </div>
      </div>
      <div className="createContent__answers--right-col">
        <input
          type="radio"
          id={`correctAnswer_${index}`}
          checked={correctAnswer}
          readOnly
          onClick={() => setCorrectAnswer(index)}
        />
        <label htmlFor={`correctAnswer_${index}`}></label>
      </div>
    </div>
  );
};

export default SingleQuestion;
