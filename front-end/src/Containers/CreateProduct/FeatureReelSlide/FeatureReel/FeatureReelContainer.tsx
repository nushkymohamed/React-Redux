import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import FeatureReel from '../../../../Components/CreateProduct/FeatureReel/FeatureReel';
import {
  contentType,
  CONTENT_SERVICE,
  userTypes,
  USER_SERVICE,
} from '../../../../config/constants';
import useApi from '../../../../Hooks/useApi';
import {
  featureReelTypes,
  tutorAndSelectedFeatureContent,
} from '../../../../redux/product/productReducer';
import {
  GET_FEATURE_REEL_INITIAL_CONTENT_FAILED,
  GET_FEATURE_REEL_INITIAL_CONTENT_REQUEST,
  GET_FEATURE_REEL_INITIAL_CONTENT_SUCCESS,
  GET_FEATURE_REEL_INITIAL_TUTORS_FAILED,
  GET_FEATURE_REEL_INITIAL_TUTORS_REQUEST,
  GET_FEATURE_REEL_INITIAL_TUTORS_SUCCESS,
  GET_FEATURE_REEL_MORE_TUTORS_FAILED,
  GET_FEATURE_REEL_MORE_TUTORS_REQUEST,
  GET_FEATURE_REEL_MORE_TUTORS_SUCCESS,
  RESET_FEATURE_CONTENT,
  RESET_FEATURE_TUTOR,
  SAVE_FEATURE_REEL,
  SELECT_FEATURE_REEL_ALL_CONTENTS_FAILED,
  SELECT_FEATURE_REEL_ALL_CONTENTS_REQUEST,
  SELECT_FEATURE_REEL_ALL_CONTENTS_SUCCESS,
  SET_SELECTED_FEATURE_REEL_CONTENT,
} from '../../../../redux/product/productTypes';

interface FeatureReelContainerProps {
  reel: featureReelTypes;
  resetSelection: () => void;
}

const FeatureReelContainer: FC<FeatureReelContainerProps> = ({
  reel,
  resetSelection,
}) => {
  const dispatch = useDispatch();
  const {
    contents,
    grade,
    selectedFeatureContentList,
    selectedTutorId,
    subject,
    syllabus,
    tutors,
    tutorsPage,
  } = reel || {};

  const reelIndex = 0;

  const { value: subjectID, label: subjectLabel } = subject || {};
  const { value: syllabusID } = syllabus || {};
  const { value: gradeID } = grade || {};

  const { videos, documents, assessments } = contents || {};
  const { contents: videoContents, totalRecords: videoTotalRecords } =
    videos || {};
  const { contents: documentContents, totalRecords: documentTotalRecords } =
    documents || {};
  const { contents: assessmentContents, totalRecords: assessmentTotalRecords } =
    assessments || {};

  const [tutorRequest] = useApi();
  const [contentVideosRequest] = useApi();
  const [contentDocumentsRequest] = useApi();
  const [contentAssessmentsRequest] = useApi();
  const [contentIDRequest] = useApi();

  const pageSize = 12;

  const loadTutors = (pageNumber: number) => {
    const url = `/users?type=${userTypes.tutor}&subjectIds=${subjectID}&page=${pageNumber}&size=14`;

    tutorRequest(
      url,
      GET_FEATURE_REEL_MORE_TUTORS_REQUEST,
      GET_FEATURE_REEL_MORE_TUTORS_SUCCESS,
      GET_FEATURE_REEL_MORE_TUTORS_FAILED,
      {},
      {},
      'GET',
      false,
      USER_SERVICE
    );
  };

  useEffect(() => {
    const url = `/users?type=${userTypes.tutor}&subjectIds=${subjectID}&page=1&size=14`;

    dispatch({
      type: RESET_FEATURE_TUTOR,
      payload: {
        dataWrapper: { data: null },
      },
    });

    subjectID &&
      tutorRequest(
        url,
        GET_FEATURE_REEL_INITIAL_TUTORS_REQUEST,
        GET_FEATURE_REEL_INITIAL_TUTORS_SUCCESS,
        GET_FEATURE_REEL_INITIAL_TUTORS_FAILED,
        {},
        {},
        'GET',
        false,
        USER_SERVICE
      );
  }, [subjectID]);

  const resetContent = (contentType: string) => {
    dispatch({
      type: RESET_FEATURE_CONTENT,
      payload: {
        dataWrapper: { data: null },
        customInput: { reelIndex, contentType },
      },
    });
  };

  const getVideoContent = (pageNumber: number) => {
    const url = `/contents/learningMaterials?types=${contentType.video}&subjectId=${subjectID}&tutorIds=${selectedTutorId}&page=${pageNumber}&size=${pageSize}`;
    selectedTutorId?.length &&
      contentVideosRequest(
        url,
        GET_FEATURE_REEL_INITIAL_CONTENT_REQUEST,
        GET_FEATURE_REEL_INITIAL_CONTENT_SUCCESS,
        GET_FEATURE_REEL_INITIAL_CONTENT_FAILED,
        {},
        {},
        'GET',
        false,
        CONTENT_SERVICE,
        { reelIndex, contentType: 'videos' }
      );
  };
  const getDocumentContent = (pageNumber: number) => {
    const url = `/contents/learningMaterials?types=${contentType.document}&subjectId=${subjectID}&tutorIds=${selectedTutorId}&page=${pageNumber}&size=${pageSize}`;

    selectedTutorId?.length &&
      contentDocumentsRequest(
        url,
        GET_FEATURE_REEL_INITIAL_CONTENT_REQUEST,
        GET_FEATURE_REEL_INITIAL_CONTENT_SUCCESS,
        GET_FEATURE_REEL_INITIAL_CONTENT_FAILED,
        {},
        {},
        'GET',
        false,
        CONTENT_SERVICE,
        { reelIndex, contentType: 'documents' }
      );
  };
  const getAssessmentContent = (pageNumber: number) => {
    const url = `/contents/learningMaterials?types=${contentType.assignment}&subjectId=${subjectID}&tutorIds=${selectedTutorId}&page=${pageNumber}&size=${pageSize}`;

    selectedTutorId?.length &&
      contentAssessmentsRequest(
        url,
        GET_FEATURE_REEL_INITIAL_CONTENT_REQUEST,
        GET_FEATURE_REEL_INITIAL_CONTENT_SUCCESS,
        GET_FEATURE_REEL_INITIAL_CONTENT_FAILED,
        {},
        {},
        'GET',
        false,
        CONTENT_SERVICE,
        { reelIndex, contentType: 'assessments' }
      );
  };

  useEffect(() => {
    resetContent('videos');
    resetContent('documents');
    resetContent('assessments');
    getVideoContent(1);
    getDocumentContent(1);
    getAssessmentContent(1);
  }, [selectedTutorId]);

  const [contentTab, setContentTab] = useState(contentType.video);

  const [
    currentSelectedTutorTabContentData,
    setCurrentSelectedTabContentData,
  ] = useState(false);

  useEffect(() => {
    if (contentTab && selectedTutorId && selectedFeatureContentList) {
      const selectedContent = filteredSelectedContent(
        selectedFeatureContentList || [],
        subjectID || '',
        gradeID || '',
        syllabusID || ''
      );

      const { constantReelIds } = selectedContent || {};

      const currentSelectedTutorData = constantReelIds?.find(
        ({ tutorId }) => tutorId === selectedTutorId
      );

      const currentSelectedContentData =
        currentSelectedTutorData?.contentIds || {};

      setCurrentSelectedTabContentData(
        currentSelectedContentData?.[contentTab]?.isAllSelected || false
      );
    }
  }, [contentTab, selectedTutorId, selectedFeatureContentList]);

  const setSelectedContent = (
    id: string,
    contentType: string,
    isContentSelected: boolean
  ) => {
    dispatch({
      type: SET_SELECTED_FEATURE_REEL_CONTENT,
      payload: {
        dataWrapper: {
          data: {
            id,
            reelIndex,
            contentType,
            selectedTutorId,
            isContentSelected: !isContentSelected,
          },
        },
      },
    });
  };

  const [isAllContentsSelected, setIsAllContentsSelected] = useState(false);

  const selectAllTutorsAndContent = () => {
    contentIDRequest(
      `/subjects/${subjectID}/contents/ids?contentTypes=${contentType.video},${contentType.assignment},${contentType.document}`,
      SELECT_FEATURE_REEL_ALL_CONTENTS_REQUEST,
      SELECT_FEATURE_REEL_ALL_CONTENTS_SUCCESS,
      SELECT_FEATURE_REEL_ALL_CONTENTS_FAILED,
      {},
      {},
      'GET',
      false,
      CONTENT_SERVICE,
      { isAllContentsSelected: !isAllContentsSelected }
    );
  };

  const filteredSelectedContent = (
    selectedFeatureContentList: tutorAndSelectedFeatureContent[],
    subjectID: string,
    gradeID: string,
    syllabusID: string
  ) => {
    return selectedFeatureContentList?.find(
      ({ grade, subject, syllabus }) =>
        subjectID === subject?.value &&
        grade?.value === gradeID &&
        syllabusID === syllabus?.value
    );
  };

  const [selectedContentIds, setSelectedContentIds] = useState<any[]>();

  const [allIgnoredContentsIds, setAllIgnoredContentsIds] = useState<
    string[] | null
  >(null);
  useEffect(() => {
    const selectedContent = filteredSelectedContent(
      selectedFeatureContentList || [],
      subjectID || '',
      gradeID || '',
      syllabusID || ''
    );

    const { isAllContentsSelected, constantReelIds, ignoredContentsIds } =
      selectedContent || {};
    setAllIgnoredContentsIds(ignoredContentsIds || []);

    setSelectedContentIds(constantReelIds);

    setIsAllContentsSelected(isAllContentsSelected || false);
  }, [selectedFeatureContentList, subjectID, gradeID, syllabusID]);

  const payload = {
    dataWrapper: {
      data: { reelIndex },
    },
  };

  const reelStatus = (type: string) => {
    dispatch({
      type,
      payload,
    });

    //reset dropdown selections
    resetSelection();
  };

  return (
    <FeatureReel
      allIgnoredContentsIds={allIgnoredContentsIds || []}
      assessmentContents={assessmentContents || []}
      assessmentTotalRecords={assessmentTotalRecords || 0}
      contentTab={contentTab}
      currentSelectedTutorTabContentData={currentSelectedTutorTabContentData}
      documentContents={documentContents || []}
      documentTotalRecords={documentTotalRecords || 0}
      getAssessmentContent={getAssessmentContent}
      getDocumentContent={getDocumentContent}
      getVideoContent={getVideoContent}
      isAllContentsSelected={isAllContentsSelected}
      isPaginationShow={!!subjectLabel}
      isReelSaved={false}
      loadTutors={loadTutors}
      reelIndex={reelIndex}
      reelStatus={reelStatus}
      saveReelType={SAVE_FEATURE_REEL}
      selectAllTutorsAndContent={selectAllTutorsAndContent}
      selectedContentIds={selectedContentIds}
      selectedTutorId={selectedTutorId || ''}
      setContentTab={setContentTab}
      setSelectedContent={setSelectedContent}
      subjectID={subjectID || ''}
      tutors={tutors || []}
      tutorsPage={tutorsPage || 0}
      videoContents={videoContents || []}
      videoTotalRecords={videoTotalRecords || 0}
    />
  );
};

export default FeatureReelContainer;
