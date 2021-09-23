import { VideoContent } from '../student/reelVideoReducer';
import { DocumentsType } from '../Theater/TheaterReducer';
import {
  GET_DOCUMENT_DATA_FAILED,
  GET_DOCUMENT_DATA_REQUEST,
  GET_DOCUMENT_DATA_SUCCESS,
  GET_DOC_RELATED_ASSESSMENTS_FAILED,
  GET_DOC_RELATED_ASSESSMENTS_REQUEST,
  GET_DOC_RELATED_ASSESSMENTS_SUCCESS,
  GET_DOC_RELATED_DOCUMENTS_FAILED,
  GET_DOC_RELATED_DOCUMENTS_REQUEST,
  GET_DOC_RELATED_DOCUMENTS_SUCCESS,
  GET_DOC_RELATED_NOTES_FAILED,
  GET_DOC_RELATED_NOTES_REQUEST,
  GET_DOC_RELATED_NOTES_SUCCESS,
  GET_DOC_RELATED_VIDEOS_FAILED,
  GET_DOC_RELATED_VIDEOS_REQUEST,
  GET_DOC_RELATED_VIDEOS_SUCCESS,
  RESET_DOCUMENT_VIEW,
  SAVE_DOC_RELATED_NOTES_FAILED,
  SAVE_DOC_RELATED_NOTES_REQUEST,
  SAVE_DOC_RELATED_NOTES_SUCCESS,
} from './viewDocumentTypes';

type Action = {
  type: string;
  payload: {
    dataWrapper: {
      data?: any;
      totalRecords?: number;
      id?: string;
      page?: number;
      size?: number;
    };
    customInput: any;
  };
};

export interface Note {
  createdDate: string;
  text: string;
}

type viewDocumentReducerType = {
  documentContent: DocumentsType;
  documentContentLoading: boolean;
  notes: Note[];
  notesLoading: boolean;
  notesPage: number;
  notesSaveLoading: boolean;
  relatedAssessments: any[];
  relatedAssessmentsLoading: boolean;
  relatedDocuments: DocumentsType[];
  relatedDocumentsLoading: boolean;
  relatedVideos: VideoContent[];
  relatedVideosLoading: boolean;
};

const INITIAL_STATE: viewDocumentReducerType = {
  documentContent: {} as DocumentsType,
  documentContentLoading: false,
  notes: [],
  notesLoading: false,
  notesPage: 0,
  notesSaveLoading: false,
  relatedAssessments: [],
  relatedAssessmentsLoading: false,
  relatedDocuments: [],
  relatedDocumentsLoading: false,
  relatedVideos: [],
  relatedVideosLoading: false,
};

const viewDocumentReducer = (
  state: viewDocumentReducerType = INITIAL_STATE,
  action: Action
): viewDocumentReducerType => {
  const payload: any = action?.payload?.dataWrapper;
  const { data = [], totalRecords = 0, page = 0, size = 0 } = payload || {};
  const customInput = action?.payload?.customInput;

  switch (action.type) {
    case RESET_DOCUMENT_VIEW:
      return INITIAL_STATE;

    //get document
    case GET_DOCUMENT_DATA_REQUEST:
      return {
        ...state,
        documentContentLoading: true,
      };
    case GET_DOCUMENT_DATA_SUCCESS:
      return {
        ...state,
        documentContentLoading: false,
        documentContent: data?.[0],
      };
    case GET_DOCUMENT_DATA_FAILED:
      return {
        ...state,
        documentContentLoading: false,
      };

    //get assessments
    case GET_DOC_RELATED_ASSESSMENTS_REQUEST:
      return {
        ...state,
        relatedAssessmentsLoading: true,
      };
    case GET_DOC_RELATED_ASSESSMENTS_SUCCESS:
      return {
        ...state,
        relatedAssessmentsLoading: false,
        relatedAssessments: data,
      };
    case GET_DOC_RELATED_ASSESSMENTS_FAILED:
      return {
        ...state,
        relatedAssessmentsLoading: false,
      };

    //get documents
    case GET_DOC_RELATED_DOCUMENTS_REQUEST:
      return {
        ...state,
        relatedDocumentsLoading: true,
      };
    case GET_DOC_RELATED_DOCUMENTS_SUCCESS:
      return {
        ...state,
        relatedDocumentsLoading: false,
        relatedDocuments: data,
      };
    case GET_DOC_RELATED_DOCUMENTS_FAILED:
      return {
        ...state,
        relatedDocumentsLoading: false,
      };

    //get videos
    case GET_DOC_RELATED_VIDEOS_REQUEST:
      return {
        ...state,
        relatedVideosLoading: true,
      };
    case GET_DOC_RELATED_VIDEOS_SUCCESS:
      return {
        ...state,
        relatedVideosLoading: false,
        relatedVideos: data,
      };
    case GET_DOC_RELATED_VIDEOS_FAILED:
      return {
        ...state,
        relatedVideosLoading: false,
      };

    //get notes
    case GET_DOC_RELATED_NOTES_REQUEST:
      return {
        ...state,
        notesLoading: true,
      };
    case GET_DOC_RELATED_NOTES_SUCCESS:
      return {
        ...state,
        notesLoading: false,
        notes:
          customInput?.page === 1
            ? data || []
            : [...state.notes, ...(data || [])],
        notesPage: page || state.notesPage,
      };
    case GET_DOC_RELATED_NOTES_FAILED:
      return {
        ...state,
        notesLoading: false,
      };

    //save notes
    case SAVE_DOC_RELATED_NOTES_REQUEST:
      return {
        ...state,
        notesSaveLoading: true,
      };
    case SAVE_DOC_RELATED_NOTES_SUCCESS:
      return {
        ...state,
        notesSaveLoading: false,
      };
    case SAVE_DOC_RELATED_NOTES_FAILED:
      return {
        ...state,
        notesSaveLoading: false,
      };
    default:
      return state;
  }
};

export default viewDocumentReducer;
