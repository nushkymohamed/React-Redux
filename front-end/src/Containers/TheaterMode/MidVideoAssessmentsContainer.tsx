import React, { FC, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DottedLoader from '../../Components/TheaterMode/DottedLoader';
import MidAssessmentSlider from '../../Components/TheaterMode/MidVideoAssesmentSlider';
import { notificationType, USER_CONTENT_SERVICE } from '../../config/constants';
import useApi from '../../Hooks/useApi';
import { RootStore } from '../../redux/store';
import { MidVideoAssessmentContentType } from '../../redux/Theater/TheaterReducer';
import {
  ATTEMPT_CREATION_LOADING_SUCCESS,
  GET_ASSESSMENT_ATTEMPTS_FAILED,
  GET_ASSESSMENT_ATTEMPTS_REQUEST,
  GET_ASSESSMENT_ATTEMPTS_SUCCESS,
  GET_QUESTION_RESULTS_FAIL,
  GET_QUESTION_RESULTS_REQUEST,
  GET_QUESTION_RESULTS_SUCCESS,
  POST_ASSESSMENT_ATTEMPTS_FAILED,
  POST_ASSESSMENT_ATTEMPTS_REQUEST,
  POST_ASSESSMENT_ATTEMPTS_SUCCESS,
  SINGLE_QUESTION_UPDATE_FAIL,
  SINGLE_QUESTION_UPDATE_REQUEST,
  SINGLE_QUESTION_UPDATE_SUCCESS,
  SUBMIT_QUESTION_FAIL,
  SUBMIT_QUESTION_REQUEST,
  SUBMIT_QUESTION_SUCCESS,
} from '../../redux/Theater/TheaterTypes';

type MidVideoAssessmentsContainerProps = {
  midAssessmentContent: MidVideoAssessmentContentType;
  closeMidAssignment: Function;
  setPlayerSeekTime: Function;
};

const MidVideoAssessmentsContainer: FC<MidVideoAssessmentsContainerProps> = ({
  midAssessmentContent,
  closeMidAssignment,
  setPlayerSeekTime,
}) => {
  const dispatch = useDispatch();

  const [getAssessmentAttemptsApi] = useApi();
  const [postAssessmentAttemptsApi] = useApi();
  const [updateSingleQuestionApi] = useApi();
  const [submitQuestionApi] = useApi();
  const [getQuestionResultApi] = useApi();

  const { userData } = useSelector((state: RootStore) => state.auth);
  const { lastMessage } = useSelector((state: RootStore) => state.websocket);

  const {
    content,
    isInitialAttemptsLoading,
    isInitialAttempt,
    assessmentAttempt,
    createAttemptLoading,
    attemptCreationSocketPending,
    assignmentResult,
  } = useSelector((state: RootStore) => state.theater);

  const { _id } = midAssessmentContent;

  const getAssessmentAttempts = () => {
    getAssessmentAttemptsApi(
      `/users/${userData?._id}/allowedVideos/${content?._id}/videoRelatedAssessments/${_id}/assessmentResponse/attempts?submitted=false`,
      GET_ASSESSMENT_ATTEMPTS_REQUEST,
      GET_ASSESSMENT_ATTEMPTS_SUCCESS,
      GET_ASSESSMENT_ATTEMPTS_FAILED,
      {},
      {},
      'GET',
      false,
      USER_CONTENT_SERVICE
    );
  };

  const postAssessmentAttempts = () => {
    postAssessmentAttemptsApi(
      `/users/${userData?._id}/allowedVideos/${content?._id}/videoRelatedAssessments/${_id}/attempts`,
      POST_ASSESSMENT_ATTEMPTS_REQUEST,
      POST_ASSESSMENT_ATTEMPTS_SUCCESS,
      POST_ASSESSMENT_ATTEMPTS_FAILED,
      {},
      {},
      'POST',
      false,
      USER_CONTENT_SERVICE
    );
  };
  const updateSingleQuestion = (questionIndex: number, answer: string) => {
    const attemptId = isInitialAttempt
      ? assessmentAttempt?.attemptId
      : assessmentAttempt?.data?.[0]?._id;
    const assessmentResponseId = assessmentAttempt?.assessmentResponseId;
    const data = {
      questionId: questionIndex,
      answers: [answer],
    };
    updateSingleQuestionApi(
      `/assessmentResponses/${assessmentResponseId}/attempts/${attemptId}/response`,
      SINGLE_QUESTION_UPDATE_REQUEST,
      SINGLE_QUESTION_UPDATE_SUCCESS,
      SINGLE_QUESTION_UPDATE_FAIL,
      data,
      {},
      'PUT',
      false,
      USER_CONTENT_SERVICE
    );
  };
  const submitQuestionAttempt = () => {
    const attemptId = isInitialAttempt
      ? assessmentAttempt?.attemptId
      : assessmentAttempt?.data?.[0]?._id;
    submitQuestionApi(
      `/users/${userData?._id}/allowedVideos/${content?._id}/videoRelatedAssessments/${_id}/attempts/${attemptId}`,
      SUBMIT_QUESTION_REQUEST,
      SUBMIT_QUESTION_SUCCESS,
      SUBMIT_QUESTION_FAIL,
      { submittedAt: new Date().toISOString() },
      {},
      'PUT',
      false,
      USER_CONTENT_SERVICE
    );
  };

  const getInitialQuestionIndex = useMemo(() => {
    let questionIndex: number = 1;
    if (!isInitialAttempt) {
      const currentQuestionIndex =
        assessmentAttempt?.data?.[0]?.responses?.length || 0;

      const totalQuestionAmount = Object.keys(
        midAssessmentContent?.questions
      )?.length;

      if (totalQuestionAmount > currentQuestionIndex) {
        questionIndex = currentQuestionIndex + 1;
      }
    }

    return questionIndex;
  }, [isInitialAttempt, assessmentAttempt]);
  const getQuestionResults = () => {
    const attemptId = isInitialAttempt
      ? assessmentAttempt?.attemptId
      : assessmentAttempt?.data?.[0]?._id;
    const assessmentResponseId = assessmentAttempt?.assessmentResponseId;
    getQuestionResultApi(
      `/assessmentResponses/${assessmentResponseId}/attempts/${attemptId}`,
      GET_QUESTION_RESULTS_REQUEST,
      GET_QUESTION_RESULTS_SUCCESS,
      GET_QUESTION_RESULTS_FAIL,
      {},
      {},
      'GET',
      false,
      USER_CONTENT_SERVICE
    );
  };

  useEffect(() => {
    content?._id && userData?._id && getAssessmentAttempts();
  }, [userData, content]);

  useEffect(() => {
    isInitialAttempt &&
      content?._id &&
      userData?._id &&
      postAssessmentAttempts();
  }, [isInitialAttempt, userData, content]);

  useEffect(() => {
    if (lastMessage?.message && assessmentAttempt) {
      const message = JSON.parse(JSON.parse(lastMessage?.message)) || '';
      const attemptId = isInitialAttempt
        ? assessmentAttempt?.attemptId
        : assessmentAttempt?.data?.[0]?._id;

      if (
        userData?._id === message?.userId &&
        attemptId === message?.attemptId &&
        assessmentAttempt?.assessmentResponseId ===
          message?.assessmentResponseId &&
        lastMessage?.webSocketResponseStatus === notificationType?.SUCCESS
      ) {
        if (
          lastMessage?.task ===
          notificationType?.ASSESSMENT_RESPONSE_ATTEMPT_CREATE
        ) {
          dispatch({ type: ATTEMPT_CREATION_LOADING_SUCCESS });
        }
        if (
          lastMessage?.task ===
          notificationType?.ASSESSMENT_RESPONSE_ATTEMPT_SUBMIT
        ) {
          getQuestionResults();
        }
      }
    }
  }, [JSON.stringify(lastMessage)]);

  return isInitialAttemptsLoading ||
    createAttemptLoading ||
    attemptCreationSocketPending ? (
    <DottedLoader />
  ) : (
    <MidAssessmentSlider
      midAssessmentContent={midAssessmentContent}
      closeMidAssignment={closeMidAssignment}
      singleQuestionSubmit={(questionIndex: number, answer: string) =>
        updateSingleQuestion(questionIndex, answer)
      }
      initialQuestionIndex={getInitialQuestionIndex}
      assignmentResult={assignmentResult}
      setPlayerSeekTime={setPlayerSeekTime}
      lastSocketMessage={lastMessage}
      assessmentAttempt={assessmentAttempt}
      isInitialAttempt={isInitialAttempt}
      userData={userData}
      submitAssignment={submitQuestionAttempt}
    />
  );
};
export default MidVideoAssessmentsContainer;
