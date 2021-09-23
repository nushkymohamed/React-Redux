import React, { FC, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import correctAnswerIcon from '../../assets/images/svg-images/icon-assessment-correct.svg';
import wrongAnswerIcon from '../../assets/images/svg-images/icon-assessment-wrong.svg';
import { SelectedAnswers } from '../../Containers/TheaterMode/EndVideoAssessmentContainerTheatre';
import { AssessmentContentType } from '../../redux/Theater/TheaterReducer';

type EndVideoAssessmentStatsCardProps = {
  currentQuestionId: string;
  questions: AssessmentContentType['questions'];
  selectedAnswers: SelectedAnswers;
};

type QuestionRefType = {
  [key: string]: HTMLDivElement | null;
};

const EndVideoAssessmentStatsCard: FC<EndVideoAssessmentStatsCardProps> = ({
  questions,
  selectedAnswers,
  currentQuestionId,
}) => {
  const { t } = useTranslation();
  const questionCardRefs = useRef<QuestionRefType>({});

  const updateQustionCardRef = (
    questionId: string,
    data: HTMLDivElement | null
  ) => {
    let currentRef = questionCardRefs.current;
    currentRef[questionId] = data;
    questionCardRefs.current = currentRef;
  };

  useEffect(() => {
    if (currentQuestionId) {
      const container = document.getElementById('questionCardsParentElementId');
      const topOffset =
        questionCardRefs.current[currentQuestionId]?.offsetTop || 0;
      if (container && topOffset > 0) {
        container.scroll({ top: topOffset, behavior: 'smooth' });
      }
    }
  }, [currentQuestionId]);
  return (
    <div
      className="theaterMode__assessment--question-list"
      id="questionCardsParentElementId"
    >
      {Object.values(questions).map((questionItem, index) => {
        const { _id, question } = questionItem;
        return (
          <div
            className={`theaterMode__assessment--question-list__item ${
              currentQuestionId === _id ? 'isHighlighted' : ''
            }`}
            key={_id}
            ref={instance => updateQustionCardRef(_id, instance)}
          >
            <div className="theaterMode__assessment--question-list__item-questionNumber">
              <h4>
                {t('Question')} {++index}
              </h4>

              {selectedAnswers?.[_id]?.isAnswered ? (
                selectedAnswers?.[_id]?.isCorrect ? (
                  <img src={correctAnswerIcon} alt="correct-icon" />
                ) : (
                  <img src={wrongAnswerIcon} alt="wrong-icon" />
                )
              ) : null}
            </div>
            <div className="theaterMode__assessment--question-list__item-questionBody">
              <p>{question}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EndVideoAssessmentStatsCard;
