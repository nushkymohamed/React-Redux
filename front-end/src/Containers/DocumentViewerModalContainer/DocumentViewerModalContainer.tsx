import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DocumentViewerModel from '../../Components/CoreComponents/DocumentViewerModel';
import AboutComponent from '../../Components/CoreComponents/DocumentViewerModel/AboutComponent';
import DocumentComponent from '../../Components/CoreComponents/DocumentViewerModel/DocumentComponent';
import LinkedDocumentComponent from '../../Components/CoreComponents/DocumentViewerModel/LinkedDocumentComponent';
import NotesComponent from '../../Components/CoreComponents/DocumentViewerModel/NotesComponent';
import {
  contentType,
  CONTENT_SERVICE,
  USER_CONTENT_SERVICE,
} from '../../config/constants';
import useApi from '../../Hooks/useApi';
import useDataBase from '../../Hooks/useDataBase';
import UseViewFile from '../../Hooks/UseViewFile';
import { singleLessonType } from '../../redux/common/commonReducer';
import {
  DataBaseSubject,
  DataBaseTopic,
} from '../../redux/dataBase/dataBaseReducer';
import { RootStore } from '../../redux/store';
import { DocumentsType } from '../../redux/Theater/TheaterReducer';
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
  SAVE_DOC_RELATED_NOTES_FAILED,
  SAVE_DOC_RELATED_NOTES_REQUEST,
  SAVE_DOC_RELATED_NOTES_SUCCESS,
} from '../../redux/viewDocument/viewDocumentTypes';

interface DocumentViewerModalProps {
  defaultTab?: TabType;
  selectedDocument: DocumentsType;
  onClose: () => void;
}

export enum TabType {
  Document,
  Questions,
  About,
  Notes,
}

const DocumentViewerModalContainer: FC<DocumentViewerModalProps> = ({
  defaultTab = TabType.Document,
  selectedDocument,
  onClose,
}) => {
  const { _id } = selectedDocument;

  const [tabType, setTabType] = useState<TabType>(defaultTab);

  const [generateDocumentURL, documentURL] = UseViewFile();
  const [getDocumentDataAPI] = useApi();
  const [getRelatedVideosAPI] = useApi();
  const [getRelatedDocumentsAPI] = useApi();
  const [getRelatedAssessmentsAPI] = useApi();
  const [getPersonalNotesAPI] = useApi();
  const [savePersonalNotesAPI] = useApi();

  const [searchSubject, subject] = useDataBase();
  const [searchTopic, topic] = useDataBase();
  const [searchLessons, lessons] = useDataBase();

  const { userData } = useSelector((state: RootStore) => state.auth);
  const {
    documentContent,
    notes,
    notesPage,
    notesLoading,
    notesSaveLoading,
    relatedAssessments,
    relatedDocuments,
    relatedVideos,
  } = useSelector((state: RootStore) => state.viewDocument);

  const {
    _id: docId,
    author,
    documentKey,
    lessonIds,
    relatedAssessmentIds,
    relatedDocumentIds,
    relatedVideoIds,
    subjectId,
    title,
    topicId,
  } = documentContent;

  useEffect(() => {
    const { bucketName, fileKey } = documentKey || {};
    if (fileKey && bucketName) {
      generateDocumentURL(bucketName, fileKey);
    }
  }, [documentKey]);

  useEffect(() => {
    _id && getDocumentData(_id);
  }, [selectedDocument]);

  useEffect(() => {
    subjectId && searchSubject('subject', { ids: [subjectId] });
    topicId && searchTopic('topic', { ids: [topicId] });
    lessonIds?.length && searchLessons('lesson', { ids: lessonIds });
    relatedAssessmentIds?.length && getRelatedAssessments(relatedAssessmentIds);
    relatedVideoIds?.length && getRelatedVideos(relatedVideoIds);
    relatedDocumentIds?.length && getRelatedDocuments(relatedDocumentIds);
    docId && getPersonalNotes(1);
  }, [JSON.stringify(documentContent)]);

  const getDocumentData = (contentId: string) => {
    contentId &&
      getDocumentDataAPI(
        `/contents/learningMaterials?contentIds=${contentId}&page=1&size=1`,
        GET_DOCUMENT_DATA_REQUEST,
        GET_DOCUMENT_DATA_SUCCESS,
        GET_DOCUMENT_DATA_FAILED,
        {},
        {},
        'GET',
        false,
        CONTENT_SERVICE
      );
  };

  const getRelatedVideos = (videoIds: string[]) => {
    videoIds.length &&
      getRelatedVideosAPI(
        `/contents/learningMaterials?contentIds=${videoIds}&page=1&size=${videoIds.length}`,
        GET_DOC_RELATED_VIDEOS_REQUEST,
        GET_DOC_RELATED_VIDEOS_SUCCESS,
        GET_DOC_RELATED_VIDEOS_FAILED,
        {},
        {},
        'GET',
        false,
        CONTENT_SERVICE
      );
  };

  const getRelatedAssessments = (assessmentIds: string[]) => {
    assessmentIds.length &&
      getRelatedAssessmentsAPI(
        `/contents/learningMaterials?contentIds=${assessmentIds}&page=1&size=${assessmentIds.length}`,
        GET_DOC_RELATED_ASSESSMENTS_REQUEST,
        GET_DOC_RELATED_ASSESSMENTS_SUCCESS,
        GET_DOC_RELATED_ASSESSMENTS_FAILED,
        {},
        {},
        'GET',
        false,
        CONTENT_SERVICE
      );
  };

  const getRelatedDocuments = (documentIds: string[]) => {
    documentIds.length &&
      getRelatedDocumentsAPI(
        `/contents/learningMaterials?contentIds=${documentIds}&page=1&size=${documentIds.length}`,
        GET_DOC_RELATED_DOCUMENTS_REQUEST,
        GET_DOC_RELATED_DOCUMENTS_SUCCESS,
        GET_DOC_RELATED_DOCUMENTS_FAILED,
        {},
        {},
        'GET',
        false,
        CONTENT_SERVICE
      );
  };

  //get personal notes
  const getPersonalNotes = (page: number) => {
    getPersonalNotesAPI(
      `/users/${userData?._id}/contents/${_id}/personalNotes?page=${page}&size=20`,
      GET_DOC_RELATED_NOTES_REQUEST,
      GET_DOC_RELATED_NOTES_SUCCESS,
      GET_DOC_RELATED_NOTES_FAILED,
      {},
      {},
      'GET',
      false,
      USER_CONTENT_SERVICE,
      { page }
    );
  };

  //save personal notes
  const savePersonalNotes = (text: string) => {
    if (!text) return;

    const noteObj = {
      text,
      createdDate: new Date().toISOString(),
    };

    savePersonalNotesAPI(
      `/users/${userData?._id}/contents/${_id}/personalNotes`,
      SAVE_DOC_RELATED_NOTES_REQUEST,
      SAVE_DOC_RELATED_NOTES_SUCCESS,
      SAVE_DOC_RELATED_NOTES_FAILED,
      noteObj,
      {},
      'POST',
      false,
      USER_CONTENT_SERVICE
    );
  };

  useEffect(() => {
    if (!notesSaveLoading) {
      getPersonalNotes(1);
    }
  }, [notesSaveLoading]);

  const renderTab = (type: TabType) => {
    switch (type) {
      case TabType.Document: {
        if (documentContent.type === contentType.linkedDocument) {
          return (
            <LinkedDocumentComponent
              sections={documentContent.sections || []}
              title={title}
            />
          );
        } else {
          return <DocumentComponent pdfURL={documentURL} title={title} />;
        }
      }
      case TabType.About:
        return (
          <AboutComponent
            author={author}
            lesson={(lessons as singleLessonType[])
              ?.map(l => l.name)
              .join(' / ')}
            relatedAssessments={relatedAssessments}
            relatedDocuments={relatedDocuments}
            relatedVideos={relatedVideos}
            subject={(subject as DataBaseSubject[])?.[0]?.name}
            topic={(topic as DataBaseTopic[])?.[0]?.topic}
            title={title}
          />
        );
      case TabType.Notes:
        return (
          <NotesComponent
            notes={notes}
            saveNote={savePersonalNotes}
            submitLoading={notesSaveLoading}
          />
        );
      default:
        return <DocumentComponent pdfURL={documentURL} title={title} />;
    }
  };
  return (
    <DocumentViewerModel
      onClose={onClose}
      setTabType={setTabType}
      tabType={tabType}
    >
      {renderTab(tabType)}
    </DocumentViewerModel>
  );
};

export default DocumentViewerModalContainer;
