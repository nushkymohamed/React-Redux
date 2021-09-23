import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import BasicInformation from '../../Components/CreateLinkedDocument/BasicInformation/BasicInformation';
import TextInfo from '../../Components/CreateLinkedDocument/TextInfo/TextInfo';
import Overlay from '../../Components/Overlay/Overlay';
import RelatedContent from '../../Components/RelatedContent/RelatedContent';
import {
  contentType,
  CONTENT_SERVICE,
  OrderByFieldNames,
  userTypes,
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
  CREATE_CONTENT_RESET,
  CREATE_LINKED_DOCUMENT_FAILED,
  CREATE_LINKED_DOCUMENT_REQUEST,
  CREATE_LINKED_DOCUMENT_SUCCESS,
} from '../../redux/content/contentTypes';
import { RootStore } from '../../redux/store';
import DocumentAndImageUploadContainer from './DocumentAndImageUploadContainer';

interface dropdownType {
  label: string;
  value: string;
}

interface locationState {
  selectedSyllabus: dropdownType | null;
  selectedGrade: dropdownType | null;
}

const CreateLinkedDocumentContainer = (props: any) => {
  const {
    register,
    handleSubmit,
    errors,
    control,
    setError,
    setValue,
    getValues,
    unregister,
    clearErrors,
  } = useForm({
    shouldFocusError: true,
  });
  const [lessonRequest] = useApi();
  const [orderRequest] = useApi();
  const [subjectRequest] = useApi();
  const [topicRequest] = useApi();
  const [tutorRequest] = useApi();
  const [documentUpload] = useApi();
  const [relatedDocumentRequest] = useApi();
  const [relatedVideoRequest] = useApi();
  const [relatedAssignmentRequest] = useApi();
  const dispatch = useDispatch();
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
    s3BucketInfo,
    relatedAssignmentContent,
    relatedDocumentContent,
    relatedVideoContent,
  } = useSelector((state: RootStore) => state.common);

  const { success: contentCreateSuccess, error: contentCreationError } =
    useSelector((state: RootStore) => state.content);

  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedSyllabus, setSelectedSyllabus] = useState<dropdownType | null>(
    null
  );
  const [selectedGrade, setSelectedGrade] = useState<dropdownType | null>(null);

  const [isPastPaper, setIsPastPaper] = useState(false);
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
    const contentTypes = [
      contentType.document,
      contentType.pastPaperDocument,
      contentType.linkedDocument,
      contentType.linkedDocumentPastPaper,
    ];
    if (selectedTutor && selectedTopic && selectedSubject) {
      resetOrder();

      orderRequest(
        `/contents/learningMaterials?subjectId=${selectedSubject}&topicId=${selectedTopic}&tutorId=${selectedTutor}&types=${contentTypes}&page=1&size=50&orderBy=${OrderByFieldNames.DOCUMENT}`,
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

  const topicSelected = (data: string) => {
    dispatch({
      type: SET_SELECTED_TOPIC,
      payload: { dataWrapper: { data } },
    });
    lessonRequest(
      `/topics/${data}/lessons?page=1&size=20`,
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
  const tutorSelected = (data: string) => {
    dispatch({
      type: SET_SELECTED_TUTOR,
      payload: { dataWrapper: { data } },
    });
  };

  const setSubjectId = (data: any) => {
    tutorRequest(
      `/users?type=${userTypes.tutor}&subjectIds=${data}&page=1&size=20`,
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
    dispatch({
      type: SET_SELECTED_SUBJECT,
      payload: { dataWrapper: { data } },
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

  const validateSections = (data: any) => {
    let isError = false;
    if (data?.sections && data?.sections?.length) {
      data.sections?.forEach((section: any, idx: number) => {
        if (!section?.heading) {
          setError(`heading${idx}`, { message: t('Heading cannot be empty') });
          isError = true;
        } else {
          clearErrors(`heading${idx}`);
        }

        if (section?.subSections && section?.subSections?.length) {
          section?.subSections?.forEach((sub: any, index: number) => {
            if (!sub?.heading) {
              setError(`heading${idx}subheading${index}`, {
                message: t('Heading cannot be empty'),
              });
              isError = true;
            } else {
              clearErrors(`heading${idx}subheading${index}`);
            }
          });
        }
      });
    } else {
      setError('heading0', { message: t('Heading cannot be empty') });
      isError = true;
    }

    if (isError) {
      return false;
    } else {
      return true;
    }
  };

  const onFormSubmit = (data: any) => {
    const { syllabusId, gradeId } = props.match.params;

    if (!validateSections(data)) {
      return;
    }

    if (isPastPaper && data.year && data.month) {
      data.type = contentType.linkedDocumentPastPaper;
    } else {
      data.type = contentType.linkedDocument;
    }

    data.syllabusId = syllabusId;
    data.gradeId = gradeId;

    documentUpload(
      `/contents`,
      CREATE_LINKED_DOCUMENT_REQUEST,
      CREATE_LINKED_DOCUMENT_SUCCESS,
      CREATE_LINKED_DOCUMENT_FAILED,
      data,
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

  const redirectAfterSuccess = () => {
    const { syllabusId, gradeId } = props.match.params;

    history.push(`/admin/home/${syllabusId}/${gradeId}`, {
      selectedSyllabus,
      selectedGrade,
    });

    dispatch({
      type: CREATE_CONTENT_RESET,
    });
  };

  useEffect(() => {
    if (contentCreationError) {
      toast.error(t('Linked Document creation failed!'));
    }
  }, [contentCreationError]);

  const onClickPastPaper = () => {
    setIsPastPaper(!isPastPaper);
  };

  const { subjectId } = props.match.params;

  return (
    <>
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
              <h2 className="page-title">{t('Create Linked Document')}</h2>
              <BasicInformation
                Controller={Controller}
                control={control}
                errors={errors}
                lessons={lessons}
                order={order}
                register={register}
                selectedSubject={selectedSubject}
                setError={setError}
                setSubjectId={setSubjectId}
                setValue={setValue}
                subjects={subjects}
                topicSelected={topicSelected}
                topics={topics}
                tutorSelected={tutorSelected}
                tutors={tutors}
                isPastPaper={isPastPaper}
                unRegister={unregister}
                onClickPastPaper={onClickPastPaper}
                defaultSubjectID={subjectId}
                selectedTopic={selectedTopic}
              />

              <div className="createContent__row video-preview">
                <DocumentAndImageUploadContainer
                  Controller={Controller}
                  control={control}
                  errors={errors}
                  setValue={setValue}
                  register={register}
                />
              </div>

              <div className="createContent__row video-preview">
                <RelatedContent
                  Controller={Controller}
                  control={control}
                  errors={errors}
                  setValue={setValue}
                  relatedAssignmentContent={relatedAssignmentContent}
                  relatedDocumentContent={relatedDocumentContent}
                  relatedVideoContent={relatedVideoContent}
                />
              </div>

              <div className="createContent__row upload-content wrap normalSpacing">
                <TextInfo
                  Controller={Controller}
                  control={control}
                  errors={errors}
                  register={register}
                  setValue={setValue}
                  values={getValues}
                  setError={setError}
                  clearErrors={clearErrors}
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
    </>
  );
};

export default CreateLinkedDocumentContainer;
