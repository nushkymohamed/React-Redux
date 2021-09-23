import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import ButtonWithAnimation from '../../Components/ButtonWithAnimation/ButtonWithAnimation';
import Assessment from '../../Components/CreateVideo/Assessment/Assessment';
import BasicInformation from '../../Components/CreateVideo/BasicInformation/BasicInformation';
import DocumentInformation from '../../Components/CreateVideo/DocumentsInformation/DocumentsInformation';
import Summery from '../../Components/CreateVideo/Summery/Summery';
import Tags from '../../Components/FormInput/Tags/Tags';
import Overlay from '../../Components/Overlay/Overlay';
import {
  contentType,
  CONTENT_SERVICE,
  OrderByFieldNames,
  USER_SERVICE,
} from '../../config/constants';
import { tagsCreateWithoutDuplication } from '../../Helper';
import useApi from '../../Hooks/useApi';
import {
  FILE_UPLOAD_S3_INFO_FAILED,
  FILE_UPLOAD_S3_INFO_REQUEST,
  FILE_UPLOAD_S3_INFO_SUCCESS,
  GET_ASSESSMENTS_FAILED,
  GET_ASSESSMENTS_REQUEST,
  GET_ASSESSMENTS_SUCCESS,
  GET_LEARNING_DOCUMENTS_FAIL,
  GET_LEARNING_DOCUMENTS_REQUEST,
  GET_LEARNING_DOCUMENTS_SUCCESS,
  GET_LEARNING_LINKED_DOCUMENTS_FAIL,
  GET_LEARNING_LINKED_DOCUMENTS_REQUEST,
  GET_LEARNING_LINKED_DOCUMENTS_SUCCESS,
  GET_LESSONS_FAILED,
  GET_LESSONS_REQUEST,
  GET_LESSONS_SUCCESS,
  GET_ORDER_FAILED,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_SUBJECTS_FAILED,
  GET_SUBJECTS_REQUEST,
  GET_SUBJECTS_SUCCESS,
  GET_TOPICS_FAILED,
  GET_TOPICS_REQUEST,
  GET_TOPICS_SUCCESS,
  GET_TUTORS_FAILED,
  GET_TUTORS_REQUEST,
  GET_TUTORS_SUCCESS,
  RESET_ASSESMENTS,
  RESET_LEARNING_DOCUMENTS,
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
  CREATE_VIDEO_FAILED,
  CREATE_VIDEO_REQUEST,
  CREATE_VIDEO_SUCCESS,
} from '../../redux/content/contentTypes';
import { RootStore } from '../../redux/store';
import FileUpload from '../FileUpload/FileUpload';
import VideoAndImageUploadContainer from './VideoAndImageUploadContainer';

interface dropdownType {
  label: string;
  value: string;
}

interface locationState {
  selectedSyllabus: dropdownType | null;
  selectedGrade: dropdownType | null;
}

const CreateVideoContainer = (props: any) => {
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
    defaultValues: {
      author: '',
      description: '',
      tags: [''],
      summaries: [],
      subtitle: {},
    },
  });
  const [lessonRequest] = useApi();
  const [orderRequest] = useApi();
  const [subjectRequest] = useApi();
  const [topicRequest] = useApi();
  const [tutorRequest] = useApi();
  const [contentPostRequest] = useApi();
  const [assessmentRequest] = useApi();
  const [documentRequestApi] = useApi();
  const [linkedDocumentRequestApi] = useApi();

  const [uploadRequest] = useApi();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const history = useHistory();

  const {
    assessments,
    lessons,
    order,
    selectedSubject,
    selectedTopic,
    selectedTutor,
    subjects,
    topics,
    tutors,
    assessmentsPage,
    learningDocuments,
    learningLinkedDocuments,
  } = useSelector((state: RootStore) => state.common);

  const { success: contentCreateSuccess, error: contentCreationError } =
    useSelector((state: RootStore) => state.content);

  const [showOverlay, setShowOverlay] = useState(false);

  //Reset
  const payload = { dataWrapper: { data: {} } };
  const [summeryError, setSummeryError] = useState<boolean>(false);
  const [tagList, setTagList] = useState<any[]>([]);
  const [tagInput, setTagInput] = useState('');

  const [selectedSyllabus, setSelectedSyllabus] = useState<dropdownType | null>(
    null
  );
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const [animationClassName, setAnimationClassName] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<dropdownType | null>(null);
  let validateQuestions: any = null;

  const resetTopic = () => {
    dispatch({
      type: RESET_TOPICS,
      payload,
    });
  };
  const resetAssesments = () => {
    dispatch({
      type: RESET_ASSESMENTS,
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

  const resetDocuments = () => {
    dispatch({
      type: RESET_LEARNING_DOCUMENTS,
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
    resetTutor();
    resetOrder();
    resetTopic();
    resetLesson();
    resetAssesments();
    resetDocuments();
  }, [selectedSubject]);

  useEffect(() => {
    if (selectedTutor && selectedTopic && selectedSubject) {
      resetOrder();
      resetDocuments();
      orderRequest(
        `/contents/learningMaterials?subjectId=${selectedSubject}&topicId=${selectedTopic}&tutorIds=${selectedTutor}&types=${contentType.video}&page=1&size=20&orderBy=${OrderByFieldNames.VIDEO}`,
        GET_ORDER_REQUEST,
        GET_ORDER_SUCCESS,
        GET_ORDER_FAILED,
        {},
        {},
        'GET',
        false,
        CONTENT_SERVICE
      );
      getDocuments(1, selectedSubject, selectedTutor, selectedTopic);
      getLinkedDocuments(1, selectedSubject, selectedTutor, selectedTopic);
    }
  }, [selectedTutor, selectedTopic, selectedSubject]);

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

  const assessmentRequests = (subjectId: string, pageNumber: number) => {
    assessmentRequest(
      `/contents/learningMaterials?subjectId=${subjectId}&types=${contentType.assignment}&page=${pageNumber}&size=10`,
      GET_ASSESSMENTS_REQUEST,
      GET_ASSESSMENTS_SUCCESS,
      GET_ASSESSMENTS_FAILED,
      {},
      {},
      'GET',
      false,
      CONTENT_SERVICE
    );
  };

  const setSubjectId = (data: string) => {
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

    assessmentRequests(data, 1);
  };

  const getDocuments = (
    page: number,
    subjectId: string,
    tutorId: string,
    topicId: string
  ) => {
    documentRequestApi(
      `/contents/learningMaterials?orderBy=${OrderByFieldNames.DOCUMENT}&tutorIds=${tutorId}&types=${contentType.document}&topicId=${topicId}&subjectId=${subjectId}&page=${page}&size=10`,
      GET_LEARNING_DOCUMENTS_REQUEST,
      GET_LEARNING_DOCUMENTS_SUCCESS,
      GET_LEARNING_DOCUMENTS_FAIL,
      {},
      {},
      'GET',
      false,
      CONTENT_SERVICE
    );
  };

  const getLinkedDocuments = (
    page: number,
    subjectId: string,
    tutorId: string,
    topicId: string
  ) => {
    linkedDocumentRequestApi(
      `/contents/learningMaterials?orderBy=${OrderByFieldNames.DOCUMENT}&tutorIds=${tutorId}&types=${contentType.linkedDocument}&subjectId=${subjectId}&topicId=${topicId}&page=${page}&size=10`,
      GET_LEARNING_LINKED_DOCUMENTS_REQUEST,
      GET_LEARNING_LINKED_DOCUMENTS_SUCCESS,
      GET_LEARNING_LINKED_DOCUMENTS_FAIL,
      {},
      {},
      'GET',
      false,
      CONTENT_SERVICE
    );
  };

  const uploadFileKey = 'videoAndImageAndSubtitleUpload';
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

  const onFormSubmit = (data: any) => {
    setButtonLoading(true);
    setAnimationClassName('btn btn--primary btn--loader active');
    const { syllabusId, gradeId } = props.match.params;
    data.type = contentType.video;
    data.endVideoAssessmentIds = [data.endVideoAssessmentIds];

    if (!validateQuestions || !validateQuestions()) {
      setButtonLoading(false);
      setAnimationClassName('');
      return;
    }

    contentPostRequest(
      `/contents`,
      CREATE_VIDEO_REQUEST,
      CREATE_VIDEO_SUCCESS,
      CREATE_VIDEO_FAILED,
      { ...data, syllabusId, gradeId },
      {},
      'POST',
      false,
      CONTENT_SERVICE
    );
  };

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
    if (contentCreateSuccess) {
      setShowOverlay(true);
    } else {
      setButtonLoading(false);
      setAnimationClassName('');
    }
  }, [contentCreateSuccess]);

  useEffect(() => {
    if (contentCreationError) {
      toast.error(t('Video creation failed!'));
    }
  }, [contentCreationError]);

  const addTags = (e: any) => {
    tagsCreateWithoutDuplication(e, tagList, setTagList, setTagInput);
  };

  useEffect(() => {
    let list = tagList.map(({ label }: { label: string }) => label);
    setValue('tags', list);
  }, [tagList]);

  useEffect(() => {
    const { state }: { state: locationState } = props?.location;
    setSelectedGrade(state?.selectedGrade);
    setSelectedSyllabus(state?.selectedSyllabus);
  }, []);

  const setValidateMethod = (methodRef: any) => {
    validateQuestions = methodRef;
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
              <h2 className="page-title">{t('Create Video')}</h2>

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
                selectedTopic={selectedTopic}
                clearErrors={clearErrors}
                defaultSubjectID={subjectId}
              />

              <div className="createContent__row video-preview">
                <div className="additional-section"></div>
                <VideoAndImageUploadContainer
                  Controller={Controller}
                  control={control}
                  errors={errors}
                  register={register}
                  setValue={setValue}
                  uploadFileKey={uploadFileKey}
                />
              </div>
              <div className="createContent__row upload-assessment fullWidth">
                <Assessment
                  Controller={Controller}
                  control={control}
                  errors={errors}
                  register={register}
                  setValue={setValue}
                  assessments={assessments}
                  clearErrors={clearErrors}
                  setValidateMethod={setValidateMethod}
                  scrollCallBackAssesments={() =>
                    selectedSubject &&
                    assessmentRequests(selectedSubject, assessmentsPage + 1)
                  }
                />
              </div>
              <div className="createContent__row summary-wrapper-container">
                <DocumentInformation
                  Controller={Controller}
                  control={control}
                  documents={learningDocuments}
                  setValue={setValue}
                  linkedDocuments={learningLinkedDocuments}
                  selectedTutor={selectedTutor}
                  selectedTopic={selectedTopic}
                  selectedSubject={selectedSubject}
                />
              </div>
              <div className="createContent__row summary-subtitle-section">
                <Summery
                  Controller={Controller}
                  control={control}
                  errors={errors}
                  register={register}
                  setValue={setValue}
                  setError={setError}
                  clearErrors={clearErrors}
                  disableSubmitOnSummeryError={setSummeryError}
                />
                <div className="subtitle-input-container">
                  <div className="createContent__column">
                    <Controller
                      control={control}
                      name={'subtitle'}
                      render={({ onChange }) => (
                        <FileUpload
                          accept={'.vtt'}
                          componentKey={'subtitles'}
                          title={t('Upload Subtitles')}
                          action={onChange}
                          customLabelClass={'subtitle-label`'}
                          customClass="subtitles-input-wrapper"
                          uploadFileKey={uploadFileKey}
                        />
                      )}
                    />
                  </div>
                  <div className="createContent__column">
                    <div className="form__form--field tags-wrapper">
                      <div className="tags">Tags</div>
                      <Controller
                        control={control}
                        name={'tags'}
                        render={() => (
                          <input
                            className="form-input input-no-title input"
                            type="text"
                            autoComplete={'off'}
                            placeholder={t('Separate your tags with a comma')}
                            maxLength={35}
                            onKeyPress={addTags}
                            value={tagInput}
                            onChange={e => setTagInput(e.target.value)}
                          />
                        )}
                      />
                    </div>

                    <Tags
                      list={tagList}
                      tagLabel={'label'}
                      listReturnMethod={(list: any) => setTagList(list)}
                    />
                  </div>
                </div>
              </div>

              <div className="createContent__row submit-button">
                <div className="form">
                  <div className="form__form--field buttons">
                    {!buttonLoading ? (
                      <button
                        disabled={summeryError}
                        type="submit"
                        className="btn btn--secondary"
                      >
                        {t('Publish')}
                      </button>
                    ) : (
                      <ButtonWithAnimation
                        animationClassName={animationClassName}
                        onTransitionEnd={setAnimationClassName}
                      />
                    )}
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

export default CreateVideoContainer;
