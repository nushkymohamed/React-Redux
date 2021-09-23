import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import Reel from '../../../Components/CreateProduct/ProductReel/Reel';
import ConfirmModel from '../../../Components/Modal/ConfirmModel';
import {
  contentType,
  CONTENT_SERVICE,
  userTypes,
  USER_SERVICE,
} from '../../../config/constants';
import { checkAnyContentSelectedWithTutor } from '../../../Helper';
import useApi from '../../../Hooks/useApi';
import {
  reelTypes,
  tutorAndSelectedContent,
} from '../../../redux/product/productReducer';
import {
  DELETE_REEL,
  EDIT_REEL,
  GET_REEL_INITIAL_CONTENT_FAILED,
  GET_REEL_INITIAL_CONTENT_REQUEST,
  GET_REEL_INITIAL_CONTENT_SUCCESS,
  GET_REEL_INITIAL_TUTORS_FAILED,
  GET_REEL_INITIAL_TUTORS_REQUEST,
  GET_REEL_INITIAL_TUTORS_SUCCESS,
  GET_REEL_MORE_TUTORS_FAILED,
  GET_REEL_MORE_TUTORS_REQUEST,
  GET_REEL_MORE_TUTORS_SUCCESS,
  REEL_MOVE_DOWN,
  REEL_MOVE_UP,
  RESET_CONTENT,
  RESET_TUTOR,
  SAVE_REEL,
  SELECT_REEL_ALL_CONTENTS,
  SET_SELECTED_CONTENT,
} from '../../../redux/product/productTypes';

interface ReelContainerProps {
  reel: reelTypes;
  reelIndex: number;
  reelOrder: number;
  reelsLength: number;
  isFeatureReel?: boolean;
}

const ReelContainer: FC<ReelContainerProps> = ({
  reel,
  reelIndex,
  reelOrder,
  reelsLength,
}) => {
  const dispatch = useDispatch();
  const {
    subject,
    syllabus,
    grade,
    tutors,
    contents,
    tutorsPage,
    isAllContentsSelected,
    selectedTutorId,
    selectedContentIds,
    isReelSaved,
    ignoredContentsIds,
  } = reel;

  const { value: subjectID, label: subjectLabel } = subject || {};
  const { label: syllabusLabel } = syllabus || {};
  const { label: gradeLabel } = grade || {};

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

  const [selectedTutorList, setSelectedTutorList] = useState<string[] | null>(
    null
  );

  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);
  const pageSize = 12;

  useEffect(() => {
    const tutorListFilter = selectedContentIds?.filter(({ contentIds }) =>
      checkAnyContentSelectedWithTutor(contentIds)
    );

    const tutorListMap = tutorListFilter?.map(({ tutorId }) => tutorId);

    setSelectedTutorList(tutorListMap || []);
  }, [selectedContentIds]);

  const loadTutors = (pageNumber: number) => {
    let url = `/users?type=${userTypes.tutor}&subjectIds=${subjectID}&page=${pageNumber}&size=14`;
    if (isReelSaved && !isAllContentsSelected) {
      url = `/users?type=${
        userTypes.tutor
      }&userIds=${selectedTutorList?.toString()}&page=${pageNumber}&size=14`;
    }
    tutorRequest(
      url,
      GET_REEL_MORE_TUTORS_REQUEST,
      GET_REEL_MORE_TUTORS_SUCCESS,
      GET_REEL_MORE_TUTORS_FAILED,
      {},
      {},
      'GET',
      false,
      USER_SERVICE,
      { reelIndex }
    );
  };

  useEffect(() => {
    const pageSize = 14;
    let url = `/users?type=${userTypes.tutor}&subjectIds=${subjectID}&page=1&size=`;

    dispatch({
      type: RESET_TUTOR,
      payload: {
        dataWrapper: { data: null },
        customInput: { reelIndex },
      },
    });

    if (isReelSaved && !isAllContentsSelected) {
      url = `/users?type=${
        userTypes.tutor
      }&userIds=${selectedTutorList?.toString()}&page=1&size=`;

      selectedTutorList?.length &&
        tutorRequest(
          url + pageSize,
          GET_REEL_INITIAL_TUTORS_REQUEST,
          GET_REEL_INITIAL_TUTORS_SUCCESS,
          GET_REEL_INITIAL_TUTORS_FAILED,
          {},
          {},
          'GET',
          false,
          USER_SERVICE,
          { reelIndex }
        );
    } else {
      tutorRequest(
        url + pageSize,
        GET_REEL_INITIAL_TUTORS_REQUEST,
        GET_REEL_INITIAL_TUTORS_SUCCESS,
        GET_REEL_INITIAL_TUTORS_FAILED,
        {},
        {},
        'GET',
        false,
        USER_SERVICE,
        { reelIndex }
      );
    }
  }, [subjectID, isReelSaved]);

  const resetContent = (contentType: string) => {
    dispatch({
      type: RESET_CONTENT,
      payload: {
        dataWrapper: { data: null },
        customInput: { reelIndex, contentType },
      },
    });
  };

  const getAllContentByTypeSelected = (
    selectedTutorId: string,
    contentType: string
  ) => {
    const tutorContentList = selectedContentIds?.find(
      ({ tutorId }) => tutorId === selectedTutorId
    );

    if (isAllContentsSelected) {
      return true;
    }

    if (tutorContentList?.contentIds?.[contentType]?.isAllSelected) {
      return true;
    }

    if (tutorContentList?.contentIds?.[contentType]?.ids.length) {
      return false;
    }

    return false;
  };

  const getSelectedConetdByTutorIdAndContentType = (
    selectedTutorId: string,
    contentType: string
  ) => {
    const tutorContentList = selectedContentIds?.find(
      ({ tutorId }) => tutorId === selectedTutorId
    );

    return tutorContentList?.contentIds?.[contentType]?.ids.toString();
  };

  const getVideoContent = (pageNumber: number) => {
    let url = `/contents/learningMaterials?types=${contentType.video}&subjectId=${subjectID}&tutorIds=${selectedTutorId}&page=${pageNumber}&size=${pageSize}`;

    if (
      isReelSaved &&
      !getAllContentByTypeSelected(selectedTutorId || '', contentType.video)
    ) {
      url = `/contents/learningMaterials?types=${
        contentType.video
      }&contentIds=${getSelectedConetdByTutorIdAndContentType(
        selectedTutorId || '',
        contentType.video
      )}&page=${pageNumber}&size=${pageSize}`;
    }

    contentVideosRequest(
      url,
      GET_REEL_INITIAL_CONTENT_REQUEST,
      GET_REEL_INITIAL_CONTENT_SUCCESS,
      GET_REEL_INITIAL_CONTENT_FAILED,
      {},
      {},
      'GET',
      false,
      CONTENT_SERVICE,
      { reelIndex, contentType: 'videos' }
    );
  };
  const getDocumentContent = (pageNumber: number) => {
    let url = `/contents/learningMaterials?types=${contentType.document}&subjectId=${subjectID}&tutorIds=${selectedTutorId}&page=${pageNumber}&size=${pageSize}`;

    if (
      isReelSaved &&
      !getAllContentByTypeSelected(selectedTutorId || '', contentType.document)
    ) {
      url = `/contents/learningMaterials?types=${
        contentType.document
      }&contentIds=${getSelectedConetdByTutorIdAndContentType(
        selectedTutorId || '',
        contentType.document
      )}&page=${pageNumber}&size=${pageSize}`;
    }

    contentDocumentsRequest(
      url,
      GET_REEL_INITIAL_CONTENT_REQUEST,
      GET_REEL_INITIAL_CONTENT_SUCCESS,
      GET_REEL_INITIAL_CONTENT_FAILED,
      {},
      {},
      'GET',
      false,
      CONTENT_SERVICE,
      { reelIndex, contentType: 'documents' }
    );
  };
  const getAssessmentContent = (pageNumber: number) => {
    let url = `/contents/learningMaterials?types=${contentType.assignment}&subjectId=${subjectID}&tutorIds=${selectedTutorId}&page=${pageNumber}&size=${pageSize}`;

    if (
      isReelSaved &&
      !getAllContentByTypeSelected(
        selectedTutorId || '',
        contentType.assignment
      )
    ) {
      url = `/contents/learningMaterials?types=${
        contentType.assignment
      }&contentIds=${getSelectedConetdByTutorIdAndContentType(
        selectedTutorId || '',
        contentType.assignment
      )}&page=${pageNumber}&size=${pageSize}`;
    }

    contentAssessmentsRequest(
      url,
      GET_REEL_INITIAL_CONTENT_REQUEST,
      GET_REEL_INITIAL_CONTENT_SUCCESS,
      GET_REEL_INITIAL_CONTENT_FAILED,
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
  }, [selectedTutorId, isReelSaved]);

  const [contentTab, setContentTab] = useState(contentType.video);

  const [
    currentSelectedTutorTabContentData,
    setCurrentSelectedTabContentData,
  ] = useState(false);

  useEffect(() => {
    if (contentTab && selectedTutorId && selectedContentIds) {
      const currentSelectedTutorData = selectedContentIds.find(
        ({ tutorId }) => tutorId === selectedTutorId
      );

      const currentSelectedContentData =
        currentSelectedTutorData?.contentIds || {};

      setCurrentSelectedTabContentData(
        currentSelectedContentData?.[contentTab]?.isAllSelected || false
      );
    } else {
      setCurrentSelectedTabContentData(isAllContentsSelected || false);
    }
  }, [contentTab, selectedTutorId, selectedContentIds, isAllContentsSelected]);

  const setSelectedContent = (id: string, contentType: string) => {
    dispatch({
      type: SET_SELECTED_CONTENT,
      payload: {
        dataWrapper: { data: { id, reelIndex, contentType, selectedTutorId } },
      },
    });
  };

  const deleteReel = () => {
    setIsOpenPopup(true);
  };

  const confirmDelete = () => {
    dispatch({
      type: DELETE_REEL,
      payload: { dataWrapper: { data: { reelIndex } } },
    });
  };

  useEffect(() => {
    if (isReelSaved) {
      const tutorListFilter = selectedContentIds?.filter(({ contentIds }) =>
        checkAnyContentSelectedWithTutor(contentIds)
      );
      if (!isAllContentsSelected) {
        !tutorListFilter?.length && confirmDelete();
      }
    }
  }, [selectedContentIds, isReelSaved]);

  const selectAllTutorsAndContent = () => {
    dispatch({
      type: SELECT_REEL_ALL_CONTENTS,
      payload: {
        dataWrapper: {
          data: { reelIndex, isAllContentsSelected: !isAllContentsSelected },
        },
      },
    });
  };

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
  };

  const moveReel = (type: string) => {
    dispatch({
      type,
      payload: {
        dataWrapper: {
          data: { reelIndex, reelOrder },
        },
      },
    });
  };

  return (
    <>
      <Reel
        assessmentContents={assessmentContents || []}
        assessmentTotalRecords={assessmentTotalRecords || 0}
        contentTab={contentTab}
        currentSelectedTutorTabContentData={currentSelectedTutorTabContentData}
        deleteReel={deleteReel}
        deleteReelType={DELETE_REEL}
        documentContents={documentContents || []}
        documentTotalRecords={documentTotalRecords || 0}
        editReelType={EDIT_REEL}
        isAllContentsSelected={isAllContentsSelected || false}
        isReelSaved={isReelSaved || false}
        label={` ${syllabusLabel} - ${subjectLabel} - ${gradeLabel}`}
        loadTutors={loadTutors}
        moveReel={moveReel}
        reelIndex={reelIndex}
        reelMoveDown={REEL_MOVE_DOWN}
        reelMoveUp={REEL_MOVE_UP}
        reelOrder={reelOrder}
        reelStatus={reelStatus}
        reelsLength={reelsLength}
        selectAllTutorsAndContent={selectAllTutorsAndContent}
        selectedTutorId={selectedTutorId || ''}
        setContentTab={setContentTab}
        subjectID={subjectID || ''}
        tutors={tutors || []}
        tutorsPage={tutorsPage || 0}
        videoContents={videoContents || []}
        videoTotalRecords={videoTotalRecords || 0}
        saveReelType={SAVE_REEL}
        getVideoContent={getVideoContent}
        getDocumentContent={getDocumentContent}
        getAssessmentContent={getAssessmentContent}
        setSelectedContent={setSelectedContent}
        selectedContentIds={selectedContentIds || []}
        ignoredContentsIds={ignoredContentsIds || []}
      />
      {isOpenPopup && (
        <ConfirmModel
          message="Are you sure you want to delete this reel?"
          onCancel={() => setIsOpenPopup(false)}
          onConfirm={() => confirmDelete()}
        />
      )}
    </>
  );
};

export default ReelContainer;
