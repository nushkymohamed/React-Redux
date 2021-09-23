import React, { FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from '../../Components/Modal/Modal';
import { SelectedAnswers } from '../../Containers/TheaterMode/EndVideoAssessmentContainerTheatre';
import { Question } from '../../redux/Theater/TheaterReducer';
import ButtonWithAnimation from '../ButtonWithAnimation/ButtonWithAnimation';

type EndVideoAssessmentQuestionProps = {
  answers: Question['answers'];
  currentQuestionId: string;
  currentQuestionNumber: number;
  imageURL: string;
  isNextButtonDisabled: boolean;
  loading?: boolean;
  onAnswerSelect: (answerId: string, answer: string) => void;
  onNextClick: () => void;
  question: string;
  selectedAnswers: SelectedAnswers;
  showEndVideoSummary: boolean;
  totalQuestionCount: number;
};

const EndVideoAssessmentQuestion: FC<EndVideoAssessmentQuestionProps> = ({
  answers,
  currentQuestionId,
  currentQuestionNumber,
  imageURL,
  isNextButtonDisabled,
  loading = false,
  onAnswerSelect,
  onNextClick,
  question,
  selectedAnswers,
  showEndVideoSummary,
  totalQuestionCount,
}) => {
  const { t } = useTranslation();
  const [showImagePopup, setShowImagePopup] = useState(false);

  const correctAnswerCount = useMemo(() => {
    return Object.values(selectedAnswers).reduce(
      (prev, curr) => (curr.isCorrect ? prev + 1 : prev),
      0
    );
  }, [selectedAnswers]);

  return (
    <div className="theaterMode__assessment--question-wrapper">
      {showEndVideoSummary ? (
        <div className="theaterMode__assessment--results">
          <h4>
            {t('Correct answers')}: {correctAnswerCount}/{totalQuestionCount}
          </h4>
        </div>
      ) : (
        <>
          <div className="theaterMode__assessment--question">
            <div className="theaterMode__assessment--question-number">
              <h4>
                {t('Question')} {currentQuestionNumber}
              </h4>{' '}
              {imageURL && (
                <button
                  className="btn btn--green"
                  onClick={() => setShowImagePopup(true)}
                >
                  {t('View Image')}
                </button>
              )}
            </div>
            <div className="theaterMode__assessment--question-body">
              <p>{question}</p>
            </div>
          </div>
          <div className="theaterMode__assessment--answers">
            <form>
              {Object.values(answers).map(({ answer, _id }) => (
                <>
                  <input
                    type="radio"
                    id={_id}
                    checked={
                      selectedAnswers?.[currentQuestionId]?.answerId === _id
                    }
                    onClick={() => onAnswerSelect(_id, answer)}
                    readOnly
                  />
                  <label htmlFor={_id}>{answer}</label>
                </>
              ))}
            </form>
          </div>
        </>
      )}
      <div className="theaterMode__assessment--buttons">
        {!loading ? (
          <button
            type="button"
            className={`btn btn--primary ${
              isNextButtonDisabled ? 'disable' : ''
            }`}
            onClick={onNextClick}
            disabled={isNextButtonDisabled}
          >
            {t(showEndVideoSummary ? 'Done' : 'Next')}
          </button>
        ) : (
          <ButtonWithAnimation animationClassName="btn btn--primary btn--loader active" />
        )}
      </div>

      {showImagePopup && (
        <Modal
          onClickAway={() => setShowImagePopup(false)}
          customClassName={'midVideo--image'}
        >
          <a
            className="btn-close closemodale"
            aria-hidden="true"
            onClick={() => setShowImagePopup(false)}
          >
            &times;
          </a>
          <img src={imageURL} alt="question-image" />
        </Modal>
      )}
    </div>
  );
};

export default EndVideoAssessmentQuestion;
