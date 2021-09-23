import {
  INITIALIZE_SUBJECTS_DATA_SUCCESS,
  INITIALIZE_SUBJECT_TUTORS_SUCCESS,
  INITIALIZE_SUBJECT_CONTENTS_SUCCESS,
  UPDATE_SUBJECTS_REEL_SUCCESS,
  UPDATE_SUBJECT_CONTENTS_SUCCESS,
  UPDATE_TUTORS_SUCCESS,
  INITIALIZE_SUBJECT_TUTOR_CONTENTS_SUCCESS,
  HOVER_ON_SUBJECT_REEL_CONTENT,
  RESET_SUBJECTS_REDUCER_DATA,
} from './subjectsTypes';

import {
  subjectsConstant,
  tutorsConstant,
  videosConstant,
} from '../../config/constants';
import { singleSubjectType } from '../common/commonReducer';

export interface singleVideoType {
  type: string;
  title: string;
  description: string;
  previewImageKey: {
    bucketName: string;
    fileKey: string;
  };
  tutorIds: string[];
}

export interface singleReelSubjectTypes extends singleSubjectType {
  subjectVideos: singleVideoType[];
  tutorVideos: singleVideoType[];
  clickedTutorIndex: any;
  videosTotalRecords: number;
  videosPage: number;
  videosSize: number;
}

export interface SubjectsReducerType {
  subjects: singleReelSubjectTypes[] | null;
  totalRecords: number;
  page: number;
  size: number;
}

const { subjectsTotalRecords, subjectsPage, subjectsPerPage } =
  subjectsConstant;
const { tutorVideosPage, tutorVideosPerPage, tutorsPage, tutorsPerPage } =
  tutorsConstant;

const { videosPage, videosPerPage } = videosConstant;

const INITIAL_STATE: SubjectsReducerType = {
  subjects: null,
  totalRecords: subjectsTotalRecords,
  page: subjectsPage,
  size: subjectsPerPage,
};
type Action = {
  type: string;
  payload: {
    dataWrapper: {
      data: any;
      totalRecords: number;
      page: number;
      size: number;
    };
    customInput: any;
  };
};

const subjectsReducer = (
  state: SubjectsReducerType = INITIAL_STATE,
  action: Action
): SubjectsReducerType => {
  const payload = action?.payload?.dataWrapper;

  const { data, totalRecords, page, size } = payload || {};

  const customInput = action?.payload?.customInput;
  switch (action.type) {
    case INITIALIZE_SUBJECTS_DATA_SUCCESS:
      return {
        ...state,
        subjects: data,
        totalRecords,
        page,
        size,
      };

    case INITIALIZE_SUBJECT_CONTENTS_SUCCESS:
      return {
        ...state,
        subjects: [...addSubjectVideos(state.subjects, payload, customInput)],
      };
    case UPDATE_SUBJECT_CONTENTS_SUCCESS:
      return {
        ...state,
        subjects: data
          ? [...updateSubjectVideos(state.subjects, payload, customInput)]
          : state.subjects,
      };

    case INITIALIZE_SUBJECT_TUTORS_SUCCESS:
      return {
        ...state,
        subjects: [...addSubjectTutors(state.subjects, data, customInput)],
      };

    case UPDATE_TUTORS_SUCCESS:
      return {
        ...state,
        subjects: data
          ? [...updateSubjectTutors(state.subjects, payload, customInput)]
          : state.subjects,
      };
    case UPDATE_SUBJECTS_REEL_SUCCESS:
      return {
        ...state,
        subjects: state?.subjects
          ? [...state.subjects, ...(data || [])]
          : [...(data || [])],
        totalRecords,
        page,
        size,
      };

    case INITIALIZE_SUBJECT_TUTOR_CONTENTS_SUCCESS:
      return {
        ...state,
        subjects: [...updateTutorOnclick(state.subjects, data, customInput)],
      };
    case HOVER_ON_SUBJECT_REEL_CONTENT:
      return {
        ...state,
        ...hoverOnClip(state, payload),
      };

    case RESET_SUBJECTS_REDUCER_DATA:
      return INITIAL_STATE;

    default:
      return state;
  }
};

/**
 * Hover on clip
 */

const hoverOnClip = (state: any, payload: any) => {
  state.hoverSubjectId = null;
  state.hoverTutorId = null;
  if (payload) {
    const { subjectId, tutorId } = payload;
    state.hoverSubjectId = subjectId;
    state.hoverTutorId = tutorId;
  }

  return state;
};

/**
 *Update Tutor isClick
 */
const updateTutorOnclick = (state: any, payload: any, customInput: any) => {
  const subject = state.find(
    (subject: any) => subject._id === customInput.subjectId
  );
  const subjectIndex = getArrayIndex(state, customInput.subjectId);

  state[subjectIndex].clickedTutorIndex = customInput.index;
  state[subjectIndex].tutorVideos = payload;
  state[subjectIndex].tutorVideosPage = tutorVideosPage;
  state[subjectIndex].tutorVideosSize = tutorVideosPerPage;

  return state;
};

/**
 *Append new Tutors to subject
 */
const addSubjectTutors = (state: any, payload: any, customInput: any) => {
  const subjectIndex = getArrayIndex(state, customInput.subjectId);

  state[subjectIndex].subjectTutors = payload ? payload : [];
  state[subjectIndex].tutorPage = tutorsPage;
  state[subjectIndex].tutorSize = tutorsPerPage;

  return state;
};

/**
 *Append Tutors to subject
 */
const updateSubjectTutors = (state: any, payload: any, customInput: any) => {
  const { data, page, size } = payload;
  const subject = state.find(
    (subject: any) => subject._id === customInput.subjectId
  );
  const subjectIndex = getArrayIndex(state, customInput.subjectId);

  subject.subjectTutors = subject.subjectTutors ? subject.subjectTutors : [];

  const newVideo = subject.subjectTutors.concat(data);

  state[subjectIndex].subjectTutors = newVideo;

  state[subjectIndex].tutorPage = page;
  state[subjectIndex].tutorSize = size;

  return state;
};

/**
 * Append initial Video set
 */

const addSubjectVideos = (state: any, payload: any, customInput: any) => {
  const { data = [], totalRecords } = payload;
  const subjectIndex = getArrayIndex(state, customInput.subjectId);

  state[subjectIndex].subjectVideos = data;
  state[subjectIndex].videosPage = videosPage;
  state[subjectIndex].videosSize = videosPerPage;
  state[subjectIndex].videosTotalRecords = totalRecords;

  return state;
};

/**
 * Append update Video set
 */
const updateSubjectVideos = (
  state: any,
  payload: any,
  customInput: { subjectId: any }
) => {
  const { data = [], totalRecords, page, size } = payload;
  const subject = state.find(
    (subject: { _id: string }) => subject._id === customInput.subjectId
  );
  const subjectIndex = getArrayIndex(state, customInput.subjectId);

  subject.subjectVideos = subject.subjectVideos ? subject.subjectVideos : [];

  const newVideo = subject.subjectVideos.concat(data);

  state[subjectIndex].subjectVideos = newVideo;
  state[subjectIndex].videosPage = page;
  state[subjectIndex].videosSize = size;
  state[subjectIndex].videosTotalRecords = totalRecords;

  return state;
};

/**
 *Get array index from object key value
 */
const getArrayIndex = (state: any[], id: any) => {
  return state.findIndex((element: { _id: string }) => element._id === id);
};

export default subjectsReducer;
