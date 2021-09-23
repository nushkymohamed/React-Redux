import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import DateAndClock from '../../Components/DateAndClockModal/DateAndClock';
import Modal from '../../Components/Modal/Modal';
import BackButton from '../../Components/TheaterMode/BackButton';
import TheaterSlider from '../../Components/TheaterMode/TheaterSlider';
import {
  contentType,
  CONTENT_SERVICE,
  notificationType,
  PRODUCT_CONTENT_SERVICE,
  USER_CONTENT_SERVICE,
  USER_NOTIFICATION_SERVICE,
} from '../../config/constants';
import { convertTimeToSeconds } from '../../Helper/index';
import useApi from '../../Hooks/useApi';
import useTotalNumberOfRecords from '../../Hooks/useTotalNumberOfRecords';
import { RootStore } from '../../redux/store';
import {
  REMOVE_WATCH_LATER_VIDEO_FAILED,
  REMOVE_WATCH_LATER_VIDEO_REQUEST,
  REMOVE_WATCH_LATER_VIDEO_SUCCESS,
  SUBMIT_REMAINDER_FAILED,
  SUBMIT_REMAINDER_REQUEST,
  SUBMIT_REMAINDER_SUCCESS,
} from '../../redux/student/reelTypes';
import {
  VideoContent,
  watchLaterContentIdsType,
} from '../../redux/student/reelVideoReducer';
import { DocumentsType } from '../../redux/Theater/TheaterReducer';
import {
  DOWNLOAD_SUMMARY_FAILED,
  DOWNLOAD_SUMMARY_REQUEST,
  DOWNLOAD_SUMMARY_SUCCESS,
  GET_DOCUMENTS_FAILED,
  GET_DOCUMENTS_REQUEST,
  GET_DOCUMENTS_SUCCESS,
  GET_END_VIDEO_ASSESSMENT_FAILED,
  GET_END_VIDEO_ASSESSMENT_REQUEST,
  GET_END_VIDEO_ASSESSMENT_SUCCESS,
  GET_LINKED_DOCUMENTS_SUCCESS,
  GET_MID_AND_END_DETAILS_FAIL,
  GET_MID_AND_END_DETAILS_REQUEST,
  GET_MID_AND_END_DETAILS_SUCCESS,
  GET_MID_VIDEO_ASSESSMENT_CONTENT_FAIL,
  GET_MID_VIDEO_ASSESSMENT_CONTENT_REQUEST,
  GET_MID_VIDEO_ASSESSMENT_CONTENT_SUCCESS,
  GET_THEATER_CONTENT_FAILED,
  GET_THEATER_CONTENT_REQUEST,
  GET_THEATER_CONTENT_SUCCESS,
  GET_THEATRE_TUTOR_REEL_DATA_FAILED,
  GET_THEATRE_TUTOR_REEL_DATA_REQUEST,
  GET_THEATRE_TUTOR_REEL_DATA_RESET,
  GET_THEATRE_TUTOR_REEL_DATA_SUCCESS,
  GET_THEATRE_WATCH_LATER_DATA_FAILED,
  GET_THEATRE_WATCH_LATER_DATA_REQUEST,
  GET_THEATRE_WATCH_LATER_DATA_SUCCESS,
  RESET_ASSESSMENT_ATTEMPT,
  RESET_END_VIDEO_ASSESSMENT_ATTEMPT_DATA,
  RESET_THEATER,
} from '../../redux/Theater/TheaterTypes';
import DocumentViewerModalContainer from '../DocumentViewerModalContainer/DocumentViewerModalContainer';
import EndVideoAssessmentContainerTheatre from './EndVideoAssessmentContainerTheatre';
import MidVideoAssessment from './MidVideoAssessmentsContainer';
import PlayerContainer from './PlayerContainer/PlayerContainer';
import TheatreSummary from './SummaryContainer';
import TheaterModeTutorContainer from './TheaterModeTutorContainer';

const TheaterModeContainer = (props: any) => {
  const dispatch = useDispatch();
  const [downloadSummeryApi] = useApi();
  const [showFinishLaterPopup, setShowFinishLaterPopup] = useState(false);
  const [isOpenDocumentPopup, setIsOpenDocumentPopup] =
    useState<boolean>(false);
  const [indexOfCurrentMidAssessment, setIndexOfCurrentMidAssessment] =
    useState(-1);
  const [isPlay, setIsPlay] = useState(true);
  const [midVideoAssignmentTrigger, setMidVideoAssignmentTrigger] =
    useState(false);
  const [reminderDate, setReminderDate] = useState(new Date());
  const [playerSeekRestartTime, setPlayerSeekRestartTime] = useState<any>({
    startTime: 0,
    timeStamp: new Date().toISOString(),
  });
  const [showEndVideoAssessment, setShowEndVideoAssessment] = useState(false);

  const {
    content,
    endVideoAssessment,
    endVideoAssessmentId,
    isFullScreen,
    playerStats: { playingEnded },
    selectedReelContent,
    tutorReelContent,
    tutorReelContentFinishedLoading,
    tutorReelContentPage,
    watchLaterData,
    linkedDocuments,
    documents,
    midVideoAssessmentIds,
    midVideoAssessmentContents,
    midVideoTriggerTimes,
  } = useSelector((state: RootStore) => state.theater);
  const { userData } = useSelector((state: RootStore) => state.auth);

  const { lastMessage } = useSelector((state: RootStore) => state?.websocket);

  const { isLoadingNotification } = useSelector(
    (state: RootStore) => state.reelVideos
  );

  const { t } = useTranslation();
  const { contentId } = props.match.params;
  const { reelIds, internalRoute } = props.location?.state || {};

  useEffect(() => {
    //redirect to student homepage if tried to access theatre page from direct URL
    if (!Array.isArray(reelIds) && !internalRoute) {
      props?.history?.replace?.(`/home`);
    }
  }, [reelIds]);

  useEffect(() => {
    if (Array.isArray(reelIds) && reelIds.length && content?.tutorIds?.length) {
      dispatch({
        type: GET_THEATRE_TUTOR_REEL_DATA_RESET,
      });
      getTutorsContentForReel(content.tutorIds[0], reelIds, 1);
    }
  }, [reelIds, content]);

  const [getContentApi] = useApi();
  const [getMidVideoAssessmentIdContent] = useApi();
  const [getContentAssessmentApi] = useApi();
  const [createReminderApi] = useApi();
  const [getAllWatchLaterVideosApi] = useApi();
  const [removeFromWatchLaterApi] = useApi();
  const [getTutorReelContentApi] = useApi();
  const [getAllDocumentsApi] = useApi();
  const [getTotalRecordsOfDocument, totalRecordsOfDocument] =
    useTotalNumberOfRecords();
  const [getTotalRecordsOfLinkedDocument, totalRecordsOfLinkedDocument] =
    useTotalNumberOfRecords();
  const [getEndVideoAssessmentApi] = useApi();

  const getEndVideoAssessmentById = (contentId: string) => {
    getEndVideoAssessmentApi(
      `/contents/learningMaterials?contentIds=${contentId}`,
      GET_END_VIDEO_ASSESSMENT_REQUEST,
      GET_END_VIDEO_ASSESSMENT_SUCCESS,
      GET_END_VIDEO_ASSESSMENT_FAILED,
      {},
      {},
      'GET',
      false,
      CONTENT_SERVICE
    );
  };

  const getContentFromId = () => {
    getContentApi(
      `/contents/learningMaterials?contentIds=${contentId}`,
      GET_THEATER_CONTENT_REQUEST,
      GET_THEATER_CONTENT_SUCCESS,
      GET_THEATER_CONTENT_FAILED,
      {},
      {},
      'GET',
      false,
      CONTENT_SERVICE
    );
  };
  const getContentAssessmentFromId = () => {
    getContentAssessmentApi(
      `/contents/learningMaterials?contentIds=${contentId}`,
      GET_MID_AND_END_DETAILS_REQUEST,
      GET_MID_AND_END_DETAILS_SUCCESS,
      GET_MID_AND_END_DETAILS_FAIL,
      {},
      {},
      'GET',
      false,
      CONTENT_SERVICE
    );
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (endVideoAssessmentId) {
      getEndVideoAssessmentById(endVideoAssessmentId);
    }
  }, [endVideoAssessmentId]);

  const setContent = (selectedContent: VideoContent) => {
    dispatch({
      type: GET_THEATER_CONTENT_SUCCESS,
      payload: { dataWrapper: { data: [selectedContent] } },
    });
  };
  useEffect(() => {
    getTotalRecordsOfDocument(
      `/contents/learningVideos/${contentId}/learningDocuments?page=1`,
      CONTENT_SERVICE
    );
    getTotalRecordsOfLinkedDocument(
      `/contents/learningVideos/${contentId}/learningLinkedDocuments?page=1`,
      CONTENT_SERVICE
    );
    return () => {
      dispatch({ type: RESET_THEATER });
    };
  }, []);

  useEffect(() => {
    if (contentId) {
      scrollToTop();
      if (contentId === selectedReelContent.contentId) {
        getContentAssessmentFromId();
        setContent(selectedReelContent);
      } else {
        dispatch({ type: RESET_THEATER });
        getContentFromId();
      }
    }
  }, [contentId]);
  useEffect(() => {
    midVideoAssessmentIds?.length &&
      getMidVideoAssessmentIdContent(
        `/contents/learningMaterials?contentIds=${midVideoAssessmentIds}&page=1&size=${midVideoAssessmentIds?.length}`,
        GET_MID_VIDEO_ASSESSMENT_CONTENT_REQUEST,
        GET_MID_VIDEO_ASSESSMENT_CONTENT_SUCCESS,
        GET_MID_VIDEO_ASSESSMENT_CONTENT_FAIL,
        {},
        {},
        'GET',
        false,
        CONTENT_SERVICE
      );
  }, [midVideoAssessmentIds]);

  const getTutorsContentForReel = (
    tutorId: string,
    reelIds: string[],
    page: number
  ) => {
    tutorId &&
      reelIds.length &&
      getTutorReelContentApi(
        `/combinedReels/tutors/${tutorId}/reelContents?reelIds=${reelIds}&contentType=${contentType.video}&page=${page}&size=5`,
        GET_THEATRE_TUTOR_REEL_DATA_REQUEST,
        GET_THEATRE_TUTOR_REEL_DATA_SUCCESS,
        GET_THEATRE_TUTOR_REEL_DATA_FAILED,
        {},
        {},
        'GET',
        false,
        PRODUCT_CONTENT_SERVICE,
        { page }
      );
  };

  const nextVideoContent = useMemo(() => {
    const currentIndex = tutorReelContent.findIndex(
      vid => vid.contentId === content?._id
    );
    if (currentIndex < 0) return null;

    if (tutorReelContent.length > currentIndex + 1) {
      return tutorReelContent[currentIndex + 1];
    } else {
      return null;
    }
  }, [tutorReelContent]);

  const previousVideoContent = useMemo(() => {
    const currentIndex = tutorReelContent.findIndex(
      vid => vid.contentId === content?._id
    );
    if (currentIndex <= 0) return null;

    if (tutorReelContent.length > currentIndex) {
      return tutorReelContent[currentIndex - 1];
    } else {
      return null;
    }
  }, [tutorReelContent]);

  useEffect(() => {
    if (
      tutorReelContentPage &&
      !tutorReelContentFinishedLoading &&
      !nextVideoContent
    ) {
      getTutorsContentForReel(
        content?.tutorIds[0] || '',
        reelIds,
        tutorReelContentPage + 1
      );
    }
  }, [tutorReelContentPage]);

  const onFinishLaterClick = () => {
    if (isAddedToWatchLater) {
      const notification = watchLaterData?.find(
        ({ contentId }) => contentId === content?._id
      );
      notification && removeVideoFromWatchLater(notification);
    } else if (!showFinishLaterPopup) {
      setShowFinishLaterPopup(true);
    }
  };

  const removeVideoFromWatchLater = (
    notification: watchLaterContentIdsType
  ) => {
    removeFromWatchLaterApi(
      `/user-notification-settings/${notification?._id}`,
      REMOVE_WATCH_LATER_VIDEO_REQUEST,
      REMOVE_WATCH_LATER_VIDEO_SUCCESS,
      REMOVE_WATCH_LATER_VIDEO_FAILED,
      {},
      {},
      'DELETE',
      false,
      USER_NOTIFICATION_SERVICE,
      { videoInfo: content, watchLaterIds: notification }
    );
  };

  const createReminder = (isDatePresent: boolean = true) => {
    const timeNow = new Date();
    if (isDatePresent && timeNow.getTime() > reminderDate.getTime()) {
      return;
    }
    const data: { [key: string]: string } = {
      userId: userData?._id || '',
      contentId: content?._id || '',
      userNotificationType: 'REMINDER',
    };
    if (isDatePresent) {
      data['reminderDate'] = reminderDate.toISOString();
    }
    createReminderApi(
      `/user-notification-settings`,
      SUBMIT_REMAINDER_REQUEST,
      SUBMIT_REMAINDER_SUCCESS,
      SUBMIT_REMAINDER_FAILED,
      data,
      {},
      'POST',
      false,
      USER_NOTIFICATION_SERVICE,
      { videoInfo: content }
    );
  };

  const isAddedToWatchLater = useMemo(() => {
    const isAdded = watchLaterData?.find(
      ({ contentId }) => contentId === content?._id
    );

    return !!isAdded;
  }, [watchLaterData]);

  useEffect(() => {
    if (!isLoadingNotification) {
      //close popup after network request resolve or fail
      setShowFinishLaterPopup(false);
    }
  }, [isLoadingNotification]);

  useEffect(() => {
    if (
      lastMessage?.task === notificationType.CREATE_REMINDER_SETTINGS ||
      lastMessage?.task === notificationType.REMOVE_WATCH_LATER
    ) {
      getWatchLaterData();
    }
  }, [lastMessage]);

  const getWatchLaterData = () => {
    getAllWatchLaterVideosApi(
      `/users/${userData?._id}/finish-later-contents?contentIds=${content?._id}`,
      GET_THEATRE_WATCH_LATER_DATA_REQUEST,
      GET_THEATRE_WATCH_LATER_DATA_SUCCESS,
      GET_THEATRE_WATCH_LATER_DATA_FAILED,
      {},
      {},
      'GET',
      false,
      USER_CONTENT_SERVICE
    );
  };

  useEffect(() => {
    if (userData?._id && content?._id) {
      getWatchLaterData();
    }
  }, [userData, content]);

  useEffect(() => {
    totalRecordsOfDocument > 0 &&
      getAllDocument(
        GET_DOCUMENTS_SUCCESS,
        'learningDocuments',
        totalRecordsOfDocument
      );
  }, [totalRecordsOfDocument, contentId]);
  useEffect(() => {
    totalRecordsOfLinkedDocument > 0 &&
      getAllDocument(
        GET_LINKED_DOCUMENTS_SUCCESS,
        'learningLinkedDocuments',
        totalRecordsOfLinkedDocument
      );
  }, [totalRecordsOfLinkedDocument, contentId]);

  const getAllDocument = (
    SUCCESS_TYPE: string,
    documentType: string,
    totalRecords: number
  ) => {
    getAllDocumentsApi(
      `/contents/learningVideos/${contentId}/${documentType}?page=1&size=${totalRecords}`,
      GET_DOCUMENTS_REQUEST,
      SUCCESS_TYPE,
      GET_DOCUMENTS_FAILED,
      {},
      {},
      'GET',
      false,
      USER_CONTENT_SERVICE
    );
  };

  const downloadSummery = () => {
    downloadSummeryApi(
      `/users/${userData?._id}/videos/${content?._id}/summaryReport`,
      DOWNLOAD_SUMMARY_REQUEST,
      DOWNLOAD_SUMMARY_SUCCESS,
      DOWNLOAD_SUMMARY_FAILED,
      {},
      {},
      'GET',
      false,
      USER_CONTENT_SERVICE,
      {},
      { responseType: 'arraybuffer', fileName: `summery-${content?.title}` }
    );
  };

  const [selectedDocument, setSelectedDocument] = useState<DocumentsType>(
    {} as DocumentsType
  );
  useEffect(() => {
    if (playingEnded && endVideoAssessment._id) {
      setShowEndVideoAssessment(true);
    }
  }, [playingEnded, endVideoAssessment]);

  const hideEndVideoAssessment = () => {
    setShowEndVideoAssessment(false);
    dispatch({
      type: RESET_END_VIDEO_ASSESSMENT_ATTEMPT_DATA,
    });
  };

  return (
    <div className="container">
      <div
        className={`theaterMode__wrapper ${
          isFullScreen ? 'fullScreenMode' : ''
        }`}
      >
        <div
          className="theaterMode__navigation"
          style={{ display: `${!isFullScreen ? 'block' : 'none'}` }}
        >
          <BackButton />
        </div>
        <div className="theaterMode__topArea">
          {showEndVideoAssessment ? (
            <EndVideoAssessmentContainerTheatre
              contentId={contentId}
              hideEndVideoAssessment={hideEndVideoAssessment}
            />
          ) : (
            <>
              <div className="theaterMode__topArea--left">
                <TheaterModeTutorContainer
                  userId={content?.tutorIds?.[0] || ''}
                  downloadSummery={downloadSummery}
                />
                <PlayerContainer
                  playStatus={isPlay}
                  setPlayStatus={(status: boolean) => setIsPlay(status)}
                  onFinishLaterClick={onFinishLaterClick}
                  nextVideoContent={nextVideoContent}
                  previousVideoContent={previousVideoContent}
                  reelIds={reelIds}
                  onProgressTime={(streamingTime: number) => {
                    if (midVideoTriggerTimes?.includes(streamingTime)) {
                      setIsPlay(false);
                      setPlayerSeekRestartTime({
                        startTime: streamingTime + 1,
                        timeStamp: new Date().toISOString(),
                      });

                      const indexOfMidAssessment =
                        midVideoTriggerTimes?.indexOf(streamingTime);
                      setIndexOfCurrentMidAssessment(indexOfMidAssessment);
                      setMidVideoAssignmentTrigger(true);
                    }
                  }}
                  startTime={playerSeekRestartTime}
                />
                {midVideoAssignmentTrigger &&
                  indexOfCurrentMidAssessment >= 0 &&
                  midVideoAssessmentContents && (
                    <MidVideoAssessment
                      midAssessmentContent={
                        midVideoAssessmentContents[indexOfCurrentMidAssessment]
                      }
                      closeMidAssignment={() => {
                        dispatch({ type: RESET_ASSESSMENT_ATTEMPT });
                        setMidVideoAssignmentTrigger(false);
                        setIsPlay(true);
                      }}
                      setPlayerSeekTime={(startTime: string) =>
                        setPlayerSeekRestartTime({
                          startTime: convertTimeToSeconds(startTime),
                          timeStamp: new Date().toISOString(),
                        })
                      }
                    />
                  )}
              </div>
              <div
                className="theaterMode__topArea--right"
                style={{ display: `${!isFullScreen ? 'block' : 'none'}` }}
              >
                <TheatreSummary
                  downloadSummery={downloadSummery}
                  getSummaryStartTime={(startTime: number) => {
                    setPlayerSeekRestartTime({
                      startTime: startTime,
                      timeStamp: new Date().toISOString(),
                    });
                  }}
                />
              </div>
            </>
          )}
        </div>
        <div
          className="theaterMode__bottomArea"
          style={{ display: `${!isFullScreen ? 'block' : 'none'}` }}
        >
          <TheaterSlider
            content={content}
            getSummaryStartTime={(startTime: number) => {
              setPlayerSeekRestartTime({
                startTime: startTime,
                timeStamp: new Date().toISOString(),
              });
            }}
            downloadSummery={downloadSummery}
            onClickDocument={document => {
              setSelectedDocument(document);
              setIsOpenDocumentPopup(true);
            }}
            linkedDocuments={linkedDocuments || []}
            documents={documents || []}
          />
        </div>
        {isOpenDocumentPopup && (
          <DocumentViewerModalContainer
            onClose={() => setIsOpenDocumentPopup(false)}
            selectedDocument={selectedDocument}
          />
        )}
        {showFinishLaterPopup && (
          <Modal
            onClickAway={() => setShowFinishLaterPopup(false)}
            customClassName={'watchlater'}
          >
            <DateAndClock
              getValue={(date: Date) => setReminderDate(date)}
              onClose={() => setShowFinishLaterPopup(false)}
              onSubmit={() => createReminder()}
              onSkip={() => createReminder(false)}
            />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default TheaterModeContainer;
