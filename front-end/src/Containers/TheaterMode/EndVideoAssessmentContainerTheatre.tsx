import React, { FC, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import EndVideoAssessmentQuestion from '../../Components/TheaterMode/EndVideoAssessmentQuestion';
import EndVideoAssessmentStatsCard from '../../Components/TheaterMode/EndVideoAssessmentStatsCard';
import {
  notificationType,
  SocketStatus,
  USER_CONTENT_SERVICE,
} from '../../config/constants';
import useApi from '../../Hooks/useApi';
import UseViewFile from '../../Hooks/UseViewFile';
import { RootStore } from '../../redux/store';
import { Question } from '../../redux/Theater/TheaterReducer';
import {
  CREATE_END_VIDEO_ASSESSMENT_ATTEMPT_FAILED,
  CREATE_END_VIDEO_ASSESSMENT_ATTEMPT_REQUEST,
  CREATE_END_VIDEO_ASSESSMENT_ATTEMPT_SUCCESS,
  GET_END_VIDEO_ASSESSMENT_ATTEMPTS_FAILED,
  GET_END_VIDEO_ASSESSMENT_ATTEMPTS_REQUEST,
  GET_END_VIDEO_ASSESSMENT_ATTEMPTS_SUCCESS,
  SUBMIT_END_VIDEO_ASSESSMENT_ATTEMPT_FAILED,
  SUBMIT_END_VIDEO_ASSESSMENT_ATTEMPT_REQUEST,
  SUBMIT_END_VIDEO_ASSESSMENT_ATTEMPT_SUCCESS,
  UPDATE_END_VIDEO_ASSESSMENT_ATTEMPT_FAILED,
  UPDATE_END_VIDEO_ASSESSMENT_ATTEMPT_REQUEST,
  UPDATE_END_VIDEO_ASSESSMENT_ATTEMPT_SUCCESS,
} from '../../redux/Theater/TheaterTypes';

export type SelectedAnswers = {
  [questionKey: string]: {
    answer: string;
    answerId: string;
    isAnswered: boolean;
    isCorrect: boolean;
  };
};

type EndVideoAssesssmentContainerTheatreProps = {
  contentId: string;
  hideEndVideoAssessment: () => void;
};

type AnswerSubmissionStatus = {
  [questionId: string]: { isSubmissionSuccess: boolean; isSubmitting: boolean };
};

const EndVideoAssessmentContainerTheatre: FC<EndVideoAssesssmentContainerTheatreProps> =
  ({ contentId, hideEndVideoAssessment }) => {
    const {
      endVideoAssessment: { title, questions = {} },
      endVideoAssessmentId,
      endVideoAttemptsNoContent,
      endVideoAttemptExistingData,
      endVideoNewAttemptData,
    } = useSelector((state: RootStore) => state.theater);
    const { lastMessage } = useSelector((state: RootStore) => state.websocket);
    const { userData } = useSelector((state: RootStore) => state.auth);

    const [currentQuestionId, setCurrentQuestionId] = useState('');
    const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
    const [currentQuestionKey, setCurrentQuestionKey] = useState('');
    const [currentQuestion, setCurrentQuestion] = useState<Question>();
    const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswers>();
    const [getImageURL, imageURL, resetImageURL] = UseViewFile();
    const [attemptId, setAttemptId] = useState('');
    const [assessmentResponseId, setAssessmentResponseId] = useState('');
    const [showEndVideoSummary, setShowEndVideoSummary] = useState(false);
    const [submissionStatus, setSubmissionStatus] =
      useState<AnswerSubmissionStatus>();
    const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);

    const [getAssessmentAttemptsResponseAPI] = useApi();
    const [createAssessmentAttemptResponseAPI] = useApi();
    const [updateAssessmentResponseAPI] = useApi();
    const [submitAssessmentResponseAPI] = useApi();

    const {
      question,
      answers = {},
      questionImage,
      _id: questionId,
    } = currentQuestion || {};

    useEffect(() => {
      if (userData?._id && contentId && endVideoAssessmentId) {
        getAssessmentAttemptsResponse();
      }
    }, [userData, contentId, endVideoAssessmentId]);

    useEffect(() => {
      if (endVideoAttemptsNoContent) {
        //No previous unfinished attempts
        createAssessmentAttemptResponse();
      }
    }, [endVideoAttemptsNoContent]);

    useEffect(() => {
      if (
        endVideoAttemptExistingData?.assessmentResponseId &&
        endVideoAttemptExistingData?.data.length
      ) {
        //Attempt already exists
        setAssessmentResponseId(
          endVideoAttemptExistingData.assessmentResponseId
        );
        setAttemptId(endVideoAttemptExistingData.data[0]._id);
        setIsNextButtonDisabled(false);
      }
    }, [endVideoAttemptExistingData]);

    useEffect(() => {
      //skip current question if it exists in current attempt
      if (
        endVideoAttemptExistingData?.data?.[0].responses?.length &&
        currentQuestionKey
      ) {
        const previousAnsweredQuestionIds =
          endVideoAttemptExistingData?.data?.[0].responses?.map(
            response => response.questionId
          );

        if (previousAnsweredQuestionIds?.includes(Number(currentQuestionKey))) {
          const correctAnswer = Object.values(answers).find(
            ans => ans.isCorrect
          );

          const givenAnswer =
            endVideoAttemptExistingData?.data?.[0].responses?.find(
              response => response.questionId === Number(currentQuestionKey)
            )?.answers?.[0];

          selectAndValidateAnswer(
            correctAnswer?.answer || '',
            correctAnswer?._id || '',
            correctAnswer?.answer.localeCompare(givenAnswer || '') === 0,
            currentQuestionId
          );
          updateSubmissionStatus(currentQuestionKey, true, false);
          gotoNextQuestion();
        }
      }
    }, [endVideoAttemptExistingData, questionId]);

    useEffect(() => {
      if (
        lastMessage?.task ===
          notificationType?.ASSESSMENT_RESPONSE_ATTEMPT_CREATE &&
        lastMessage?.webSocketResponseStatus === SocketStatus.SUCCESS &&
        endVideoNewAttemptData?.assessmentResponseId
      ) {
        let assessmentAttemptData: any;
        try {
          assessmentAttemptData = JSON.parse(JSON.parse(lastMessage?.message));
        } catch (e) {
          console.log('Error parsing websocket message', e);
        }

        if (
          assessmentAttemptData?.assessmentResponseId ===
            endVideoNewAttemptData.assessmentResponseId &&
          assessmentAttemptData?.attemptId === endVideoNewAttemptData.attemptId
        ) {
          //when assessment attempt create success
          setAssessmentResponseId(endVideoNewAttemptData.assessmentResponseId);
          setAttemptId(endVideoNewAttemptData.attemptId);
          setIsNextButtonDisabled(false);
        }
      } else if (
        lastMessage?.task ===
        notificationType?.ASSESSMENT_RESPONSE_ATTEMPT_UPDATE
      ) {
        let assessmentAttemptData: any = {};

        try {
          assessmentAttemptData = JSON.parse(JSON.parse(lastMessage?.message));
        } catch (e) {
          console.log('Error parsing websocket message', e);
        }

        if (
          assessmentAttemptData?.assessmentResponseId ===
            assessmentResponseId &&
          assessmentAttemptData?.attemptId === attemptId &&
          assessmentAttemptData?.questionId === currentQuestionKey
        ) {
          if (lastMessage?.webSocketResponseStatus === SocketStatus.SUCCESS) {
            //when answer submission success
            updateSubmissionStatus(currentQuestionKey, true, false);
          } else {
            updateSubmissionStatus(currentQuestionKey, false, false);
          }
        }
      } else if (
        lastMessage?.task ===
          notificationType?.ASSESSMENT_RESPONSE_ATTEMPT_SUBMIT &&
        lastMessage?.webSocketResponseStatus === SocketStatus.SUCCESS
      ) {
        let assessmentAttemptData: any = {};

        try {
          assessmentAttemptData = JSON.parse(JSON.parse(lastMessage?.message));
        } catch (e) {
          console.log('Error parsing websocket message', e);
        }

        if (
          assessmentAttemptData?.assessmentResponseId ===
            assessmentResponseId &&
          assessmentAttemptData?.attemptId === attemptId
        ) {
          //when assessment attempt submission success
        }
      }
    }, [JSON.stringify(lastMessage)]);

    const updateSubmissionStatus = (
      currentQuestionId: string,
      isSubmissionSuccess: boolean,
      isSubmitting: boolean
    ) => {
      setSubmissionStatus(current => {
        return {
          ...current,
          [currentQuestionId]: {
            isSubmissionSuccess,
            isSubmitting,
          },
        };
      });
    };

    const getAssessmentAttemptsResponse = () => {
      if (userData?._id && contentId && endVideoAssessmentId) {
        getAssessmentAttemptsResponseAPI(
          `/users/${userData?._id}/allowedVideos/${contentId}/videoRelatedAssessments/${endVideoAssessmentId}/assessmentResponse/attempts?submitted=false`,
          GET_END_VIDEO_ASSESSMENT_ATTEMPTS_REQUEST,
          GET_END_VIDEO_ASSESSMENT_ATTEMPTS_SUCCESS,
          GET_END_VIDEO_ASSESSMENT_ATTEMPTS_FAILED,
          {},
          {},
          'GET',
          false,
          USER_CONTENT_SERVICE
        );
      }
    };

    const createAssessmentAttemptResponse = () => {
      if (userData?._id && contentId && endVideoAssessmentId) {
        createAssessmentAttemptResponseAPI(
          `/users/${userData?._id}/allowedVideos/${contentId}/videoRelatedAssessments/${endVideoAssessmentId}/attempts`,
          CREATE_END_VIDEO_ASSESSMENT_ATTEMPT_REQUEST,
          CREATE_END_VIDEO_ASSESSMENT_ATTEMPT_SUCCESS,
          CREATE_END_VIDEO_ASSESSMENT_ATTEMPT_FAILED,
          {},
          {},
          'POST',
          false,
          USER_CONTENT_SERVICE
        );
      }
    };
    const updateAssessmentAttemptResponse = (
      questionId: number,
      answerId: string
    ) => {
      if (!questionId || !answerId || !assessmentResponseId || !attemptId)
        return;

      const answerData = {
        questionId,
        answers: [answerId],
      };

      updateSubmissionStatus(questionId.toString(), false, true);

      updateAssessmentResponseAPI(
        `/assessmentResponses/${assessmentResponseId}/attempts/${attemptId}/response`,
        UPDATE_END_VIDEO_ASSESSMENT_ATTEMPT_REQUEST,
        UPDATE_END_VIDEO_ASSESSMENT_ATTEMPT_SUCCESS,
        UPDATE_END_VIDEO_ASSESSMENT_ATTEMPT_FAILED,
        answerData,
        {},
        'PUT',
        false,
        USER_CONTENT_SERVICE
      );
    };

    const submitAssessmentResponse = () => {
      if (!userData?._id || !contentId || !endVideoAssessmentId || !attemptId)
        return;

      submitAssessmentResponseAPI(
        `/users/${userData?._id}/allowedVideos/${contentId}/videoRelatedAssessments/${endVideoAssessmentId}/attempts/${attemptId}`,
        SUBMIT_END_VIDEO_ASSESSMENT_ATTEMPT_REQUEST,
        SUBMIT_END_VIDEO_ASSESSMENT_ATTEMPT_SUCCESS,
        SUBMIT_END_VIDEO_ASSESSMENT_ATTEMPT_FAILED,
        { submittedAt: new Date().toISOString() },
        {},
        'PUT',
        false,
        USER_CONTENT_SERVICE
      );
    };

    useEffect(() => {
      const { bucketName, fileKey } = questionImage || {};
      if (bucketName && fileKey) {
        getImageURL(bucketName, fileKey);
      }
    }, [questionImage]);

    useEffect(() => {
      const questionList = Object.values(questions);
      if (questionList.length) {
        setCurrentQuestionId(questionList[0]._id);
        setCurrentQuestionKey(Object.keys(questions)?.[0]);
        setCurrentQuestionNumber(1);
      }
    }, [questions]);

    useEffect(() => {
      currentQuestionId &&
        setCurrentQuestion(() =>
          Object.values(questions).find(({ _id }) => _id === currentQuestionId)
        );
    }, [currentQuestionId]);

    const gotoNextQuestion = () => {
      const questionList = Object.values(questions);
      const nextIndex =
        questionList.findIndex(({ _id }) => _id === currentQuestionId) + 1;
      if (nextIndex < questionList.length) {
        setCurrentQuestionId(questionList[nextIndex]._id);
        setCurrentQuestionKey(Object.keys(questions)?.[nextIndex]);
        setCurrentQuestionNumber(nextIndex + 1);
        resetImageURL();
      } else {
        if (showEndVideoSummary) {
          hideEndVideoAssessment();
        } else {
          setShowEndVideoSummary(true);

          //no next question, submit data
          submitAssessmentResponse();
        }
      }
    };

    const selectAndValidateAnswer = (
      answer: string,
      answerId: string,
      isCorrect: boolean,
      questionId: string
    ) => {
      setSelectedAnswers(current => {
        return {
          ...current,
          [questionId]: {
            answer,
            answerId,
            isAnswered: true,
            isCorrect,
          },
        };
      });
    };

    const onAnswerSelect = (answerId: string, answer: string) => {
      setSelectedAnswers(current => {
        return {
          ...current,
          [currentQuestionId]: {
            answer,
            answerId,
            isAnswered: false,
            isCorrect: false,
          },
        };
      });
    };

    const updateAnswers = (questionId: string, isCorrect: boolean) => {
      setSelectedAnswers(current => {
        const currentAnswer = current?.[questionId];
        const updatedAnswers = { ...current };

        if (currentAnswer) {
          updatedAnswers[questionId] = {
            ...currentAnswer,
            isAnswered: true,
            isCorrect,
          };
        }

        return updatedAnswers;
      });
    };

    const validateSelectedAnswer = () => {
      //save answer
      updateAssessmentAttemptResponse(
        Number(currentQuestionKey),
        selectedAnswers?.[currentQuestionId].answer || ''
      );

      const correctAnswer = Object.values(answers).find(
        ans => ans.isCorrect
      )?._id;

      if (correctAnswer) {
        updateAnswers(
          currentQuestionId,
          correctAnswer === selectedAnswers?.[currentQuestionId].answerId
        );
      }
    };

    useEffect(() => {
      if (submissionStatus?.[currentQuestionKey]?.isSubmissionSuccess) {
        //Current answer is submitted
        gotoNextQuestion();
      }
    }, [submissionStatus]);

    const onNextClick = () => {
      if (!!selectedAnswers?.[currentQuestionId]?.answerId) {
        if (showEndVideoSummary) {
          hideEndVideoAssessment();
        } else {
          validateSelectedAnswer();
        }
      } else {
        gotoNextQuestion();
      }
    };

    const totalQuestionCount = useMemo(() => {
      return Object.keys(questions).length;
    }, [questions]);

    return (
      <>
        <div className="theaterMode__topArea--left assessment">
          <div className="theaterMode__assessment--wrapper">
            <div className="theaterMode__assessment--title">
              <h3>{title}</h3>
            </div>
            <EndVideoAssessmentQuestion
              answers={answers}
              currentQuestionId={currentQuestionId}
              currentQuestionNumber={currentQuestionNumber}
              imageURL={imageURL}
              onAnswerSelect={onAnswerSelect}
              onNextClick={onNextClick}
              question={question || ''}
              selectedAnswers={selectedAnswers || ({} as SelectedAnswers)}
              showEndVideoSummary={showEndVideoSummary}
              totalQuestionCount={totalQuestionCount}
              loading={
                submissionStatus?.[currentQuestionKey]?.isSubmitting || false
              }
              isNextButtonDisabled={isNextButtonDisabled}
            />
          </div>
        </div>
        <div className="theaterMode__topArea--right">
          <EndVideoAssessmentStatsCard
            currentQuestionId={questionId || ''}
            questions={questions}
            selectedAnswers={selectedAnswers || ({} as SelectedAnswers)}
          />
        </div>
      </>
    );
  };

export default EndVideoAssessmentContainerTheatre;
