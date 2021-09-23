import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ButtonWithAnimation from '../../Components/ButtonWithAnimation/ButtonWithAnimation';
import Modal from '../../Components/Modal/Modal';
import { notificationType, QUESTION_TYPE } from '../../config/constants';
import UseViewFile from '../../Hooks/UseViewFile';
import { UserDataTypes } from '../../redux/auth/authReducer';
import {
  AssessmentAttempts,
  AssignmentResultType,
  MidVideoAssessmentContentType,
  SingleAnswerType,
} from '../../redux/Theater/TheaterReducer';

type MidVideoAssessmentSliderProps = {
  midAssessmentContent: MidVideoAssessmentContentType;
  closeMidAssignment: Function;
  singleQuestionSubmit: Function;
  initialQuestionIndex: number;
  assignmentResult: AssignmentResultType | null;
  setPlayerSeekTime: Function;
  lastSocketMessage: any;
  assessmentAttempt: AssessmentAttempts | null;
  isInitialAttempt: boolean;
  userData: UserDataTypes | null;
  submitAssignment: Function;
};

const MidVideoAssessmentSlider: FC<MidVideoAssessmentSliderProps> = ({
  midAssessmentContent,
  closeMidAssignment,
  singleQuestionSubmit,
  initialQuestionIndex,
  assignmentResult,
  setPlayerSeekTime,
  lastSocketMessage,
  assessmentAttempt,
  isInitialAttempt,
  userData,
  submitAssignment,
}) => {
  const { t } = useTranslation();
  const [sliderIndex, setSliderIndex] = useState(0);
  const [nextButtonLoading, setNextButtonLoading] = useState(false);
  const [questionButtonLoading, setQuestionButtonLoading] = useState(false);
  const [animationNextClassName, setAnimationNextClassName] = useState('');
  const [animationQuestionClassName, setAnimationQuestionClassName] =
    useState('');
  const [questionIndex, setQuestionIndex] = useState(initialQuestionIndex);
  const [userAnswerIndex, setUserAnswerIndex] = useState(-1);
  const [questionImage, SetQuestionImage] = useState(false);
  const [getQuestionImage, questionImageUrl] = UseViewFile();

  const CheckForNextQuestion = () => {
    if (sliderIndex === 0) {
      setQuestionButtonLoading(true);
      setAnimationQuestionClassName('btn btn--primary btn--loader active');

      singleQuestionSubmit(
        questionIndex,
        midAssessmentContent?.questions?.[questionIndex]?.answers?.[
          userAnswerIndex + 1
        ]?.answer
      );
    }
    if (sliderIndex === 1) {
      if (
        Object.keys(midAssessmentContent?.questions)?.length === questionIndex
      ) {
        setNextButtonLoading(true);
        setAnimationNextClassName('btn btn--primary btn--loader active');
      } else {
        setQuestionIndex(questionIndex + 1);
        setSliderIndex(0);
        setUserAnswerIndex(-1);
      }
    }
  };

  const getRadioClassName = (currentIndex: number) => {
    let className = '';

    const indexOfCorrectAnswer = Object.values(
      midAssessmentContent?.questions?.[questionIndex]?.answers
    )?.findIndex((data: SingleAnswerType) => data?.isCorrect);

    if (indexOfCorrectAnswer === currentIndex) {
      className = 'correctAnswer';
    }
    if (
      userAnswerIndex === currentIndex &&
      indexOfCorrectAnswer !== userAnswerIndex
    ) {
      className = 'wrongAnswer';
    }

    return className;
  };
  const getImageComponent = () => {
    return (
      <>
        {' '}
        {QUESTION_TYPE.SINGLE_ANSWER_MCQ_WITHIMAGE ===
          midAssessmentContent?.questions?.[questionIndex]?.questionType && (
          <button
            className="btn btn--green"
            onClick={() => SetQuestionImage(true)}
          >
            {t('View Image')}
          </button>
        )}
        {questionImage && (
          <Modal
            onClickAway={() => SetQuestionImage(false)}
            customClassName={'midVideo--image'}
          >
            <a
              className="btn-close closemodale"
              aria-hidden="true"
              onClick={() => SetQuestionImage(false)}
            >
              &times;
            </a>
            <img src={questionImageUrl} alt="" />
          </Modal>
        )}
      </>
    );
  };

  useEffect(() => {
    if (
      questionIndex &&
      midAssessmentContent?.questions?.[questionIndex]?.questionImage
    ) {
      const questionImage =
        midAssessmentContent?.questions?.[questionIndex]?.questionImage;

      questionImage?.bucketName &&
        questionImage?.fileKey &&
        getQuestionImage(questionImage?.bucketName, questionImage?.fileKey);
    }
  }, [questionIndex]);

  useEffect(() => {
    if (assignmentResult && nextButtonLoading) {
      setNextButtonLoading(false);
      setAnimationNextClassName('');
      assignmentResult?.responses?.length === assignmentResult?.totalMarks
        ? closeMidAssignment()
        : setSliderIndex(2);
    }
  }, [assignmentResult, nextButtonLoading]);

  useEffect(() => {
    if (lastSocketMessage?.message && assessmentAttempt) {
      const message = JSON.parse(JSON.parse(lastSocketMessage?.message)) || '';
      const attemptId = isInitialAttempt
        ? assessmentAttempt?.attemptId
        : assessmentAttempt?.data?.[0]?._id;

      if (
        userData?._id === message?.userId &&
        attemptId === message?.attemptId &&
        assessmentAttempt?.assessmentResponseId ===
          message?.assessmentResponseId &&
        lastSocketMessage?.webSocketResponseStatus ===
          notificationType?.SUCCESS &&
        message?.questionId == questionIndex
      ) {
        if (
          lastSocketMessage?.task ===
          notificationType?.ASSESSMENT_RESPONSE_ATTEMPT_UPDATE
        ) {
          Object.keys(midAssessmentContent?.questions)?.length ===
            questionIndex && submitAssignment();

          setSliderIndex(1);
          setQuestionButtonLoading(false);
          setAnimationQuestionClassName('');
        }
      }
    }
  }, [JSON.stringify(lastSocketMessage)]);

  return (
    <div className="theaterMode__midVideoAssessment">
      {sliderIndex === 0 && (
        <div className="theaterMode__midVideoAssessment--wrapper">
          <div className="theaterMode__midVideoAssessment--content">
            <div className="theaterMode__midVideoAssessment--content-left">
              <div className="theaterMode__midVideoAssessment--title">
                <p>
                  {t('Question')} {questionIndex}
                </p>

                {getImageComponent()}
              </div>
              <p>
                {midAssessmentContent?.questions?.[questionIndex]?.question}
              </p>
              <div className="theaterMode__midVideoAssessment--buttons">
                {!questionButtonLoading ? (
                  <button
                    className={`btn btn--primary ${
                      userAnswerIndex < 0 && 'disable'
                    }`}
                    onClick={() => CheckForNextQuestion()}
                    disabled={userAnswerIndex < 0}
                  >
                    {t('Next')}
                  </button>
                ) : (
                  <ButtonWithAnimation
                    animationClassName={animationQuestionClassName}
                    onTransitionEnd={setAnimationQuestionClassName}
                  />
                )}
              </div>
            </div>
            <div className="theaterMode__midVideoAssessment--content-right">
              {Object.values(
                midAssessmentContent?.questions?.[questionIndex]?.answers
              )?.map((data: SingleAnswerType, index: number) => {
                return (
                  <>
                    <input
                      type="radio"
                      id={`${index}_mid_answer`}
                      checked={index === userAnswerIndex}
                    />
                    <label
                      htmlFor={`${sliderIndex}_imageType`}
                      onClick={() => setUserAnswerIndex(index)}
                    >
                      {' '}
                      {data?.answer}{' '}
                    </label>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      )}
      {sliderIndex === 1 && (
        <div className="theaterMode__midVideoAssessment--wrapper">
          <div className="theaterMode__midVideoAssessment--content">
            <div className="theaterMode__midVideoAssessment--content-left">
              <div className="theaterMode__midVideoAssessment--title">
                <p>
                  {t('Question')} {questionIndex}
                </p>
                {getImageComponent()}
              </div>
              <p>
                {midAssessmentContent?.questions?.[questionIndex]?.question}
              </p>
              <div className="theaterMode__midVideoAssessment--buttons">
                {!nextButtonLoading ? (
                  <button
                    className="btn btn--primary"
                    onClick={() => CheckForNextQuestion()}
                  >
                    {Object.keys(midAssessmentContent?.questions)?.length ===
                    questionIndex
                      ? t('Finish')
                      : t('Next')}
                  </button>
                ) : (
                  <ButtonWithAnimation
                    animationClassName={animationNextClassName}
                    onTransitionEnd={setAnimationNextClassName}
                  />
                )}
              </div>
            </div>
            <div className="theaterMode__midVideoAssessment--content-right">
              {Object.values(
                midAssessmentContent?.questions?.[questionIndex]?.answers
              )?.map((data: SingleAnswerType, index: number) => {
                return (
                  <>
                    <input type="radio" id={`${index}_textType`} readOnly />
                    <label
                      htmlFor={`${sliderIndex}_imageType`}
                      className={getRadioClassName(index)}
                    >
                      {' '}
                      {data?.answer}{' '}
                    </label>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      )}
      {sliderIndex === 2 && (
        <div className="theaterMode__midVideoAssessment--wrapper answer">
          <div className="theaterMode__midVideoAssessment--content">
            <div className="theaterMode__midVideoAssessment--content-left">
              <div className="theaterMode__midVideoAssessment--final">
                <h3>
                  {t('Seems like you got')}{' '}
                  {(assignmentResult?.responses?.length || 0) -
                    (assignmentResult?.totalMarks || 0)}{' '}
                  {t('wrong')}
                </h3>
                <h4>{t('Would you like to re-watch the last section')}</h4>
              </div>
              <div className="theaterMode__midVideoAssessment--buttons">
                <button
                  className="btn btn--secondary btn--marginRight"
                  onClick={() => {
                    setPlayerSeekTime(midAssessmentContent?.startTime);
                    closeMidAssignment();
                  }}
                >
                  {t('Re watch')}
                </button>
                <button
                  className="btn btn--primary"
                  onClick={() => closeMidAssignment()}
                >
                  {t('Continue to the video')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default MidVideoAssessmentSlider;
