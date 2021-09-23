import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import BasicInformation from '../../Components/CreateAssessment/BasicInformation/BasicInformation';
import Overlay from '../../Components/Overlay/Overlay';
import RelatedContent from '../../Components/RelatedContent/RelatedContent';
import {
  contentType,
  CONTENT_SERVICE,
  OrderByFieldNames,
  USER_SERVICE,
} from '../../config/constants';
import useApi from '../../Hooks/useApi';
import {
  GET_LESSONS_FAILED,
  GET_LESSONS_REQUEST,
  GET_LESSONS_SUCCESS,
  GET_ORDER_FAILED,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_RELATED_ASSIGNMENT_CONTENTS_FAILED,
  GET_RELATED_ASSIGNMENT_CONTENTS_REQUEST,
  GET_RELATED_ASSIGNMENT_CONTENTS_SUCCESS,
  GET_RELATED_DOCUMENT_CONTENTS_FAILED,
  GET_RELATED_DOCUMENT_CONTENTS_REQUEST,
  GET_RELATED_DOCUMENT_CONTENTS_SUCCESS,
  GET_RELATED_VIDEO_CONTENTS_FAILED,
  GET_RELATED_VIDEO_CONTENTS_REQUEST,
  GET_RELATED_VIDEO_CONTENTS_SUCCESS,
  GET_SUBJECTS_FAILED,
  GET_SUBJECTS_REQUEST,
  GET_SUBJECTS_SUCCESS,
  GET_TOPICS_FAILED,
  GET_TOPICS_REQUEST,
  GET_TOPICS_SUCCESS,
  GET_TUTORS_FAILED,
  GET_TUTORS_REQUEST,
  GET_TUTORS_SUCCESS,
  RESET_LESSONS,
  RESET_ORDER,
  RESET_TOPICS,
  RESET_TUTORS,
  SET_SELECTED_SUBJECT,
  SET_SELECTED_TOPIC,
  SET_SELECTED_TUTOR,
} from '../../redux/common/commonTypes';
import {
  CREATE_ASSESSMENT_FAILED,
  CREATE_ASSESSMENT_REQUEST,
  CREATE_ASSESSMENT_SUCCESS,
  CREATE_CONTENT_RESET,
} from '../../redux/content/contentTypes';
import { RootStore } from '../../redux/store';
import Question from '../Question/Question';
import AssessmentAndImageUploadContainerTags from './AssessmentAndImageUploadContainerTags';

interface dropdownType {
  label: string;
  value: string;
}

interface locationState {
  selectedSyllabus: dropdownType | null;
  selectedGrade: dropdownType | null;
}

const AssessmentContainer = (props: any) => {
  const {
    register,
    handleSubmit,
    errors,
    control,
    setError,
    watch,
    setValue,
    clearErrors,
  } = useForm({
    shouldFocusError: true,
    defaultValues: {
      author: '',
      description: '',
      tags: [''],
    },
  });

  const [lessonRequest] = useApi();
  const [orderRequest] = useApi();
  const [subjectRequest] = useApi();
  const [topicRequest] = useApi();
  const [tutorRequest] = useApi();
  const [contentPostRequest] = useApi();
  const dispatch = useDispatch();
  const [relatedDocumentRequest] = useApi();
  const [relatedVideoRequest] = useApi();
  const [relatedAssignmentRequest] = useApi();
  const { t } = useTranslation();
  const history = useHistory();

  const {
    lessons,
    order,
    selectedSubject,
    selectedTopic,
    selectedTutor,
    subjects,
    topics,
    tutors,
    relatedDocumentContent,
    relatedVideoContent,
    relatedAssignmentContent,
  } = useSelector((state: RootStore) => state.common);

  const { success: contentCreateSuccess, error: contentCreationError } =
    useSelector((state: RootStore) => state.content);

  const [selectedSyllabus, setSelectedSyllabus] = useState<dropdownType | null>(
    null
  );
  const [selectedGrade, setSelectedGrade] = useState<dropdownType | null>(null);

  const [showOverlay, setShowOverlay] = useState(false);

  let validateQuestions: any = null;

  const payload = { dataWrapper: { data: {} } };
  const resetTopic = () => {
    dispatch({
      type: RESET_TOPICS,
      payload,
    });
  };

  const resetTutor = () => {
    dispatch({
      type: RESET_TUTORS,
      payload,
    });
  };

  const resetLesson = () => {
    dispatch({
      type: RESET_LESSONS,
      payload,
    });
  };

  const resetOrder = () => {
    dispatch({
      type: RESET_ORDER,
      payload,
    });
  };

  useEffect(() => {
    const { syllabusId, gradeId } = props.match.params;
    subjectRequest(
      `/syllabuses/${syllabusId}/grades/${gradeId}/subjects?page=1&size=20`,
      GET_SUBJECTS_REQUEST,
      GET_SUBJECTS_SUCCESS,
      GET_SUBJECTS_FAILED,
      {},
      {},
      'GET',
      false,
      CONTENT_SERVICE
    );
  }, []);

  useEffect(() => {
    if (selectedTutor && selectedTopic && selectedSubject) {
      resetOrder();
      orderRequest(
        `/contents/learningMaterials?subjectId=${selectedSubject}&topicId=${selectedTopic}&tutorIds=${selectedTutor}&types=${contentType.assignment}&page=1&size=20&orderBy=${OrderByFieldNames.ASSESSMENT}`,
        GET_ORDER_REQUEST,
        GET_ORDER_SUCCESS,
        GET_ORDER_FAILED,
        {},
        {},
        'GET',
        false,
        CONTENT_SERVICE
      );
    }
  }, [selectedTutor, selectedTopic, selectedSubject]);

  useEffect(() => {
    resetTutor();
    resetOrder();
    resetTopic();
    resetLesson();
  }, [selectedSubject]);

  useEffect(() => {
    resetLesson();
  }, [selectedTopic]);

  const topicSelected = (data: any) => {
    dispatch({
      type: SET_SELECTED_TOPIC,
      payload: { dataWrapper: { data } },
    });

    lessonRequest(
      `/topics/${data}/lessons?page=1&size=15`,
      GET_LESSONS_REQUEST,
      GET_LESSONS_SUCCESS,
      GET_LESSONS_FAILED,
      {},
      {},
      'GET',
      false,
      CONTENT_SERVICE
    );
  };

  const tutorSelected = (data: any) => {
    dispatch({
      type: SET_SELECTED_TUTOR,
      payload: { dataWrapper: { data } },
    });
  };

  const setSubjectId = (data: any) => {
    dispatch({
      type: SET_SELECTED_SUBJECT,
      payload: { dataWrapper: { data } },
    });

    tutorRequest(
      `/users?type=TUTOR&subjectIds=${data}&page=1&size=15`,
      GET_TUTORS_REQUEST,
      GET_TUTORS_SUCCESS,
      GET_TUTORS_FAILED,
      {},
      {},
      'GET',
      false,
      USER_SERVICE
    );

    topicRequest(
      `/subjects/${data}/topics?page=1&size=20`,
      GET_TOPICS_REQUEST,
      GET_TOPICS_SUCCESS,
      GET_TOPICS_FAILED,
      {},
      {},
      'GET',
      false,
      CONTENT_SERVICE
    );
  };

  const setValidateMethod = (methodRef: any) => {
    validateQuestions = methodRef;
  };

  const onFormSubmit = (data: any) => {
    if (validateQuestions && validateQuestions()) {
      clearErrors('questionsValidate');
    } else {
      setError('questionsValidate', { message: 'Error validating questions' }); //this error won't be displayed - only used for custom validation
      return;
    }

    const { syllabusId, gradeId } = props.match.params;
    data.type = contentType.assignment;
    data.order = Number(data.order);

    contentPostRequest(
      `/contents`,
      CREATE_ASSESSMENT_REQUEST,
      CREATE_ASSESSMENT_SUCCESS,
      CREATE_ASSESSMENT_FAILED,
      { ...data, syllabusId, gradeId },
      {},
      'POST',
      false,
      CONTENT_SERVICE
    );
  };
  useEffect(() => {
    if (contentCreateSuccess) {
      setShowOverlay(true);
    }
  }, [contentCreateSuccess]);

  useEffect(() => {
    if (contentCreationError) {
      toast.error(t('Assessment creation failed!'));
    }
  }, [contentCreationError]);

  const redirectAfterSuccess = () => {
    const { syllabusId, gradeId } = props.match.params;
    contentCreateSuccess &&
      history.push(`/admin/home/${syllabusId}/${gradeId}`, {
        selectedSyllabus,
        selectedGrade,
      });
    dispatch({
      type: CREATE_CONTENT_RESET,
    });
  };

  useEffect(() => {
    if (!selectedSubject) return;
    relatedDocumentRequest(
      `/contents/learningMaterials?subjectId=${selectedSubject}&types=${contentType.document}&page=1&size=20`,
      GET_RELATED_DOCUMENT_CONTENTS_REQUEST,
      GET_RELATED_DOCUMENT_CONTENTS_SUCCESS,
      GET_RELATED_DOCUMENT_CONTENTS_FAILED,
      {},
      {},
      'GET',
      false,
      CONTENT_SERVICE
    );
    relatedAssignmentRequest(
      `/contents/learningMaterials?subjectId=${selectedSubject}&types=${contentType.assignment}&page=1&size=20`,
      GET_RELATED_ASSIGNMENT_CONTENTS_REQUEST,
      GET_RELATED_ASSIGNMENT_CONTENTS_SUCCESS,
      GET_RELATED_ASSIGNMENT_CONTENTS_FAILED,
      {},
      {},
      'GET',
      false,
      CONTENT_SERVICE
    );

    relatedVideoRequest(
      `/contents/learningMaterials?subjectId=${selectedSubject}&types=${contentType.video}&page=1&size=20`,
      GET_RELATED_VIDEO_CONTENTS_REQUEST,
      GET_RELATED_VIDEO_CONTENTS_SUCCESS,
      GET_RELATED_VIDEO_CONTENTS_FAILED,
      {},
      {},
      'GET',
      false,
      CONTENT_SERVICE
    );
  }, [selectedSubject]);

  useEffect(() => {
    const { state }: { state: locationState } = props?.location;
    setSelectedGrade(state?.selectedGrade);
    setSelectedSyllabus(state?.selectedSyllabus);
  }, []);

  const { subjectId } = props.match.params;
  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <div className="createContent">
        {showOverlay && (
          <Overlay showLoader onOverlayHide={redirectAfterSuccess} />
        )}
        <div className="container">
          <div className="createContent__wrapper">
            {selectedSyllabus && selectedGrade && (
              <h3 className="breadcrumbs">
                {selectedSyllabus?.label || ''} / {selectedGrade?.label || ''}
              </h3>
            )}
            <h2 className="page-title">{t('Create Assessment')}</h2>

            <BasicInformation
              Controller={Controller}
              control={control}
              errors={errors}
              lessons={lessons}
              order={order}
              setSubjectId={setSubjectId}
              setValue={setValue}
              subjects={subjects}
              topicSelected={topicSelected}
              topics={topics}
              tutorSelected={tutorSelected}
              tutors={tutors}
              selectedTopic={selectedTopic}
              defaultSubjectID={subjectId}
            />

            <div className="createContent__row ">
              <AssessmentAndImageUploadContainerTags
                Controller={Controller}
                control={control}
                errors={errors}
                register={register}
                setValue={setValue}
              />
            </div>

            <div className="createContent__row">
              <RelatedContent
                Controller={Controller}
                control={control}
                errors={errors}
                setValue={setValue}
                relatedDocumentContent={relatedDocumentContent}
                relatedVideoContent={relatedVideoContent}
                relatedAssignmentContent={relatedAssignmentContent}
              />
            </div>
            <div className="">
              <Question
                Controller={Controller}
                control={control}
                name={'questions'}
                setValue={setValue}
                errors={errors}
                setError={setError}
                clearErrors={clearErrors}
                setValidateQuestions={setValidateMethod}
              />
            </div>

            <div className="createContent__row submit-button">
              <div className="form">
                <div className="form__form--field buttons">
                  <button type="submit" className="btn btn--primary">
                    {t('Publish')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AssessmentContainer;
